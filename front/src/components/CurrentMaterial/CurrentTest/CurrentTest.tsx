import { useGetTest } from "../../../api/hooks/course/useGetTest";
import { NavLink, useParams } from "react-router-dom";
import { Flex } from "antd";
import { TextBlock } from "./CurrentTest.styled";
import { Button } from "../../UI/Button";
import { useFormatDate } from "../../../shared/hooks/useFormatDate";
import { useGetNumberAttempts } from "../../../api/hooks/course/useGetNumberAttempts";
import { useEffect, useState } from "react";
import { useAddAttempt } from "../../../api/hooks/course/useAddAttempt";
import { useGetAttempts } from "../../../api/hooks/course/useGetAttempts";
import axios from "axios";
import { BASE_URL } from "../../../api/config/config";
import { AttemptsTable } from "../../TestPassing/AttemptsTable";

const CurrentTest = () => {
  const materialId = useParams().material_id;
  const userId = localStorage.getItem("userId");
  const { data } = useGetTest(materialId);
  const { data: countAttempts, addTestMutation } = useGetNumberAttempts();
  const [userAttempted, setUserAttempted] = useState<number | undefined>();
  const [testAttempts, setTestAttempts] = useState<number | undefined>();
  const { data: attempts, refetch } = useGetAttempts(
    Number(userId),
    Number(data?.test[0].id),
  );

  async function addAttempt(userId: number, testId: number) {
    const token = localStorage.getItem("token");
    const selectedDate = new Date();
    const currentDate = new Date(
      selectedDate.getTime() + 3 * 60 * 60 * 1000,
    ).toISOString();
    const response = await axios.post(
      `${BASE_URL}/course/add-attempt`,
      {
        userId,
        testId,
        currentDate,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  }

  useEffect(() => {
    if (data?.test[0].id) {
      refetch();
    }
  }, [data?.test[0].id]);

  useEffect(() => {
    refetch();
  }, []);

  useEffect(() => {
    if (data && data.test[0].id && userId) {
      addTestMutation({
        testId: Number(data.test[0].id),
        userId: Number(userId),
      });
    }
  }, [addTestMutation, data, userId]);

  const handleAttempt = async () => {
    const testId = data?.test[0].id;
    if (testId && userId) {
      const res = await addAttempt(Number(userId), Number(testId));
      localStorage.setItem("attemptId", res.result);
    }
  };

  useEffect(() => {
    if (countAttempts) {
      setUserAttempted(countAttempts.result.userAttempted);
      setTestAttempts(countAttempts.result.testAttempt);
      console.log(
        countAttempts.result.userAttempted,
        countAttempts.result.testAttempt,
      );
    }
  }, [countAttempts]);

  const { formatIsoDate } = useFormatDate();
  return (
    <Flex vertical>
      <h3 style={{ fontWeight: 600 }}>{data?.test[0].title}</h3>
      <Flex
        style={{ marginTop: "64px", fontWeight: 500 }}
        gap={15}
        vertical
        justify={"center"}
        align={"center"}
      >
        <div>
          <span style={{ fontWeight: 450 }}>
            В тесте представлено {data?.questions.length} вопроса.
          </span>
          {!data?.test[0].user_id && (
            <span>
              Засчитывается лучшая попытка сдачи с оценкой выше &quot;2&quot;.
            </span>
          )}
        </div>
        <TextBlock>
          <span>Количество попыток: </span>
          <span>
            {data?.test[0].number_attempts !== null
              ? data?.test[0].number_attempts
              : "неограниченно"}
          </span>
        </TextBlock>
        <TextBlock>
          {!data?.test[0].user_id && (
            <>
              <span>Время на прохождение: </span>
              <span>{data?.test[0].duration} минут</span>
            </>
          )}
        </TextBlock>
        {!data?.test[0].user_id && (
          <span style={{ fontWeight: 450 }}>
            Тест открыт до {formatIsoDate(data?.test[0]?.final_date)}
          </span>
        )}
        {userAttempted !== testAttempts ? (
          <NavLink to={`./passing`}>
            <Button onClick={handleAttempt} text={"Начать попытку"} />
          </NavLink>
        ) : (
          <Button
            disabled
            text={"У вас больше нет попыток на прохождение теста"}
          />
        )}
      </Flex>
      {attempts && <AttemptsTable attempts={attempts.attempts} />}
    </Flex>
  );
};

export default CurrentTest;
