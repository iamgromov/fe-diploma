import { useDispatch, useSelector } from "react-redux";
import Nouislider from "nouislider-react";
import "nouislider/distribute/nouislider.css";

import { updateSliderValue } from "../../store/actions/actionCreators";
import TicketCollapse from "./TicketCollapse";
import SliderBlock from "./SliderBlock";
import TicketsBenefit from "./TicketsBenefit";
import TicketDate from "./TicketDate";

function TicketsForm() {
  const dispatch = useDispatch();
  const { date_start, date_end, price_from, price_to } = useSelector(
    (state) => state.searchTickets.form
  );

  const format = {
    to: (v) => parseFloat(v).toFixed(0),
    from: (v) => parseFloat(v).toFixed(0),
  };

  return (
    <form className="tickets__form">
      <div className="tickets__form-block">
        <TicketDate route="from" date={date_start} />
        <TicketDate route="to" date={date_end} />
      </div>
      <div className="tickets__form-block">
        <ul className="tickets__benefits">
          <TicketsBenefit name="Купе" inputName="have_second_class" />
          <TicketsBenefit name="Плацкарт" inputName="have_third_class" />
          <TicketsBenefit name="Сидячий" inputName="have_fourth_class" />
          <TicketsBenefit name="Люкс" inputName="have_first_class" />
          <TicketsBenefit name="Wi-Fi" inputName="have_wifi" />
          <TicketsBenefit name="Экспресс" inputName="have_express" />
        </ul>
      </div>
      <div className="tickets__form-block tickets__form-block_price">
        <h3 className="tickets__form-title">Стоимость</h3>
        <div className="tickets__form-controls tickets__form-controls_top">
          <span>от</span>
          <span>до</span>
        </div>
        <Nouislider
          className="tickets__slider"
          range={{ min: 1920, max: 7000 }}
          start={[price_from, price_to]}
          connect={true}
          tooltips={true}
          step={1}
          format={format}
          onUpdate={() =>
            dispatch(
              updateSliderValue("price_from", price_from, "price_to", price_to)
            )
          }
        />
        <div className="tickets__form-controls tickets__form-controls_bottom">
          <span>7000</span>
        </div>
      </div>
      <div className="tickets__form-block tickets__form-block_collapse tickets__form-block_collapse_departure">
        <TicketCollapse collapsedLabel="Туда" isExpanded={false}>
          <SliderBlock
            minStartName="start_departure_hour_from"
            maxStartName="start_departure_hour_to"
            minEndName="end_departure_hour_from"
            maxEndName="end_departure_hour_to"
          />
        </TicketCollapse>
      </div>
      <div className="tickets__form-block tickets__form-block_collapse tickets__form-block_collapse_arrival">
        <TicketCollapse collapsedLabel="Обратно" isExpanded={false}>
          <SliderBlock
            minStartName="start_arrival_hour_from"
            maxStartName="start_arrival_hour_to"
            minEndName="end_arrival_hour_from"
            maxEndName="end_arrival_hour_to"
          />
        </TicketCollapse>
      </div>
    </form>
  );
}

export default TicketsForm;
