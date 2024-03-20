import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import dayjs from "dayjs";
import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";
import axios from "axios";
import endpoint from "../endpoint";
import { log } from "console";

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
function Schedule() {
  const location = useLocation();

  const weekDays = {
    Sun: "Sunday",
    Mon: "Monday",
    Tue: "Tuesday",
    Wed: "Wednesday",
    Thu: "Thursday",
    Fri: "Friday",
    Sat: "Saturday",
  };
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [selectedDate, setSelectedDate] = useState(null);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState("");
  const [booked, setBooked] = useState("");
  const firstDayOfMonth = currentDate.startOf("month").day();
  const start = new Date(`1970-01-01T${startTime}Z`);
  const end = new Date(`1970-01-01T${endTime}Z`);
  const diff = Math.abs((end - start) / 60000);
  let finalPrice = location.state.data.pricePerHour;
  const [schedules, setSchedules] = useState([]);

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

    availabelDays.forEach((day) => {
      if (day.substring(0, 3) == weekDay) {
        booked = false;
      }
    });
    setAppointments([]);
    if (booked) {
      setBooked(true);
      setError("Sorry the therapist is not available on this day");
    } else {
      setBooked(false);
      setError("");
      schedules.forEach((schedule) => {
        if (
          schedule.year == year2 &&
          schedule.month == month2 &&
          schedule.day == day2
        ) {
          setAppointments((prevAppointments) => [
            ...prevAppointments,
            {
              startTime: schedule.startTime,
              endTime: schedule.endTime,
            },
          ]);
        }
      });

      console.log(appointments);
    }

    setSelectedDate(currentDate.date(day));
  };
  function convertTo24HourFormat(time12hr) {
    const [time, period] = time12hr.split(" ");
    const [hours, minutes] = time.split(":").map(Number);

    if (period === "AM") {
      if (hours === 12) {
        // Midnight (12:00 AM) should be converted to 00:00 in 24-hour format
        return `00:${minutes.toString().padStart(2, "0")}`;
      } else {
        // For other AM times, simply return the time without changes
        return `${hours.toString().padStart(2, "0")}:${minutes
          .toString()
          .padStart(2, "0")}`;
      }
    } else if (period === "PM") {
      if (hours === 12) {
        // Noon (12:00 PM) should remain unchanged in 24-hour format
        return `12:${minutes.toString().padStart(2, "0")}`;
      } else {
        // For other PM times, add 12 to the hours to convert to 24-hour format
        return `${(hours + 12).toString().padStart(2, "0")}:${minutes
          .toString()
          .padStart(2, "0")}`;
      }
    } else {
      // If the period is neither 'AM' nor 'PM', return null (indicating an invalid input)
      return null;
    }
  }

  const handleSchedule = () => {
    let isBooked = false;

    // Check if the selected start time or end time falls within any existing appointments
    appointments.forEach((appointment) => {
      const appointmentStart = convertTo24HourFormat(appointment.startTime);
      const appointmentEnd = convertTo24HourFormat(appointment.endTime);
      const selectedStart = convertTo12HourFormat(startTime);
      const selectedEnd = convertTo12HourFormat(endTime);
      console.log(
        (selectedStart >= appointmentStart && selectedStart < appointmentEnd) ||
          (selectedEnd > appointmentStart && selectedEnd <= appointmentEnd)
      );
      if (
        (selectedStart >= appointmentStart && selectedStart < appointmentEnd) ||
        (selectedEnd > appointmentStart && selectedEnd <= appointmentEnd)
      ) {
        isBooked = true;
      }
    });

    if (isBooked) {
      setError("Sorry, the therapist is booked at this time.");
    } else if (startTime === "" || endTime === "") {
      setError("Please provide both start time and end time.");
    } else {
      // Proceed with scheduling if no conflicts
      const therapistId = location.state.data.user._id;
      const clientId = sessionStorage.getItem("userID");
      const selectedDate2 = selectedDate["$d"].toString().split(" ");
      const year2 = selectedDate2[3];
      const month2 = selectedDate2[1];
      const weekDay = selectedDate2[0];
      const day2 = selectedDate2[2];

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
      console.log("lets go");
      //navigate("/Payment", { state: { scheduleInformation } });
    }
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

  const setTime = (time) => {
    setStartTime(time);
    setEndTimeFromStartTime(time);
  };
  const setEndTimeFromStartTime = (startTime) => {
    // Split the startTime into hours and minutes
    const [startHour, startMinute] = startTime.split(":").map(Number);

    // Calculate end time
    let endHour = startHour + 1;
    let endMinute = startMinute;

    // Handle cases where end hour exceeds 23
    if (endHour > 23) {
      endHour -= 24; // Reset to 0 if exceeds 23
    }

    // Format the end time
    const endTime = `${endHour.toString().padStart(2, "0")}:${endMinute
      .toString()
      .padStart(2, "0")}`;

    // Update state
    setEndTime(endTime);
    console.log(endTime);
  };
  const getTherapist = async (id) => {
    try {
      const response = await axios.get(
        `${endpoint}/api/therapist/getOneTherapist/${id}`
      );
      console.log(response.data.therapist.schedules);
      setSchedules(response.data.therapist.schedules);
    } catch (error) {}
  };
  useEffect(() => {
    getTherapist(location.state.data._id);
  }, []);
  return (
    <div className="w-full h-[100vh] bg-neutral-50 justify-start items-start flex flex-col">
      <button
        onClick={() => {
          navigate(-1);
        }}
        className="hover:cursor-pointer  m-8  transition-transform transform hover:scale-110"
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
                    {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                      <div key={`empty-${i}`} className="h-8 w-8"></div>
                    ))}
                    {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(
                      (day) => {
                        const date = currentDate.date(day);
                        const isBeforeToday = date.isBefore(dayjs(), "day");
                        const d = weekDays[date.$d.toString().split(" ")[0]];
                        return (
                          <div
                            key={day}
                            className={`h-8 w-8 flex items-center justify-center rounded-full border ${
                              isBeforeToday
                                ? "text-gray-400 cursor-default "
                                : location.state.data.availabeDays.indexOf(d) <
                                  0
                                ? "text-red-400 cursor-default line-through"
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
                      <label
                        className={`mb-2 font-semibold ${
                          booked
                            ? "text-gray-400 cursor-not-allowed"
                            : "text-black "
                        }`}
                      >
                        Start Time:
                      </label>
                      <input
                        type="time"
                        className="border border-gray-200 rounded p-2 mb-4"
                        value={startTime}
                        onChange={(e) => setTime(e.target.value)}
                        disabled={booked}
                      />
                      <label
                        className={`mb-2 font-semibold ${
                          booked
                            ? "text-gray-400 cursor-not-allowed"
                            : "text-black "
                        }`}
                      >
                        End Time:
                      </label>
                      <input
                        type="time"
                        className="border border-gray-200 rounded p-2 mb-4"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                        disabled={true}
                      />
                      <button
                        className={`rounded p-2 ${
                          booked
                            ? "bg-gray-200 cursor-not-allowed"
                            : "bg-teal-700 text-white hover:bg-teal-600"
                        }`}
                        onClick={handleSchedule}
                        disabled={booked}
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
