import Seat from "./Seat";
import { getSeatColumns } from "../../helpers/getSeatColumns";
import { getPrice } from "../../helpers/getPrice";

function SeatsFourthClassLayout(props) {
  const { route, isLinensIncluded, isWifiIncluded, service } = props;
  const { coach } = props.item;
  const { seats } = props.item;

  const availableSeats = seats;

  const unavailableSeatsTotal = 62 - seats.length;
  const unavailableSeats = [];
  for (let i = 0; i < unavailableSeatsTotal; i++) {
    unavailableSeats.push({ index: seats.length + i + 1, available: false });
  }

  const newSeats = [...availableSeats, ...unavailableSeats];
  const rightSideSeats = newSeats.slice(0, 32);
  const leftSideSeats = newSeats.slice(-30);
  const leftSideSeatsPaired = leftSideSeats.slice(1, -1);

  const rightSideSeatsColumns = getSeatColumns(rightSideSeats);
  const sideSeatsColumns = getSeatColumns(leftSideSeatsPaired);

  return (
    <div className="seats__coach-seats-list seats__coach-seats-list_fourth">
      <div className="seats__coach-seats-right-side">
        {rightSideSeatsColumns.map((column, columnIndex) => (
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
      <div className="seats__coach-seats-left-side">
        <Seat
          key={leftSideSeats[0].index}
          item={leftSideSeats[0]}
          route={route}
          coachId={coach._id}
          price={getPrice(
            leftSideSeats[0].index,
            coach,
            isWifiIncluded,
            isLinensIncluded
          )}
          service={service}
          couchClass="fourth"
        />
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
        <Seat
          key={leftSideSeats[leftSideSeats.length - 1].index}
          item={leftSideSeats[leftSideSeats.length - 1]}
          route={route}
          coachId={coach._id}
          price={getPrice(
            leftSideSeats[leftSideSeats.length - 1].index,
            coach,
            isWifiIncluded,
            isLinensIncluded
          )}
          service={service}
        />
      </div>
    </div>
  );
}

export default SeatsFourthClassLayout;
