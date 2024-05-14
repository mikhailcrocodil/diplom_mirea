import { useMutation } from "react-query";
import axios from "axios";
import { BASE_URL } from "../../config/config";

async function grantAccessUser(id: string, access: boolean) {
  const token = localStorage.getItem("token");
  const requestId = Number(id);
  const response = await axios.post(
    `${BASE_URL}/user/grant-access`,
    {
      id: requestId,
      access,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
}

export function useGrantAccess() {
  const {
    mutate: getGrantAccess,
    isSuccess,
    data,
  } = useMutation<any, any, { id: string; access: boolean }, any>(
    ({ id, access }) => grantAccessUser(id, access),
    {},
  );

  return { getGrantAccess, isSuccess, data };
}
