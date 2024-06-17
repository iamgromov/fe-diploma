import Coach from "./Coach";

function CoachList({ items, activeCoachType, route }) {
  return (
    <div className="seats__coaches">
      <div className="seats__coach-names">
        <div className="seats__coach-names-list">
          Вагоны&nbsp;
          {items.map((item, index) => (
            <span
              key={index}
              className={`seats__coach-name${
                item.coach.class_type === activeCoachType
                  ? " seats__coach-name--active"
                  : ""
              }`}
            >
              {item.coach.name.slice(-2)}
            </span>
          ))}
        </div>
        Нумерация вагонов начинается с головы поезда
      </div>
      <ul className="seats__coach-list">
        {items
          .filter((el) => el.coach.class_type === activeCoachType)
          .map((item, index) => (
            <Coach key={index} item={item} route={route} />
          ))}
      </ul>
    </div>
  );
}

export default CoachList;
