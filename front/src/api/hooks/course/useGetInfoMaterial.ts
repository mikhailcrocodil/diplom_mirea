import { useQuery } from "react-query";
import axios from "axios";
import { BASE_URL } from "../../config/config";
import { InfoContentModel } from "../../models";

async function getInfoMaterial(id?: string | null) {
  const token = localStorage.getItem("token");
  if (!id) return;
  const response = await axios.get(
    `${BASE_URL}/course/get-info-content/${Number(id)}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
}

export function useGetInfoMaterial(id?: string | null) {
  const queryKey = ["material", id];

  const { data, error, isLoading, refetch } = useQuery<InfoContentModel, any>(
    queryKey,
    () => getInfoMaterial(id),
    {
      retry: 2,
    },
  );

  return { data, error, isLoading, refetch };
}
