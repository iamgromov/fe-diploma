import { useState } from "react";
import { useDispatch } from "react-redux";

import CollapseExpanded from "../../assets/img/svg/passenger-collapse-expanded.svg?react";
import CollapseNotExpanded from "../../assets/img/svg/passenger-collapse-not-expanded.svg?react";
import {
  removeOrderSeat,
  removeSeat,
} from "../../store/actions/actionCreators";

function PassengerCollapse(props) {
  const dispatch = useDispatch();
  const {
    isExpanded,
    index,
    route,
    seatNumber,
    coachId,
    isChild,
    isSuccessShown,
  } = props;
  const [collapse, setCollapse] = useState(isExpanded);

  const onRemoveSeatClick = () => {
    if (isSuccessShown === true) {
      dispatch(removeOrderSeat(seatNumber, route, coachId));
    }

    dispatch(
      removeSeat(
        seatNumber,
        route,
        coachId,
        isChild === true ? "childTicketsTotal" : "adultTicketsTotal"
      )
    );
  };

  return (
    <div className="passenger__collapse">
      <button
        className="passenger__collapse-btn"
        type="button"
        onClick={() => setCollapse((prev) => !prev)}
      >
        {collapse ? <CollapseExpanded /> : <CollapseNotExpanded />}
        <h3 className="passenger__collapse-title">Пассажир {index}</h3>
      </button>
      <div
        className={`passenger__collapse-container${
          collapse ? " passenger__collapse-container--expanded" : ""
        }`}
      >
        {props.children}
      </div>
      {collapse ? (
        <button
          className="passenger__remove-btn"
          type="button"
          onClick={onRemoveSeatClick}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.3 0.3L6 4.6L1.7 0.3C1.3 -0.1 0.7 -0.1 0.3 0.3C-0.1 0.7 -0.1 1.3 0.3 1.7L4.6 6L0.3 10.3C-0.1 10.7 -0.1 11.3 0.3 11.6L0.4 11.7C0.8 12.1 1.4 12.1 1.7 11.7L6 7.4L10.2 11.6C10.6 12 11.2 12 11.6 11.6C12 11.2 12 10.6 11.6 10.2L7.4 6L11.7 1.7C12.1 1.3 12.1 0.7 11.7 0.4L11.6 0.3C11.2 -0.1 10.6 -0.1 10.3 0.3Z"
              fill="#928F94"
            />
          </svg>
        </button>
      ) : (
        ""
      )}
    </div>
  );
}

export default PassengerCollapse;
