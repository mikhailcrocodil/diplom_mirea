import { useMutation, useQueryClient } from "react-query";
import { LoginModel, UserModel } from "../../models";
import axios from "axios";
import { BASE_URL } from "../../config/config";
import { QUERY_KEY } from "../../../shared/constants/query.keys";
import { useNavigate } from "react-router-dom";
import { RoutePath } from "../../../app/routing/libs/routePaths";

async function deleteUser(id: string) {
  const token = localStorage.getItem("token");
  const requestId = Number(id);
  const response = await axios.delete(
    `${BASE_URL}/user/delete-user/${requestId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
}

export function useDeleteUser() {
  const {
    mutate: getDeleteUser,
    isSuccess,
    data,
  } = useMutation<any, any, { id: string }, any>(({ id }) => deleteUser(id), {
    retry: 2,
  });

  return { getDeleteUser, isSuccess, data };
}
