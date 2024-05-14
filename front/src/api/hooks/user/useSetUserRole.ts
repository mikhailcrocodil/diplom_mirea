import { useMutation } from "react-query";
import axios from "axios";
import { BASE_URL } from "../../config/config";

async function setRole(id: string, role: string) {
  const token = localStorage.getItem("token");
  const requestId = Number(id);
  const response = await axios.post(
    `${BASE_URL}/user/set-role`,
    {
      id: requestId,
      role,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
}

export function useSetUserRole() {
  const {
    mutate: setUserRole,
    isSuccess,
    data,
  } = useMutation<any, any, { id: string; role: string }, any>(
    ({ id, role }) => setRole(id, role),
    {},
  );

  return { setUserRole, isSuccess, data };
}
