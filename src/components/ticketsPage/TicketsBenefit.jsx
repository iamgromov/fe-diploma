import { useDispatch, useSelector } from "react-redux";
import { updateCheckedValue } from "../../store/actions/actionCreators";

function TicketsBenefit({ name, inputName }) {
  const dispatch = useDispatch();
  const value = useSelector((state) => state.searchTickets.form[inputName]);

  return (
    <li className="tickets__benefit">
      <span className="tickets__benefit-name">{name}</span>
      <input
        id={inputName}
        className="tickets__checkbox visually-hidden"
        type="checkbox"
        name={inputName}
        checked={value ? true : false}
        onChange={() => dispatch(updateCheckedValue(inputName, !value))}
      />
      <label className="tickets__switch-label" htmlFor={inputName}></label>
    </li>
  );
}

export default TicketsBenefit;
