import {
  UPDATE_PASSENGERS_PRICE,
  RESET_SEATS,
  RESET_SEARCH_TICKETS,
  RESET_PASSENGERS,
  RESET_ORDER,
  RESET_FILTER_TICKETS,
  ORDER_REQUEST,
  ORDER_SUCCESS,
  ORDER_FAILURE,
  UPDATE_ORDER_FORM_VALUE,
  REMOVE_ORDER_SEAT,
  ADD_ORDER_SEAT,
  UPDATE_FORM_VALUE,
  UPDATE_NO_SEAT_CHILD_TOTAL,
  UPDATE_ACTIVE_TICKET_TYPE,
  REMOVE_SEAT,
  ADD_SEAT,
  RESET_ROUTE_SEATS,
  UPDATE_OFFSET,
  UPDATE_CURRENT_PAGE,
  UPDATE_LIMIT_VALUE,
  UPDATE_SORT_VALUE,
  SELECT_TRAIN,
  GET_SEATS_REQUEST,
  GET_SEATS_SUCCESS,
  GET_SEATS_FAILURE,
  UPDATE_ROUTE,
  UPDATE_SLIDER_VALUE,
  UPDATE_CHECKED_VALUE,
  SWAP_VALUES,
  GET_LAST_TICKETS_REQUEST,
  GET_LAST_TICKETS_SUCCESS,
  GET_TICKETS_REQUEST,
  GET_TICKETS_SUCCESS,
  GET_TICKETS_FAILURE,
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
} from "./actionTypes";

export const updatePassengersPrice = (route, coachId, price) => ({
  type: UPDATE_PASSENGERS_PRICE,
  payload: { route, coachId, price },
});

export const resetSeats = () => ({
  type: RESET_SEATS,
});

export const resetSearchTickets = () => ({
  type: RESET_SEARCH_TICKETS,
});

export const resetPassengers = () => ({
  type: RESET_PASSENGERS,
});

export const resetOrder = () => ({
  type: RESET_ORDER,
});

export const resetFilterTickets = () => ({
  type: RESET_FILTER_TICKETS,
});

export const orderRequest = () => ({
  type: ORDER_REQUEST,
});

export const orderSuccess = () => ({
  type: ORDER_SUCCESS,
});

export const orderFailure = (error) => ({
  type: ORDER_FAILURE,
  payload: { error },
});

export const updateOrderFormValue = (formName, formValue) => ({
  type: UPDATE_ORDER_FORM_VALUE,
  payload: { formName, formValue },
});

export const removeOrderSeat = (id, route, coachId) => ({
  type: REMOVE_ORDER_SEAT,
  payload: { id, route, coachId },
});

export const addOrderSeat = (route, seat, isChildNoSeatIncluded) => ({
  type: ADD_ORDER_SEAT,
  payload: { route, seat, isChildNoSeatIncluded },
});

export const updateFormValue = (form) => ({
  type: UPDATE_FORM_VALUE,
  payload: { form },
});

export const updateNoSeatChildTotal = (route, value) => ({
  type: UPDATE_NO_SEAT_CHILD_TOTAL,
  payload: { route, value },
});

export const updateActiveTicketType = (type) => ({
  type: UPDATE_ACTIVE_TICKET_TYPE,
  payload: { type },
});

export const removeSeat = (id, route, coachId, typeTotal) => ({
  type: REMOVE_SEAT,
  payload: { id, route, coachId, typeTotal },
});

export const addSeat = (seat, route, typeTotal) => ({
  type: ADD_SEAT,
  payload: { seat, route, typeTotal },
});

export const getSeatsRequest = (route) => ({
  type: GET_SEATS_REQUEST,
  payload: { route },
});

export const getSeatsSuccess = (route, seats) => ({
  type: GET_SEATS_SUCCESS,
  payload: { route, seats },
});

export const getSeatsFailure = (error) => ({
  type: GET_SEATS_FAILURE,
  payload: { error },
});

export const resetRouteSeats = (route) => ({
  type: RESET_ROUTE_SEATS,
  payload: { route },
});

export const updateOffset = (offset) => ({
  type: UPDATE_OFFSET,
  payload: { offset },
});

export const updateCurrentPage = (currentPage) => ({
  type: UPDATE_CURRENT_PAGE,
  payload: { currentPage },
});

export const updateLimitValue = (limit) => ({
  type: UPDATE_LIMIT_VALUE,
  payload: { limit },
});

export const updateSortValue = (sort) => ({
  type: UPDATE_SORT_VALUE,
  payload: { sort },
});

export const selectTrain = (item) => ({
  type: SELECT_TRAIN,
  payload: { item },
});

export const updateRoute = (route, id) => ({
  type: UPDATE_ROUTE,
  payload: { route, id },
});

export const updateSliderValue = (min, minValue, max, maxValue) => ({
  type: UPDATE_SLIDER_VALUE,
  payload: { min, minValue, max, maxValue },
});

export const updateCheckedValue = (name, value) => ({
  type: UPDATE_CHECKED_VALUE,
  payload: { name, value },
});

export const getLastTicketsSuccess = (lastItems) => ({
  type: GET_LAST_TICKETS_SUCCESS,
  payload: { lastItems },
});

export const getTicketsSuccess = ({ totalCount, items }) => ({
  type: GET_TICKETS_SUCCESS,
  payload: { totalCount, items },
});

export const getLastTicketsRequest = () => ({
  type: GET_LAST_TICKETS_REQUEST,
});

export const getTicketsRequest = () => ({
  type: GET_TICKETS_REQUEST,
});

export const getTicketsFailure = (error) => ({
  type: GET_TICKETS_FAILURE,
  payload: { error },
});

export const swapValues = () => ({
  type: SWAP_VALUES,
});

export const updateDateValue = (nameDate, valueDate) => ({
  type: UPDATE_DATE_VALUE,
  payload: { nameDate, valueDate },
});

export const updateRouteFromValue = (cityFrom) => ({
  type: UPDATE_ROUTE_FROM_VALUE,
  payload: { cityFrom },
});

export const updateRouteToValue = (cityTo) => ({
  type: UPDATE_ROUTE_TO_VALUE,
  payload: { cityTo },
});

export const selectWhereFromCity = (nameFrom, cityIdFrom) => ({
  type: SELECT_WHERE_FROM_CITY,
  payload: { nameFrom, cityIdFrom },
});

export const selectWhereToCity = (nameTo, cityIdTo) => ({
  type: SELECT_WHERE_TO_CITY,
  payload: { nameTo, cityIdTo },
});

export const searchCitiesFromRequest = (search) => ({
  type: SEARCH_CITIES_FROM_REQUEST,
  payload: { search },
});

export const searchCitiesFromSuccess = (citiesFrom) => ({
  type: SEARCH_CITIES_FROM_SUCCESS,
  payload: { citiesFrom },
});

export const searchCitiesToRequest = (search) => ({
  type: SEARCH_CITIES_TO_REQUEST,
  payload: { search },
});

export const searchCitiesToSuccess = (citiesTo) => ({
  type: SEARCH_CITIES_TO_SUCCESS,
  payload: { citiesTo },
});

export const searchCitiesFailure = (error) => ({
  type: SEARCH_CITIES_FAILURE,
  payload: { error },
});
