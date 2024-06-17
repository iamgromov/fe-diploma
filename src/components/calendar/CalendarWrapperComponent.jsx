import { forwardRef } from "react";

import "./calendar.css";

const CalendarWrapperComponent = forwardRef((props, ref) => (
  <div ref={ref} className="react-calendar-wrapper">
    {props.children}
  </div>
));

CalendarWrapperComponent.displayName = "CalendarWrapperComponent";

export default CalendarWrapperComponent;
