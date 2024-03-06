import AdminHeader from "../AdminHeader";
import SearchBar from "./SearchBar";

import UserDetails from "./UserDetails";

function DisplayUser() {
  return (
    <div>
      <AdminHeader />
      <SearchBar />
      <div className=" flex m-2 justify-evenly flex-wrap">
        <UserDetails />
        <UserDetails />
        <UserDetails />
        <UserDetails />
        <UserDetails />
        <UserDetails />
        <UserDetails />
        <UserDetails />
        <UserDetails />
        <UserDetails />
        <UserDetails />
      </div>
    </div>
  );
}

export default DisplayUser;
