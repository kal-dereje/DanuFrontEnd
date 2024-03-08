import SearchBar from "./SearchBar";
import TherapistDetails from "./TherapistDetails";
import  Headers from "../Home/header2"
function DisplayTherpistSchedule() {
    const clients = [
        {
          name: 'Kidus Dawit ',
          img:'src/assets/clientpicboy3.jpg',
          appointments: [
            { date: '2024-03-01', starttime: '2:00pm' , endtime:'3:00pm' },
            { date: '2024-03-01', starttime: '2:00pm' , endtime:'3:00pm' },
          ],
        },
        {
          name: 'Kalab Dereje',
          img:'src/assets/clientpicboy1.jpg',
          appointments: [
            { date: '2024-03-02', starttime: '2:00pm' , endtime:'3:00pm' },
            { date: '2024-03-02', starttime: '2:00pm' , endtime:'3:00pm' },
            { date: '2024-03-02', starttime: '2:00pm' , endtime:'3:00pm' },
            { date: '2024-03-02', starttime: '2:00pm' , endtime:'3:00pm' },

        ],
        },
        {
            name: 'Meklit Engda',
            img:'src/assets/clientpic.jpg',
            appointments: [
              { date: '2024-03-03', starttime: '2:00pm' , endtime:'3:00pm' },
              { date: '2024-03-03', starttime: '2:00pm' , endtime:'3:00pm' },
              { date: '2024-03-03', starttime: '2:00pm' , endtime:'3:00pm' },
              { date: '2024-03-03', starttime: '2:00pm' , endtime:'3:00pm' },
  
          ],
          },
          {
            name: 'Kidus Dawit',
            img:'src/assets/clientpic.jpg',
            appointments: [
              { date: '2024-03-04', starttime: '2:00pm' , endtime:'3:00pm' },
              { date: '2024-03-04', starttime: '2:00pm' , endtime:'3:00pm' },
              { date: '2024-03-05', starttime: '2:00pm' , endtime:'3:00pm' },
              { date: '2024-03-04', starttime: '2:00pm' , endtime:'3:00pm' },
  
          ],
          },
      ];
      const Appointment = ({ date, starttime,endtime }) => (
        <div className="flex  text-gray-900 border-b-2 border-gray-600 border-opacity-10 py-2 w-full flex-col">
          <div className="text-gray-500 font-[500]"><span className=" text-gray-500 ">Date :-</span> {date}</div>
          <div className="text-gray-500 font-[500] "><span className=" text-gray-500 ">Duration:-</span> {starttime}- {endtime}</div>
        </div>
      );
      
      const Client = ({ name, appointments ,img}) => (
        <div className=" m-8  flex flex-col mt-20 bg-[#EEF2F3] rounded-xl border-gray-800 shadow-xl    w-[400px] ">
            
       <div className=" bg-[#045257] rounded-2xl rounded-bl-none    text-white p-1 px-8 w-fit">
        / Clients
      </div> 
      
      <div className=" flex gap-2 text-lg px-6  items-center ">
      <div className=" text-xl  bg-teal-500 rounded-full mt-4"><img  className=" rounded-full w-16 h-16"src={img}></img></div>
          <h1 className="my-4 mt-8 text-xl   font-semibold">{name}</h1>
        </div>
        
        <div className=" my-2 mt-3 text-xl px-6   font-bold"> Schedules</div>
          <div className="flex flex-wrap px-6   pb-6  gap-1">

          {appointments.map((appointment, index) => (
            <Appointment key={index} {...appointment} />
          ))}
          </div>
          
        </div>
      );
  return (
    <>
    <Headers/>
    <div className="w-full  flex flex-wrap justify-center items-center ">
      <div className=" grid grid-cols-3 items-center  justify-evernly  w-[90%] ">
      
    {clients.map((client, index) => (
      <Client key={index} {...client} />
    ))}
  </div>
     
    </div></>
  );
}

export default DisplayTherpistSchedule;