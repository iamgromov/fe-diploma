import { ofType } from "redux-observable";
import { ajax } from "rxjs/ajax";
import {
  map,
  switchMap,
  retry,
  catchError,
  filter,
  debounceTime,
} from "rxjs/operators";
import { of } from "rxjs";

import {
  UPDATE_ROUTE_FROM_VALUE,
  UPDATE_ROUTE_TO_VALUE,
  SEARCH_CITIES_TO_REQUEST,
  SEARCH_CITIES_FROM_REQUEST,
} from "../../actions/actionTypes";
import {
  searchCitiesFailure,
  searchCitiesToRequest,
  searchCitiesFromRequest,
  searchCitiesFromSuccess,
  searchCitiesToSuccess,
} from "../../actions/actionCreators";

export const updateRouteFromValue = (action$) =>
  action$.pipe(
    ofType(UPDATE_ROUTE_FROM_VALUE),
    map((o) => o.payload.cityFrom.trim()),
    filter((o) => o !== ""),
    debounceTime(100),
    map((o) => searchCitiesFromRequest(o))
  );

export const updateRouteToValue = (action$) =>
  action$.pipe(
    ofType(UPDATE_ROUTE_TO_VALUE),
    map((o) => o.payload.cityTo.trim()),
    filter((o) => o !== ""),
    debounceTime(100),
    map((o) => searchCitiesToRequest(o))
  );

export const searchCitiesFromEpic = (action$) =>
  action$.pipe(
    ofType(SEARCH_CITIES_FROM_REQUEST),
    map((o) => o.payload.search),
    map((o) => new URLSearchParams({ name: o })),
    debounceTime(300),
    switchMap((o) =>
      ajax
        .getJSON(
          import.meta.env.VITE_APP_URL +
            import.meta.env.VITE_SEARCH_CITIES_REQ +
            o
        )
        .pipe(
          retry(3),
          map((o) => searchCitiesFromSuccess(o)),
          catchError((e) => of(searchCitiesFailure(e)))
        )
    )
  );

export const searchCitiesToEpic = (action$) =>
  action$.pipe(
    ofType(SEARCH_CITIES_TO_REQUEST),
    map((o) => o.payload.search),
    map((o) => new URLSearchParams({ name: o })),
    debounceTime(300),
    switchMap((o) =>
      ajax
        .getJSON(
          import.meta.env.VITE_APP_URL +
            import.meta.env.VITE_SEARCH_CITIES_REQ +
            o
        )
        .pipe(
          retry(3),
          map((o) => searchCitiesToSuccess(o)),
          catchError((e) => of(searchCitiesFailure(e)))
        )
    )
  );
