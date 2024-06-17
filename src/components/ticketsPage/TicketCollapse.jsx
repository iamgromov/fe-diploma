import { useState } from "react";

import CollapseExpanded from "../../assets/img/svg/collapse-expanded.svg?react";
import CollapseNotExpanded from "../../assets/img/svg/collapse-not-expanded.svg?react";

function TicketCollapse(props) {
  const { collapsedLabel, isExpanded } = props;
  const [collapse, setCollapse] = useState(isExpanded);

  return (
    <div className="tickets__collapse">
      <button
        className="collapse-btn tickets__collapse-btn"
        type="button"
        onClick={() => setCollapse((prev) => !prev)}
      >
        <h3 className="tickets__form-title">{collapsedLabel}</h3>
        {collapse ? <CollapseExpanded /> : <CollapseNotExpanded />}
      </button>
      <div
        className={`tickets__collapse-container${
          collapse ? " tickets__collapse-container--expanded" : ""
        }`}
      >
        {props.children}
      </div>
    </div>
  );
}

export default TicketCollapse;
