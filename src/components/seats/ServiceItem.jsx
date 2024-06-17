import { useState } from "react";

import ServiceWifi from "../../assets/img/svg/service-wifi.svg?react";
import ServiceConditioning from "../../assets/img/svg/service-conditioning.svg?react";
import ServiceLinens from "../../assets/img/svg/service-linen.svg?react";
import ServiceExpress from "../../assets/img/svg/service-express.svg?react";

function ServiceItem({ item, service, onClick }) {
  const [isTooltipShown, setIsTooltipShown] = useState(false);

  return (
    <li className="seats__coach-service-item">
      <button
        className={`seats__coach-service-btn${
          service[item.type] ? " seats__coach-service-btn--active" : ""
        }`}
        disabled={item.included && item.type === "linens" ? true : false}
        type="button"
        onClick={() => onClick(item.type, service[item.type])}
        onMouseEnter={() => setIsTooltipShown(true)}
        onMouseLeave={() => setIsTooltipShown(false)}
      >
        {item.type === "wifi" ? (
          <ServiceWifi />
        ) : item.type === "express" ? (
          <ServiceExpress />
        ) : item.type === "conditioning" ? (
          <ServiceConditioning />
        ) : (
          <ServiceLinens />
        )}
      </button>
      {isTooltipShown ? (
        <div className="seats__coach-service-tooltip">
          <span className="seats__coach-service-tooltip-text">
            {item.tooltip}
          </span>
        </div>
      ) : (
        ""
      )}
    </li>
  );
}

export default ServiceItem;
