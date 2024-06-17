import { useDispatch, useSelector } from "react-redux";
import { useState, useRef } from "react";

import {
  updateSortValue,
  updateLimitValue,
} from "../../store/actions/actionCreators";

function FilterBar() {
  const dispatch = useDispatch();
  const { totalCount } = useSelector((state) => state.filterTickets);
  const { sort, limit } = useSelector((state) => state.searchTickets.form);
  const [isOpened, setIsOpened] = useState(false);
  const dropdown = useRef(null);

  const sortItems = [
    { name: "date", value: "времени" },
    { name: "price", value: "стоимости" },
    { name: "duration", value: "длительности" },
  ];
  const limitItems = [5, 10, 20];

  const onSortClick = (name) => {
    dispatch(updateSortValue(name));
    setIsOpened(false);
  };

  const onClickOut = (e) => {
    if (isOpened && !dropdown.current?.contains(e.target)) {
      setIsOpened(false);
    }
  };

  document.addEventListener("mousedown", onClickOut);

  return (
    <div className="tickets__bar">
      <span className="tickets__total">найдено {totalCount}</span>
      <div className="tickets__sort">
        сортировать по:&nbsp;
        <span
          className="tickets__sort-btn"
          onClick={() => setIsOpened(!isOpened)}
        >
          {sort === "date"
            ? "времени"
            : sort === "price"
            ? "стоимости"
            : "длительности"}
        </span>
        {isOpened ? (
          <div ref={dropdown} className="tickets__sort-dropdown">
            <ul className="tickets__sort-dropdown-list">
              {sortItems.map((item, index) => (
                <li key={index} className="tickets__sort-dropdown-item">
                  <button
                    className="tickets__sort-dropdown-btn"
                    type="button"
                    onClick={() => onSortClick(item.name)}
                  >
                    {item.value}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="tickets__shown-amount">
        показывать по:&nbsp;
        {limitItems.map((item, index) => (
          <button
            key={index}
            className={`tickets__amount-btn${
              item === limit ? " tickets__amount-btn--active" : ""
            }`}
            type="button"
            onClick={() => dispatch(updateLimitValue(item))}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}

export default FilterBar;
