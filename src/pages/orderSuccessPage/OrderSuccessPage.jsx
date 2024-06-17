import { useEffect, useState } from "react";
import { customAlphabet } from "nanoid";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import OrderSuccessDetails from "../../components/orderSuccess/OrderSuccessDetails";
import { scrollTo } from "../../helpers/scrollTo";
import "./OrderSuccess.css";

function OrderSuccessPage() {
  const navigate = useNavigate();
  const { success } = useSelector((state) => state.order);
  const [orderId, setOrderId] = useState("");

  const nanoid = customAlphabet("1234567890ABCDEF", 5);

  useEffect(() => {
    !success && navigate("/");
    scrollTo();
    setOrderId(nanoid());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <section className="dashboard order-success">
      <div className="container">
        {!success ? "" : <OrderSuccessDetails orderId={orderId} />}
      </div>
    </section>
  );
}

export default OrderSuccessPage;
