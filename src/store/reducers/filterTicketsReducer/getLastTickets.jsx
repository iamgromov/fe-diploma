import axios from "axios";

import {
  getLastTicketsRequest,
  getLastTicketsSuccess,
  getTicketsFailure,
} from "../../actions/actionCreators";
import config from "../../../app/api";

export const getLastTickets = () => {
  return (dispatch) => {
    dispatch(getLastTicketsRequest());

    axios
      .request({
        method: "GET",
        url: `${config.baseUrl}${import.meta.env.VITE_GET_LAST_TICKETS_REQ}`,
      })
      .then((res) => {
        dispatch(getLastTicketsSuccess(res.data));
      })
      .catch((err) => {
        dispatch(getTicketsFailure(err.message));
      });
  };
};
