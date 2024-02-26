import axios from "axios";
import { useEffect, useState } from "react";
import endpoint from "../endpoint";

function TherapistDetails({ data }) {
  const [imageData, setImageData] = useState(null);

  useEffect(() => {
    // Function to fetch user profile picture
    const fetchUserProfilePicture = async () => {
      try {
        // Make a GET request to fetch the user profile picture
        const response = await axios.get(
          `${endpoint}/api/therapist/getUserProfilePicture/${data.user._id}`,
          {
            responseType: "arraybuffer", // Ensure response data is treated as binary data
          }
        );

        // Convert the received image data to a base64 string
        const base64Image = Buffer.from(response.data, "binary").toString(
          "base64"
        );

        // Set the base64 image data in the state
        setImageData(`data:image/jpeg;base64,${base64Image}`);
      } catch (error) {
        console.error("Error fetching user profile picture:", error);
      }
    };

    // Call the function to fetch user profile picture
    fetchUserProfilePicture();
  }, []);
  return (
    <div className=" m-8 mb-72 flex flex-col h-[400px] w-[400px] ">
      <div className=" bg-[#045257] rounded-2xl rounded-bl-none    text-white p-2 pb-8 px-4 w-fit">
        / Expert in : {`${data.speciality.join(", ")}`}
      </div>

      <div className=" flex flex-col -mt-6  p-10 bg-[#EEF2F3]  rounded-2xl">
        <div className=" flex items-center justify-center ">
          {imageData ? (
            <img className="" src={imageData} alt="User Profile" />
          ) : (
            <p>Loading...</p>
          )}
        </div>
        <div>
          <h1 className="my-4 mt-8 text-xl font-semibold">{`${data.user.firstName} ${data.user.lastName}`}</h1>
        </div>
        <div>
          <p className=" text-gray-400">{`${data.description}`}</p>
        </div>
        <div className="w-full bg-gray-300 h-px mt-16 my-4"></div>
        <div className=" flex justify-between items-center  flex-row">
          <div className="">
            <span>
              Hourly Rate:
              <br />
              <span className=" font-semibold text-[#F2894E]">
                ETB {60}/Hour
              </span>
            </span>
          </div>
          <div className="flex flex-col mt-4">
            <Link
              to="/Details"
              className="  inline-flex items-center px-4 py-2 border-2 border-gray-200 hover:text-white  font-normal hover:border-0 rounded-3xl hover:bg-[#045257] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              More Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
export default TherapistDetails;
