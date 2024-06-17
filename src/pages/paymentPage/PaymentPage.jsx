import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import PaymentForm from "../../components/payment/PaymentForm";
import Aside from "../../components/Aside";
import { scrollTo } from "../../helpers/scrollTo";
import "./Payment.css";

function PaymentPage() {
  const navigate = useNavigate();
  const section = useRef(null);
  const departureSeats = useSelector((state) => state.order.departure.seats);
  const arrivalSeats = useSelector((state) => state.order.arrival.seats);

  useEffect(() => {
    if (departureSeats.length === 0 && arrivalSeats.length === 0) {
      navigate("/");
    }
    (departureSeats.length !== 0 || arrivalSeats.length !== 0) &&
      scrollTo(section.current?.offsetTop, "smooth");
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <section ref={section} className="dashboard payment">
      <div className="container">
        <div className="dashboard__wrapper payment__wrapper">
          {departureSeats.length === 0 ? "" : <Aside />}
          <PaymentForm />
        </div>
      </div>
    </section>
  );
}

export default PaymentPage;
