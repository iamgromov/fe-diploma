import Seat from "./Seat";
import { getSeatColumns } from "../../helpers/getSeatColumns";
import { getPrice } from "../../helpers/getPrice";

function SeatsSecondClassLayout(props) {
  const { route, isLinensIncluded, isWifiIncluded, service } = props;
  const { coach } = props.item;
  const { seats } = props.item;

  const seatsColumns = getSeatColumns(seats);

  const unavailableSeatsTotal = 32 - seats.length;
  const unavailableSeats = [];

  for (let i = 0; i < unavailableSeatsTotal; i++) {
    unavailableSeats.push({ index: seats.length + i + 1, available: false });
  }

  const unavailableSeatsColumns = getSeatColumns(unavailableSeats);

  return (
    <div className="seats__coach-seats-list seats__coach-seats-list_second">
      {seatsColumns.map((column, columnIndex) => (
        <div key={columnIndex} className="seats__coach-seats-column">
          {column.map((item, index) => (
            <Seat
              key={index}
              item={item}
              route={route}
              coachId={coach._id}
              price={getPrice(
                item.index,
                coach,
                isWifiIncluded,
                isLinensIncluded
              )}
              service={service}
            />
          ))}
        </div>
      ))}
      {unavailableSeatsColumns.map((column, columnIndex) => (
        <div key={columnIndex} className="seats__coach-seats-column">
          {column.map((item, index) => (
            <Seat
              key={index}
              item={item}
              route={route}
              coachId={coach._id}
              price={getPrice(
                item.index,
                coach,
                isWifiIncluded,
                isLinensIncluded
              )}
              service={service}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default SeatsSecondClassLayout;
