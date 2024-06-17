import moment from "moment";

export const getDate = (value) => {
  const date = new moment(value);
  return date.format("DD.MM.YYYY");
};
