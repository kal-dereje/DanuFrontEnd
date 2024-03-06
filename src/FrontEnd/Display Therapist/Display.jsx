import { useEffect, useState } from "react";
import Header2 from "../Home/header2";
import SearchBar from "./SearchBar";

import TherapistDetails from "./TherapistDetails";
import axios from "axios";
import endpoint from "../endpoint";

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
        setTherapisList(response.data.therapists);
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
            .concat(" ")
            .concat(therapist.user.lastName)
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
    );
    setFilteredTherapistList(filteredTherapists);
  };

  const handleGenderChange = (selectedGender) => {
    const filteredTherapists = therapistList.filter((therapist) =>
      selectedGender === "" ? true : therapist.user.gender === selectedGender
    );
    setFilteredTherapistList(filteredTherapists);
  };

  const handleAgeRangeChange = (selectedAgeRange) => {
    const filteredTherapists = therapistList.filter((therapist) => {
      if (selectedAgeRange === "") {
        return true;
      }
      if (selectedAgeRange === "51+") {
        if (therapist.user.age > 50) {
          return true;
        }
      }
      if (selectedAgeRange === "41-50") {
        if (therapist.user.age > 40) {
          return true;
        }
      }
      if (selectedAgeRange === "31-40") {
        if (therapist.user.age > 30) {
          return true;
        }
      }
      if (selectedAgeRange === "19-30") {
        if (therapist.user.age > 17) {
          return true;
        }
      }

      return false;
    });
    setFilteredTherapistList(filteredTherapists);
  };

  return (
    <div>
      <Header2 />
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
