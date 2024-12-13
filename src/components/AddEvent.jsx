import React, { useContext, useState } from 'react'
import { IoIosClose } from "react-icons/io";
import { MdDragHandle } from "react-icons/md";
import { Button } from './ui/button';
import userContext from '@/context/userContext';
import { FaCheck } from "react-icons/fa";

const labelsClasses = [
    "indigo",
    "gray",
    "green",
    "blue",
    "red",
    "purple",
];

const AddEvent = () => {

    const { setEventModal, setDaySelected, daySelected, selectedEvent, events, addEvent, updateEvent,sidebarVisible } = useContext(userContext)

    const [title, setTitle] = useState(
        selectedEvent ? selectedEvent.title : ""
    );
    const [description, setDescription] = useState(
        selectedEvent ? selectedEvent.description : ""
    );
    const [selectedLabel, setSelectedLabel] = useState(
        selectedEvent
            ? labelsClasses.find((lbl) => lbl === selectedEvent.label)
            : labelsClasses[0]
    );
    const [errorMessage, setErrorMessage] = useState("")
    const [startTime, setStartTime] = useState(selectedEvent ? selectedEvent.startTime : "");
    const [endTime, setEndTime] = useState(selectedEvent ? selectedEvent.endTime : "");

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];


    // Function to handle form submission
    function handleSubmit(e) {
        e.preventDefault();

        //Check for time conflicts
        const eventDate = daySelected ? new Date(daySelected) : new Date();
        const conflict = events.some(event =>
            new Date(event.day).toDateString() === eventDate.toDateString() &&
            ((startTime >= event.startTime && startTime < event.endTime) || (endTime > event.startTime && endTime <= event.endTime)) &&
            event.id !== (selectedEvent ? selectedEvent.id : null)
        );

        if (conflict) {
            setErrorMessage("There is already an event scheduled at this time.");
            return;
        }

        // Create a new event object
        const calendarEvent = {
            title,
            description,
            label: selectedLabel,
            day: daySelected ? daySelected.valueOf() : new Date().valueOf(),
            startTime,
            endTime,
            id: selectedEvent ? selectedEvent.id : Date.now(),
        };

        // Update or add the event
        if (selectedEvent) {
            updateEvent(calendarEvent);
        } else {
            addEvent(calendarEvent);
        }

        // Close the modal
        if (sidebarVisible) {
            setEventModal(false);
        } else {
            setEventModal(false);
            setDaySelected(null);
        }
    }


    return (
        <div className='h-screen w-full fixed left-0 top-0 flex justify-center items-center z-50'>
            <form className='bg-white rounded-lg shadow-md w-1/4' onSubmit={handleSubmit}>
                <header className='bg-gray-100 flex justify-between px-4 py-2 items-center'>
                    <span className='text-gray-400'>
                        <MdDragHandle />
                    </span>
                    <button type='button' onClick={() => { setDaySelected(null); setEventModal(false) }}>
                        <span className='text-gray-400 text-3xl'>
                            <IoIosClose />
                        </span>
                    </button>
                </header>

                <div className='w-full px-5 py-4 flex flex-col'>
                    <h2 className='text-left text-xl font-semibold pb-4'>{selectedEvent ? "Update Event" : "Add Event"}</h2>
                    <p className='pt-4 pb-2 text-left'>{daySelected.getDate()} {months[daySelected.getMonth()]} </p>
                    <input type="text" placeholder='Enter Title' value={title} required onChange={(e) => setTitle(e.target.value)} className='pt-3 border-0 text-gray-600 pb-2 text-xl font-semibold border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500' />
                    <input type="text" name="description" value={description} placeholder="Add a description" required onChange={(e) => setDescription(e.target.value)} className="mt-2 pt-3 font-semibold border-0 text-gray-600 pb-2 w-full border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500" />
                    <div className='flex space-x-5 justify-center my-3'>
                        <div className='flex-1 text-left'>
                            <label className='block text-left'>Start Time</label>
                            <input type="time" name="startTime" value={startTime} required onChange={(e) => setStartTime(e.target.value)} className="pt-3 font-semibold border-0 text-gray-600 pb-2 w-20 border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500" />
                        </div>
                        <div className='flex-1 text-left'>
                            <label className='block text-left'>End Time</label>
                            <input type="time" name="endTime" value={endTime} required onChange={(e) => setEndTime(e.target.value)} className="pt-3 w-20 font-semibold border-0 text-gray-600 pb-2 border-b-2 border-gray-200 focus:outline-none focus:ring-0 focus:border-blue-500" />
                        </div>
                    </div>
                    <div className='flex space-x-2 mt-4'>
                        {labelsClasses.map((label, i) => (
                            <span
                                key={label}
                                style={{ backgroundColor: labelsClasses[i] }}
                                className={`mb-4 w-6 h-6 rounded-full cursor-pointer ${selectedLabel === label ? 'ring-2 ring-offset-2 ring-blue-500' : ''}`}
                                onClick={() => setSelectedLabel(label)}
                            >
                                {selectedLabel === label && <FaCheck className='text-white m-1' />}
                            </span>
                        ))}
                    </div>
                    {errorMessage && <p className='text-red-500'>{errorMessage}</p>}
                    <footer className="flex justify-end border-t p-3 mt-5">
                        <button
                            type="submit"
                            onClick={handleSubmit}
                            className="bg-blue-500 hover:bg-blue-600 px-6 py-2 rounded text-white"
                        >
                            {selectedEvent ? "Update" : "Save"}
                        </button>
                    </footer>
                </div>
            </form>
        </div>
    )
}

export default AddEvent
