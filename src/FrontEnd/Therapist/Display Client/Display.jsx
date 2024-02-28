import Header2 from "../../Home/header2";
import SearchBar from "./SearchBar";

import ClientDetails from "./ClientDetails";

function DisplayClient() {
  return (
    <div>
      <Header2 />
      <SearchBar />
      <div className=" flex m-2 justify-evenly flex-wrap">
        <ClientDetails />
        <ClientDetails />
        <ClientDetails />
        <ClientDetails />
        <ClientDetails />
        <ClientDetails />
        <ClientDetails />
        <ClientDetails />
        <ClientDetails />
        <ClientDetails />
        <ClientDetails />
      </div>
    </div>
  );
}

export default DisplayClient;
