import {
  UPDATE_PASSENGERS_PRICE,
  RESET_PASSENGERS,
  UPDATE_FORM_VALUE,
  UPDATE_NO_SEAT_CHILD_TOTAL,
  ADD_SEAT,
  REMOVE_SEAT,
} from "../../actions/actionTypes";

const initialState = {
  departure: {
    adultTicketsTotal: 0,
    childTicketsTotal: 0,
    childNoSeatTicketsTotal: 0,
    seats: [],
  },
  arrival: {
    adultTicketsTotal: 0,
    childTicketsTotal: 0,
    childNoSeatTicketsTotal: 0,
    seats: [],
  },
};

export default function passengersReducer(state = initialState, action) {
  let route, price, name, value, id, coachId, seat, typeTotal;

  switch (action.type) {
    case RESET_PASSENGERS:
      return { ...initialState };
    case UPDATE_PASSENGERS_PRICE:
      ({ route, coachId, price } = action.payload);
      return {
        ...state,
        [route]: {
          ...state[route],
          seats: state[route].seats.map((item) =>
            item.coach_id === coachId ? { ...item, price: price } : item
          ),
        },
      };
    case UPDATE_FORM_VALUE:
      ({ route, coachId, id, name, value } = action.payload.form);
      return {
        ...state,
        [route]: {
          ...state[route],
          seats: state[route].seats.map((item) =>
            item.seat_number === id && item.coach_id === coachId
              ? { ...item, person_info: { ...item.person_info, [name]: value } }
              : item
          ),
        },
      };
    case UPDATE_NO_SEAT_CHILD_TOTAL:
      ({ route, value } = action.payload);
      return {
        ...state,
        [route]: { ...state[route], childNoSeatTicketsTotal: value },
      };
    case REMOVE_SEAT:
      ({ id, route, coachId, typeTotal } = action.payload);
      return {
        ...state,
        [route]: {
          ...state[route],
          seats: state[route].seats.filter((item) =>
            item.seat_number === id && item.coach_id === coachId ? false : true
          ),
          [typeTotal]: state[route][typeTotal] - 1,
        },
      };
    case ADD_SEAT:
      ({ seat, route, typeTotal } = action.payload);
      return {
        ...state,
        [route]: {
          ...state[route],
          seats: [...state[route].seats, seat],
          [typeTotal]: state[route][typeTotal] + 1,
        },
      };
    default:
      return state;
  }
}
