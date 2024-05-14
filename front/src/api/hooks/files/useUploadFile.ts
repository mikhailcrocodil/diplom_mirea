import { useMutation } from "react-query";
import axios from "axios";
import { BASE_URL } from "../../config/config";

async function uploadFile(file: FormData) {
  const token = localStorage.getItem("token");
  const response = await axios.post(`${BASE_URL}/files/upload-file`, { file });
  return response.data;
}

export function useUploadFile() {
  const {
    mutate: uploadFileMutation,
    isSuccess,
    data,
  } = useMutation<any, any, { file: FormData }, any>(
    ({ file }) => uploadFile(file),
    {
      retry: 1,
      onSuccess: (data) => {
        console.log(data);
      },
    },
  );

  return { uploadFileMutation, isSuccess, data };
}
