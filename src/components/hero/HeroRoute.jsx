import { useRef, useState } from "react";
import { useDispatch } from "react-redux";

import CitiesList from "./CitiesList";
import {
  selectWhereFromCity,
  selectWhereToCity,
  updateRouteFromValue,
  updateRouteToValue,
} from "../../store/actions/actionCreators";

function HeroRoute({ cities, search, route }) {
  const dispatch = useDispatch();
  const [isCitiesListShown, setIsCitiesListShown] = useState(false);
  const citiesList = useRef(null);

  const onInputClick = () => {
    setIsCitiesListShown((prev) => !prev);
  };

  const onClickOut = (e) => {
    if (isCitiesListShown && !citiesList.current?.contains(e.target)) {
      setIsCitiesListShown(false);
    }
  };

  const onValueChange = (e) => {
    const { value } = e.target;
    route === "from"
      ? dispatch(updateRouteFromValue(value))
      : dispatch(updateRouteToValue(value));
  };

  const onCityClick = (name, cityId) => {
    route === "from"
      ? dispatch(selectWhereFromCity(name, cityId))
      : dispatch(selectWhereToCity(name, cityId));
    setIsCitiesListShown(false);
  };

  document.addEventListener("mousedown", onClickOut);

  const getPlaceholder = () => {
    const searchList = cities.filter((city) => city.name.startsWith(search));

    if (searchList.length === 0) {
      return;
    }

    const firstSearchItemName = searchList[0].name;

    return firstSearchItemName.slice(search.length);
  };

  return (
    <div className="hero__route-wrapper">
      <input
        name="search"
        type="text"
        className="hero__input hero__input_route"
        placeholder={route === "from" ? "Откуда" : "Куда"}
        value={search}
        onChange={onValueChange}
        onClick={onInputClick}
      />
      {isCitiesListShown ? (
        <CitiesList
          ref={citiesList}
          cities={cities}
          onCityClick={onCityClick}
        />
      ) : (
        ""
      )}
      {cities.length === 0 ? (
        ""
      ) : search === "" ? (
        ""
      ) : (
        <div className="hero__placeholder">
          <span className="hero__placeholder-input-text">{search}</span>
          <span className="hero__placeholder-text">{getPlaceholder()}</span>
        </div>
      )}
    </div>
  );
}

export default HeroRoute;
