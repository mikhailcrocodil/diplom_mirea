import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../api/config/config";
import { useGetUser } from "../../shared/hooks/useGetUser";
import { Flex } from "antd";
import { TableRow } from "../UI/Table-row/TableRow";
import { TableHeader } from "../UI/Table-header/TableHeader";

const AdaptiveTestStudentsInfo = () => {
  const course_id = Number(useParams().courseId);
  const [usersTestsInfo, setUsersTestsInfo] = useState<any>();
  console.log(usersTestsInfo);
  const { setFullName } = useGetUser();
  useEffect(() => {
    const getStudentsInfo = async () => {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${BASE_URL}/course/get-adaptive-test-students-info`,
        {
          course_id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response.status === 200) {
        setUsersTestsInfo(response.data);
      }
    };
    if (course_id) {
      getStudentsInfo();
    }
  }, [course_id]);

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
  const [resultPercent, setResultPercent] = useState<any>();
  const [table, setTable] = useState<any>();
  const [infoForTable, setInfoForTableCells] = useState<any[]>([]);

  useEffect(() => {
    console.log(infoForTable[0]);
  }, [infoForTable]);

  useEffect(() => {
    if (usersTestsInfo) {
      const tableCells = usersTestsInfo.result.map((topic: any, index: any) => {
        console.log(topic);
        const res = topic.result.map((result: any, index: any) => ({
          title: (
            <span>
              {index + 1}. {result.topic}
            </span>
          ),
          result: (
            <span>
              {takeResultText((result.p * 100).toFixed(0))}(
              {(result.p * 100).toFixed(0)}%){" "}
            </span>
          ),
        }));
        console.log(res);
        setInfoForTableCells((prevInfoForTable) => [...prevInfoForTable, res]);
        return res;
      });
      console.log(tableCells);
      setTable(tableCells);
    }
  }, [usersTestsInfo]);

  const headerWords = ["Номер, название темы", "Результат"];

  return (
    <div>
      <h2 style={{ marginBottom: 20 }}>
        Пройденные адаптивные тесты студентов
      </h2>
      {usersTestsInfo &&
        infoForTable.length !== 0 &&
        usersTestsInfo.result.map((result: any, indexUser: any) => (
          <React.Fragment key={result.user_id}>
            <Flex vertical gap={12}>
              <span>Студент {setFullName(result.user)}</span>
              <div style={{ marginBottom: 20 }}>
                <TableHeader headerWords={headerWords} />
                {infoForTable.map((info, index) => {
                  if (index === indexUser) {
                    return info.map((cell: any, indexCell: any) => (
                      <TableRow key={indexCell} content={cell}></TableRow>
                    ));
                  }
                  return null; // Добавлено возвращение null для случаев, когда условие не выполняется
                })}
              </div>
            </Flex>
          </React.Fragment>
        ))}
    </div>
  );
};

export default AdaptiveTestStudentsInfo;
