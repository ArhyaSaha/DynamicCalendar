import React from 'react'
import Day from './Day'


const Calendar = ({ month, currentMonth }) => {
    return (
        <div className='flex-1 h-full grid grid-cols-7 grid-rows-5'>
            {month.map((row, i) => (
                <React.Fragment key={i}>
                    {row.map((day, idx) => (
                        <Day currentMonth={currentMonth} day={day} key={idx} rowIdx={i} />
                    ))}
                </React.Fragment>
            ))}

        </div>
    )
}

export default Calendar