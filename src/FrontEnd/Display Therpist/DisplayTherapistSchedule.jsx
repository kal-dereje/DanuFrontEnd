import SearchBar from "./SearchBar";
import TherapistDetails from "./TherapistDetails";

function DisplayTherpistSchedule() {
    const clients = [
        {
          name: 'Hilina Mastewal',
          appointments: [
            { date: '2024-03-01', starttime: '2:00pm' , endtime:'3:00pm' },
            { date: '2024-03-01', starttime: '2:00pm' , endtime:'3:00pm' },
            // More appointments...
          ],
        },
        {
          name: 'Kalab Dereje',
          appointments: [
            { date: '2024-03-02', starttime: '2:00pm' , endtime:'3:00pm' },
            { date: '2024-03-02', starttime: '2:00pm' , endtime:'3:00pm' },
            { date: '2024-03-02', starttime: '2:00pm' , endtime:'3:00pm' },
            { date: '2024-03-02', starttime: '2:00pm' , endtime:'3:00pm' },

        ],
        },
        {
            name: 'Meklit Engda',
            appointments: [
              { date: '2024-03-03', starttime: '2:00pm' , endtime:'3:00pm' },
              { date: '2024-03-03', starttime: '2:00pm' , endtime:'3:00pm' },
              { date: '2024-03-03', starttime: '2:00pm' , endtime:'3:00pm' },
              { date: '2024-03-03', starttime: '2:00pm' , endtime:'3:00pm' },
  
          ],
          },
          {
            name: 'Kidus Dawit',
            appointments: [
              { date: '2024-03-04', starttime: '2:00pm' , endtime:'3:00pm' },
              { date: '2024-03-04', starttime: '2:00pm' , endtime:'3:00pm' },
              { date: '2024-03-05', starttime: '2:00pm' , endtime:'3:00pm' },
              { date: '2024-03-04', starttime: '2:00pm' , endtime:'3:00pm' },
  
          ],
          },
      ];
      const Appointment = ({ date, starttime,endtime }) => (
        <div className="flex gap-2 text-gray-900 fon flex-col">
          <div className="text-gray-400 font-semibold"><span className=" text-black">Date</span> {date}</div>
          <div className="text-gray-400 font-semibold"><span className=" text-black">Duration</span> {starttime}- {endtime}</div>
        </div>
      );
      
      const Client = ({ name, appointments }) => (
        <div className=" m-8 mb-72 flex flex-col  bg-[#EEF2F3] rounded-xl border-gray-500 shadow-xl  p-10 w-[400px] ">
      <div className=" bg-[#045257] rounded-2xl rounded-bl-none    text-white p-1 px-6 w-fit">
        / Clients
      </div>
      
      <div className=" flex gap-2 items-center ">
          <img
            className=" rounded-2xl"
            src="src/assets/check-circle.svg"
          ></img>
        
        <div>
          <h1 className="my-4 mt-8 text-xl  text-orange-400 font-semibold">{name}</h1>
        </div>
        </div>
        <div className=" my-2 mt-3 text-xl  text-emerald-800 font-bold"> Schedules</div>
          <div className="flex flex-wrap   gap-4">

          {appointments.map((appointment, index) => (
            <Appointment key={index} {...appointment} />
          ))}
          </div>
        </div>
      );
  return (
    <div className="w-full  flex flex-wrap justify-center items-center ">
      <div className=" grid grid-cols-3 items-center  justify-evernly  w-[90%] ">
      
    {clients.map((client, index) => (
      <Client key={index} {...client} />
    ))}
  </div>
     
    </div>
  );
}

export default DisplayTherpistSchedule;
