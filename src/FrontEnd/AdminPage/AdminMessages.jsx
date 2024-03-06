import axios from "axios";
import AdminHeader from "./AdminHeader";
import endpoint from "../endpoint";
import { useEffect, useState } from "react";
function AdminMessages1({ contacts }) {
  console.log("here", contacts);
  return (
    <>
      <div>
        <AdminHeader />
      </div>

      <div className=" bg-[#EEF2F3]  shadow-md rounded-lg p-8 m-20">
        <div className=" ">
          <h3 className="text-3xl font-bold my-8">Messages</h3>
          {contacts?.map((contact, index) => (
            <div
              className="flex mb-8 items-center rounded-xl p-8 bg-white   pt-4 "
              key={index}
            >
              <div>
                <div className=" flex flex-col px-4  ">
                  <p className=" font-bold text-[#F2894E] text-md">
                    {contact?.senderName}
                  </p>
                </div>
                <p className="px-4 text-gray-400">{contact.email}</p>
                <p className="p-4">{contact?.message}</p>
                <p className="p-6 text-xs">{contact?.createdAt}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function AdminMessages() {
  const [messages, setMessages] = useState();
  useEffect(() => {
    const fetchData = () => {
      axios
        .get(`${endpoint}/api/contactUs/getContactUs`)
        .then((response) => {
          setMessages(response.data);
        })
        .catch((error) => {
          console.log("Error fetching data:", error);
        });
    };

    // Call fetchData function
    fetchData();
  }, []);
  return <AdminMessages1 contacts={messages} />;
}

export default AdminMessages;
