import Calendar from "react-calendar";
import moment from "moment";
import { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";

import { updateDateValue } from "../../store/actions/actionCreators";
import CalendarWrapperComponent from "../calendar/CalendarWrapperComponent";
import "react-calendar/dist/Calendar.css";

function HeroDate({ route, date }) {
  const dispatch = useDispatch();
  const [isCalendarShown, setIsCalendarShown] = useState(false);

  const calendar = useRef(null);

  const initialValue = new Date();
  const [value, onChange] = useState(initialValue);

  useEffect(() => {
    if (initialValue !== value) {
      const date = new moment(value);
      const name = route === "from" ? "date_start" : "date_end";
      dispatch(updateDateValue(name, date.format("YYYY-MM-DD")));
    }
  }, [value]); // eslint-disable-line react-hooks/exhaustive-deps

  const onClickOut = (e) => {
    if (isCalendarShown && !calendar.current?.contains(e.target)) {
      setIsCalendarShown(false);
    }
  };

  document.addEventListener("mousedown", onClickOut);

  return (
    <div className="hero__date-wrapper">
      <span
        className={`hero__input hero__input_date hero__input_date_from${
          date !== "" ? " hero__input_date--selected" : ""
        }`}
        onClick={() => setIsCalendarShown(!isCalendarShown)}
      >
        {date === "" ? "ДД/ММ/ГГ" : date}
      </span>
      {isCalendarShown ? (
        <CalendarWrapperComponent ref={calendar}>
          <Calendar
            onChange={onChange}
            value={value}
            onClickDay={() => setIsCalendarShown(false)}
            minDate={new Date()}
          />
        </CalendarWrapperComponent>
      ) : (
        ""
      )}
    </div>
  );
}

export default HeroDate;
