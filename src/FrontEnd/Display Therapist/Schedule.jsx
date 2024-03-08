import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import dayjs from "dayjs";
import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
function Schedule() {
  const location = useLocation();
  console.log(location.state.data);
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [selectedDate, setSelectedDate] = useState(null);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState("");

  const daysInMonth = currentDate.daysInMonth();
  const month = currentDate.format("MMM");
  const year = currentDate.format("YYYY");

  const handleNextMonth = () => {
    setCurrentDate(currentDate.add(1, "month"));
  };

  const handlePreviousMonth = () => {
    setCurrentDate(currentDate.subtract(1, "month"));
  };

  const handleDateClick = (day) => {
    let booked = true;
    const selectedDate2 = currentDate.date(day)["$d"].toString().split(" ");
    const year2 = selectedDate2[3];
    const month2 = selectedDate2[1];
    const weekDay = selectedDate2[0];
    const day2 = selectedDate2[2];

    const availabelDays = location.state.data.availabeDays;
    const schedules = location.state.data.schedules;

    availabelDays.forEach((day) => {
      if (day.substring(0, 3) == weekDay) {
        booked = false;
      }
    });
    setAppointments([]);
    if (booked) {
      setError("Sorry the therapist is not available on this day");
    } else {
      setError("");
      schedules.forEach((schedule) => {
        if (schedule.day == day2) {
          schedules.forEach((schedule) => {
            setAppointments((prevAppointments) => [
              ...prevAppointments,
              {
                startTime: schedule.startTime,
                endTime: schedule.endTime,
              },
            ]);
          });
        }
      });
    }

    setSelectedDate(currentDate.date(day));
  };

  const handleSchedule = () => {
    let booked = true;
    const selectedDate2 = selectedDate["$d"].toString().split(" ");
    const year2 = selectedDate2[3];
    const month2 = selectedDate2[1];
    const weekDay = selectedDate2[0];
    const day2 = selectedDate2[2];

    const availabelDays = location.state.data.availabeDays;
    const schedules = location.state.data.schedules;

    availabelDays.forEach((day) => {
      if (day.substring(0, 3) == weekDay) {
        booked = false;
      }
    });

    if (booked) {
      setError("Sorry the therapist is not available on this day");
    } else {
      setError("");
      booked = false;

      schedules.forEach((schedule) => {
        if (schedule.day == day2) {
          if (convertTo12HourFormat(startTime) == schedule.startTime) {
            booked = true;
          }
        }
      });
    }

    if (booked) {
      setError("Sorry the therapist is booked at this time");
    } else {
      const therapistId = location.state.data.user._id;
      const clientId = sessionStorage.getItem("userID");
      let finalPrice = location.state.data.pricePerHour;
      const scheduleInformation = {
        therapistId,
        clientId,
        year: year2,
        month: month2,
        day: day2,
        startTime: convertTo12HourFormat(startTime),
        endTime: convertTo12HourFormat(endTime),
        pricePerHour: finalPrice,
      };
      navigate("/Payment", { state: { scheduleInformation } });
    }

    // if (!startTime || !endTime) {
    //   setError("Please provide both start time and end time.");
    //   return;
    // }

    // const isTimeSlotBooked = appointments.some(
    //   (appointment) =>
    //     appointment.date.isSame(selectedDate, "day") &&
    //     ((appointment.startTime <= startTime &&
    //       startTime < appointment.endTime) ||
    //       (appointment.startTime < endTime && endTime <= appointment.endTime))
    // );

    // if (isTimeSlotBooked) {
    //   setError("The time you selected is already Booked.");
    // } else {
    //   setAppointments((prevAppointments) => [
    //     ...prevAppointments,
    //     { date: selectedDate, startTime, endTime },
    //   ]);

    //   setSelectedDate(null);
    //   setStartTime("");
    //   setEndTime("");
    //   setError("");
    // }
  };
  function convertTo12HourFormat(time24) {
    // Split the time string into hours and minutes
    var time = time24.split(":");
    var hours = parseInt(time[0]);
    var minutes = parseInt(time[1]);

    // Determine the period (AM/PM)
    var period = hours >= 12 ? "PM" : "AM";

    // Convert hours to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // Handle midnight (0 hours)

    // Append '0' to single-digit minutes
    minutes = minutes < 10 ? "0" + minutes : minutes;

    // Return the time in 12-hour format
    return hours + ":" + minutes + " " + period;
  }

  return (
    <div className="w-full h-[100vh] bg-white justify-start items-start flex flex-col">
      <button
        onClick={() => {
          navigate(-1);
        }}
        className="hover:cursor-pointer  m-12  transition-transform transform hover:scale-110"
      >
        <img className="  " src=" src/assets/client landing/back.svg"></img>
      </button>{" "}
      <div className="w-full  bg-neutral-50 flex-col justify-center items-center gap-10 flex">
        <div className="flex-col w-full justify-center items-center gap-[5px] flex">
          <div>
            <span className="text-black  text-[20px] md:text-[35px] font-bold font-['Roboto Condensed']">
              Hey There,{" "}
            </span>
            <span className="text-orange-400 text-[35px] font-bold font-['Roboto Condensed']">
              MindRest
            </span>
            <span className="text-black text-[35px] font-bold font-['Roboto Condensed']">
              {" "}
            </span>
          </div>
          <div className="text-teal-600 opacity-50 text-2xl font-semibold font-['Roboto Condensed']">
            Let’s Schedule Your Appointment
          </div>
          <div>
            <div className="flex flex-col md:flex-row ml-28 justify-center self-center items-center">
              <div className="flex flex-col items-center justify-center">
                <div className="bg-white rounded-lg shadow px-14 py-7">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl text-teal-900 font-bold">{`${month} ${year}`}</h2>
                    <button onClick={handlePreviousMonth}>
                      {" "}
                      <FaAngleLeft className="text-teal-900" />
                    </button>
                    <h2 className="text-2xl text-teal-600 opacity-50 font-semibold">
                      Today
                    </h2>
                    <button onClick={handleNextMonth}>
                      <FaAngleRight className="text-teal-900" />
                    </button>
                  </div>
                  <div className="grid grid-cols-7 gap-2">
                    {days.map((day) => (
                      <div key={day} className="font-semibold">
                        {day}
                      </div>
                    ))}
                    {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(
                      (day) => {
                        const date = currentDate.date(day);
                        const isBeforeToday = date.isBefore(dayjs(), "day");
                        return (
                          <div
                            key={day}
                            className={`h-8 w-8 flex items-center justify-center rounded-full border ${
                              isBeforeToday
                                ? "text-gray-400 cursor-default"
                                : "border-gray-200 font-semibold active:bg-teal-900 hover:border-teal-500 hover:bg-teal-900 hover:text-white cursor-pointer"
                            }`}
                            onClick={
                              !isBeforeToday
                                ? () => handleDateClick(day)
                                : undefined
                            }
                          >
                            {day}
                          </div>
                        );
                      }
                    )}
                  </div>
                </div>
              </div>
              <div className="flex flex-col  px-14 py-7 items-center justify-center">
                {selectedDate && (
                  <div className="bg-white rounded-lg flex flex-col gap-3 shadow px-14 py-7 ">
                    <h2 className="text-xl font-bold mb-4">
                      Scheduled For{" "}
                      <span className="text-orange-500">
                        {selectedDate.format("MMM D, YYYY")}
                      </span>
                    </h2>
                    <div className="grid grid-cols-4 gap-1">
                      {appointments.map((appointment, index) => (
                        <div
                          key={index}
                          className="bg-gray-100 text-center flex flex-col w-[6rem] rounded"
                        >
                          <h2 className="text-base font-medium text-gray-500 ">
                            Booked
                          </h2>
                          <p className=" text-xs">
                            {appointment.startTime} - {appointment.endTime}
                          </p>
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-col ml-4">
                      {error && <p className="text-red-500">{error}</p>}
                      <label className="mb-2 font-semibold">Start Time:</label>
                      <input
                        type="time"
                        className="border border-gray-200 rounded p-2 mb-4"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                      />
                      <label className="mb-2 font-semibold">End Time:</label>
                      <input
                        type="time"
                        className="border border-gray-200 rounded p-2 mb-4"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                      />
                      <button
                        className="bg-teal-700 text-white rounded p-2"
                        onClick={handleSchedule}
                      >
                        Schedule
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Schedule;
