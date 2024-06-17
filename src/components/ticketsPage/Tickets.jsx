import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { updateRoute, selectTrain } from "../../store/actions/actionCreators";
import Ticket from "../Ticket";
import Pagination from "./Pagination";
import FilterBar from "./FilterBar";

function Tickets() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, isLoading } = useSelector((state) => state.filterTickets);

  const onClick = (item) => {
    dispatch(updateRoute("departure", item.departure._id));
    item.arrival && dispatch(updateRoute("arrival", item.arrival._id));
    dispatch(selectTrain(item));
    navigate(`/dashboard/seats/${item.departure._id}`);
  };

  return (
    <div className="tickets__results">
      {items.length !== 0 && !isLoading ? <FilterBar /> : ""}

      <ul className="tickets__list">
        {items.map((item, index) => (
          <li key={index} className="tickets__item">
            <Ticket item={item} isOrderPage={false}>
              <button
                className="btn tickets__item-btn"
                type="button"
                onClick={() => onClick(item)}
              >
                Выбрать места
              </button>
            </Ticket>
          </li>
        ))}
      </ul>
      {items.length !== 0 && !isLoading ? <Pagination /> : ""}
    </div>
  );
}

export default Tickets;
