import { forwardRef } from "react";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

const CitiesList = forwardRef(function CitiesList(
  { cities, onCityClick },
  ref
) {
  const [messageText, setMessageText] = useState("");
  const { isLoading, error } = useSelector((state) => state.searchTickets);

  useEffect(() => {
    isLoading
      ? setMessageText("Загрузка...")
      : error
      ? setMessageText("Ошибка, попробуйте снова")
      : cities.length === 0
      ? setMessageText("Введите название города")
      : setMessageText("");
  }, [isLoading, error, cities]);

  return (
    <div ref={ref} className="hero__cities">
      {cities.length !== 0 ? (
        <ul className="hero__cities-list">
          {cities.map((city) => (
            <li key={city._id} className="hero__cities-item">
              <button
                className="hero__cities-btn"
                type="button"
                onClick={() => onCityClick(city.name, city._id)}
              >
                {city.name}
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <span className="hero__cities-text">{messageText}</span>
      )}
    </div>
  );
});

export default CitiesList;
