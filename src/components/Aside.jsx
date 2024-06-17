import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import LastTickets from "./ticketsPage/LastTickets";
import TicketsForm from "./ticketsPage/TicketsForm";
import config from "../app/api";
import OrderDetails from "./passengers/OrderDetails";

function Aside() {
  const { lastItems } = useSelector((state) => state.filterTickets);
  const { pathname } = useLocation();

  const isTicketsPage = pathname === config.ticketsUrl;
  const isSeatsPage = pathname.includes("seats");

  return (
    <aside className="aside">
      {isTicketsPage || isSeatsPage ? <TicketsForm /> : <OrderDetails />}
      {isTicketsPage || isSeatsPage ? (
        lastItems.length === 0 ? (
          ""
        ) : (
          <LastTickets />
        )
      ) : (
        ""
      )}
    </aside>
  );
}

export default Aside;
