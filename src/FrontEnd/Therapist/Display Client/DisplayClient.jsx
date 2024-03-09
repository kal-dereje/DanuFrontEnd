import React, { useState, useEffect } from "react";
import Header2 from "../../Home/header2";
import SearchBar from "./SearchBar";
import ClientDetails from "./ClientDetails";
import axios from "axios";
import endpoint from "../../endpoint";

function DisplayClient() {
  const [clients, setClients] = useState([]);
  const [filteredClients, setFilteredClients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
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

  const getClient = async (id) => {
    try {
      const response = await axios.get(
        `${endpoint}/api/client/getOneClientUserId/${id}`
      );

      return response.data;
    } catch (error) {
      return {};
    }
  };

  useEffect(() => {
    const fetchClientData = async () => {
      try {
        const clientObj = JSON.parse(sessionStorage.getItem("clients"));

        const promises = clientObj.map(async (client) => {
          const updatedClient = { ...client };

          if (updatedClient.profilePic) {
            updatedClient.profilePic = await fetchUserProfilePicture(
              client._id
            );
          }

          updatedClient.clientInfo = await getClient(client._id);

          return updatedClient;
        });

        const updatedClients = await Promise.all(promises);

        setClients(updatedClients);
        setFilteredClients(updatedClients);
      } catch (error) {
        console.log("Error fetching client data:", error);
      }
    };

    fetchClientData();
  }, []);

  useEffect(() => {
    // Apply filtering when any of the filter criteria change
    const filtered = clients.filter((client) => {
      // Filter by search term
      const name = `${client.firstName} ${client.lastName}`.toLowerCase();
      const searchTermMatch = name.includes(searchTerm.toLowerCase());

      // Filter by gender
      const genderMatch =
        selectedGender === "" || client.gender === selectedGender;

      // Filter by age range
      const ageMatch =
        selectedAgeRange === "" ||
        (client.age >= selectedAgeRange.split("-")[0] &&
          client.age <= selectedAgeRange.split("-")[1]);

      // Return true if all conditions match
      return searchTermMatch && genderMatch && ageMatch;
    });
    setFilteredClients(filtered);
  }, [clients, searchTerm, selectedGender, selectedAgeRange]);

  return (
    <div>
      <Header2 />
      <SearchBar
        onSearch={setSearchTerm}
        onGenderChange={setSelectedGender}
        onAgeRangeChange={setSelectedAgeRange}
      />
      <div className="flex m-2 justify-evenly flex-wrap">
        {filteredClients.map((client, index) => (
          <ClientDetails key={index} client={client} />
        ))}
      </div>
    </div>
  );
}

export default DisplayClient;
