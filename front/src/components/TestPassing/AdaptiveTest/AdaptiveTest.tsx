import React from "react";
import { useGetAllQuestions } from "../../../api/hooks/test/useGetAllQuestions";

function AdaptiveTest() {
  console.log("lll");
  const { data, error, isLoading, refetch } = useGetAllQuestions();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.toString()}</div>;
  }

  return (
    <div>
      {data &&
        data.map((question) => (
          <div key={question.id}>
            <h3>{question.question_text}</h3>
            <p>ID: {question.id}</p>
            <p>Topic: {question.id_topic}</p>
            <p>Difficulty: {question.difficulty}</p>
          </div>
        ))}
    </div>
  );
}

export default AdaptiveTest;
