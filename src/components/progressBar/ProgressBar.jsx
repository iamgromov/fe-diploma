import { useLocation } from "react-router-dom";

import config from "../../app/api";
import "./progress.css";

function ProgressBar() {
  const { pathname } = useLocation();

  const isPassengersPage = pathname === config.passengersUrl;
  const isPaymentPage = pathname === config.paymentUrl;
  const isOrderPage = pathname === config.orderUrl;

  return (
    <div className="progress">
      <ul className="progress__list">
        <li className="progress__item progress__item--active">
          Билеты
          <div className="progress__triangle"></div>
          <div className="progress__triangle-border"></div>
        </li>
        <li
          className={`progress__item${
            isPassengersPage || isPaymentPage || isOrderPage
              ? " progress__item--active"
              : ""
          }`}
        >
          Пассажиры
          <div className="progress__triangle"></div>
          <div className="progress__triangle-border"></div>
        </li>
        <li
          className={`progress__item${
            isPaymentPage || isOrderPage ? " progress__item--active" : ""
          }`}
        >
          Оплата
          <div className="progress__triangle"></div>
          <div className="progress__triangle-border"></div>
        </li>
        <li
          className={`progress__item${
            isOrderPage ? " progress__item--active" : ""
          }`}
        >
          Проверка
        </li>
      </ul>
    </div>
  );
}

export default ProgressBar;
