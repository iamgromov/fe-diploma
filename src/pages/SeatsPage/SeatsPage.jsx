import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";

import TrainRoute from "../../components/seats/TrainRoute";
import Aside from "../../components/Aside";
import config from "../../app/api";
import { totalAdultPassengersAmount } from "../../store/selectors";
import {
  resetPassengers,
  resetSeats,
} from "../../store/actions/actionCreators";
import { scrollTo } from "../../helpers/scrollTo";
import "./Seats.css";

function SeatsPage() {
  const dispatch = useDispatch();
  const { departure, arrival } = useSelector((state) => state.seats.coaches);
  const { item } = useSelector((state) => state.seats);
  const { seats } = useSelector((state) => state.passengers.departure);
  const navigate = useNavigate();
  const { route_direction_id } = useSelector((state) => state.order.departure);
  const { from_city_id, to_city_id } = useSelector(
    (state) => state.searchTickets.form
  );
  const totalAdultPassengers = useSelector(totalAdultPassengersAmount);
  const section = useRef(null);

  const isFormValid = from_city_id !== "" && to_city_id !== "";

  useEffect(() => {
    (route_direction_id === "" || !isFormValid) && navigate("/");
    scrollTo(section.current?.offsetTop, "smooth");
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const onNextClick = () => {
    navigate(config.passengersUrl);
  };

  const onBackBtn = () => {
    navigate(-1);
    dispatch(resetSeats());
    dispatch(resetPassengers());
  };

  return (
    <section ref={section} className="dashboard seats">
      <div className="container">
        <div className="dashboard__wrapper seats__wrapper">
          {route_direction_id === "" || !isFormValid ? "" : <Aside />}
          <div className="seats__results">
            <h2 className="seats__title">Выбор мест</h2>
            {departure !== 0 && item !== "" ? (
              <div className="seats__train">
                <TrainRoute
                  item={item}
                  coaches={departure}
                  route="departure"
                  onBackBtn={onBackBtn}
                />
                {item.arrival ? (
                  <TrainRoute
                    item={item}
                    coaches={arrival}
                    route="arrival"
                    onBackBtn={onBackBtn}
                  />
                ) : (
                  ""
                )}
              </div>
            ) : (
              ""
            )}
            <button
              className="btn next-btn seats__next-btn"
              type="button"
              disabled={
                seats.length !== 0 && totalAdultPassengers ? false : true
              }
              onClick={onNextClick}
            >
              Далее
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SeatsPage;
