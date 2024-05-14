import { useNavigate } from "react-router-dom";
import { RoutePath } from "../../app/routing/libs/routePaths";
import useToast from "../UI/Toast/useToast";

export const useBackToCourse = () => {
  const navigate = useNavigate();
  const openNotification = useToast();
  const backToCourse = (course_id: string, message: string) => {
    navigate(`${RoutePath.all_courses}/${course_id}`);
    openNotification({
      type: "success",
      message,
    });
  };

  return { backToCourse };
};
