import { useSelector } from 'react-redux';

import HeroDate from './HeroDate';

function HeroDates() {
    const { date_start, date_end } = useSelector((state) => state.searchTickets.form);

    return (
        <div className='hero__label'>
            <span className='hero__label-text'>Дата</span>
            <div className='hero__inputs-wrapper'>
                <HeroDate route='from' date={date_start} />
                <HeroDate route='to' date={date_end} />
            </div>
        </div>
    )
}

export default HeroDates;