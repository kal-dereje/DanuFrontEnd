import AdminPage from "./AdminPage";
import AdminHeader from "./AdminHeader";
import { useEffect, useState } from "react";
import axios from "axios";
import endpoint from "../endpoint";
function Requests() {
  const [request, setRequest] = useState([]);
  useEffect(() => {
    // Function to fetch payments
    const fetchRequest = async () => {
      try {
        // Make a GET request to fetch payments
        const response = await axios.get(
          `${endpoint}/api/admin/getAprovalRequest`
        ); // Assuming your API endpoint is /api/payments
        setRequest(response.data);
      } catch (error) {
        console.log("Error fetching requests:", error);
      }
    };

    // Call fetchPayments function
    fetchRequest();
  }, []);

  return (
    <div>
      <div>
        <AdminHeader />
      </div>
      <div>
        {request?.map((req, index) => {
          return <AdminPage key={index} requestList={req?.aproveRequest} />;
        })}
      </div>
    </div>
  );
}

export default Requests;
