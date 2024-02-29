import AdminHeader from "./AdminHeader";
function AdminMessages1({ contacts }) {
  return (
    <>
      <div>
        <AdminHeader />
      </div>

      <div className=" bg-[#EEF2F3]  shadow-md rounded-lg p-8 m-20">
        <div className=" ">
          <h3 className="text-3xl font-bold my-8">Messages</h3>
          {contacts.map((contact) => (
            <div
              className="flex mb-8 items-center rounded-xl p-8 bg-white   pt-4 "
              key={contact.id}
            >
              <div>
                <div className=" flex flex-col px-4  ">
                  <p className=" font-bold text-[#F2894E] text-md">
                    {contact.contacterName}
                  </p>
                </div>
                <p className="px-4 text-gray-400">{contact.email}</p>
                <p className="p-4">{contact.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

const profileData = {
  contacts: [
    {
      id: 1,
      contacterName: "Kidus Dawit",
      email: "wow@gmail.com",
      text: "This contact us page features a simple form with fields for name, email, and message. It's styled using Tailwind CSS classes to achieve a clean and modern design. Feel free to customize it further according to your needs!",
    },
    {
      id: 2,
      contacterName: "Kalab Dereje",
      email: "wow@gmail.com",
      text: "Below is an example of a beautiful chat page designed using React and Tailwind CSS. This page includes a simple chat interface where users can send and receive messages.",
    },
    {
      id: 3,
      contacterName: "Hilina Mastewal",
      email: "wow@gmail.com",
      text: "This chat page features a simple chat interface with a text input field for typing messages and a button to send them. Messages are displayed in alternating styles for the sender and the receiver. The page is styled using Tailwind CSS to achieve a clean and modern design. You can further customize it according to your specific requirements and preferences.",
    },
    // ... other reviews
  ],
};

function AdminMessages() {
  return <AdminMessages1 {...profileData} />;
}

export default AdminMessages;
