import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Aside from "../../components/Aside";
import Order from "../../components/order/Order";
import "./Order.css";

function OrderPage() {
  const navigate = useNavigate();
  const { item } = useSelector((state) => state.seats);
  const { user } = useSelector((state) => state.order);
  const departurePassengers = useSelector(
    (state) => state.order.departure.seats
  );
  const arrivalPassengers = useSelector((state) => state.order.arrival.seats);

  const isOrderValid =
    (departurePassengers.length !== 0 || arrivalPassengers.length !== 0) &&
    item !== "" &&
    user.payment_method !== "";

  useEffect(() => {
    if (!isOrderValid) {
      navigate("/");
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <section className="dashboard order">
      <div className="container">
        <div className="dashboard__wrapper order__wrapper">
          {!isOrderValid ? "" : <Aside />}
          {!isOrderValid ? (
            ""
          ) : (
            <Order
              item={item}
              paymentMethod={user.payment_method}
              departurePassengers={departurePassengers}
              arrivalPassengers={arrivalPassengers}
            />
          )}
        </div>
      </div>
    </section>
  );
}

export default OrderPage;
