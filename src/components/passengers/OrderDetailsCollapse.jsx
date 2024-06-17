import { useState } from "react";

import CollapseExpanded from "../../assets/img/svg/collapse-expanded.svg?react";
import CollapseNotExpanded from "../../assets/img/svg/collapse-not-expanded.svg?react";

function OrderDetailsCollapse(props) {
  const { collapsedLabel, isExpanded, date } = props;
  const [collapse, setCollapse] = useState(isExpanded);

  return (
    <div
      className={`order-details__block order-details__collapse order-details__collapse_${
        collapsedLabel === "Туда"
          ? "departure"
          : collapsedLabel === "Обратно"
          ? "arrival"
          : "passengers"
      }`}
    >
      <button
        className="collapse-btn order-details__collapse-btn"
        type="button"
        onClick={() => setCollapse((prev) => !prev)}
      >
        <h3 className="order-details__collapse-title">{collapsedLabel}</h3>
        {date ? (
          <span className="order-details__collapse-date">{date}</span>
        ) : (
          ""
        )}
        {collapse ? <CollapseExpanded /> : <CollapseNotExpanded />}
      </button>
      <div
        className={`order-details__collapse-container${
          collapse ? " order-details__collapse-container--expanded" : ""
        }`}
      >
        {props.children}
      </div>
    </div>
  );
}

export default OrderDetailsCollapse;
