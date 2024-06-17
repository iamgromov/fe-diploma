function TicketsHero(props) {
    const {heroClass} = props;

    return (
        <section className={heroClass}>
            <div className='container'>
                {props.children}
            </div>
        </section>
    )
}

export default TicketsHero;