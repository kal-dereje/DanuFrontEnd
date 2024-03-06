import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Header2 from "../../Home/header2";
import DiagnosisPage from "./WriteDiagnosis";
import axios from "axios";
import endpoint from "../../endpoint";
const Details = ({ client }) => {
  const [profilePic, setProfilePic] = useState(null);
  const [clientData, setClientData] = useState(null);
  const [diagnosisHistory, setDiagnosisHistory] = useState([]);
  const navigate = useNavigate();
  console.log(client);
  function goToChat() {
    navigate("/Chat");
  }

  console.log(client._id);

  useEffect(() => {
    const fetchUserProfilePicture = async () => {
      try {
        // Make a GET request to fetch the user profile picture
        const response = await axios.get(
          `${endpoint}/api/therapist/getUserProfilePicture/${client._id}`,
          {
            responseType: "arraybuffer", // Ensure response data is treated as binary data
          }
        );

        // Convert the received image data to a base64 string
        const base64Image = Buffer.from(response.data, "binary").toString(
          "base64"
        );

        // Set the base64 image data in the state
        setProfilePic(`data:image/jpeg;base64,${base64Image}`);
      } catch (error) {
        console.error("Error fetching user profile picture:", error);
      }
    };

    // Call the function to fetch user profile picture
    fetchUserProfilePicture();

    axios
      .get(`${endpoint}/api/client/getOneClientUserId/${client._id}`)
      .then((response) => {
        setClientData(response.data);
      })
      .catch((error) => {
        // Handle errors here
        console.error("Error:", error);
      });
    const fetchDiagnosisHistory = async () => {
      try {
        // Make a GET request to fetch the user profile picture
        const response = await axios.get(
          `${endpoint}/api/medicalDiagnosis/getDiagnosisUsingClientAndTherapistId/${
            client._id
          }/${sessionStorage.getItem("userID")}`
        );
        setDiagnosisHistory(response.data);
      } catch (error) {
        console.log("Error fetching dignosis history:");
      }
    };
    fetchDiagnosisHistory();
  }, []);

  return (
    <>
      <Header2 />
      <button
        onClick={() => navigate(-1)}
        className="hover:cursor-pointer fixed transition-transform transform hover:scale-110"
      >
        <img
          className=" my-8 mx-12  "
          src=" src/assets/client landing/back.svg"
        ></img>
      </button>

      <div className="flex mx-20 flex-col mt-32 mb-12 bg-[#EEF2F3]  shadow-md rounded-lg p-8">
        <div className="flex items-center mb-4">
          <img
            className="w-20 h-20  bg-slate-400 rounded-full mr-4 object-cover"
            src={profilePic} //  profile picture
            alt="Picture"
          />
          <div className=" items-center">
            <h2 className="text-xl font-bold">{`${client.firstName} ${client.lastName}`}</h2>
            <p className="text-gray-600">
              {clientData?.questionnaire[0]}, {client?.age} years old
            </p>
          </div>
        </div>
        <div className="flex justify-between items-center mb-4">
          <p className="text-gray-600"></p>
          <div className=" flex flex-row items-center -mt-28">
            <button
              onClick={goToChat}
              className="inline-flex 
             px-4 py-2 hover:bg-[#F2894E] bg-[#045257] text-white font-bold rounded-md  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Chat
            </button>
          </div>
        </div>
        <p className="text-gray-700 mt-12 mb-12">
          <span className="font-bold">Session Type: </span>{" "}
          {clientData?.sessionType}
        </p>
        <div>
          <ClientDetails clientData={clientData?.questionnaire} />
        </div>
        <h3 className="text-lg font-bold mt-8 mb-4">Write Diagnosiss</h3>
        <DiagnosisPage client={client} info={clientData} />

        <div className="border-t rounded-xl bg-white p-8 border-gray-200 pt-4">
          <h3 className="text-xl font-bold my-8">Diagnosis History</h3>
          {diagnosisHistory?.map((diagnosis, index) => (
            <div className="flex mb-8 items-center " key={index}>
              <div className=" flex flex-col px-4 gap-4 ">
                <div>
                  <p className="text-gray-600 font-bold text-md">
                    Diagnosed by:{" "}
                    {`${diagnosis?.therapist?.firstName} ${diagnosis?.therapist?.lastName}`}
                  </p>
                </div>

                <p className="px-4 text-gray-600 font-bold text-md">
                  /Diagnosis/
                </p>
                <p className="px-4 text-justify">{diagnosis?.diagnosis}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

function Diagnosis() {
  const location = useLocation();

  return <Details client={location.state.data} />;
}

export default Diagnosis;

const ClientDetails = ({ clientData }) => {
  return (
    <div className="container mx-auto px-4">
      <h2 className="text-xl font-bold mb-4">Client Details</h2>
      <div className="grid grid-cols-4 divide-y divide-x">
        {clientData?.map((value, index) => (
          <div key={index} className="my-2">
            <p className="font-bold text-[#045257]">{getClientLabel(index)}</p>
            <p>{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// Function to get the label for each client detail based on the index
const getClientLabel = (index) => {
  switch (index) {
    case 0:
      return "Gender";
    case 1:
      return "Age";
    case 2:
      return "Relationship Status";
    case 3:
      return "Feeling Down Depressed Hopeless";
    case 4:
      return "Been in Therapy";
    case 5:
      return "Current Eating Habits";
    case 6:
      return "Overwhelming Sadness Grief Depression";
    case 7:
      return "Little Interest Pleasure";
    case 8:
      return "Thought of Dying";
    case 9:
      return "Drinks Alcohol";
    case 10:
      return "Thought about Suicide";
    case 11:
      return "Currently Experiencing Anxiety";
    case 12:
      return "Poor Appetite or Overeating";
    case 13:
      return "Takes Any Medication";
    case 14:
      return "Sleeping Habits";
    case 15:
      return "Appetite";
    default:
      return "";
  }
};
