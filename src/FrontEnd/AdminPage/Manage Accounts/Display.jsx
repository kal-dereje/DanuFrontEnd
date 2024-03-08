import axios from "axios";
import AdminHeader from "../AdminHeader";
import SearchBar from "./SearchBar";

import UserDetails from "./UserDetails";
import endpoint from "../../endpoint";
import { useEffect, useState } from "react";

function DisplayUser() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Make a GET request to fetch the users
        const response = await axios.get(`${endpoint}/api/user/getUser`);

        setUsers(response.data);
      } catch (error) {
        console.log("Error fetching user reviews:", error);
      }
    };

    // Call the function to fetch users
    fetchUsers();
  }, []);

  return (
    <div>
      <AdminHeader />
      <SearchBar />
      <div className=" flex m-2 justify-evenly flex-wrap">
        {users?.map((user, index) => {
          return <UserDetails key={index} user={user} />;
        })}
      </div>
    </div>
  );
}

export default DisplayUser;
