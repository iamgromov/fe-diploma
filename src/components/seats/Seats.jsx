import coachFirst from "../../assets/img/coach-first.png";
import coachSecond from "../../assets/img/coach-second.png";
import coachThird from "../../assets/img/coach-third.png";
import coachFourth from "../../assets/img/coach-fourth.png";
import SeatsFirstClassLayout from "./SeatsFirstClassLayout";
import SeatsSecondClassLayout from "./SeatsSecondClassLayout";
import SeatsThirdClassLayout from "./SeatsThirdClassLayout";
import SeatsFourthClassLayout from "./SeatsFourthClassLayout";

function Seats(props) {
  const { coach } = props.item;

  return (
    <div className="seats__coach-seats">
      <img
        src={
          coach.class_type === "first"
            ? coachFirst
            : coach.class_type === "second"
            ? coachSecond
            : coach.class_type === "third"
            ? coachThird
            : coachFourth
        }
        alt="Вагон"
        className="seats__coach-img"
      />
      <span className="seats__coach-seats-number">{coach.name.slice(-2)}</span>
      {coach.class_type === "first" ? (
        <SeatsFirstClassLayout {...props} />
      ) : coach.class_type === "second" ? (
        <SeatsSecondClassLayout {...props} />
      ) : coach.class_type === "third" ? (
        <SeatsThirdClassLayout {...props} />
      ) : (
        <SeatsFourthClassLayout {...props} />
      )}
    </div>
  );
}

export default Seats;
