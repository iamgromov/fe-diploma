import {
  RESET_FILTER_TICKETS,
  GET_LAST_TICKETS_REQUEST,
  GET_LAST_TICKETS_SUCCESS,
  GET_TICKETS_REQUEST,
  GET_TICKETS_SUCCESS,
  GET_TICKETS_FAILURE,
} from "../../actions/actionTypes";

const initialState = {
  totalCount: 0,
  items: [],
  lastItems: [],
  success: false,
  isLoading: false,
  error: null,
};

export default function filterTicketsReducer(state = initialState, action) {
  let lastItems, totalCount, items, error;

  switch (action.type) {
    case RESET_FILTER_TICKETS:
      return { ...initialState };
    case GET_LAST_TICKETS_REQUEST:
      return { ...state, lastItems: [], isLoading: true };
    case GET_LAST_TICKETS_SUCCESS:
      lastItems = action.payload.lastItems;
      return { ...state, lastItems, isLoading: false };
    case GET_TICKETS_REQUEST:
      return {
        ...state,
        items: [],
        isLoading: true,
        error: null,
        success: false,
      };
    case GET_TICKETS_SUCCESS:
      ({ totalCount, items } = action.payload);
      return { ...state, totalCount, items, isLoading: false, success: true };
    case GET_TICKETS_FAILURE:
      error = action.payload.error;
      return { ...state, isLoading: false, error, success: false };
    default:
      return state;
  }
}
