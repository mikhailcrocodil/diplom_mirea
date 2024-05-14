import { useMutation, useQueryClient } from "react-query";
import { LoginModel, UserModel } from "../../models";
import axios from "axios";
import { BASE_URL } from "../../config/config";
import { QUERY_KEY } from "../../../shared/constants/query.keys";
import { useNavigate } from "react-router-dom";
import { RoutePath } from "../../../app/routing/libs/routePaths";
import useToast from "../../../shared/UI/Toast/useToast";

async function signIn(value: string, password: string): Promise<LoginModel> {
  const response = await axios.post(`${BASE_URL}/auth/authorization`, {
    value,
    password,
  });
  return response.data;
}

export function useSignIn() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {
    mutate: signInMutation,
    data,
    error,
    isLoading,
  } = useMutation<LoginModel, unknown, { value: string; password: string }>(
    ({ value, password }) => signIn(value, password),
    {
      onSuccess: (data) => {
        const formattedUser: UserModel = {
          id: data.id,
          name: data.name,
          surname: data.surname,
          email: data.email,
          access: data.access,
          role: data.role,
          patronymic: data.patronymic,
          login: data.login,
          img: data.img,
        };
        queryClient.setQueryData([QUERY_KEY.TOKEN], data.token);
        queryClient.setQueryData([QUERY_KEY.USER_ID], data.id);
        queryClient.setQueryData<UserModel>(
          [`${QUERY_KEY.USER}${data.id}`],
          formattedUser,
        );
        localStorage.setItem(QUERY_KEY.TOKEN, data.token);
        localStorage.setItem(QUERY_KEY.USER, JSON.stringify(formattedUser));
        localStorage.setItem(QUERY_KEY.IS_AUTH, String(data.isAuth));
        localStorage.setItem(QUERY_KEY.USER_ID, String(data.id));
        navigate(RoutePath.main);
      },
    },
  );

  return { signInMutation, data, error, isLoading };
}
