import React, { useEffect, useState } from "react";
import Header2 from "../Home/header2";
import SearchBar from "./SearchBar";
import TherapistDetails from "./TherapistDetails";
import axios from "axios";
import endpoint from "../endpoint";
import ClientHeader from "../Home/ClientHeader";

function Display() {
  const info = JSON.parse(sessionStorage.getItem("info"));
  const [therapistList, setTherapistList] = useState([]);
  const [filteredTherapistList, setFilteredTherapistList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedTherapist, setSelectedTherapist] = useState("");
  const [selectedAgeRange, setSelectedAgeRange] = useState("");
  const userId = sessionStorage.getItem("userID");

  useEffect(() => {
    axios
      .get(`${endpoint}/api/client/getOneClientUserId/${userId}`)
      .then((response) => {
        sessionStorage.setItem("client", response.data);
        const speciality = capitalizeWords(response.data.sessionType);
        fetchTherapistsBySpeciality(speciality);
      })
      .catch((error) => {
        console.log("Error fetching client:", error);
      });
  }, []);

  useEffect(() => {
    applyFilters();
  }, [
    searchTerm,
    selectedGender,
    selectedTherapist,
    selectedAgeRange,
    therapistList,
  ]);

  const capitalizeWords = (str) => {
    return str.replace(/\b\w/g, function (char) {
      return char.toUpperCase();
    });
  };

  const fetchTherapistsBySpeciality = (speciality) => {
    axios
      .get(`${endpoint}/api/therapist/getTherapistsBySpeciality/${speciality}`)
      .then((response) => {
        const therapists = response.data.therapists.filter(
          (therapist) => therapist?.user?.isActive
        );
        setTherapistList(therapists);
      })
      .catch((error) => {
        console.log("Error fetching therapists:", error);
      });
  };

  const applyFilters = () => {
    let combinedFilteredTherapists = therapistList.filter((therapist) => {
      const nameMatch =
        searchTerm === "" ||
        therapist.user.firstName
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        therapist.user.lastName
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

      const genderMatch =
        selectedGender === "" || therapist.user.gender === selectedGender;

      const ageMatch =
        selectedAgeRange === "" ||
        (therapist.user.age >= parseInt(selectedAgeRange.split("-")[0]) &&
          (selectedAgeRange.includes("+")
            ? true
            : therapist.user.age <= parseInt(selectedAgeRange.split("-")[1])));

      const therapistMatch =
        selectedTherapist === "" ||
        (selectedTherapist === "My Therapists" &&
          info.client.therapistList.some((id) => {
            return id._id === therapist.user._id;
          }));

      return nameMatch && genderMatch && ageMatch && therapistMatch;
    });
    setFilteredTherapistList(combinedFilteredTherapists);
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  const handleGenderChange = (value) => {
    setSelectedGender(value);
  };

  const handleTherapistChange = (value) => {
    setSelectedTherapist(value);
  };

  const handleAgeRangeChange = (value) => {
    setSelectedAgeRange(value);
  };

  return (
    <div>
      <ClientHeader />
      <SearchBar
        onSearch={handleSearch}
        onGenderChange={handleGenderChange}
        onAgeRangeChange={handleAgeRangeChange}
        onTherapistChange={handleTherapistChange}
      />
      {filteredTherapistList.length == 0 ? (
        <div className="w-full h-full bg-[#F2894E] font-semibold text-white py-5 text-lg flex items-start justify-center">
          No Therapist found!
        </div>
      ) : (
        <div className="flex m-2 justify-evenly flex-wrap">
          {filteredTherapistList.map((data, index) => (
            <TherapistDetails key={index} data={data} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Display;
