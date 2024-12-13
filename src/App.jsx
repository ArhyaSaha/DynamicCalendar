import { useState, useEffect, useContext } from 'react'
import { Button } from "@/components/ui/button"
import userContext from './context/userContext'
import './App.css'
import { getMatrix } from './daysMatrix'
import CalendarHeader from './components/CalendarHeader'
import Sidebar from './components/Sidebar'
import Calendar from './components/Calendar'
import AddEvent from './components/AddEvent'
import dacoidLogo from './assets/dacoid.png';
import { Toaster } from "@/components/ui/toaster"

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function App() {
  const [currentMonth, setCurrentMonth] = useState((new Date()).getMonth())
  const [currentYear, setCurrentYear] = useState((new Date()).getFullYear())
  const [currentMonthArray, setCurrentMonthArray] = useState(getMatrix(currentMonth))

  // Update the month array when the month or year changes
  useEffect(() => {
    setCurrentMonthArray(getMatrix(currentMonth))
  }, [currentMonth, currentYear])

  const { eventModal, sidebarVisible } = useContext(userContext)
  return (
    <>
      {eventModal && <AddEvent />}
      <div className='flex flex-col w-full h-screen justify-center '>
        <div className='nav bg-black w-full flex justify-between items-center px-5 py-3'>
          <img src={dacoidLogo} alt="Dacoid Digital" className="h-7" />
          <h1 className='font-bold text-white text-lg'>Dynamic Calendar</h1>
          <p className='text-white'>Internship Task</p>
        </div>

        <div className="h-screen w-full flex flex-col">
          <CalendarHeader currentMonth={currentMonth} setCurrentMonth={setCurrentMonth} currentYear={currentYear} setCurrentYear={setCurrentYear} />
          <div className="flex flex-1">
            {sidebarVisible && <Sidebar />}
            <div className="w-full h-full">
              <div className="grid grid-cols-7">
                {daysOfWeek.map((day, index) => (
                  <div key={index} className="text-center font-bold py-2">
                    {day}
                  </div>
                ))}
              </div>
              <Calendar month={currentMonthArray} currentMonth={currentMonth} />
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </>
  )
}

export default App
