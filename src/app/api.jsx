const config = {
  baseUrl: import.meta.env.VITE_APP_URL ?? "http://localhost:5173",
  ticketsUrl: "/dashboard/tickets",
  seatsUrl: "/dashboard/seats/:id",
  passengersUrl: "/dashboard/passengers",
  paymentUrl: "/dashboard/payment",
  orderUrl: "/dashboard/order",
  orderSuccessUrl: "/dashboard/order/success",
};

export default config;
