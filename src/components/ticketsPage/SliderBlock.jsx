import { useDispatch, useSelector } from "react-redux";
import wNumb from "wnumb";
import Nouislider from "nouislider-react";
import "nouislider/distribute/nouislider.css";

import { updateSliderValue } from "../../store/actions/actionCreators";

function SliderBlock({ minStartName, maxStartName, minEndName, maxEndName }) {
  const dispatch = useDispatch();

  const minStartValue = useSelector(
    (state) => state.searchTickets.form[minStartName]
  );
  const maxStartValue = useSelector(
    (state) => state.searchTickets.form[maxStartName]
  );
  const minEndValue = useSelector(
    (state) => state.searchTickets.form[minEndName]
  );
  const maxEndValue = useSelector(
    (state) => state.searchTickets.form[maxEndName]
  );

  function aproximateHour(mins) {
    const minutes = Math.round(mins % 60);
    if (minutes === 60 || minutes === 0) {
      return mins / 60;
    }
    return Math.trunc(mins / 60) + minutes / 100;
  }

  const format = wNumb({
    decimals: 2,
    mark: ":",
    encoder(a) {
      return aproximateHour(a);
    },
  });

  return (
    <>
      <div className="tickets__slider-block">
        <span className="tickets__slider-text">Время отбытия</span>
        <Nouislider
          range={{ min: 0, max: 1440 }}
          start={[minStartValue, maxStartValue]}
          connect={true}
          tooltips={true}
          step={15}
          format={format}
          onUpdate={() =>
            dispatch(
              updateSliderValue(
                minStartName,
                minStartValue,
                maxStartName,
                maxStartValue
              )
            )
          }
        />
        <div className="tickets__form-controls tickets__form-controls_bottom">
          <span>24:00</span>
        </div>
      </div>
      <div className="tickets__slider-block">
        <span className="tickets__slider-text tickets__slider-text_arrival">
          Время прибытия
        </span>
        <Nouislider
          range={{ min: 0, max: 1440 }}
          start={[minEndValue, maxEndValue]}
          connect={true}
          tooltips={true}
          step={15}
          format={format}
          onUpdate={() =>
            dispatch(
              updateSliderValue(
                minEndName,
                minEndValue,
                maxEndName,
                maxEndValue
              )
            )
          }
        />
        <div className="tickets__form-controls tickets__form-controls_bottom">
          <span>24:00</span>
        </div>
      </div>
    </>
  );
}

export default SliderBlock;
