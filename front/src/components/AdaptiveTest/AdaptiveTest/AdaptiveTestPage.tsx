import { NavLink, useParams } from "react-router-dom";
import { Flex } from "antd";
import { Button } from "../../UI/Button";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../../api/config/config";
import { TableHeader } from "../../UI/Table-header/TableHeader";
import { TableRow } from "../../UI/Table-row/TableRow";

const AdaptiveTestPage = () => {
  const testId = Number(useParams().testId);
  const [testResult, setTestResult] = useState<any>();
  useEffect(() => {
    const getTestResult = async () => {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${BASE_URL}/course/get-adaptive-test-result`,
        {
          test_id: testId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setTestResult(response.data);
    };

    if (testId) {
      getTestResult();
    }
  }, [testId]);
  const [resultPercent, setResultPercent] = useState<any>();
  const [table, setTable] = useState<any>();

  const takeResultText = (number: any) => {
    if (number < 50) {
      return "Неуд. ";
    }
    if (number >= 50 && number < 70) {
      return "Удв. ";
    }
    if (number >= 70 && number < 90) {
      return "Хор. ";
    }
    if (number >= 90 && number <= 100) {
      return "Отл. ";
    }
  };

  useEffect(() => {
    if (
      testResult &&
      testResult?.result?.length &&
      testResult?.result?.length === 10
    ) {
      const totalPercent = testResult.result.reduce(
        (acc: any, current: any) => acc + current.p,
        0,
      );
      setResultPercent(((1 / totalPercent) * 100).toFixed(0));
      const tableCells = testResult.result.map((topic: any, index: any) => ({
        title: (
          <span>
            {index + 1}. {topic.topic.topic_text}
          </span>
        ),
        result: (
          <span>
            {takeResultText((topic.p * 100).toFixed(0))}(
            {(topic.p * 100).toFixed(0)}%){" "}
          </span>
        ),
      }));
      console.log(tableCells);
      setTable(tableCells);
    }
  }, [testResult]);

  const headerWords = ["Номер, название темы", "Результат"];

  return (
    <>
      <h2 style={{ marginBottom: "10px" }}>Адаптивный тест</h2>
      {testResult && testResult?.result.length !== 10 ? (
        <>
          <Flex vertical gap={10}>
            <span>
              Данный тест является адаптивным, т.е вопросы формируются по ходу
              ваших ответов
            </span>
            <span>
              Всего в тесте представлено 40 вопросов по 10 темам (4 вопроса на 1
              тему)
            </span>
            <span>
              Сложность вопросов формируется в зависимости от того, как
              правильно вы будете отвечать на предыдущий вопрос
            </span>
            <span>
              Для начала тестирования нажмите на кнопку &quot;Начать адаптивный
              тест&quot;
            </span>
          </Flex>
          <NavLink
            style={{ width: "fit-content" }}
            to={`/adaptive-test/${testId}/passing`}
          >
            <Button
              style={{ width: "fit-content", marginTop: 20 }}
              text={"Начать адаптивный тест"}
            />
          </NavLink>
        </>
      ) : (
        <>
          <Flex vertical gap={16}>
            <h3>Результаты адаптивного теста по курсу</h3>
            <h4>
              Вы справились лучше, чем{" "}
              <span style={{ fontWeight: 500 }}>{resultPercent}%</span> учащихся
            </h4>
            <TableHeader headerWords={headerWords} />
          </Flex>
          {table?.map((cell: any) => (
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            <TableRow content={cell} key={cell.title}></TableRow>
          ))}
        </>
      )}
    </>
  );
};

export default AdaptiveTestPage;
