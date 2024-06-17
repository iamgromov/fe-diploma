import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  updateActiveTicketType,
  updateNoSeatChildTotal,
} from "../../store/actions/actionCreators";

function TrainTickets({ route }) {
  const dispatch = useDispatch();
  const { activeTicketType } = useSelector((state) => state.seats);
  const { childNoSeatTicketsTotal, adultTicketsTotal, childTicketsTotal } =
    useSelector((state) => state.passengers[route]);
  const [childNoSeatTotal, setChildNoSeatTotal] = useState(
    `Детских «без места» — ${childNoSeatTicketsTotal}`
  );
  const ticketTypes = [
    { name: "adult", is_child: false, text: "Взрослых" },
    { name: "child", is_child: true, text: "Детских" },
    { name: "childNoSeat", text: "Детских «без места»" },
  ];

  useEffect(() => {
    if (Number(childNoSeatTotal.slice(-1)) > adultTicketsTotal) {
      setChildNoSeatTotal(`Детских «без места» — ${adultTicketsTotal}`);
      dispatch(route, updateNoSeatChildTotal(adultTicketsTotal));
    }
  }, [adultTicketsTotal]);

  const onClick = (type) => {
    if (type === "childNoSeat" || activeTicketType === type) {
      return;
    }

    dispatch(updateActiveTicketType(type));
  };

  const onValueChange = (e, type) => {
    if (type !== "childNoSeat") {
      return;
    }

    const regExp = /^\d+$/;
    const valueText = e.target.value.slice(-1);

    setChildNoSeatTotal(
      `Детских «без места» — ${
        regExp.test(valueText) === false
          ? 0
          : valueText > adultTicketsTotal
          ? adultTicketsTotal
          : valueText === " "
          ? 0
          : valueText
      }`
    );
    dispatch(
      updateNoSeatChildTotal(
        route,
        regExp.test(valueText) === false
          ? 0
          : valueText > adultTicketsTotal
          ? adultTicketsTotal
          : valueText === " "
          ? 0
          : valueText
      )
    );
  };

  return (
    <div className="seats__tickets-amount">
      <h3 className="seats__tickets-amount-title">Количество билетов</h3>
      <ul className="seats__tickets-amount-list">
        {ticketTypes.map((type, index) => (
          <li
            key={index}
            className={`seats__tickets-amount-item${
              type.name === activeTicketType && type.name !== "childNoSeat"
                ? " seats__tickets-amount-item--active"
                : ""
            }`}
            onClick={() => onClick(type.name)}
          >
            <input
              className="seats__tickets-amount-input"
              name={type.name}
              type="text"
              onChange={(e) => onValueChange(e, type.name)}
              value={
                type.name === "childNoSeat"
                  ? childNoSeatTotal
                  : `${type.text} — ${
                      type.is_child === false
                        ? adultTicketsTotal
                        : type.is_child
                        ? childTicketsTotal
                        : childNoSeatTicketsTotal
                    }`
              }
              readOnly={type.name === "childNoSeat" ? false : true}
            />
            <p className="seats__tickets-amount-text">
              {type.name === "adult"
                ? `Можно добавить еще ${5 - adultTicketsTotal} пассажиров`
                : type.name === "child"
                ? `Можно добавить еще ${
                    4 - childTicketsTotal
                  } детей до 10 лет.Свое место в вагоне, как у взрослых, но дешевле в среднем на 50-65%`
                : ""}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TrainTickets;
