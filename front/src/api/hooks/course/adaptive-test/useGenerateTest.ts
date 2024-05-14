import axios from "axios";
import { BASE_URL } from "../../../config/config";
import { useMutation } from "react-query";

async function generateTestReq(student_id: number) {
  const token = localStorage.getItem("token");
  const response = await axios.post(
    `${BASE_URL}/course/generate-test`,
    {
      student_id,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
}

export function useGenerateTest() {
  const {
    mutate: generateTest,
    data,
    isSuccess,
  } = useMutation<
    any,
    unknown,
    {
      student_id: number;
    }
  >(({ student_id }) => generateTestReq(student_id), {});

  return { generateTest, isSuccess, data };
}
