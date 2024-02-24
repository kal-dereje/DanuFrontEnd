import React, { useState } from "react";
import Header2 from "../Home/header2";

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedAgeRange, setSelectedAgeRange] = useState("");

  const ageRanges = [
    { label: "All Ages", value: "" },
    { label: "<30", value: "19-30" },
    { label: "31-40", value: "31-40" },
    { label: "41-50", value: "41-50" },
    { label: "51+", value: "51+" },
  ];

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleGenderChange = (event) => {
    setSelectedGender(event.target.value);
  };

  const handleAgeRangeChange = (event) => {
    setSelectedAgeRange(event.target.value);
  };

  // Implement your search logic here based on searchTerm, selectedGender, and selectedAgeRange

  return (
    <>
      {" "}
      <div className="flex space-x-20 flex-wrap justify-center mb-4">
        <div className="flex space-x-4   m-12">
          <input
            type="text"
            placeholder="Search..."
            className=" w-[500px] px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-[#045257] focus:ring-1"
            value={searchTerm}
            onChange={handleSearch}
          />
          <button className="inline-flex items-center px-4 py-2 bg-[#045257] text-white font-bold rounded-md hover:bg-[#045257] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Search
          </button>
        </div>
        <div className="flex items-center space-x-8">
          <div>
            <span className=" mx-4">Gender:</span>
            <select
              onChange={handleGenderChange}
              value={selectedGender}
              className=" rounded-md border border-gray-300 focus:outline-none focus:ring-[#045257] focus:ring-1"
            >
              <option value="">All Genders</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div>
            <span className=" mx-4 ">Age:</span>
            <select
              onChange={handleAgeRangeChange}
              value={selectedAgeRange}
              className="  rounded-md border border-gray-300 focus:outline-none focus:ring-[#045257] focus:ring-1"
            >
              {ageRanges.map((range) => (
                <option key={range.value} value={range.value}>
                  {range.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </>
  );
}

export default SearchBar;
