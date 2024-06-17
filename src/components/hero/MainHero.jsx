function MainHero(props) {
  const { heroClass } = props;

  return (
    <section className={heroClass}>
      <div className="container">
        <div className="hero__wrapper">
          <h1 className="hero__title">
            Вся жизнь -<br />
            <span className="hero__title-span">путешествие!</span>
          </h1>
          {props.children}
        </div>
      </div>
    </section>
  );
}

export default MainHero;
