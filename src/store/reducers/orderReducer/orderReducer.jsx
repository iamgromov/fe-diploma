import {
  RESET_ORDER,
  ORDER_REQUEST,
  ORDER_SUCCESS,
  ORDER_FAILURE,
  UPDATE_ORDER_FORM_VALUE,
  REMOVE_ORDER_SEAT,
  ADD_ORDER_SEAT,
  UPDATE_ROUTE,
} from "../../actions/actionTypes";

const initialState = {
  user: {
    first_name: "",
    last_name: "",
    patronymic: "",
    phone: "",
    email: "",
    payment_method: "",
  },
  departure: {
    route_direction_id: "",
    seats: [],
  },
  arrival: {
    route_direction_id: "",
    seats: [],
  },
  isLoading: false,
  error: null,
  success: false,
};

export default function orderReducer(state = initialState, action) {
  let error,
    formName,
    formValue,
    id,
    route,
    coachId,
    seat,
    isChildNoSeatIncluded;

  switch (action.type) {
    case RESET_ORDER:
      return { ...initialState };
    case ORDER_REQUEST:
      return { ...state, isLoading: true, error: null, success: false };
    case ORDER_SUCCESS:
      return { ...state, success: true, isLoading: false };
    case ORDER_FAILURE:
      error = action.payload.error;
      return { ...state, isLoading: false, error };
    case UPDATE_ORDER_FORM_VALUE:
      ({ formName, formValue } = action.payload);
      return { ...state, user: { ...state.user, [formName]: formValue } };
    case REMOVE_ORDER_SEAT:
      ({ id, route, coachId } = action.payload);
      return {
        ...state,
        [route]: {
          ...state[route],
          seats: state[route].seats.filter((item) =>
            item.seat_number === id && item.coach_id === coachId ? false : true
          ),
        },
      };
    case ADD_ORDER_SEAT:
      ({ route, seat, isChildNoSeatIncluded } = action.payload);
      return {
        ...state,
        [route]: {
          ...state[route],
          seats: [
            ...state[route].seats,
            { ...seat, include_children_seat: isChildNoSeatIncluded },
          ],
        },
      };
    case UPDATE_ROUTE:
      ({ route, id } = action.payload);
      return { ...state, [route]: { ...state[route], route_direction_id: id } };
    default:
      return state;
  }
}
