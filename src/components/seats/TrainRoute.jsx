import { useState } from "react";
import { useSelector } from "react-redux";

import TrainInfo from "./TrainInfo";
import TrainTickets from "./TrainTickets";
import TrainCoachTypes from "./TrainCoachTypes";
import CoachList from "./CoachList";
import { totalDeparturePrice, totalArrivalPrice } from "../../store/selectors";

function TrainRoute({ item, coaches, route, onBackBtn }) {
  const { isLoading, error } = useSelector((state) => state.seats);
  const departurePrice = useSelector(totalDeparturePrice);
  const arrivalPrice = useSelector(totalArrivalPrice);
  const [activeCoachType, setActiveCoachType] = useState("");

  const onCoachTypeClick = (type) => {
    if (type === activeCoachType) {
      setActiveCoachType("");
      return;
    }

    setActiveCoachType(type);
  };

  return (
    <div className={`seats__train-route seats__train-route_${route}`}>
      <div className="seats__train-back-wrapper">
        {route === "arrival" ? (
          <svg
            className="seats__train-back-svg"
            width="76"
            height="60"
            viewBox="0 0 76 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M71 0C73.7612 0 76 2.23877 76 5V55C76 57.7612 73.7612 60 71 60H5C2.23877 60 0 57.7612 0 55V5C0 2.23877 2.23877 0 5 0H71ZM33.6372 32.8237V40C30.0566 36.6445 26.4414 33.2559 23 30.0664C26.4761 26.7773 30.0566 23.3887 33.6719 20V27.5747H53V32.8237H33.6372Z"
              fill="#FFA800"
            />
          </svg>
        ) : (
          <svg
            className="seats__train-back-svg"
            width="76"
            height="60"
            viewBox="0 0 76 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M5 0C2.23877 0 0 2.23877 0 5V55C0 57.7612 2.23877 60 5 60H71C73.7612 60 76 57.7612 76 55V5C76 2.23877 73.7612 0 71 0H5ZM42.3628 32.8237V40C45.9434 36.6445 49.5586 33.2559 53 30.0664C49.5239 26.7773 45.9434 23.3887 42.3281 20V27.5747H23V32.8237H42.3628Z"
              fill="#FFA800"
            />
          </svg>
        )}
        <button
          className="secondary-btn seats__train-back-btn"
          type="button"
          onClick={onBackBtn}
        >
          Выбрать другой поезд
        </button>
      </div>
      <TrainInfo item={item} route={route} />
      <TrainTickets route={route} />
      <TrainCoachTypes
        id={item[route]._id}
        route={route}
        onCoachTypeClick={onCoachTypeClick}
        activeCoachType={activeCoachType}
      />
      {isLoading ? (
        <div className="seats__loading-wrapper">Загрузка...</div>
      ) : error ? (
        <div className="seats__error-wrapper">Что-то пошло не так.</div>
      ) : coaches.filter((el) => el.coach.class_type === activeCoachType)
          .length !== 0 ? (
        <CoachList
          items={coaches}
          activeCoachType={activeCoachType}
          route={route}
        />
      ) : (
        ""
      )}
      {activeCoachType === "" ? (
        ""
      ) : (route === "departure" && departurePrice !== 0) ||
        (route === "arrival" && arrivalPrice !== 0) ? (
        <div className="seats__coach-total-wrapper">
          {route === "departure" ? departurePrice : arrivalPrice}
          <span className="seats__coach-total-symbol"> ₽</span>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default TrainRoute;
