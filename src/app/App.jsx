import { Routes, Route } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import config from "./api";
import HomePage from "../pages/HomePage";
import TicketsPage from "../pages/TicketsPage/TicketsPage";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import HeroWrapperComponent from "../components/hero/HeroWrapperComponent";
import HeroForm from "../components/hero/HeroForm";
import Page404 from "../pages/Page404";
import SeatsPage from "../pages/SeatsPage/SeatsPage";
import PassengersPage from "../pages/passengers/PassengersPage";
import PaymentPage from "../pages/paymentPage/PaymentPage";
import OrderPage from "../pages/orderPage/OrderPage";
import OrderSuccessPage from "../pages/orderSuccessPage/OrderSuccessPage";
import ProgressBar from "../components/progressBar/ProgressBar";
import Loader from "../components/Loader";
import "./App.css";

function App() {
  const { pathname } = useLocation();
  const isHomePage = pathname === "/";
  const isProgressBarShown =
    pathname === config.ticketsUrl ||
    pathname === config.seatsUrl ||
    pathname === config.passengersUrl ||
    pathname === config.paymentUrl ||
    pathname === config.orderUrl;
  const isTicketsPage = pathname === config.ticketsUrl;
  const isSeatsPage = pathname === config.seatsUrl;
  const isOrderPage = pathname === config.orderUrl;

  const filterTicketsIsLoading = useSelector(
    (state) => state.filterTickets.isLoading
  );
  const seatsIsLoading = useSelector((state) => state.seats.isLoading);

  const isLoading = isTicketsPage ? filterTicketsIsLoading : seatsIsLoading;

  const Hero = HeroWrapperComponent(HeroForm);

  return (
    <>
      <Header />
      <main className="main">
        <Hero />
        {isHomePage ? (
          <Loader isHomePage={isHomePage} />
        ) : (isTicketsPage || isSeatsPage || isOrderPage) && isLoading ? (
          <Loader isHomePage={isHomePage} />
        ) : (
          ""
        )}
        {isProgressBarShown ? <ProgressBar /> : ""}
        <Routes>
          <Route path="/" exact element={<HomePage />} />
          <Route path={config.ticketsUrl} element={<TicketsPage />} />
          <Route path={config.seatsUrl} element={<SeatsPage />} />
          <Route path={config.passengersUrl} element={<PassengersPage />} />
          <Route path={config.paymentUrl} element={<PaymentPage />} />
          <Route path={config.orderUrl} element={<OrderPage />} />
          <Route path={config.orderSuccessUrl} element={<OrderSuccessPage />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
