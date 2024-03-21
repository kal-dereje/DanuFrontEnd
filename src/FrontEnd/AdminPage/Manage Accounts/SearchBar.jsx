// SearchBar.js
import React from "react";

function SearchBar({
  searchTerm,
  setSearchTerm,
  selectedGender,
  setSelectedGender,
  selectedUser,
  setSelectedUser,
  selectedAgeRange,
  setSelectedAgeRange,
  selectedStatus,
  setSelectedStatus,
}) {
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

  const handleUserChange = (event) => {
    setSelectedUser(event.target.value);
  };

  const handelUserStatus = (event) => {
    setSelectedStatus(() => event.target.value);
  };

  const handleAgeRangeChange = (event) => {
    setSelectedAgeRange(event.target.value);
  };
  console.log(selectedUser);
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
          <button className="inline-flex items-center px-4 py-2 hover:bg-[#F2894E] bg-[#045257] text-white font-bold rounded-md  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Search
          </button>
        </div>
        <div className="flex items-center space-x-8">
          <div>
            <span className=" mx-4">Enabled / Disabled:</span>
            <select
              onChange={handelUserStatus}
              value={selectedStatus}
              className=" rounded-md border border-gray-300 focus:outline-none focus:ring-[#045257] focus:ring-1"
            >
              <option value="">All</option>
              <option value="Enabled">Enabled</option>
              <option value="Disabled">Disabled</option>
            </select>
          </div>
          <div>
            <span className=" mx-4">User Type:</span>
            <select
              onChange={handleUserChange}
              value={selectedUser}
              className=" rounded-md border border-gray-300 focus:outline-none focus:ring-[#045257] focus:ring-1"
            >
              <option value="">All Users</option>
              <option value="therapist">Therapist</option>
              <option value="client">Client</option>
            </select>
          </div>
          <div>
            <span className=" mx-4">Gender:</span>
            <select
              onChange={handleGenderChange}
              value={selectedGender}
              className=" rounded-md border border-gray-300 focus:outline-none focus:ring-[#045257] focus:ring-1"
            >
              <option value="">All Genders</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
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
