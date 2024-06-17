import { configureStore } from "@reduxjs/toolkit";
import { combineEpics, createEpicMiddleware } from "redux-observable";
import { combineReducers } from "redux";
import { thunk } from "redux-thunk";
import { loadingBarReducer } from "react-redux-loading-bar";

import searchTicketsReducer from "./reducers/searchTicketsReducer/searchTicketsReducer";
import filterTicketsReducer from "./reducers/filterTicketsReducer/filterTicketsReducer";
import passengersReducer from "./reducers/passengersReducer/passengersReducer";
import seatsReduser from "./reducers/seatsReducer/seatsReducer";
import orderReducer from "./reducers/orderReducer/orderReducer";
import {
  updateRouteToValue,
  updateRouteFromValue,
  searchCitiesFromEpic,
  searchCitiesToEpic,
} from "./reducers/searchTicketsReducer/searchTicketsEpics";

const reducer = combineReducers({
  searchTickets: searchTicketsReducer,
  filterTickets: filterTicketsReducer,
  seats: seatsReduser,
  order: orderReducer,
  loadingBar: loadingBarReducer,
  passengers: passengersReducer,
});

const epic = combineEpics(
  searchCitiesFromEpic,
  searchCitiesToEpic,
  updateRouteFromValue,
  updateRouteToValue
);

const epicMiddleware = createEpicMiddleware();

export const store = configureStore({
  reducer: reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([thunk, epicMiddleware]),
});

epicMiddleware.run(epic);
