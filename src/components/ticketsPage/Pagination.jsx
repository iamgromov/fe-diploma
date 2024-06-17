import { useSelector, useDispatch } from "react-redux";
import { useEffect, useRef } from "react";

import { totalPagesSum } from "../../store/selectors";
import {
  updateCurrentPage,
  updateOffset,
} from "../../store/actions/actionCreators";

function Pagination() {
  const dispatch = useDispatch();
  const didRender = useRef(null);
  const { limit } = useSelector((state) => state.searchTickets.form);
  const { currentPage } = useSelector((state) => state.searchTickets);
  const totalPages = useSelector(totalPagesSum);

  useEffect(() => {
    if (didRender.current) {
      dispatch(updateOffset(limit * currentPage - limit));
    }

    didRender.current = true;
  }, [currentPage]); // eslint-disable-line react-hooks/exhaustive-deps

  const onPrevClick = (amount) => {
    if (totalPages === 1) {
      return;
    }

    const page = amount === totalPages ? 1 : currentPage - amount;

    dispatch(updateCurrentPage(page));
  };

  const onNextClick = (amount) => {
    if (totalPages === 1) {
      return;
    }

    const page = amount === totalPages ? totalPages : currentPage + amount;

    dispatch(updateCurrentPage(page));
  };

  return (
    <div className="tickets__pagination">
      <button
        className="tickets__pagination-btn tickets__pagination-btn_prev"
        type="button"
        onClick={() => onPrevClick(totalPages)}
      >
        <svg
          width="18"
          height="29"
          viewBox="0 0 18 29"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.33625 14.5C9.82076 11.0945 13.1201 7.89424 16.3731 4.72332C17.2669 3.85207 17.1987 2.34671 16.3094 1.47083C15.4416 0.616038 14.1195 0.686134 13.2516 1.54092C9.06317 5.66637 4.86165 9.80466 0.72327 13.8808C0.325571 14.2725 0.325472 14.9137 0.723293 15.3053C4.70972 19.2293 8.86225 23.2984 12.9949 27.3844C13.8955 28.2748 15.2685 28.3485 16.1445 27.4338C16.9987 26.5419 17.0517 25.0479 16.1744 24.1785C13.0758 21.1078 9.80952 17.8945 6.33625 14.5Z"
            fill="#928F94"
          />
        </svg>
      </button>
      {currentPage === 1 ? (
        ""
      ) : (
        <button
          className="tickets__pagination-btn"
          type="button"
          onClick={() => onPrevClick(1)}
        >
          {currentPage - 1}
        </button>
      )}
      <button
        className="tickets__pagination-btn tickets__pagination-btn_current"
        type="button"
      >
        {currentPage}
      </button>
      {currentPage + 1 > totalPages ? (
        ""
      ) : totalPages >= 2 ? (
        <button
          className="tickets__pagination-btn"
          type="button"
          onClick={() => onNextClick(1)}
        >
          {currentPage + 1}
        </button>
      ) : (
        ""
      )}
      {currentPage + 2 > totalPages ? (
        ""
      ) : totalPages >= 3 ? (
        <button
          className="tickets__pagination-btn tickets__pagination-btn_third"
          type="button"
          onClick={() => onNextClick(2)}
        >
          {currentPage + 2}
        </button>
      ) : (
        ""
      )}
      {totalPages >= 5 && currentPage <= totalPages - 4 ? (
        <button
          className="tickets__pagination-btn tickets__pagination-btn_more"
          type="button"
        >
          <svg
            width="42"
            height="9"
            viewBox="0 0 42 9"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <ellipse
              cx="4.45455"
              cy="4.5"
              rx="4.45455"
              ry="4.5"
              fill="#918F94"
            />
            <ellipse cx="20.5" cy="4.5" rx="4.45455" ry="4.5" fill="#918F94" />
            <ellipse
              cx="37.5455"
              cy="4.5"
              rx="4.45455"
              ry="4.5"
              fill="#918F94"
            />
          </svg>
        </button>
      ) : (
        ""
      )}
      {totalPages >= 5 && currentPage <= totalPages - 4 ? (
        <button
          className="tickets__pagination-btn tickets__pagination-btn_last"
          type="button"
          onClick={() => onNextClick(totalPages)}
        >
          {totalPages}
        </button>
      ) : (
        ""
      )}
      <button
        className="tickets__pagination-btn tickets__pagination-btn_next"
        type="button"
        onClick={() => onNextClick(1)}
      >
        <svg
          width="18"
          height="29"
          viewBox="0 0 18 29"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.6637 14.5C8.17924 11.0945 4.87989 7.89424 1.62688 4.72332C0.733082 3.85207 0.801327 2.34671 1.69059 1.47083C2.55844 0.616038 3.88051 0.686134 4.74835 1.54092C8.93683 5.66637 13.1384 9.80466 17.2767 13.8808C17.6744 14.2725 17.6745 14.9137 17.2767 15.3053C13.2903 19.2293 9.13775 23.2984 5.00506 27.3844C4.10447 28.2748 2.7315 28.3485 1.85554 27.4338C1.00133 26.5419 0.948345 25.0479 1.82557 24.1785C4.92418 21.1078 8.19048 17.8945 11.6637 14.5Z"
            fill="#928F94"
          />
        </svg>
      </button>
    </div>
  );
}

export default Pagination;
