import { useMutation, useQueryClient } from "react-query";
import { LoginModel, UserModel } from "../../models";
import axios from "axios";
import { BASE_URL } from "../../config/config";
import { QUERY_KEY } from "../../../shared/constants/query.keys";
import { useNavigate } from "react-router-dom";
import { RoutePath } from "../../../app/routing/libs/routePaths";

async function getUser(id: string): Promise<UserModel> {
  const token = localStorage.getItem("token");
  const requestId = Number(id);
  const response = await axios.post(
    `${BASE_URL}/user/get-user`,
    {
      id: requestId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
}

export function useGetCurrentUser() {
  const queryClient = useQueryClient();
  const {
    mutate: getCurrentUserMutation,
    data,
    error,
    isLoading,
    isError,
  } = useMutation<UserModel, UserModel, { id: string }, UserModel>(
    ({ id }) => getUser(id),
    {
      retry: 2,
      onSuccess: (data) => {
        const formattedUser: UserModel = {
          id: data.id,
          name: data.name,
          surname: data.surname,
          email: data.email,
          phone: data.phone,
          access: data.access,
          role: data.role,
          date_registration: data.date_registration,
          patronymic: data.patronymic,
          country: data.country,
          city: data.city,
          timezone: data.timezone,
          login: data.login,
          password: data.password,
          img: data.img,
        };
        queryClient.setQueryData(
          [QUERY_KEY.USER, String(data.id)],
          formattedUser,
        );
      },
    },
  );

  return { getCurrentUserMutation, data, error, isLoading, isError };
}
