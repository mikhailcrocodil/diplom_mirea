import { notification } from "antd";
import { ArgsProps } from "antd/lib/notification";

const useNotification = () => {
  const openNotification = ({
    message,
    description,
    duration,
    type,
  }: ArgsProps) => {
    const placement = "bottomRight";
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    notification[type]({
      className: "toast",
      message,
      description,
      placement,
      duration,
    });
  };

  return openNotification;
};

export default useNotification;
