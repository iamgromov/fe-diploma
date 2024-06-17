function Message({ status }) {
  return (
    <div className="footer__subscription-message">
      <span className="footer__subscription-message-text">{status}</span>
    </div>
  );
}

export default Message;
