import { useMutation, useQuery, useQueryClient } from "react-query";
import { LoginModel, UserModel } from "../../models";
import axios from "axios";
import { BASE_URL } from "../../config/config";
import { QUERY_KEY } from "../../../shared/constants/query.keys";
import { useNavigate } from "react-router-dom";
import { RoutePath } from "../../../app/routing/libs/routePaths";

async function getUsers(): Promise<UserModel[]> {
  const token = localStorage.getItem("token");
  const response = await axios.get(`${BASE_URL}/user/get-users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
}

export function useGetAllUsers() {
  const { data, error, isLoading, refetch } = useQuery<
    UserModel[],
    UserModel[],
    UserModel[]
  >("allUsers", () => getUsers(), {
    retry: 2,
    onSuccess: (data) => {
      console.log(data);
    },
  });

  return { data, error, isLoading, refetch };
}
