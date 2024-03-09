import { useEffect, useState } from "react";
import Header2 from "../Home/header2";
import SearchBar from "./SearchBar";

import TherapistDetails from "./TherapistDetails";
import axios from "axios";
import endpoint from "../endpoint";
import ClientHeader from "../Home/ClientHeader";

function Display() {
  const [therapistList, setTherapisList] = useState([]);
  const [filteredTherapistList, setFilteredTherapistList] = useState([]);
  const [speciality, setSpeciality] = useState("");
  const userId = sessionStorage.getItem("userID");

  function capitalizeWords(str) {
    return str.replace(/\b\w/g, function (char) {
      return char.toUpperCase();
    });
  }
  useEffect(() => {
    axios
      .get(`${endpoint}/api/client/getOneClientUserId/${userId}`)
      .then((response) => {
        sessionStorage.setItem("client", response.data);
        setSpeciality(capitalizeWords(response.data.sessionType));
      })
      .catch((error) => {
        // Handle errors
        console.log("Error fetching client:", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${endpoint}/api/therapist/getTherapistsBySpeciality/${speciality}`)
      .then((response) => {
        // Handle the response
        setTherapisList(
          response.data.therapists.filter((therapist) => {
            return therapist?.user?.isActive;
          })
        );
        setFilteredTherapistList(
          response.data.therapists.filter((therapist) => {
            return therapist?.user?.isActive;
          })
        );
      })
      .catch((error) => {
        // Handle errors
        console.log("Error fetching therapists:", error);
      });
  }, [speciality]);
  const handleSearch = (searchTerm) => {
    const filteredTherapists = therapistList.filter((therapist) =>
      searchTerm === ""
        ? true
        : therapist.user.firstName
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          therapist.user.lastName
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
    );
    applyFilters(filteredTherapists);
  };

  const handleGenderChange = (selectedGender) => {
    applyFilters(
      therapistList.filter((therapist) =>
        selectedGender === "" ? true : therapist.user.gender === selectedGender
      )
    );
  };

  const handleAgeRangeChange = (selectedAgeRange) => {
    applyFilters(
      therapistList.filter((therapist) => {
        if (selectedAgeRange === "") {
          return true;
        }
        const age = therapist.user.age;
        switch (selectedAgeRange) {
          case "19-30":
            return age >= 19 && age <= 30;
          case "31-40":
            return age >= 31 && age <= 40;
          case "41-50":
            return age >= 41 && age <= 50;
          case "51+":
            return age >= 51;
          default:
            return false;
        }
      })
    );
  };

  const applyFilters = (filteredTherapists) => {
    let combinedFilteredTherapists = filteredTherapists;

    setFilteredTherapistList(combinedFilteredTherapists);
  };

  return (
    <div>
      <ClientHeader />
      {/* Header and SearchBar */}
      <SearchBar
        onSearch={handleSearch}
        onGenderChange={handleGenderChange}
        onAgeRangeChange={handleAgeRangeChange}
      />

      {/* Display Therapist Details */}
      <div className="flex m-2 justify-evenly flex-wrap">
        {filteredTherapistList.map((data, index) => (
          <TherapistDetails key={index} data={data} />
        ))}
      </div>
    </div>
  );
}

export default Display;
