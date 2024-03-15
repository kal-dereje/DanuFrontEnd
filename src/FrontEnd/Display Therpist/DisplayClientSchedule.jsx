import { useEffect, useState } from "react";
import endpoint from "../endpoint";
import axios from "axios";
import ClientHeader from "../Home/ClientHeader";

function ProfilePicture({ userId, firstName }) {
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase();
  }
  const [profilePic, setProfilePic] = useState(null);

  const fetchUserProfilePicture = async () => {
    try {
      const response = await axios.get(
        `${endpoint}/api/therapist/getUserProfilePicture/${userId}`,
        { responseType: "arraybuffer" }
      );

      const base64Image = Buffer.from(response.data, "binary").toString(
        "base64"
      );
      setProfilePic(`data:image/jpeg;base64,${base64Image}`);
    } catch (error) {
      console.log("Error fetching user profile picture:", error);
    }
  };

  useEffect(() => {
    fetchUserProfilePicture();
  }, []);

  return (
    <>
      {profilePic == null ? (
        <div className="text-xl py-4 px-6 bg-teal-500 rounded-full">
          {capitalizeFirstLetter(`${firstName}`)}
        </div>
      ) : (
        <img
          className="border-neutral-300 mt-4 text-center text-white h-16 w-16 rounded-full border-0"
          src={profilePic}
          alt="Profile Picture"
        />
      )}
    </>
  );
}

function DisplayClientSchedule() {
  const [filteredTherapistId, setFilteredTherapistId] = useState({});
  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const response = await axios.get(
          `${endpoint}/api/schedule/getSchedules/${sessionStorage.getItem(
            "userID"
          )}`
        );

        const groupedSchedules = response.data.reduce((acc, schedule) => {
          const therapistId = schedule.therapist._id;
          if (!acc[therapistId]) {
            acc[therapistId] = [];
          }
          acc[therapistId].push(schedule);
          return acc;
        }, {});

        setFilteredTherapistId(groupedSchedules);
        setSchedules(response.data);
      } catch (error) {
        console.log("Error fetching user reviews:", error);
      }
    };
    fetchSchedule();
  }, []);

  const Appointment = ({ date, starttime, endtime }) => {
    // Split date string into day, month, and year
    const [day, month, year] = date.split(" - ");
    const [isSchedulePassed, setIsSchedulePassed] = useState();

    // Extract hour and minute from the starttime and endtime strings
    const [startHour, startMinute] = starttime.split(":");
    const [endHour, endMinute] = endtime.split(":");

    // Construct scheduleDateTime using the parsed values
    const scheduleDateTime = new Date(
      year,
      getMonthIndex(month),
      day,
      startHour,
      startMinute
    );
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const currentDateTime = new Date();
    const currentDay = currentDateTime.getDate();
    const currentYear = currentDateTime.getFullYear();
    const currentMonth = currentDateTime.getMonth();

    let isPassed = true;

    if (year < currentYear) {
      isPassed = true;
    } else if (year == currentYear) {
      if (months.indexOf(month) < currentMonth) {
        isPassed = true;
      } else if (months.indexOf(month) == currentMonth) {
        isPassed = parseInt(day) < currentDay;
      }
    } else isPassed = false;

    return (
      <div className="flex text-gray-900 border-b-2 border-gray-600 border-opacity-10 py-2 w-full flex-col">
        <div className="text-gray-500 font-[500]">
          <span className="text-gray-500">Date :-</span>{" "}
          <span
            className={
              isPassed
                ? "text-decoration-line: line-through decoration-orange-500"
                : "text-decoration-line: none;"
            }
          >
            {date}
          </span>
        </div>
        <div className="text-gray-500 font-[500]">
          <span className="text-gray-500">Duration:-</span>{" "}
          <span
            className={
              isPassed
                ? "text-decoration-line: line-through decoration-orange-500"
                : "text-decoration-line: none;"
            }
          >
            {starttime}- {endtime}
          </span>
        </div>
      </div>
    );
  };

  // Function to get the index of the month in the array of months
  function getMonthIndex(month) {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return months.indexOf(month);
  }

  const Therapist = ({ schedules }) => (
    <div className="m-8 flex flex-col mt-20 pb-9 pr-9 bg-[#EEF2F3] rounded-xl border-gray-800 shadow-xl w-[400px]">
      <div className="bg-[#045257] rounded-2xl rounded-bl-none text-white p-1 px-8 w-fit">
        / Therapists
      </div>
      <div className="flex gap-2 text-lg px-6 items-center">
        <ProfilePicture
          userId={schedules[0]?.therapist?._id}
          firstName={schedules[0]?.therapist?.firstName}
        />
        <h1 className="my-4 mt-8 text-xl font-semibold">
          {`${schedules[0]?.therapist?.firstName} ${schedules[0]?.therapist?.lastName}`}
        </h1>
      </div>
      <div className="my-2 mt-3 text-xl px-6 font-bold"> Schedules</div>
      <div className="flex flex-wrap px-6 pb-6 gap-1">
        {schedules.map((schedule, index) => (
          <Appointment
            key={index}
            starttime={schedule.startTime}
            endtime={schedule.endTime}
            date={`${schedule.day} - ${schedule.month} - ${schedule.year} `}
          />
        ))}
      </div>
    </div>
  );

  return (
    <div>
      <ClientHeader />
      <div className="w-full flex flex-wrap justify-center items-center">
        <div className="grid grid-cols-3 items-center justify-evernly w-[90%]">
          {Object.values(filteredTherapistId).map((schedules, index) => (
            <Therapist key={index} schedules={schedules} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default DisplayClientSchedule;
