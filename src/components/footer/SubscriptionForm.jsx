import { useState } from "react";

import Message from "./Message";

function SubscriptionForm() {
  const [form, setForm] = useState({
    email: "",
  });
  const [message, setMessage] = useState("");

  const sendEmailData = async () => {
    try {
      const response = await fetch(
        import.meta.env.VITE_APP_URL +
          import.meta.env.VITE_SUBSCRIBE_REQ +
          form.email,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const newData = await response.json();

      if (newData.status) {
        setMessage("Вы успешно подписались на рассылку!");

        setTimeout(() => {
          setMessage("");
        }, 5000);
      }
    } catch (error) {
      setMessage(error);
    }
  };

  const isEmailValid = (email) => {
    const regex = /[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+/;

    if (regex.test(email) === false) {
      return false;
    }

    return true;
  };

  const onSubmit = (e) => {
    e.preventDefault();

    setMessage("");

    if (form.email === "") {
      setMessage("Поле не может быть пустым.");
      return;
    }

    if (isEmailValid(form.email) === false) {
      setMessage("Вы указали невалидный адрес электронной почты.");
      return;
    }

    sendEmailData();
    setForm({ email: "" });
  };

  const onValueChange = (e) => {
    setForm((prevForm) => ({ ...prevForm, [e.target.name]: e.target.value }));
  };

  return (
    <div className="footer__subscription">
      <h3 className="footer__title">Подписка</h3>
      <form className="footer__subscription-form" onSubmit={onSubmit}>
        <label className="footer__subscription-label">
          <span className="footer__subscription-label-text">
            Будьте в курсе событий
          </span>
          <input
            type="text"
            className="footer__subscription-input"
            name="email"
            placeholder="e-mail"
            value={form.email}
            onChange={onValueChange}
          />
        </label>
        <button className="footer__subscription-btn">Отправить</button>
      </form>
      {message !== "" ? <Message status={message} /> : ""}
    </div>
  );
}

export default SubscriptionForm;
