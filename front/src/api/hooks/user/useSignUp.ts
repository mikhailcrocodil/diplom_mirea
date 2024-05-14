import { useMutation } from "react-query";
import axios from "axios";
import { BASE_URL } from "../../config/config";

async function signUp(data: any) {
  const response = await axios.post(`${BASE_URL}/auth/registration`, {
    data,
  });
  return response.data;
}

export function useSignUp() {
  const {
    mutate: signUpMutation,
    data,
    error,
    isLoading,
    isSuccess,
  } = useMutation<any, unknown, any>((data) => signUp(data), {
    onSuccess: (data) => {
      console.log(data);
    },
  });

  return { signUpMutation, data, error, isLoading, isSuccess };
}
