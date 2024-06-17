import { useLocation } from "react-router-dom";

import MainHero from "./MainHero";
import TicketsHero from "./TicketsHero";
import OrderHero from "./OrderHero";
import config from "../../app/api";
import "./Hero.css";

function HeroWrapperComponent(Component) {
  const WrappedComponent = (props) => {
    const { pathname } = useLocation();
    const isHomePage = pathname === "/";
    const isOrderSuccessUrlPage = pathname === config.orderSuccessUrl;

    if (isHomePage) {
      return (
        <MainHero heroClass="hero hero_main">
          <Component {...props} heroFormClass="hero__form hero__form_main" />
        </MainHero>
      );
    }

    if (isOrderSuccessUrlPage) {
      return <OrderHero heroClass="hero hero_order" />;
    }

    return (
      <TicketsHero heroClass="hero hero_ticket">
        <Component {...props} heroFormClass="hero__form hero__form_ticket" />
      </TicketsHero>
    );
  };

  WrappedComponent.displayName = "HeroWrapperComponent";
  return WrappedComponent;
}

export default HeroWrapperComponent;
