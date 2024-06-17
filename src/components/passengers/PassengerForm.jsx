import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { useState, useRef, useEffect } from "react";

import {
  addOrderSeat,
  updateFormValue,
} from "../../store/actions/actionCreators";
import CalendarWrapperComponent from "../calendar/CalendarWrapperComponent";
import Calendar from "react-calendar";
import FormError from "../FormError";
import FormSuccess from "./FormSuccess";
import {
  arrivalOrderChildNoSeatAmount,
  departureOrderChildNoSeatAmount,
} from "../../store/selectors";

function PassengerForm({
  item,
  index,
  route,
  setIsSuccessShown,
  isSuccessShown,
}) {
  const dispatch = useDispatch();

  const departureChildNoSeatAmount = useSelector(
    departureOrderChildNoSeatAmount
  );
  const arrivalChildNoSeatAmount = useSelector(arrivalOrderChildNoSeatAmount);
  const departureChildNoSeatsTotal = useSelector(
    (state) => state.passengers.departure.childNoSeatTicketsTotal
  );
  const arrivalChildNoSeatsTotal = useSelector(
    (state) => state.passengers.arrival.childNoSeatTicketsTotal
  );

  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [patronymicError, setPatronymicError] = useState(false);
  const [dateError, setDateError] = useState(false);
  const [serialError, setSerialError] = useState(false);
  const [numberError, setNumberError] = useState(false);

  const [errors, setErrors] = useState([]);
  const [isErrorShown, setIsErrorShown] = useState(false);

  const [isCalendarShown, setIsCalendarShown] = useState(false);
  const [isAdultTypeMenuOpened, setIsAdultTypeMenuOpened] = useState(false);
  const [isDocumentTypeMenuOpened, setIsDocumentTypeMenuOpened] =
    useState(false);
  const calendar = useRef(null);
  const adultTypeMenu = useRef(null);
  const documentTypeMenu = useRef(null);
  const [isFormValid, setIsFormValid] = useState(false);

  const form = {
    route: route,
    coachId: item.coach_id,
    id: item.seat_number,
    name: "",
    value: "",
  };

  const initialValue = new Date();
  const [calendarValue, onCalendarChange] = useState(initialValue);

  useEffect(() => {
    if (initialValue !== calendarValue) {
      setDateError(false);
      const date = new moment(calendarValue);
      dispatch(
        updateFormValue({
          ...form,
          name: "birthday",
          value: date.format("YYYY-MM-DD"),
        })
      );
    }
  }, [calendarValue]); // eslint-disable-line react-hooks/exhaustive-deps

  const onValueChange = (e) => {
    if (isSuccessShown) {
      return;
    }

    const name = e.target.name;
    const value = e.target.value;
    const checked = e.target.checked;

    if (name === "first_name" && firstNameError) {
      setFirstNameError(false);
    } else if (name === "last_name" && lastNameError) {
      setLastNameError(false);
    } else if (name === "patronymic" && patronymicError) {
      setPatronymicError(false);
    } else if (name === "document_serial" && serialError) {
      setSerialError(false);
    } else if (
      (name === "document_number" || name === "document_birth_certificate") &&
      numberError
    ) {
      setNumberError(false);
    }

    dispatch(
      updateFormValue({
        ...form,
        name: name,
        value:
          name === "limited_mobility"
            ? checked
            : name === "gender"
            ? !item.person_info.gender
            : value,
      })
    );
  };

  const onSelectValueChange = (e, value) => {
    const name = e.target.name;

    dispatch(updateFormValue({ ...form, name: name, value: value }));

    if (
      name === "is_adult" &&
      value === true &&
      item.person_info.document_type === "свидетельство о рождении"
    ) {
      dispatch(
        updateFormValue({ ...form, name: "document_type", value: "паспорт" })
      );
    }

    if (
      name === "document_type" &&
      value === "свидетельство о рождении" &&
      item.person_info.is_adult
    ) {
      dispatch(updateFormValue({ ...form, name: "is_adult", value: false }));
    }

    setIsDocumentTypeMenuOpened(false);
    setIsAdultTypeMenuOpened(false);
  };

  const onClickOut = (e) => {
    if (isCalendarShown && !calendar.current?.contains(e.target)) {
      setIsCalendarShown(false);
    }

    if (isAdultTypeMenuOpened && !adultTypeMenu.current?.contains(e.target)) {
      setIsAdultTypeMenuOpened(false);
    }

    if (
      isDocumentTypeMenuOpened &&
      !documentTypeMenu.current?.contains(e.target)
    ) {
      setIsDocumentTypeMenuOpened(false);
    }
  };

  document.addEventListener("mousedown", onClickOut);

  const onSubmit = (e) => {
    e.preventDefault();

    if (isSuccessShown) {
      return;
    }

    setFirstNameError(false);
    setLastNameError(false);
    setPatronymicError(false);
    setDateError(false);
    setSerialError(false);
    setNumberError(false);
    setIsSuccessShown(false);
    setIsErrorShown(false);
    setErrors("");

    setIsFormValid(true);

    if (!isFullnameValid(item.person_info.first_name)) {
      setFirstNameError(true);
      setErrors((prevErrors) => [
        ...prevErrors,
        "Убедитесь, что имя введено и содержит только буквы.",
      ]);
      setIsErrorShown(true);
      setIsFormValid(false);
    }

    if (!isFullnameValid(item.person_info.last_name)) {
      setLastNameError(true);
      setErrors((prevErrors) => [
        ...prevErrors,
        "Убедитесь, что фамилия введена и содержит только буквы.",
      ]);
      setIsErrorShown(true);
      setIsFormValid(false);
    }

    if (!isFullnameValid(item.person_info.patronymic)) {
      setPatronymicError(true);
      setErrors((prevErrors) => [
        ...prevErrors,
        "Убедитесь, что отчество введено и содержит только буквы.",
      ]);
      setIsErrorShown(true);
      setIsFormValid(false);
    }

    if (!isDateValid(item.person_info.birthday)) {
      setDateError(true);
      setErrors((prevErrors) => [...prevErrors, "Выберите дату рождения."]);
      setIsErrorShown(true);
      setIsFormValid(false);
    }

    if (!isSerialValid(item.person_info.document_serial)) {
      setSerialError(true);
      setErrors((prevErrors) => [
        ...prevErrors,
        "Сериальный номер указан некорректно.",
      ]);
      setIsErrorShown(true);
      setIsFormValid(false);
    }

    const documentData =
      item.person_info.document_type === "свидетельство о рождении"
        ? item.person_info.document_birth_certificate
        : item.person_info.document_number;

    if (!isNumberValid(documentData)) {
      setNumberError(true);
      setErrors((prevErrors) => [
        ...prevErrors,
        "Номер документа указан некорректно.",
      ]);
      setIsErrorShown(true);
      setIsFormValid(false);
    }
  };

  useEffect(() => {
    if (errors.length === 0 && isFormValid) {
      setIsSuccessShown(true);

      const seatData = {
        coach_id: item.coach_id,
        person_info: {
          is_adult: item.person_info.is_adult,
          first_name: item.person_info.first_name,
          last_name: item.person_info.last_name,
          patronymic: item.person_info.patronymic,
          gender: item.person_info.gender,
          birthday: item.person_info.birthday,
          document_type: item.person_info.document_type,
          document_data:
            item.person_info.document_type === "свидетельство о рождении"
              ? item.person_info.document_birth_certificate
              : `${item.person_info.document_serial} ${item.person_info.document_number}`,
        },
        seat_number: item.seat_number,
        is_child: item.is_child,
        include_children_seat: item.include_children_seat,
      };

      const isChildNoSeatIncluded = () => {
        if (route === "departure") {
          return departureChildNoSeatAmount < departureChildNoSeatsTotal;
        } else {
          return arrivalChildNoSeatAmount < arrivalChildNoSeatsTotal;
        }
      };

      dispatch(addOrderSeat(route, seatData, isChildNoSeatIncluded()));
    }
  }, [errors]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (isErrorShown) {
      setTimeout(() => {
        setIsErrorShown(false);
      }, 5000);
    }
  }, [isErrorShown]);

  const isFullnameValid = (value) => {
    const regex = /^[а-яА-Я]+$/;

    if (value.length === 0 || !regex.test(value)) {
      return false;
    }

    return true;
  };

  const isDateValid = (value) => {
    if (value === "") {
      return false;
    }

    return true;
  };

  const isSerialValid = (value) => {
    if (
      item.person_info.document_type !== "свидетельство о рождении" &&
      (value.length === 0 || value.length < 4 || !/^[0-9]*$/.test(value))
    ) {
      return false;
    }

    return true;
  };

  const isNumberValid = (value) => {
    if (item.person_info.document_type === "свидетельство о рождении") {
      const regExp = /^[IVXLCDM]+[А-Я]{2}\d{6}$/;
      if (value.length === 0 || value.length < 11 || !regExp.test(value)) {
        return false;
      }
    } else {
      if (value.length === 0 || value.length < 6 || !/^[0-9]*$/.test(value)) {
        return false;
      }
    }

    return true;
  };

  const onAdultTypeChange = () => {
    if (isSuccessShown) {
      return;
    }

    onCalendarChange(initialValue);
    setIsAdultTypeMenuOpened((prev) => !prev);
  };

  const onCalendarShown = () => {
    if (isSuccessShown) {
      return;
    }

    setIsCalendarShown((prev) => !prev);
  };

  const onDocumentTypeChange = () => {
    if (isSuccessShown) {
      return;
    }

    setIsDocumentTypeMenuOpened((prev) => !prev);
  };

  const getMinDate = () => {
    if (item.person_info.is_adult) {
      const minAdultDate = new moment().subtract(100, "years").toDate();
      return minAdultDate;
    } else {
      const minChildDate = new moment().subtract(18, "years").toDate();
      return minChildDate;
    }
  };

  const getMaxDate = () => {
    if (item.person_info.is_adult) {
      const maxAdultDate = new moment().subtract(18, "years").toDate();
      return maxAdultDate;
    } else {
      const maxChildDate = new moment().toDate();
      return maxChildDate;
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="passenger__personal-info">
        <div className="passenger__adult-type">
          <span
            className={`passenger__adult-type-btn${
              isSuccessShown ? " field--disabled" : ""
            }`}
            onClick={onAdultTypeChange}
          >
            {item.person_info.is_adult ? "Взрослый" : "Детский"}
          </span>
          {isAdultTypeMenuOpened ? (
            <div ref={adultTypeMenu} className="passenger__adult-type-menu">
              <button
                className="passenger__adult-type-item"
                type="button"
                name="is_adult"
                onClick={(e) => onSelectValueChange(e, false)}
              >
                Детский
              </button>
              <button
                className="passenger__adult-type-item"
                type="button"
                name="is_adult"
                onClick={(e) => onSelectValueChange(e, true)}
              >
                Взрослый
              </button>
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="passenger__full-name">
          <label className="label">
            <span className="label-text">Фамилия</span>
            <input
              type="text"
              className={`input${firstNameError ? " input--error" : ""}`}
              name="last_name"
              value={item.person_info.last_name}
              onChange={onValueChange}
              disabled={isSuccessShown ? true : false}
            />
          </label>
          <label className="label">
            <span className="label-text">Имя</span>
            <input
              type="text"
              className={`input${lastNameError ? " input--error" : ""}`}
              name="first_name"
              value={item.person_info.first_name}
              onChange={onValueChange}
              disabled={isSuccessShown ? true : false}
            />
          </label>
          <label className="label">
            <span className="label-text">Отчество</span>
            <input
              type="text"
              className={`input${patronymicError ? " input--error" : ""}`}
              name="patronymic"
              value={item.person_info.patronymic}
              onChange={onValueChange}
              disabled={isSuccessShown ? true : false}
            />
          </label>
        </div>
        <div className="passenger__gender-birth">
          <label className="label">
            <span className="label-text">Пол</span>
            <div className="passenger__gender-radios">
              <label
                htmlFor={`male_${index}`}
                className={`passenger__gender-radio passenger__gender-radio_male${
                  item.person_info.gender
                    ? " passenger__gender-radio--checked"
                    : ""
                }`}
              >
                <input
                  id={`male_${index}`}
                  type="radio"
                  className="visually-hidden passenger__radio-input"
                  name="gender"
                  checked={item.person_info.gender === true ? true : false}
                  onChange={onValueChange}
                />
                <span className="passenger__gender-label-text">М</span>
              </label>
              <label
                htmlFor={`female_${index}`}
                className={`passenger__gender-radio passenger__gender-radio_female${
                  item.person_info.gender === false
                    ? " passenger__gender-radio--checked"
                    : ""
                }`}
              >
                <input
                  id={`female_${index}`}
                  type="radio"
                  className="visually-hidden passenger__radio-input"
                  name="gender"
                  checked={item.person_info.gender === false ? true : false}
                  onChange={onValueChange}
                />
                <span className="passenger__gender-label-text">Ж</span>
              </label>
            </div>
          </label>
          <label className="label passenger__birth">
            <span className="label-text">Дата рождения</span>
            <span
              className={`passenger__birth-date${
                item.person_info.birthday !== ""
                  ? " passenger__birth-date--selected"
                  : ""
              }${dateError ? " passenger__birth-date--error" : ""}${
                isSuccessShown ? " field--disabled" : ""
              }`}
              onClick={onCalendarShown}
            >
              {item.person_info.birthday === ""
                ? "дд/мм/гг"
                : item.person_info.birthday}
            </span>
            {!isCalendarShown ? (
              ""
            ) : (
              <CalendarWrapperComponent ref={calendar}>
                <Calendar
                  onChange={onCalendarChange}
                  value={calendarValue}
                  onClickDay={() => setIsCalendarShown(false)}
                  minDate={getMinDate()}
                  maxDate={getMaxDate()}
                />
              </CalendarWrapperComponent>
            )}
          </label>
        </div>
        <label className="checkbox passenger__checkbox">
          <input
            type="checkbox"
            id={`mobility_${index}`}
            className="visually-hidden checkbox-input passenger__checkbox-input"
            name="limited_mobility"
            checked={item.person_info.limited_mobility}
            onChange={onValueChange}
          />
          <label
            className="checkbox-label passenger__checkbox-label"
            htmlFor={`mobility_${index}`}
          ></label>
          <span className="checkbox-label-text passenger__checkbox-label-text">
            ограниченная подвижность
          </span>
        </label>
      </div>
      <div className="passenger__documents">
        <div className="passenger__document-type label">
          <span className="label-text">Тип документа</span>
          <span
            className={`passenger__document-type-btn${
              isSuccessShown ? " field--disabled" : ""
            }`}
            onClick={onDocumentTypeChange}
          >
            {item.person_info.document_type}
          </span>
          {isDocumentTypeMenuOpened ? (
            <div
              ref={documentTypeMenu}
              className="passenger__document-type-menu"
            >
              <button
                className="passenger__document-type-item"
                type="button"
                name="document_type"
                onClick={(e) => onSelectValueChange(e, "паспорт")}
              >
                Паспорт
              </button>
              <button
                className="passenger__document-type-item"
                type="button"
                name="document_type"
                onClick={(e) =>
                  onSelectValueChange(e, "свидетельство о рождении")
                }
              >
                Свидетельство о рождении
              </button>
            </div>
          ) : (
            ""
          )}
        </div>
        {item.person_info.document_type !== "свидетельство о рождении" ? (
          <label className="label">
            <span className="label-text">Серия</span>
            <div className="passenger__serial-input-wrapper">
              <input
                type="text"
                name="document_serial"
                value={item.person_info.document_serial}
                className={`input passenger__serial-input${
                  serialError ? " input--error" : ""
                }`}
                maxLength={4}
                onChange={onValueChange}
                disabled={isSuccessShown ? true : false}
              />
            </div>
          </label>
        ) : (
          ""
        )}
        <label className="label">
          <span className="label-text">Номер</span>
          <div
            className={`passenger__number-input-wrapper${
              item.person_info.document_type === "свидетельство о рождении"
                ? " passenger__number-input-wrapper_long"
                : " passenger__number-input-wrapper_short"
            }`}
          >
            <input
              type="text"
              name={
                item.person_info.document_type === "свидетельство о рождении"
                  ? "document_birth_certificate"
                  : "document_number"
              }
              value={
                item.person_info.document_type === "свидетельство о рождении"
                  ? item.person_info.document_birth_certificate
                  : item.person_info.document_number
              }
              className={`input passenger__number-input${
                numberError ? " input--error" : ""
              }`}
              maxLength={
                item.person_info.document_type === "свидетельство о рождении"
                  ? 11
                  : 6
              }
              onChange={onValueChange}
              disabled={isSuccessShown ? true : false}
            />
          </div>
        </label>
      </div>
      <div className="passenger__submit-wrapper">
        <button className="passenger__submit-btn">Следующий пассажир</button>
      </div>
      {isErrorShown ? <FormError errors={errors} /> : ""}
      {isSuccessShown ? <FormSuccess /> : ""}
    </form>
  );
}

export default PassengerForm;
