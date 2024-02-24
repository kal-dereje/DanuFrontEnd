import Header2 from "../Home/header2";
import SearchBar from "./SearchBar";

import TherapistDetails from "./TherapistDetails";

function Display() {
  return (
    <div>
      <Header2 />
      <SearchBar />
      <div className=" flex m-2 justify-evenly flex-wrap">
        <TherapistDetails />
        <TherapistDetails />
        <TherapistDetails />
        <TherapistDetails />
        <TherapistDetails />
        <TherapistDetails />
        <TherapistDetails />
        <TherapistDetails />
        <TherapistDetails />
        <TherapistDetails />
        <TherapistDetails />
      </div>
    </div>
  );
}

export default Display;
