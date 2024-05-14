import { QUERY_KEY } from "../../../shared/constants/query.keys";
import { useQueryClient } from "react-query";
import { useLocalStorage } from "../../../shared/hooks/useLocalStorage";

export const useLogout = () => {
  const queryClient = useQueryClient();
  const { userId } = useLocalStorage();
  const logout = () => {
    localStorage.removeItem(QUERY_KEY.TOKEN);
    localStorage.removeItem(QUERY_KEY.IS_AUTH);
    localStorage.removeItem(QUERY_KEY.USER);
    localStorage.removeItem(QUERY_KEY.USER_ID);
    queryClient.removeQueries([`${QUERY_KEY.USER}${userId}`]);
    queryClient.removeQueries(QUERY_KEY.IS_AUTH);
    queryClient.removeQueries(QUERY_KEY.TOKEN);
    queryClient.removeQueries(QUERY_KEY.USER_ID);
  };
  return { logout };
};
