import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  addSeat,
  removeSeat,
  updatePassengersPrice,
} from "../../store/actions/actionCreators";

function Seat({ item, route, coachId, price, service, couchClass }) {
  const dispatch = useDispatch();
  const { activeTicketType } = useSelector((state) => state.seats);
  const { adultTicketsTotal, childTicketsTotal } = useSelector(
    (state) => state.passengers[route]
  );
  const { seats } = useSelector((state) => state.passengers[route]);

  useEffect(() => {
    dispatch(updatePassengersPrice(route, coachId, price));
  }, [service]);

  const onSeatClick = () => {
    if (
      seats.find(
        (el) => el.seat_number === item.index && el.coach_id === coachId
      )
    ) {
      if (
        (activeTicketType === "adult" && adultTicketsTotal <= 0) ||
        (activeTicketType === "child" && childTicketsTotal <= 0)
      ) {
        return;
      }

      dispatch(
        removeSeat(
          item.index,
          route,
          coachId,
          activeTicketType === "adult"
            ? "adultTicketsTotal"
            : "childTicketsTotal"
        )
      );
      return;
    }

    if (
      (activeTicketType === "adult" && adultTicketsTotal >= 5) ||
      (activeTicketType === "child" && childTicketsTotal >= 4)
    ) {
      return;
    }

    const form = {
      coach_id: coachId,
      person_info: {
        is_adult: activeTicketType === "adult" ? true : false,
        first_name: "",
        last_name: "",
        patronymic: "",
        limited_mobility: false,
        gender: true,
        birthday: "",
        document_type:
          activeTicketType === "adult" ? "паспорт" : "свидетельство о рождении",
        document_serial: "",
        document_number: "",
        document_birth_certificate: "",
      },
      seat_number: item.index,
      is_child: activeTicketType === "adult" ? false : true,
      include_children_seat: false,
      price: price,
    };

    dispatch(
      addSeat(
        form,
        route,
        activeTicketType === "adult" ? "adultTicketsTotal" : "childTicketsTotal"
      )
    );
  };

  return (
    <button
      className={`seats__coach-seats-btn${
        seats.find(
          (el) => el.seat_number === item.index && el.coach_id === coachId
        )
          ? " seats__coach-seats-btn--active"
          : ""
      }${
        (item.index === 1 && couchClass === "first") ||
        (item.index === 33 && couchClass === "fourth")
          ? " seats__coach-seats-btn_first"
          : ""
      }`}
      type="button"
      disabled={item.available === false ? true : false}
      onClick={onSeatClick}
    >
      {item.index}
    </button>
  );
}

export default Seat;
