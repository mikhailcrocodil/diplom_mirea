import { useMutation } from "react-query";
import axios from "axios";
import { BASE_URL } from "../../config/config";
import useToast from "../../../shared/UI/Toast/useToast";

async function addTheme(moduleId: number, title: string) {
  const token = localStorage.getItem("token");
  const response = await axios.post(
    `${BASE_URL}/course/add-theme`,
    {
      moduleId,
      title,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
}

export function useAddTheme() {
  const moduleId = localStorage.getItem("moduleId");
  const openNotification = useToast();
  const {
    mutate: addThemeMutation,
    data,
    error,
    isSuccess,
    isLoading,
  } = useMutation<
    {
      title: string;
    },
    unknown,
    {
      title: string;
    }
  >(({ title }) => addTheme(Number(moduleId), title), {
    onSuccess: () => {
      openNotification({
        type: "success",
        message: "Тема успешно добавлена на курс",
      });
    },
    onError: () => {
      openNotification({
        type: "error",
        message: "При создании темы возникла ошибка",
      });
    },
  });

  return { addThemeMutation, isSuccess };
}
