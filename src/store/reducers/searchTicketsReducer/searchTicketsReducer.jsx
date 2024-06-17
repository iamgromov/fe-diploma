import {
  RESET_SEARCH_TICKETS,
  UPDATE_OFFSET,
  UPDATE_CURRENT_PAGE,
  UPDATE_LIMIT_VALUE,
  UPDATE_SORT_VALUE,
  UPDATE_SLIDER_VALUE,
  UPDATE_CHECKED_VALUE,
  SWAP_VALUES,
  UPDATE_ROUTE_FROM_VALUE,
  UPDATE_ROUTE_TO_VALUE,
  UPDATE_DATE_VALUE,
  SELECT_WHERE_FROM_CITY,
  SELECT_WHERE_TO_CITY,
  SEARCH_CITIES_FROM_REQUEST,
  SEARCH_CITIES_FROM_SUCCESS,
  SEARCH_CITIES_TO_REQUEST,
  SEARCH_CITIES_TO_SUCCESS,
  SEARCH_CITIES_FAILURE,
} from "../../actions/actionTypes";

const initialState = {
  cityFrom: "",
  cityTo: "",
  citiesTo: [],
  citiesFrom: [],
  form: {
    from_city_id: "",
    to_city_id: "",
    date_start: "",
    date_end: "",
    date_start_arrival: "",
    date_end_arrival: "",
    have_first_class: false,
    have_second_class: true,
    have_third_class: false,
    have_fourth_class: false,
    have_wifi: true,
    have_air_conditioning: false,
    have_express: false,
    price_from: 1920,
    price_to: 7000,
    start_departure_hour_from: 0,
    start_departure_hour_to: 1440,
    end_departure_hour_from: 0,
    end_departure_hour_to: 1440,
    start_arrival_hour_from: 0,
    start_arrival_hour_to: 1440,
    end_arrival_hour_from: 0,
    end_arrival_hour_to: 1440,
    sort: "date",
    limit: 5,
    offset: 0,
  },
  currentPage: 1,
  isLoading: false,
  error: null,
};

export default function searchTicketsReducer(state = initialState, action) {
  let offset,
    currentPage,
    limit,
    sort,
    name,
    value,
    min,
    minValue,
    max,
    maxValue,
    cityFrom,
    cityTo,
    nameDate,
    valueDate,
    nameFrom,
    cityIdFrom,
    nameTo,
    cityIdTo,
    citiesFrom,
    citiesTo,
    error;

  switch (action.type) {
    case RESET_SEARCH_TICKETS:
      return { ...initialState };
    case UPDATE_OFFSET:
      offset = action.payload.offset;
      return { ...state, form: { ...state.form, offset } };
    case UPDATE_CURRENT_PAGE:
      currentPage = action.payload.currentPage;
      return { ...state, currentPage };
    case UPDATE_LIMIT_VALUE:
      limit = action.payload.limit;
      return { ...state, form: { ...state.form, limit } };
    case UPDATE_SORT_VALUE:
      sort = action.payload.sort;
      return { ...state, form: { ...state.form, sort } };
    case UPDATE_CHECKED_VALUE:
      ({ name, value } = action.payload);
      return { ...state, form: { ...state.form, [name]: value } };
    case UPDATE_SLIDER_VALUE:
      ({ min, minValue, max, maxValue } = action.payload);
      return {
        ...state,
        form: { ...state.form, [min]: minValue, [max]: maxValue },
      };
    case SWAP_VALUES:
      return {
        ...state,
        form: {
          ...state.form,
          date_start: state.form.date_end,
          date_end: state.form.date_start,
          from_city_id: state.form.to_city_id,
          to_city_id: state.form.from_city_id,
        },
        cityFrom: state.cityTo,
        cityTo: state.cityFrom,
      };
    case UPDATE_ROUTE_FROM_VALUE:
      cityFrom = action.payload.cityFrom;
      return { ...state, cityFrom };
    case UPDATE_ROUTE_TO_VALUE:
      cityTo = action.payload.cityTo;
      return { ...state, cityTo };
    case UPDATE_DATE_VALUE:
      ({ nameDate, valueDate } = action.payload);
      return { ...state, form: { ...state.form, [nameDate]: valueDate } };
    case SELECT_WHERE_FROM_CITY:
      ({ nameFrom, cityIdFrom } = action.payload);
      return {
        ...state,
        form: { ...state.form, from_city_id: cityIdFrom },
        cityFrom: nameFrom,
      };
    case SELECT_WHERE_TO_CITY:
      ({ nameTo, cityIdTo } = action.payload);
      return {
        ...state,
        form: { ...state.form, to_city_id: cityIdTo },
        cityTo: nameTo,
      };
    case SEARCH_CITIES_FROM_REQUEST:
      return { ...state, citiesFrom: [], isLoading: true, error: null };
    case SEARCH_CITIES_FROM_SUCCESS:
      citiesFrom = action.payload.citiesFrom;
      return { ...state, citiesFrom, isLoading: false, error: null };
    case SEARCH_CITIES_TO_REQUEST:
      return { ...state, citiesTo: [], isLoading: true, error: null };
    case SEARCH_CITIES_TO_SUCCESS:
      citiesTo = action.payload.citiesTo;
      return { ...state, citiesTo, isLoading: false, error: null };
    case SEARCH_CITIES_FAILURE:
      error = action.payload.error;
      return { ...state, isLoading: false, error };
    default:
      return state;
  }
}
