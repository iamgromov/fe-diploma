function OrderHero(props) {
    const {heroClass} = props;

    return (
        <section className={heroClass}>
            <div className='container'>
                <div className='hero__wrapper'></div>
            </div>
        </section>
    )
}

export default OrderHero;