import React from 'react'
import { FaPlus, FaTrash } from "react-icons/fa";
import AddEvent from './AddEvent'
import { useContext } from 'react';
import userContext from '@/context/userContext';
import { motion } from 'framer-motion';
import { useToast } from "@/hooks/use-toast"



const Day = ({ day, currentMonth }) => {
    const { toast } = useToast()


    const { daySelected, setDaySelected, setEventModal, events, deleteEvent, updateEvent, setSelectedEvent, sidebarVisible, showSidebar } = useContext(userContext)

    // Function to highlight current day and selected day
    const getCurrentDayClass = () => {
        const currentDate = new Date()
        if (day.getDate() === currentDate.getDate() && day.getMonth() === currentDate.getMonth()) {
            return 'bg-blue-200 text-white rounded-full text-center w-7'
        } else if (day.getTime() === daySelected?.getTime()) {
            return 'bg-green-200 text-white rounded-full text-center w-7'; // Change color for selected date
        } else {
            return '';
        }
    }

    // Function to color days not of the current month
    const getColor = () => {
        if (day.getMonth() !== currentMonth) {
            return 'bg-gray-100'
        }
        else return 'bg-white'
    };

    // Filter events for the current day 
    const dayEvents = events.filter(event => new Date(event.day).toDateString() === day.toDateString());

    // Functions to handle drag and drop events
    const handleDragStart = (e, event) => {
        e.dataTransfer.setData('event', JSON.stringify(event));
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const event = JSON.parse(e.dataTransfer.getData('event'));
        const updatedEvent = { ...event, day: day.valueOf() };
        updateEvent(updatedEvent);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    return (
        <>
            <div className={`group overflow-y-auto ${getColor()} overflow-x-hidden cursor-pointer border border-gray-200 transform hover:transform hover:bg-slate-200 `} onClick={() => { setDaySelected(day); showSidebar(); }} onDrop={handleDrop} onDragOver={handleDragOver}>
                <div className='flex justify-between items-center px-2 pt-2 pb-1'>
                    <p className={`text-sm p-1 my-1 text-left ${getCurrentDayClass()}`}>
                        {day.getDate()}
                    </p>
                    <button onClick={(e) => { e.stopPropagation(); setDaySelected(day); setEventModal(true); }} className='hidden group-hover:block hover:scale-125 shadow-2xl rounded-full'>
                        <FaPlus />
                    </button>
                </div>
                <div>
                    {dayEvents.map(event => ( // Display events for the current day

                        // FramerMotion to smooth drag and drop animations
                        <motion.div
                            key={event.id}
                            style={{ backgroundColor: event.label }}
                            className={`p-1 py-2 mb-1 mr-1 text-xs text-white w-full rounded group-hover:bg-opacity-75`}
                            onClick={(e) => { e.stopPropagation(); setDaySelected(day); setSelectedEvent(event); setEventModal(true); }}
                            draggable
                            onDragStart={(e) => handleDragStart(e, event)}
                            whileHover={{ scale: 1.05 }}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                        >
                            <div className='group flex cursor-pointer justify-between items-center'>
                                <span className='text-left'>{event.startTime} - {event.endTime}</span>
                                <span className='flex-1 text-center'>{event.title}</span>
                                <button onClick={(e) => {
                                    e.stopPropagation();
                                    deleteEvent(event.id);
                                    setDaySelected(null)
                                    toast({
                                        variant: "destructive",
                                        title: "You deleted an event.",
                                        description: "The event has been deleted successfully",
                                    })
                                }} className='ml-2 mr-2 text-white hidden group-hover:block'>
                                    <FaTrash />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
            {/* <AddEvent /> */}
        </>
    )
}

export default Day