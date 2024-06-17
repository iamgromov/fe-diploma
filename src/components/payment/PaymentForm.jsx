import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";

import { updateOrderFormValue } from "../../store/actions/actionCreators";
import FormError from "../FormError";
import { useNavigate } from "react-router-dom";
import config from "../../app/api";

function PaymentForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.order);
  const [errors, setErrors] = useState([]);
  const [isErrorShown, setIsErrorShown] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [patronymicError, setPatronymicError] = useState(false);
  const [telephoneError, setTelephoneError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [paymentError, setPaymentError] = useState(false);

  useEffect(() => {
    if (isErrorShown) {
      setTimeout(() => {
        setIsErrorShown(false);
      }, 5000);
    }
  }, [isErrorShown]);

  useEffect(() => {
    if (errors.length === 0 && isFormValid) {
      navigate(config.orderUrl);
    }
  }, [errors]);

  const onValueChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    if (name === "first_name" && firstNameError) {
      setFirstNameError(false);
    } else if (name === "last_name" && lastNameError) {
      setLastNameError(false);
    } else if (name === "patronymic" && patronymicError) {
      setPatronymicError(false);
    } else if (name === "phone" && telephoneError) {
      setTelephoneError(false);
    } else if (name === "email" && emailError) {
      setEmailError(false);
    } else if (name === "payment_method" && paymentError) {
      setPaymentError(false);
    }

    dispatch(updateOrderFormValue(name, value));
  };

  const onSubmit = (e) => {
    e.preventDefault();

    setFirstNameError(false);
    setLastNameError(false);
    setPatronymicError(false);
    setTelephoneError(false);
    setPaymentError(false);
    setEmailError(false);
    setIsErrorShown(false);
    setErrors("");

    setIsFormValid(true);

    if (!isFullnameValid(user.first_name)) {
      setFirstNameError(true);
      setErrors((prevErrors) => [
        ...prevErrors,
        "Убедитесь, что имя введено и содержит только буквы.",
      ]);
      setIsErrorShown(true);
      setIsFormValid(false);
    }

    if (!isFullnameValid(user.last_name)) {
      setLastNameError(true);
      setErrors((prevErrors) => [
        ...prevErrors,
        "Убедитесь, что фамилия введена и содержит только буквы.",
      ]);
      setIsErrorShown(true);
      setIsFormValid(false);
    }

    if (!isFullnameValid(user.patronymic)) {
      setPatronymicError(true);
      setErrors((prevErrors) => [
        ...prevErrors,
        "Убедитесь, что отчество введено и содержит только буквы.",
      ]);
      setIsErrorShown(true);
      setIsFormValid(false);
    }

    if (!isTelephoneValid(user.phone)) {
      setTelephoneError(true);
      setErrors((prevErrors) => [
        ...prevErrors,
        "Убедитесь, что номер телефона введен и действителен.",
      ]);
      setIsErrorShown(true);
      setIsFormValid(false);
    }

    if (!isEmailValid(user.email)) {
      setEmailError(true);
      setErrors((prevErrors) => [
        ...prevErrors,
        "Убедитесь, что почта введена и действительна.",
      ]);
      setIsErrorShown(true);
      setIsFormValid(false);
    }

    if (!isPaymentValid()) {
      setPaymentError(true);
      setErrors((prevErrors) => [...prevErrors, "Не выбран метод оплаты."]);
      setIsErrorShown(true);
      setIsFormValid(false);
    }
  };

  const isFullnameValid = (value) => {
    const regex = /^[а-яА-Я]+$/;

    if (value.length === 0 || !regex.test(value)) {
      return false;
    }

    return true;
  };

  const isTelephoneValid = (value) => {
    const regExp = /^((8|\\+7)[ -]?)?(\(?\d{3}\)?[ -]?)?[\d -]{7,10}$/;
    if (value.length === 0 || !regExp.test(value)) {
      return false;
    }

    return true;
  };

  const isEmailValid = (value) => {
    const regExp = /[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+/;
    if (value.length === 0 || !regExp.test(value)) {
      return false;
    }

    return true;
  };

  const isPaymentValid = () => {
    if (user.payment_method === "") {
      return false;
    }

    return true;
  };

  return (
    <form className="payment__form" onSubmit={onSubmit}>
      <div className="payment__form-wrapper">
        <div className="payment__form-block">
          <h2 className="payment__form-title">Персональные данные</h2>
          <div className="payment__form-info">
            <div className="payment__form-full-name">
              <label className="label">
                <span className="label-text">Фамилия</span>
                <input
                  type="text"
                  className={`input${firstNameError ? " input--error" : ""}`}
                  name="last_name"
                  value={user.last_name}
                  onChange={onValueChange}
                />
              </label>
              <label className="label">
                <span className="label-text">Имя</span>
                <input
                  type="text"
                  className={`input${lastNameError ? " input--error" : ""}`}
                  name="first_name"
                  value={user.first_name}
                  onChange={onValueChange}
                />
              </label>
              <label className="label">
                <span className="label-text">Отчество</span>
                <input
                  type="text"
                  className={`input${patronymicError ? " input--error" : ""}`}
                  name="patronymic"
                  value={user.patronymic}
                  onChange={onValueChange}
                />
              </label>
            </div>
            <label className="label payment__form-label_tel">
              <span className="label-text">Контактный телефон</span>
              <input
                type="tel"
                className={`input${
                  telephoneError ? " input--error" : ""
                } payment__tel-input`}
                name="phone"
                value={user.phone}
                onChange={onValueChange}
                placeholder="7 ___ ___ __ __"
                maxLength={11}
              />
            </label>
            <label className="label">
              <span className="label-text">E-mail</span>
              <input
                type="email"
                className={`input${emailError ? " input--error" : ""}`}
                name="email"
                value={user.email}
                onChange={onValueChange}
                placeholder="inbox@gmail.ru"
              />
            </label>
          </div>
        </div>
        <div className="payment__form-block">
          <h2 className="payment__form-title">Способ оплаты</h2>
          <div className="payment__method">
            <label
              className={`checkbox label payment__radio payment__radio_online${
                paymentError ? " checkbox--error" : ""
              }`}
            >
              <input
                type="radio"
                id="online-payment"
                className="visually-hidden checkbox-input passenger__radio-input"
                name="payment_method"
                value="online"
                checked={user.payment_method === "online" ? true : false}
                onChange={onValueChange}
              />
              <label
                className="checkbox-label passenger__radio-label"
                htmlFor="online-payment"
              ></label>
              <span className="checkbox-label-text passenger__radio-label-text">
                Онлайн
              </span>
            </label>
            <ul className="payment__method-types">
              <li className="payment__method-type">
                Банковской
                <br />
                картой
              </li>
              <li className="payment__method-type">PayPal</li>
              <li className="payment__method-type">Visa QIWI Wallet</li>
            </ul>
          </div>
          <div className="payment__method">
            <label
              className={`checkbox label payment__radio${
                paymentError ? " checkbox--error" : ""
              }`}
            >
              <input
                type="radio"
                id="cash-payment"
                className="visually-hidden checkbox-input passenger__radio-input"
                name="payment_method"
                value="cash"
                checked={user.payment_method === "cash" ? true : false}
                onChange={onValueChange}
              />
              <label
                className="checkbox-label passenger__radio-label"
                htmlFor="cash-payment"
              ></label>
              <span className="checkbox-label-text passenger__radio-label-text">
                Наличными
              </span>
            </label>
          </div>
        </div>
        {isErrorShown ? <FormError errors={errors} /> : ""}
      </div>
      <button className="btn payment__submit-btn">КУПИТЬ БИЛЕТЫ</button>
    </form>
  );
}

export default PaymentForm;
