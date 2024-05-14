import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { BASE_URL } from "../../config/config";
import { QuestionAddModel, TTest } from "../../models";
import { useNavigate } from "react-router-dom";
import { RoutePath } from "../../../app/routing/libs/routePaths";
import useToast from "../../../shared/UI/Toast/useToast";

async function addTest(
  themeId: number,
  questions: any,
  infoTest: any,
): Promise<any> {
  const token = localStorage.getItem("token");
  console.log(questions);
  const response = await axios.post(
    `${BASE_URL}/course/add-test`,
    {
      themeId,
      questions,
      infoTest,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
}

export function useAddTest() {
  const navigate = useNavigate();
  const currentCourse = localStorage.getItem("courseId");
  const openNotification = useToast();
  const {
    mutate: addTestMutation,
    data,
    error,
    isLoading,
  } = useMutation<
    any,
    unknown,
    {
      themeId: number;
      questions: Omit<TTest, "id">;
      infoTest: QuestionAddModel[];
    }
  >(
    ({ themeId, infoTest, questions }) => addTest(themeId, infoTest, questions),
    {
      onSuccess: () => {
        openNotification({
          type: "success",
          message: "Тест успешно добавлен на курс",
        });
        navigate(`${RoutePath.course}/${currentCourse}`);
      },
      onError: () => {
        openNotification({
          type: "error",
          message: "При создании курса возникла ошибка",
        });
      },
    },
  );

  return { addTestMutation, data, error, isLoading };
}
