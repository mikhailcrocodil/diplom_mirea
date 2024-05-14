import { useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { BASE_URL } from "../../config/config";
import { QUERY_KEY } from "../../../shared/constants/query.keys";
import { UserModel } from "../../models";

async function handleEdit(data: any) {
  const token = localStorage.getItem("token");
  const response = await axios.post(
    `${BASE_URL}/user/edit-user`,
    {
      data,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
}

export function useEdit() {
  const queryClient = useQueryClient();
  const {
    mutate: editMutation,
    data,
    error,
    isLoading,
    isSuccess,
  } = useMutation(handleEdit, {
    onSuccess: (data) => {
      console.log(data);
      const formattedUser: UserModel = {
        id: data.user.id,
        name: data.user.name,
        surname: data.user.surname,
        email: data.user.email,
        phone: data.user.phone,
        access: data.user.access,
        role: data.user.role,
        date_registration: data.user.date_registration,
        patronymic: data.user.patronymic,
        country: data.user.country,
        city: data.user.city,
        timezone: data.user.timezone,
        login: data.user.login,
        password: data.user.password,
        img: data.user.img,
      };
      localStorage.setItem(QUERY_KEY.USER, JSON.stringify(formattedUser));
      queryClient.setQueryData(
        [QUERY_KEY.USER, String(data.user.id)],
        data.user,
      );
    },
  });

  return { editMutation, data, error, isLoading, isSuccess };
}
