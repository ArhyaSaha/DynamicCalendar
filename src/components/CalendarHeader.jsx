import userContext from '@/context/userContext';
import React, { useContext } from 'react'
import { FaChevronUp } from "react-icons/fa";
import { FaChevronDown, FaCopy, FaRegCopy } from "react-icons/fa";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import { useToast } from "@/hooks/use-toast"



const CalendarHeader = ({ currentMonth, setCurrentMonth, currentYear, setCurrentYear }) => {
    const { toast } = useToast()

    // Function to navigate to the next month
    const nextMonth = () => {
        if (currentMonth === 11) {
            setCurrentMonth(0)
            setCurrentYear(currentYear + 1)
        } else {
            setCurrentMonth(currentMonth + 1)
        }
    }

    // Function to navigate to the previous month
    const prevMonth = () => {
        if (currentMonth === 0) {
            setCurrentMonth(11)
            setCurrentYear(currentYear - 1)
        } else {
            setCurrentMonth(currentMonth - 1)
        }
    }

    const { events } = useContext(userContext);

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const copyToClipboard = () => {
        // Filter the events for the current month
        const currentMonthEvents = events.filter(event => {
            const eventDate = new Date(event.day);
            return eventDate.getMonth() === currentMonth && eventDate.getFullYear() === currentYear;
        });

        // Check if there are any events for the current month
        if (currentMonthEvents.length === 0) {
            toast({
                title: "Sorry! No events to copy.",
                description: "You have no events this month.",
            })
            return;
        }

        // Convert the events to JSON
        const eventDetails = currentMonthEvents.map(event => ({
            title: event.title,
            description: event.description,
            startTime: event.startTime,
            endTime: event.endTime,
            date: new Date(event.day).toDateString(),
            label: event.label
        }));
        const eventDetailsJson = JSON.stringify(eventDetails, null, 2);


        // Copy the events to the clipboard
        navigator.clipboard.writeText(eventDetailsJson).then(() => {
            toast({
                title: "Success!",
                description: "We have copied the events to your clipboard",
            })
        }).catch(err => {
            console.error('Failed to copy: ', err);

            // Show a ShadcnUI toast notification if the copy fails
            toast({
                variant: "destructive",
                title: "Uh oh! We couldnt copy the events",
                description: "Something went wrong, please try again later",
            })
        });
    };

    return (
        <header className='px-5 py-2 flex items-center border-b-black text-black bg-white'>
            {/* Button to navigate to the previous month */}
            <button onClick={prevMonth} className='transform hover:scale-110'>
                <span className=' cursor-pointer'>
                    <FaChevronUp />
                </span>
            </button>

            {/* Display the current month and year */}
            <h1 className='mx-5 text-xl w-40 font-bold'>{months[currentMonth]} {currentYear}</h1>

            {/* Button to navigate to the next month */}
            <button onClick={nextMonth} className='transform hover:scale-110'>
                <span className='transform hover:scale-110 cursor-pointer'>
                    <FaChevronDown />
                </span>
            </button>

            {/* Copy to clipboard button with hover card */}
            <div className='flex items-center ml-auto'>
                <HoverCard>
                    <HoverCardTrigger>
                        <button onClick={copyToClipboard} className='transform hover:scale-110 mr-5 text-xl'>
                            <FaRegCopy />
                        </button>
                    </HoverCardTrigger>
                    <HoverCardContent className='bg-white'>
                        Copy {months[currentMonth]}'s events in JSON
                    </HoverCardContent>
                </HoverCard>


            </div>
        </header>
    )
}

export default CalendarHeader