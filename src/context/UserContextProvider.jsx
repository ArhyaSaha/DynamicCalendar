import React from 'react';
import userContext from './userContext';
import { useState, useEffect } from 'react';

const UserContextProvider = ({ children }) => {

    // initializing the states
    const [user, setUser] = useState(null)
    const [eventModal, setEventModal] = useState(false);
    const [daySelected, setDaySelected] = useState(null);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [events, setEvents] = useState([]);
    const [sidebarVisible, setSidebarVisible] = useState(false);



    // Load events from local storage
    useEffect(() => {
        const storedEvents = JSON.parse(localStorage.getItem('events')) || [];
        setEvents(storedEvents);
    }, []);

    // Close the event modal when it is hidden
    useEffect(() => {
        if (!eventModal) {
            setSelectedEvent(null);
        }
    }, [eventModal]);



    // Function to add an event
    const addEvent = (calendarEvent) => {
        const updatedEvents = [...events, calendarEvent];
        setEvents(updatedEvents);
        localStorage.setItem('events', JSON.stringify(updatedEvents));
    };

    // Function to delete an event
    const deleteEvent = (eventId) => {
        const updatedEvents = events.filter(event => event.id !== eventId);
        setEvents(updatedEvents);
        localStorage.setItem('events', JSON.stringify(updatedEvents));
    };

    // Function to update an event
    const updateEvent = (updatedEvent) => {
        const updatedEvents = events.map(event => event.id === updatedEvent.id ? updatedEvent : event);
        setEvents(updatedEvents);
        localStorage.setItem('events', JSON.stringify(updatedEvents));
    };


    // Function to show the sidebar
    const showSidebar = () => {
        setSidebarVisible(true);
    };

    // Function to hide the sidebar
    const hideSidebar = () => {
        setSidebarVisible(false);
        setDaySelected(null);
    };

    return (
        <userContext.Provider value={{ user, setUser, eventModal, setEventModal, daySelected, setDaySelected, selectedEvent, setSelectedEvent, events, addEvent, deleteEvent, updateEvent, sidebarVisible, showSidebar, hideSidebar }}>
            {children}
        </userContext.Provider>
    )
}

export default UserContextProvider;