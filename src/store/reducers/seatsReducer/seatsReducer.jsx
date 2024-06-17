import {
  RESET_SEATS,
  RESET_ROUTE_SEATS,
  SELECT_TRAIN,
  UPDATE_ACTIVE_TICKET_TYPE,
  GET_SEATS_REQUEST,
  GET_SEATS_SUCCESS,
  GET_SEATS_FAILURE,
} from "../../actions/actionTypes";

const initialState = {
  coaches: {
    departure: [],
    arrival: [],
  },
  item: "",
  activeTicketType: "adult",
  isLoading: false,
  error: null,
};

export default function seatsReducer(state = initialState, action) {
  let route, item, type, seats, error;

  switch (action.type) {
    case RESET_SEATS:
      return { ...initialState };
    case UPDATE_ACTIVE_TICKET_TYPE:
      ({ type } = action.payload);
      return { ...state, activeTicketType: type };
    case RESET_ROUTE_SEATS:
      route = action.payload.route;
      return { ...state, coaches: { ...state.coaches, [route]: [] } };
    case SELECT_TRAIN:
      item = action.payload.item;
      return { ...state, item };
    case GET_SEATS_REQUEST:
      route = action.payload.route;
      return {
        ...state,
        coaches: { ...state.coaches, [route]: [] },
        isLoading: true,
        error: null,
      };
    case GET_SEATS_SUCCESS:
      ({ route, seats } = action.payload);
      return {
        ...state,
        coaches: { ...state.coaches, [route]: seats },
        isLoading: false,
      };
    case GET_SEATS_FAILURE:
      error = action.payload.error;
      return { ...state, isLoading: false, error };
    default:
      return state;
  }
}
