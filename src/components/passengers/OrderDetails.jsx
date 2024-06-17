import { useSelector } from "react-redux";

import {
  totalDeparturePrice,
  totalArrivalPrice,
  totalAdultPassengersAmount,
  totalChildPassengersAmount,
  totalChildPassengersPrice,
  totalAdultPassengersPrice,
} from "../../store/selectors";
import OrderDetailsCollapse from "./OrderDetailsCollapse";
import OrderDetailsRoute from "./OrderDetailsRoute";
import { getDate } from "../../helpers/getDate";

function OrderDetails() {
  const { item } = useSelector((state) => state.seats);
  const totalAdultPassengers = useSelector(totalAdultPassengersAmount);
  const totalChildPassengers = useSelector(totalChildPassengersAmount);
  const childPassengersPrice = useSelector(totalChildPassengersPrice);
  const adultPassengersPrice = useSelector(totalAdultPassengersPrice);
  const departurePrice = useSelector(totalDeparturePrice);
  const arrivalPrice = useSelector(totalArrivalPrice);

  return (
    <div className="order-details">
      <h3 className="order-details__block order-details__title">
        Детали поездки
      </h3>
      <OrderDetailsCollapse
        collapsedLabel="Туда"
        isExpanded={true}
        date={getDate(item.departure.from.datetime)}
      >
        <OrderDetailsRoute item={item} route="departure" />
      </OrderDetailsCollapse>
      {item.arrival ? (
        <OrderDetailsCollapse
          collapsedLabel="Обратно"
          isExpanded={true}
          date={getDate(item.arrival.from.datetime)}
        >
          <OrderDetailsRoute item={item} route="arrival" />
        </OrderDetailsCollapse>
      ) : (
        ""
      )}
      <OrderDetailsCollapse collapsedLabel="Пассажиры" isExpanded={true}>
        <div className="order-details__passengers">
          <span className="order-details__name order-details__passengers_total">
            {totalAdultPassengers} Взрослых
          </span>
          <span className="order-details__value order-details__passengers-price">
            {adultPassengersPrice}
            <span className="order-details__passengers-price-symbol"> ₽</span>
          </span>
        </div>
        {totalChildPassengers !== 0 ? (
          <div className="order-details__passengers">
            <span className="order-details__name order-details__passengers_total">
              {totalChildPassengers} Ребенок
            </span>
            <span className="order-details__value order-details__passengers-price">
              {childPassengersPrice}
              <span className="order-details__passengers-price-symbol"> ₽</span>
            </span>
          </div>
        ) : (
          ""
        )}
      </OrderDetailsCollapse>
      <div className="order-details__block order-details__price">
        <span className="order-details__price-text">Итог</span>
        <span className="order-details__price-number">
          {departurePrice + arrivalPrice}
          <span className="order-details__price-symbol"> ₽</span>
        </span>
      </div>
    </div>
  );
}

export default OrderDetails;
