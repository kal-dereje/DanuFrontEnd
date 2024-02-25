import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import dayjs from 'dayjs';
import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
function Schedule() {
    const [currentDate, setCurrentDate] = useState(dayjs());
    const [selectedDate, setSelectedDate] = useState(null);
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [appointments, setAppointments] = useState([]);
    const [error, setError] = useState('');

    const daysInMonth = currentDate.daysInMonth();
    const month = currentDate.format('MMM');
    const year = currentDate.format('YYYY');


const handleNextMonth = () => {
    setCurrentDate(currentDate.add(1, 'month'));
  };

  const handlePreviousMonth = () => {
    setCurrentDate(currentDate.subtract(1, 'month'));
  };

  const handleDateClick = (day) => {
    setSelectedDate(currentDate.date(day));
  };

  const handleSchedule = () => {
    if (!startTime || !endTime) {
        setError('Please provide both start time and end time.');
        return;
      }
  
      const isTimeSlotBooked = appointments.some(appointment =>
        appointment.date.isSame(selectedDate, 'day') &&
        ((appointment.startTime <= startTime && startTime < appointment.endTime) ||
         (appointment.startTime < endTime && endTime <= appointment.endTime))
      );
   

    if (isTimeSlotBooked) {
      setError('The time you selected is already Booked.');
    } else {
      setAppointments([...appointments, { date: selectedDate, startTime, endTime }]);
      setSelectedDate(null);
      setStartTime('');
      setEndTime('');
      setError('');
    }
  };
    return (
    
<div class="w-full h-[100vh] bg-white justify-start items-start flex flex-col">
    
    <div className="flex justify-end pt-14 w-[95%] ">
     
    <Link to='/ClientFormPage1' className="hover:cursor-pointer">  <img src="src/assets/next.svg" width={70} height={70}></img></Link>
        </div>
        <div className="w-full  bg-neutral-50 flex-col justify-center items-center gap-10 flex">
    
    <div className="flex-col w-full justify-center items-center gap-[5px] flex">
        <div><span className="text-black  text-[20px] md:text-[35px] font-bold font-['Roboto Condensed']">Hey There, </span><span className="text-orange-400 text-[35px] font-bold font-['Roboto Condensed']">MindRest</span><span className="text-black text-[35px] font-bold font-['Roboto Condensed']"> </span></div>
        <div className="text-teal-600 opacity-50 text-2xl font-semibold font-['Roboto Condensed']">Let’s Schedule Your Appointment</div>
    <div>
        <div className='flex flex-col md:flex-row ml-28 justify-center self-center items-center'>
    <div className="flex flex-col items-center justify-center">
      <div className="bg-white rounded-lg shadow px-14 py-7">
        <div className="flex justify-between items-center mb-4"> 
          <h2 className="text-xl text-teal-900 font-bold">{`${month} ${year}`}</h2>
          <button onClick={handlePreviousMonth}> <FaAngleLeft className="text-teal-900"/></button>
          <h2 className="text-2xl text-teal-600 opacity-50 font-semibold">Today</h2>
          <button onClick={handleNextMonth}><FaAngleRight className='text-teal-900'/></button>
        </div>
        <div className="grid grid-cols-7 gap-2">
            {days.map((day) => (
              <div key={day} className="font-semibold">{day}</div>
            ))}
            {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
              const date = currentDate.date(day);
              const isBeforeToday = date.isBefore(dayjs(), 'day');
              return (
                <div
                  key={day}
                  className={`h-8 w-8 flex items-center justify-center rounded-full border ${isBeforeToday ? 'text-gray-400 cursor-default' : 'border-gray-200 font-semibold active:bg-teal-900 hover:border-teal-500 hover:bg-teal-900 hover:text-white cursor-pointer'}`}
                  onClick={!isBeforeToday ? () => handleDateClick(day) : undefined}
                >
                  {day}
                </div>
              );
            })}
          </div>
      </div>
    </div>
    <div className="flex flex-col  px-14 py-7 items-center justify-center">
      
    {selectedDate && (
        <div className="bg-white rounded-lg flex flex-col gap-3 shadow px-14 py-7 ">
          <h2 className="text-xl font-bold mb-4">Scheduled For <span className='text-orange-500'>{selectedDate.format('MMM D, YYYY')}</span></h2>
          <div className="grid grid-cols-4 gap-1">

          {appointments.map((appointment, index) => (
        <div key={index} className="bg-gray-100 text-center flex flex-col w-[6rem] rounded">
          <h2 className="text-base font-medium text-gray-500 ">Booked</h2>
          <p className=' text-xs'>{appointment.startTime} - {appointment.endTime}</p>
        </div>
      ))}</div>
          <div className="flex flex-col ml-4">
          {error && <p className="text-red-500">{error}</p>}
            <label className="mb-2 font-semibold">Start Time:</label>
            <input type="time" className="border border-gray-200 rounded p-2 mb-4" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
            <label className="mb-2 font-semibold">End Time:</label>
            <input type="time" className="border border-gray-200 rounded p-2 mb-4" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
            <button className="bg-teal-700 text-white rounded p-2" onClick={handleSchedule}>Schedule</button>
          </div>
        </div>
      )}
      
        </div>
    </div>
   </div>
   </div>
   </div>
   
</div>
      
      )
    }

export  default  Schedule;