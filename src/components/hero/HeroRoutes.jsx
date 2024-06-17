import { useDispatch, useSelector } from "react-redux";

import { swapValues } from "../../store/actions/actionCreators";
import HeroRoute from "./HeroRoute";

function HeroRoutes() {
  const { cityFrom, cityTo, citiesFrom, citiesTo } = useSelector(
    (state) => state.searchTickets
  );
  const dispatch = useDispatch();

  return (
    <div className="hero__label">
      <span className="hero__label-text">Направление</span>
      <div className="hero__inputs-wrapper">
        <HeroRoute cities={citiesFrom} search={cityFrom} route="from" />
        <button
          className="hero__swap-btn"
          type="button"
          onClick={() => dispatch(swapValues())}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
          >
            <rect
              width="24"
              height="24"
              fill="url(#pattern0_185_19)"
              fillOpacity="0.6"
            />
            <defs>
              <pattern
                id="pattern0_185_19"
                patternContentUnits="objectBoundingBox"
                width="1"
                height="1"
              >
                <use xlinkHref="#image0_185_19" transform="scale(0.00520833)" />
              </pattern>
              <image
                id="image0_185_19"
                width="192"
                height="192"
                xlinkHref="data:image/png;base64,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"
              />
            </defs>
          </svg>
        </button>
        <HeroRoute cities={citiesTo} search={cityTo} route="to" />
      </div>
    </div>
  );
}

export default HeroRoutes;
