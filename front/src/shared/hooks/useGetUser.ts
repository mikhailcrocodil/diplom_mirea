import { useEffect, useState } from "react";
import { UserModel, UserRole } from "../../api/models/user/user.model";
import { useLocalStorage } from "./useLocalStorage";
import { useQuery, useQueryClient } from "react-query";
import { QUERY_KEY } from "../constants/query.keys";

export const useGetUser = () => {
  const queryClient = useQueryClient();
  const [user, setUser] = useState<UserModel | null>();
  const [userRole, setUserRole] = useState<UserRole | undefined>();
  const [fullName, setFullname] = useState<string>();
  const { userParse, userId } = useLocalStorage();
  const { data } = useQuery<UserModel>([QUERY_KEY.USER, userId]);

  const setFullName = (user: any) => {
    return `${user?.surname} ${user?.patronymic ? `${user?.name[0]}.` : `${user?.name}`}${user?.patronymic?.[0] ?? ""}`;
  };

  useEffect(() => {
    const setCurrentUser = () => {
      if (data) {
        setUser(data);
        setUserRole(data.role);
      } else {
        queryClient.setQueryData([QUERY_KEY.USER, userId], userParse);
        setUserRole(userParse?.role);
      }
    };
    const setName = () => {
      const fullName = `${user?.surname} ${user?.name[0]}.${user?.patronymic?.[0] ?? ""}`;
      setFullname(fullName);
    };
    setCurrentUser();
    if (user) setName();
  }, [data, userParse, user, queryClient, userId]);

  return { user, fullName, userRole, setFullName };
};
