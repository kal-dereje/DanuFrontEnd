import Header2 from "../../Home/header2";
import SearchBar from "./SearchBar";

import ClientDetails from "./ClientDetails";

function DisplayClient() {
  const clientObj = JSON.parse(sessionStorage.getItem("clients"));
  console.log(clientObj);
  return (
    <div>
      <Header2 />
      <SearchBar />
      <div className=" flex m-2 justify-evenly flex-wrap">
        {clientObj.map((client, index) => {
          return <ClientDetails key={index} client={client} />;
        })}
      </div>
    </div>
  );
}

export default DisplayClient;
