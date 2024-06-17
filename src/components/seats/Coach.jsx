import { useState } from "react";

import Seats from "./Seats";
import ServiceItem from "./ServiceItem";

function Coach(props) {
  const { item } = props;

  const [service, setService] = useState({
    express: false,
    wifi: false,
    linens: item.coach.is_linens_included,
    conditioning: false,
  });
  const serviceList = [
    {
      type: "conditioning",
      tooltip: "кондиционер",
      included: item.coach.have_air_conditioning,
    },
    { type: "express", tooltip: "экспресс", included: item.coach.have_express },
    { type: "wifi", tooltip: "WiFi", included: item.coach.have_wifi },
    {
      type: "linens",
      tooltip: "постельное белье",
      included: item.coach.is_linens_included,
    },
  ];

  const onClick = (service, value) => {
    setService((prevService) => ({ ...prevService, [service]: !value }));
  };

  return (
    <li className="seats__coach">
      <div className="seats__coach-details">
        <div className="seats__coach-info">
          <div className="seats__coach-info-name">
            <span className="seats__coach-details-name-number">
              {item.coach.name.slice(-2)}
            </span>
            вагон
          </div>
          <div className="seats__coach-info-more">
            <div className="seats__coach-amount-block">
              <span className="seats__coach-seats-amount seats__coach-seats-amount_total">
                Места{" "}
                <span>
                  {item.seats.length <= 0 ? 0 : item.coach.available_seats}
                </span>
              </span>
              {item.coach.class_type !== "fourth" &&
              item.coach.class_type !== "first" ? (
                <span className="seats__coach-seats-amount">
                  Верхние{" "}
                  <span>
                    {item.seats.filter((el) => el.index % 2 === 0).length}
                  </span>
                </span>
              ) : (
                ""
              )}
              {item.coach.class_type !== "fourth" &&
              item.coach.class_type !== "first" ? (
                <span className="seats__coach-seats-amount">
                  Нижние{" "}
                  <span>
                    {item.seats.filter((el) => el.index % 2 !== 0).length}
                  </span>
                </span>
              ) : (
                ""
              )}
              {item.coach.class_type === "third" ? (
                <span className="seats__coach-seats-amount">
                  Боковые{" "}
                  <span>{item.seats.filter((el) => el.index > 32).length}</span>
                </span>
              ) : (
                ""
              )}
            </div>
            <div className="seats__coach-price">
              <span className="seats__coach-seats-price-text">Стоимость</span>
              {item.coach.class_type !== "fourth" &&
              item.coach.class_type !== "first" ? (
                <span className="seats__coach-seats-price-number">
                  {item.coach.top_price}
                  <span> ₽</span>
                </span>
              ) : (
                ""
              )}
              {item.coach.class_type !== "fourth" &&
              item.coach.class_type !== "first" ? (
                <span className="seats__coach-seats-price-number">
                  {item.coach.bottom_price}
                  <span> ₽</span>
                </span>
              ) : (
                ""
              )}
              {item.coach.class_type === "fourth" ||
              item.coach.class_type === "first" ? (
                <span className="seats__coach-seats-price-number">
                  {item.coach.price}
                  <span> ₽</span>
                </span>
              ) : (
                ""
              )}
              {item.coach.class_type === "third" ? (
                <span className="seats__coach-seats-price-number">
                  {item.coach.side_price}
                  <span> ₽</span>
                </span>
              ) : (
                ""
              )}
            </div>
            <div className="seats__coach-service">
              <div className="seats__coach-service-name">
                <span className="seats__coach-seats-service-text">
                  Обслуживание
                </span>
                <span className="seats__coach-seats-service-text seats__coach-seats-service-text_abbr">
                  фпк
                </span>
              </div>
              <ul className="seats__coach-service-list">
                {serviceList.map((item, index) => (
                  <ServiceItem
                    key={index}
                    item={item}
                    service={service}
                    onClick={onClick}
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="seats__coach-demand-wrapper">
          <p className="seats__coach-demand">
            {item.seats.filter((el) => el.available === false).length} человек
            выбирают места в этом поезде
          </p>
        </div>
        {item.seats.length === 0 ? (
          <div className="seats__coach-no-seats">
            У этого вагона нет свободных мест!
          </div>
        ) : (
          <Seats
            {...props}
            isLinensIncluded={service.linens}
            isWifiIncluded={service.wifi}
            service={service}
          />
        )}
      </div>
    </li>
  );
}

export default Coach;
