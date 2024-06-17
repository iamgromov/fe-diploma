import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Tickets from "../../components/ticketsPage/Tickets";
import TicketsError from "../../components/ticketsPage/TicketsError";
import Aside from "../../components/Aside";
import { getLastTickets } from "../../store/reducers/filterTicketsReducer/getLastTickets";
import { getTickets } from "../../store/reducers/filterTicketsReducer/getTickets";
import { getClearParams } from "../../helpers/getClearParams";
import {
  resetFilterTickets,
  resetSearchTickets,
  selectWhereFromCity,
  selectWhereToCity,
} from "../../store/actions/actionCreators";
import { scrollTo } from "../../helpers/scrollTo";
import "./Tickets.css";

function TicketsPage() {
  const [isErrorShown, setIsErrorShown] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const { form } = useSelector((state) => state.searchTickets);
  const { items, isLoading, error, success } = useSelector(
    (state) => state.filterTickets
  );
  const {
    sort,
    limit,
    offset,
    from_city_id,
    to_city_id,
    have_air_conditioning,
    have_express,
    have_first_class,
    have_fourth_class,
    have_second_class,
    have_third_class,
    have_wifi,
  } = useSelector((state) => state.searchTickets.form);
  const section = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isFormValid = from_city_id !== "" && to_city_id !== "";

  const checkIds = () => {
    if (searchParams.size === 0) {
      navigate("/");
      return;
    }

    const fromId = searchParams.get("from_city_id");
    const toId = searchParams.get("to_city_id");

    dispatch(selectWhereFromCity("", fromId));
    dispatch(selectWhereToCity("", toId));
  };

  const onErrorClick = () => {
    setIsErrorShown(false);
    dispatch(resetSearchTickets());
    dispatch(resetFilterTickets());
    navigate("/");
  };

  useEffect(() => {
    if (!isFormValid) {
      checkIds();
    } else {
      error && setIsErrorShown(true);
    }
  }, [error, from_city_id, to_city_id]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!isFormValid) {
      checkIds();
    } else {
      dispatch(getLastTickets());
    }
  }, [from_city_id, to_city_id]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!isFormValid) {
      checkIds();
    } else {
      scrollTo(section.current?.offsetTop, "smooth");

      const params = getClearParams(form);
      const newSearchParams = new URLSearchParams(params);
      setSearchParams(newSearchParams);
    }
  }, [items, from_city_id, to_city_id]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!isFormValid) {
      checkIds();
    } else {
      scrollTo(section.current?.offsetTop, "smooth");

      const params = getClearParams(form);
      const newSearchParams = new URLSearchParams(params);
      dispatch(getTickets(newSearchParams));
    }
  }, [sort, limit, offset, have_air_conditioning, have_express, have_first_class, have_fourth_class, have_second_class, have_third_class, have_wifi, from_city_id, to_city_id]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <section ref={section} className="dashboard tickets">
      <div className="container">
        <div className="dashboard__wrapper tickets__wrapper">
          {!isFormValid ? "" : <Aside />}
          {!isFormValid ? (
            ""
          ) : isErrorShown ? (
            <TicketsError error={error} onErrorClick={onErrorClick} />
          ) : items.length === 0 && success && !isLoading ? (
            <span>Ничего не найдено.</span>
          ) : items.length === 0 && !success && !isLoading ? (
            ""
          ) : isLoading ? (
            <span>Идет загрузка...</span>
          ) : (
            <Tickets />
          )}
        </div>
      </div>
    </section>
  );
}

export default TicketsPage;
