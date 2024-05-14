// eslint-disable-next-line import/no-extraneous-dependencies
import moment from "moment";

export const useFormatDate = () => {
  const formatIsoDate = (str?: string) => {
    const date = moment(str);
    date.add(3, "hours");
    const dateComponent = date.utc().format("DD.MM.YYYY");
    return dateComponent;
  };

  const formatIsoDateWithHours = (str?: string) => {
    const date = moment(str);
    date.add(3, "hours");
    const dateComponent = date.utc().format("DD.MM.YYYY HH:mm:ss");
    return dateComponent;
  };

  return {
    formatIsoDate,
    formatIsoDateWithHours,
  };
};
