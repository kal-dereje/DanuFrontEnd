// DisplayUser.js
import axios from "axios";
import React, { useEffect, useState } from "react";
import AdminHeader from "../AdminHeader";
import SearchBar from "./SearchBar";
import UserDetails from "./UserDetails";
import endpoint from "../../endpoint";

function DisplayUser() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedAgeRange, setSelectedAgeRange] = useState("");
  const fetchUserProfilePicture = async (id) => {
    try {
      // Make a GET request to fetch the user profile picture
      const response = await axios.get(
        `${endpoint}/api/therapist/getUserProfilePicture/${id}`,
        {
          responseType: "arraybuffer", // Ensure response data is treated as binary data
        }
      );

      // Convert the received image data to a base64 string
      const base64Image = Buffer.from(response.data, "binary").toString(
        "base64"
      );

      // Set the base64 image data in the state
      return `data:image/jpeg;base64,${base64Image}`;
    } catch (error) {
      return "";
    }
  };
  const fetchTherapistData = async (id) => {
    try {
      // Make a GET request to fetch the user profile picture
      const response = await axios.get(
        `${endpoint}/api/therapist/getTherapistByUserId/${id}`
      );

      // Set the base64 image data in the state
      return response.data;
    } catch (error) {
      return "";
    }
  };
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        let response = await axios.get(`${endpoint}/api/user/getUser`);

        const promises = response.data.map(async (element) => {
          if (element.profilePic !== undefined) {
            element.profilePic = await fetchUserProfilePicture(element._id);
          } else {
            element.profilePic = "";
          }

          if (element.role === "therapist") {
            element.description = await fetchTherapistData(element._id);
          } else {
            element.description = "";
          }
        });

        await Promise.all(promises); // Wait for all asynchronous operations to complete

        console.log(response.data);
        setUsers(response.data);
        setFilteredUsers(response.data);
      } catch (error) {
        console.log("Error fetching user reviews:", error);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    // Filtering logic
    let filtered = users.filter((user) => {
      // Check for search term
      if (
        searchTerm &&
        !user.firstName
          .toLowerCase()
          .concat(" ")
          .concat(user.lastName)
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      ) {
        return false;
      }
      // Check for gender
      if (selectedGender && user.gender !== selectedGender) {
        return false;
      }
      // Check for user type
      if (selectedUser && user.role !== selectedUser) {
        return false;
      }
      // Check for age range
      if (selectedAgeRange) {
        const [minAge, maxAge] = selectedAgeRange.split("-");
        if (minAge && parseInt(user.age) < parseInt(minAge)) {
          return false;
        }
        if (maxAge && parseInt(user.age) > parseInt(maxAge)) {
          return false;
        }
      }
      return true;
    });
    setFilteredUsers(() => [...filtered]);
  }, [searchTerm, selectedGender, selectedUser, selectedAgeRange, users]);

  return (
    <div>
      <AdminHeader />
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedGender={selectedGender}
        setSelectedGender={setSelectedGender}
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
        selectedAgeRange={selectedAgeRange}
        setSelectedAgeRange={setSelectedAgeRange}
      />
      <div className="flex m-2 justify-evenly flex-wrap">
        {filteredUsers.map((user, index) => (
          <UserDetails key={index} user={user} />
        ))}
      </div>
    </div>
  );
}

export default DisplayUser;
