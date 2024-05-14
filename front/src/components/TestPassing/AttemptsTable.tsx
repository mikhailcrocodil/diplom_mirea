import React from "react";
import { TableHeader } from "../UI/Table-header/TableHeader";
import { TableRow } from "../UI/Table-row/TableRow";
import moment from "moment/moment";

type Props = {
  attempts?: any[];
};
export const AttemptsTable = ({ attempts }: Props) => {
  const formatIsoDate = (str?: string) => {
    const date = moment(str);
    const dateComponent = date.utc().format("DD.MM.YYYY hh:mm:ss");
    return dateComponent;
  };
  const attemptsForTable = attempts?.map((attempt, index) => ({
    number: index + 1,
    start_date: formatIsoDate(attempt.start_time),
    end_date: formatIsoDate(attempt.end_time),
    points: (
      <span>
        {attempt.correct_answers_count} / {attempt.total_questions}
      </span>
    ),
  }));
  const headerWords = [
    "Номер попытки",
    "Дата начала",
    "Дата окончания",
    "Итог",
  ];
  return (
    <div style={{ marginTop: "64px" }}>
      <TableHeader headerWords={headerWords} />
      {attemptsForTable?.map((attempt) => (
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        <TableRow content={attempt} key={attempt.number}></TableRow>
      ))}
    </div>
  );
};
