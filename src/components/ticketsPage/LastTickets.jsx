import { useSelector } from "react-redux";

import LastTicket from "./LastTicket";

function LastTickets() {
  const { lastItems } = useSelector((state) => state.filterTickets);

  return (
    <article className="last-tickets">
      <h3 className="last-tickets__title">последние билеты</h3>
      <ul className="last-tickets__list">
        {lastItems.map((item, index) => (
          <LastTicket key={index} item={item} />
        ))}
      </ul>
    </article>
  );
}

export default LastTickets;
