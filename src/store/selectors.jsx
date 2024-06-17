import { createSelector } from "@reduxjs/toolkit";

const search = (state) => state.searchTickets;
const filter = (state) => state.filterTickets;
const passengers = (state) => state.passengers;

const totalCount = (state) => filter(state).totalCount;
const limit = (state) => search(state).form.limit;

export const departureItems = (state) => passengers(state).departure.seats;
export const arrivalItems = (state) => passengers(state).arrival.seats;

export const departureAdultPassengers = (state) =>
  passengers(state).departure.adultTicketsTotal;
export const arrivalAdultPassengers = (state) =>
  passengers(state).arrival.adultTicketsTotal;

export const departureChildPassengers = (state) =>
  passengers(state).departure.childTicketsTotal;
export const arrivalChildPassengers = (state) =>
  passengers(state).arrival.childTicketsTotal;

const order = (state) => state.order;
const orderDeparureSeats = (state) => order(state).departure.seats;
const orderArrivalSeats = (state) => order(state).arrival.seats;

const seats = (state) => state.seats;
const departureCoaches = (state) => seats(state).coaches.departure;
const arrivalCoaches = (state) => seats(state).coaches.arrival;

export const totalSeats = createSelector(
  [departureItems, arrivalItems],
  (departureItems, arrivalItems) => [...departureItems, ...arrivalItems]
);

export const totalPagesSum = createSelector(
  [totalCount, limit],
  (total, limit) => Math.ceil(total / limit)
);

export const totalDeparturePrice = createSelector(departureItems, (items) =>
  items.reduce((acc, item) => {
    const { price } = item;
    return acc + price;
  }, 0)
);

export const totalArrivalPrice = createSelector(arrivalItems, (items) =>
  items.reduce((acc, item) => {
    const { price } = item;
    return acc + price;
  }, 0)
);

export const totalAdultPassengersAmount = createSelector(
  [departureAdultPassengers, arrivalAdultPassengers],
  (departurePassengers, arrivalPassengers) =>
    departurePassengers + arrivalPassengers
);

export const totalChildPassengersAmount = createSelector(
  [departureChildPassengers, arrivalChildPassengers],
  (departurePassengers, arrivalPassengers) =>
    departurePassengers + arrivalPassengers
);

export const totalAdultPassengersPrice = createSelector(
  [departureItems, arrivalItems],
  (departureItems, arrivalItems) =>
    [...departureItems, ...arrivalItems]
      .filter((item) => item.is_child === false)
      .reduce((acc, item) => {
        const { price } = item;
        return acc + price;
      }, 0)
);

export const totalChildPassengersPrice = createSelector(
  [departureItems, arrivalItems],
  (departureItems, arrivalItems) =>
    [...departureItems, ...arrivalItems]
      .filter((item) => item.is_child)
      .reduce((acc, item) => {
        const { price } = item;
        return acc + price;
      }, 0)
);

export const totalOrderSeatsAmount = createSelector(
  [orderDeparureSeats, orderArrivalSeats],
  (deparureSeats, arrivalSeats) => deparureSeats.length + arrivalSeats.length
);

export const availableSeatsTotal = createSelector(
  [departureCoaches, arrivalCoaches, departureItems, arrivalItems],
  (
    departureCoaches,
    arrivalCoaches,
    departurePassengers,
    arrivalPassengers
  ) => {
    const availableDepartureSeats = departureCoaches.map((item) =>
      item.seats.map((seat) => ({
        seat_number: seat.index,
        coach_id: item.coach._id,
      }))
    );
    const availableArrivalSeats = arrivalCoaches.map((item) =>
      item.seats.map((seat) => ({
        seat_number: seat.index,
        coach_id: item.coach._id,
      }))
    );
    const initialAvailableSeats = [
      ...availableDepartureSeats,
      ...availableArrivalSeats,
    ].reduce((acc, curr) => acc.concat(curr), []);

    const takenDepartureSeats = departurePassengers.map((item) => ({
      seat_number: item.seat_number,
      coach_id: item.coach_id,
    }));
    const takenArrivalSeats = arrivalPassengers.map((item) => ({
      coach_id: item.coach_id,
      seat_number: item.seat_number,
    }));
    const takenSeats = [...takenDepartureSeats, ...takenArrivalSeats].reduce(
      (acc, curr) => acc.concat(curr),
      []
    );

    const availableSeats = initialAvailableSeats.filter(
      (item) =>
        !takenSeats.some(
          (taken) =>
            taken.seat_number === item.seat_number &&
            taken.coach_id === item.coach_id
        )
    );

    return availableSeats;
  }
);

export const departureOrderChildNoSeatAmount = createSelector(
  orderDeparureSeats,
  (deparureSeats) =>
    deparureSeats.filter((item) => item.include_children_seat).length
);

export const arrivalOrderChildNoSeatAmount = createSelector(
  orderArrivalSeats,
  (arrivalSeats) =>
    arrivalSeats.filter((item) => item.include_children_seat).length
);

export const randomSeat = createSelector(
  availableSeatsTotal,
  (availableSeats) =>
    availableSeats[Math.floor(Math.random() * availableSeats.length)]
);

export const randomSeatPrice = createSelector(
  [randomSeat, departureCoaches, arrivalCoaches],
  (randomSeat, departureCoaches, arrivalCoaches) => {
    const coaches = [...departureCoaches, ...arrivalCoaches];
    if (coaches.length === 0) {
      return 0;
    }

    const coach = coaches.find(
      (item) => item.coach._id === randomSeat.coach_id
    ).coach;

    const price =
      coach.class_type === "fourth" || coach.class_type === "first"
        ? coach.price
        : coach.class_type === "third" && randomSeat.seat_number > 32
        ? coach.side_price
        : randomSeat.seat_number % 2 === 0
        ? coach.top_price
        : coach.bottom_price;
    const wifiPrice = coach.have_wifi ? coach.wifi_price : 0;
    const linensPrice = coach.is_linens_included ? 0 : coach.linens_price;

    return price + wifiPrice + linensPrice;
  }
);
