import { useState } from "react";

import PassengerCollapse from "./PassengerCollapse";
import PassengerForm from "./PassengerForm";

function Passenger(props) {
  const [isSuccessShown, setIsSuccessShown] = useState(false);
  const { item, index, route } = props;

  return (
    <li className="passengers__item passenger">
      <PassengerCollapse
        isSuccessShown={isSuccessShown}
        isExpanded={false}
        index={index}
        route={route}
        seatNumber={item.seat_number}
        coachId={item.coach_id}
        isChild={item.is_child}
      >
        <PassengerForm
          {...props}
          isSuccessShown={isSuccessShown}
          setIsSuccessShown={setIsSuccessShown}
        />
      </PassengerCollapse>
    </li>
  );
}

export default Passenger;
