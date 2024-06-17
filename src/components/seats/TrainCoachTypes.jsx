import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getSeats } from "../../store/reducers/seatsReducer/getSeats";
import { resetRouteSeats } from "../../store/actions/actionCreators";

function TrainCoachTypes({ id, route, onCoachTypeClick, activeCoachType }) {
  const dispatch = useDispatch();
  const { have_wifi, have_air_conditioning, have_express } = useSelector(
    (state) => state.searchTickets.form
  );
  const types = [
    { class_type: "first", name: "Люкс" },
    { class_type: "second", name: "Купе" },
    { class_type: "third", name: "Плацкарт" },
    { class_type: "fourth", name: "Сидячее" },
  ];

  const params = {
    have_wifi,
    have_air_conditioning,
    have_express,
  };

  useEffect(() => {
    activeCoachType === "" && dispatch(resetRouteSeats(route));
    activeCoachType !== "" && dispatch(getSeats(route, id, params));
  }, [activeCoachType]);

  return (
    <div className="seats__coach-types">
      <h3 className="seats__coach-types-title">Тип вагона</h3>
      <ul className="seats__coach-types-list">
        {types.map((type, index) => (
          <li key={index} className="seats__coach-types-item">
            <button
              className={`seats__coach-types-button seats__coach-types-button_${
                type.class_type
              }${
                activeCoachType === type.class_type
                  ? " seats__coach-types-button--active"
                  : ""
              }`}
              type="button"
              onClick={() => onCoachTypeClick(type.class_type)}
            >
              {type.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TrainCoachTypes;
