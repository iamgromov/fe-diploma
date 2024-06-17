function TicketSeat({ name, amount, price }) {
  return (
    <div className="ticket__seat">
      <span className="ticket__seat-name">{name}</span>
      <span className="ticket__seat-amount">{amount}</span>
      <span className="ticket__seat-price">
        <span className="ticket__seat-price-text">от</span>{" "}
        <span className="ticket__seat-price-amount">{price}</span>{" "}
        <span className="ticket__seat-price-symbol">₽</span>
      </span>
    </div>
  );
}

export default TicketSeat;
