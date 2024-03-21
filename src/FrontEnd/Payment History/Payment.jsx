import React, { useEffect, useState } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import Header2 from "../Home/header2";
import axios from "axios";
import endpoint from "../endpoint";

const PaymentTransactionPage = () => {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([
    // Add more transactions as needed
  ]);
  // Sort transactions by date, earliest first
  const sortedTransactions = [...transactions].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );
  useEffect(() => {
    // Function to fetch payments
    const fetchPayments = async () => {
      try {
        console.log(sessionStorage.getItem("token"));
        // Make a GET request to fetch payments
        const response = await axios.get(
          `${endpoint}/api/payment/getTransactionHistory/${sessionStorage.getItem(
            "userID"
          )}`,
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
          }
        ); // Assuming your API endpoint is /api/payments
        setTransactions(response.data);
      } catch (error) {
        console.error("Error fetching payments:", error);
      }
    };

    // Call fetchPayments function
    fetchPayments();
  }, []);

  return (
    <>
      <button
        onClick={() => navigate(-1)}
        className="hover:cursor-pointer transition-transform transform hover:scale-110"
      >
        <img className=" m-12 " src=" src/assets/client landing/back.svg"></img>
      </button>{" "}
      <div className="container mx-auto px-20 py-8">
        <h1 className="text-3xl font-bold text-[#F2894E] mb-8   ">
          Payment and Transactions
        </h1>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-[#045257] text-xs font-semibold uppercase tracking-wider">
                  Sender
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-[#045257] text-xs font-semibold uppercase tracking-wider">
                  Beneficiary
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-[#045257] text-xs font-semibold uppercase tracking-wider">
                  Transaction Number
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-[#045257] text-xs font-semibold uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-[#045257] text-xs font-semibold uppercase tracking-wider">
                  Date
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {sortedTransactions.map((transaction, index) => (
                <tr
                  key={index}
                  className={(index + 1) % 2 === 0 ? "bg-gray-50" : ""}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    {`${transaction.sender.firstName} ${transaction.sender.lastName}`}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {`${transaction.receiver.firstName} ${transaction.receiver.lastName}`}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {transaction.tx_ref}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {transaction.amount} ETB
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {transaction.createdAt}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default PaymentTransactionPage;
