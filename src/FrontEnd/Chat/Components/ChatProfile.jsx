import { IoVideocam } from "react-icons/io5";
function ChatProfile({ user }) {
  return (
    <>
      <div className="flex items-center shadow-md w-full justify-between bg-gray-200 mb-4 px-4 py-2  border-b border-gray-200">
        <div className="flex items-center">
          <img
            className="w-12 h-12 rounded-full mr-4 object-cover"
            src="https://images.unsplash.com/photo-1708623460319-3f1d8865778a?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" //  profile picture
            alt="Profile picture"
          />{" "}
          <div className=" flex flex-col items-start">
            <span className="ml-2 text-lg font-medium text-gray-700">
              {user.name}
            </span>
            <div className=" flex flex-row">
              <span className=" ml-2 mr-2 font-medium text-gray-400">
                {user.phone} ,
              </span>
              <span className="  font-medium text-gray-400">{user.email}</span>
            </div>
          </div>
        </div>
        <div className=" flex items-center space-x-4 mx-4">
          <button>
            <IoVideocam className=" text-4xl mx-4 text-[#F2894E]" />
          </button>
          <button className="inline-flex items-center px-4 py-2 mx-2 hover:bg-[#F2894E] bg-[#045257] text-white text-sm font-medium rounded-md  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Set an Appointment
          </button>
        </div>
      </div>
    </>
  );
}

export default ChatProfile;
