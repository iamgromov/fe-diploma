import Seat from "./Seat";
import { getSeatColumns } from "../../helpers/getSeatColumns";
import { getPrice } from "../../helpers/getPrice";

function SeatsThirdClassLayout(props) {
  const { route, isLinensIncluded, isWifiIncluded, service } = props;
  const { coach } = props.item;
  const { seats } = props.item;

  const availableSeats = seats;

  const unavailableSeatsTotal = 48 - seats.length;
  const unavailableSeats = [];
  for (let i = 0; i < unavailableSeatsTotal; i++) {
    unavailableSeats.push({ index: seats.length + i + 1, available: false });
  }

  const newSeats = [...availableSeats, ...unavailableSeats];
  const mainSeats = newSeats.slice(0, 32);
  const sideSeats = newSeats.slice(-16);

  const mainSeatsColumns = getSeatColumns(mainSeats);
  const sideSeatsColumns = getSeatColumns(sideSeats);

  return (
    <div className="seats__coach-seats-list seats__coach-seats-list_third">
      <div className="seats__coach-seats-main">
        {mainSeatsColumns.map((column, columnIndex) => (
          <div
            key={columnIndex}
            className="seats__coach-seats-column seats__coach-seats-column_main"
          >
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
      <div className="seats__coach-seats-side">
        {sideSeatsColumns.map((column, columnIndex) => (
          <div
            key={columnIndex}
            className="seats__coach-seats-column seats__coach-seats-column_side"
          >
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
    </div>
  );
}

export default SeatsThirdClassLayout;
