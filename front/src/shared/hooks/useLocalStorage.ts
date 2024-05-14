import { QUERY_KEY } from "../constants/query.keys";
import { useEffect, useState } from "react";
import { UserModel } from "../../api/models/user/user.model";

export const useLocalStorage = () => {
  const [token, setToken] = useState<string | null>(null);
  const [isAuth, setIsAuth] = useState<string | null>(null);
  const [userId, setuserId] = useState<string | null>(null);
  const [userParse, setUserParse] = useState<UserModel | null>(null);

  useEffect(() => {
    const getLocalStorage = () => {
      setToken(localStorage.getItem(QUERY_KEY.TOKEN));
      setIsAuth(localStorage.getItem(QUERY_KEY.IS_AUTH));
      setuserId(localStorage.getItem(QUERY_KEY.USER_ID));
      const user = localStorage.getItem(QUERY_KEY.USER);
      setUserParse(JSON.parse(user || ""));
    };
    getLocalStorage();
  }, []);

  return {
    token,
    userParse,
    isAuth,
    userId,
  };
};
