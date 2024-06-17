import axios from "axios";
import { showLoading, hideLoading } from "react-redux-loading-bar";

import config from "../../../app/api";
import {
  getSeatsRequest,
  getSeatsSuccess,
  getSeatsFailure,
} from "../../actions/actionCreators";

export const getSeats = (route, id, params = {}) => {
  const newSearchParams = new URLSearchParams(params);

  return (dispatch) => {
    dispatch(getSeatsRequest(route));
    dispatch(showLoading());

    axios
      .request({
        method: "GET",
        url: `${config.baseUrl}/routes/${id}/seats?${newSearchParams}`,
      })
      .then((res) => {
        dispatch(getSeatsSuccess(route, res.data));
        dispatch(hideLoading());
      })
      .catch((err) => {
        dispatch(getSeatsFailure(err.message));
        dispatch(hideLoading());
      });
  };
};
