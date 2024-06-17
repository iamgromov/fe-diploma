import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

import HeroRoutes from "./HeroRoutes";
import HeroDates from "./HeroDates";
import config from "../../app/api";
import { getTickets } from "../../store/reducers/filterTicketsReducer/getTickets";
import { getClearParams } from "../../helpers/getClearParams";
import {
  resetOrder,
  resetPassengers,
  resetSeats,
} from "../../store/actions/actionCreators";

function HeroForm({ heroFormClass }) {
  const { from_city_id, to_city_id } = useSelector(
    (state) => state.searchTickets.form
  );
  const { form } = useSelector((state) => state.searchTickets);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const isTicketsPage = pathname === config.ticketsUrl;

  const onSubmit = (e) => {
    e.preventDefault();

    if (from_city_id === "" || to_city_id === "") {
      return;
    }

    const params = getClearParams(form);
    const newSearchParams = new URLSearchParams(params);

    isTicketsPage && dispatch(getTickets(newSearchParams));

    if (!isTicketsPage) {
      navigate(config.ticketsUrl);
      dispatch(resetSeats());
      dispatch(resetPassengers());
      dispatch(resetOrder());
    }
  };

  return (
    <form className={heroFormClass} onSubmit={onSubmit}>
      <div className="hero__form-wrapper">
        <HeroRoutes />
        <HeroDates />
      </div>
      <button
        className="btn hero__submit-btn"
        disabled={from_city_id === "" || to_city_id === "" ? true : false}
      >
        найти билеты
      </button>
    </form>
  );
}

export default HeroForm;
