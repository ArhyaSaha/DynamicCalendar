import React, { useContext } from 'react'
import { IoIosClose } from "react-icons/io";
import userContext from '@/context/userContext'

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const Sidebar = () => {

    // Destructure the context
    const { daySelected, hideSidebar, events, setSelectedEvent, setEventModal } = useContext(userContext)

    // Filter events for the selected day
    const dayEvents = events.filter(event => new Date(event.day).toDateString() === daySelected.toDateString());



    return (
        <div className='w-64 bg-white border p-2'>
            <header className='flex justify-between items-center p-1'>
                <p className='text-lg font-semibold'>{daySelected.getDate()} {months[daySelected.getMonth()]}</p>
                <button onClick={hideSidebar}>
                    <span className='text-3xl '>
                        <IoIosClose />
                    </span>
                </button>

            </header>
            <div className='mt-3'>
                <p className='text-lg mt-7 font-semibold'>Events</p>
                <div className='p-2 mt-4'>
                    {dayEvents.length > 0 ? (
                        dayEvents.map(event => (
                            <div key={event.id} className='mt-3 mb-3 cursor-pointer bg-white border-gray-200 border rounded overflow-hidden' onClick={() => { setSelectedEvent(event); setEventModal(true); }}>
                                <div style={{ backgroundColor: event.label }} className='h-4 m-0 p-0' ></div>
                                <p className='text-lg pt-4 pb-2 font-semibold'>{event.title}</p>
                                <p className='text-sm pb-2 px-4'>{event.description}</p>
                                <p className='text-md font-bold pb-4'>{event.startTime} - {event.endTime}</p>
                            </div>
                        ))
                    ) : (
                        <p className='text-sm'>No events for this day</p>
                    )}
                </div>
            </div>

        </div>
    )
}

export default Sidebar;
