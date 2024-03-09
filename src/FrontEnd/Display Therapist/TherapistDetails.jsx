import axios from "axios";
import { useEffect, useState } from "react";
import endpoint from "../endpoint";
import { useNavigate } from "react-router";

function TherapistDetails({ data }) {
  const [imageData, setImageData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfilePicture = (userId) => {
      return new Promise(async (resolve, reject) => {
        try {
          // Make a GET request to fetch the user profile picture
          const response = await axios.get(
            `${endpoint}/api/therapist/getUserProfilePicture/${userId}`,
            {
              responseType: "arraybuffer", // Ensure response data is treated as binary data
            }
          );

          // Convert the received image data to a base64 string
          const base64Image = Buffer.from(response.data, "binary").toString(
            "base64"
          );

          // Resolve the promise with the base64 image data
          resolve(`data:image/jpeg;base64,${base64Image}`);
        } catch (error) {
          // Reject the promise with the error
          reject(error);
        }
      });
    };

    // Call the function to fetch user profile picture
    fetchUserProfilePicture(data.user._id)
      .then((imageData) => {
        // Handle successful retrieval of image data

        setImageData(imageData);
      })
      .catch((error) => {
        // Handle error
        console.error("Error fetching user profile picture:", error);
      });
  }, []);

  const goToMoreDetails = () => {
    navigate("/Details", { state: { data: data, imageData: imageData } });
  };
  return (
    <div className=" m-8 mb-72 flex flex-col h-[400px] w-[400px] ">
      <div className=" bg-[#045257] rounded-2xl rounded-bl-none text-sm   text-white p-6  pb-8  w-fit">
        / Expert in : {`${data.speciality.join(", ")}`}
      </div>

      <div className=" flex flex-col -mt-6  p-10 bg-[#EEF2F3]  rounded-2xl">
        <div className=" flex items-center w-full justify-center ">
          {imageData ? (
            <img
              className="h-[15rem] w-[80%] rounded-md"
              src={imageData}
              alt="User Profile"
            />
          ) : (
            <p>Loading...</p>
          )}
        </div>
        <div>
          <h1 className="my-4 mt-8 text-xl font-semibold">{`${data.user.firstName} ${data.user.lastName}`}</h1>
        </div>
        <div>
          <p className=" text-gray-400">
            <span className="font-bold text-[#045257]">Age</span> :
            {`${data.user.age}`}
          </p>
        </div>
        <div>
          <p className="mt-2">
            <span className="font-bold text-[#045257]">Rating</span>
          </p>
        </div>
        <div className="flex ">
          {[...Array(5)].map((_, index) => (
            <span
              key={index}
              className={`mr-1 transform scale-125 focus:outline-none ${
                index + 1 <= data?.user?.rating
                  ? "text-yellow-500"
                  : "text-gray-400"
              }`}
            >
              ★
            </span>
          ))}
        </div>
        <div className="w-full bg-gray-300 h-px mt-10 my-4"></div>
        <div className=" flex justify-between items-center  flex-row">
          <div className="">
            <span>
              Hourly Rate:
              <br />
              <span className=" font-semibold text-[#F2894E]">
                ETB {data.pricePerHour}/Hour
              </span>
            </span>
          </div>
          <div className="flex flex-col items-center justify-center">
            <button
              onClick={goToMoreDetails}
              className="  inline-flex items-center px-4 py-2 border-2 border-gray-200 hover:text-white  font-normal hover:border-0 rounded-3xl hover:bg-[#045257] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              More Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default TherapistDetails;
