import axios from "axios";
import { showLoading, hideLoading } from "react-redux-loading-bar";

import config from "../../../app/api";
import {
  orderRequest,
  orderSuccess,
  orderFailure,
} from "../../actions/actionCreators";

export const postOrder = (data) => {
  return (dispatch) => {
    dispatch(orderRequest());
    dispatch(showLoading());

    axios
      .post(`${config.baseUrl}${import.meta.env.VITE_ORDER_REQ}`, data)
      .then(() => {
        dispatch(orderSuccess());
        dispatch(hideLoading());
      })
      .catch((err) => {
        dispatch(orderFailure(err.message));
        dispatch(hideLoading());
        console.log(err.message);
      });
  };
};
