import SearchBar from "./SearchBar";
import TherapistDetails from "./TherapistDetails";

function Display() {
  return (
    <div>
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
