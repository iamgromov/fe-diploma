import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef } from "react";

import Aside from "../../components/Aside";
import {
  availableSeatsTotal,
  randomSeat,
  randomSeatPrice,
  totalAdultPassengersAmount,
  totalChildPassengersAmount,
  totalOrderSeatsAmount,
  totalSeats,
} from "../../store/selectors";
import config from "../../app/api";
import { addSeat } from "../../store/actions/actionCreators";
import Passenger from "../../components/passengers/Passenger";
import { scrollTo } from "../../helpers/scrollTo";
import "./Passengers.css";

function PassengersPage() {
  const dispatch = useDispatch();
  const section = useRef(null);
  const navigate = useNavigate();
  const { item } = useSelector((state) => state.seats);
  const totalSeatsItems = useSelector(totalSeats);
  const departureSeats = useSelector(
    (state) => state.passengers.departure.seats
  );
  const arrivalSeats = useSelector((state) => state.passengers.arrival.seats);
  const totalAdultPassengers = useSelector(totalAdultPassengersAmount);
  const totalChildPassengers = useSelector(totalChildPassengersAmount);
  const totalOrderSeats = useSelector(totalOrderSeatsAmount);
  const availableSeats = useSelector(availableSeatsTotal);
  const randomPassenger = useSelector(randomSeat);
  const randomPassengerPrice = useSelector(randomSeatPrice);

  useEffect(() => {
    if (
      (departureSeats.length === 0 && arrivalSeats.length === 0) ||
      item === ""
    ) {
      navigate("/");
    } else {
      scrollTo(section.current?.offsetTop, "smooth");
    }
  }, []);

  useEffect(() => {
    if (departureSeats.length === 0 && arrivalSeats.length === 0) {
      navigate("/");
    }
  }, [departureSeats, arrivalSeats]);

  const onAddPassengerClick = () => {
    const form = {
      coach_id: randomPassenger.coach_id,
      person_info: {
        is_adult: true,
        first_name: "",
        last_name: "",
        patronymic: "",
        limited_mobility: false,
        gender: true,
        birthday: "",
        document_type: "паспорт",
        document_serial: "",
        document_number: "",
        document_birth_certificate: "",
      },
      price: randomPassengerPrice,
      seat_number: randomPassenger.seat_number,
      is_child: false,
      include_children_seat: false,
    };

    dispatch(addSeat(form, "departure", "adultTicketsTotal"));
  };

  return (
    <section ref={section} className="dashboard passengers">
      <div className="container">
        <div className="dashboard__wrapper passengers__wrapper">
          {departureSeats.length === 0 ? "" : <Aside />}
          <div className="passengers__results">
            {departureSeats.length === 0 ? (
              ""
            ) : (
              <ul className="passengers__list">
                {departureSeats.map((item, index) => (
                  <Passenger
                    key={index}
                    item={item}
                    index={index + 1}
                    route="departure"
                  />
                ))}
                {arrivalSeats.length !== 0
                  ? arrivalSeats.map((item, index) => (
                      <Passenger
                        key={index}
                        item={item}
                        index={departureSeats.length + index + 1}
                        route="arrival"
                      />
                    ))
                  : ""}
              </ul>
            )}
            {availableSeats.length !== 0 ? (
              <button
                className="passengers__add-btn"
                type="button"
                onClick={onAddPassengerClick}
              >
                Добавить пассажира
                <svg
                  width="19"
                  height="19"
                  viewBox="0 0 19 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.98836 1.50727L7.98836 7.98839L1.50724 7.98839C0.904343 7.98839 0.452171 8.44056 0.452171 9.04346C0.452171 9.64635 0.904343 10.0985 1.50724 10.0985L7.98836 10.0985L7.98836 16.5796C7.98836 17.1825 8.44053 17.6347 8.96807 17.5594L9.11879 17.5594C9.72169 17.5594 10.1739 17.1072 10.0985 16.5796L10.0985 10.0985L16.4289 10.0985C17.0318 10.0985 17.484 9.64635 17.484 9.04346C17.484 8.44056 17.0318 7.98839 16.4289 7.98839L10.0985 7.98839L10.0985 1.50727C10.0985 0.904371 9.64632 0.4522 9.11879 0.527562L8.96807 0.527561C8.36517 0.527561 7.913 0.979733 7.98836 1.50727Z"
                    fill="#FFA800"
                  />
                </svg>
              </button>
            ) : (
              ""
            )}
            <button
              className="btn next-btn passengers__next-btn"
              type="button"
              disabled={
                totalSeatsItems.find(
                  (item) => item.person_info.is_adult === true
                ) === undefined
                  ? true
                  : totalOrderSeats ===
                    totalAdultPassengers + totalChildPassengers
                  ? false
                  : true
              }
              onClick={() => navigate(config.paymentUrl)}
            >
              Далее
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PassengersPage;
