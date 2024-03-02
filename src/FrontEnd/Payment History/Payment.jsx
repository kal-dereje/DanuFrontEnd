import React, { useState } from "react";
import { Outlet, Link } from "react-router-dom";
import Header2 from "../Home/header2";

const PaymentTransactionPage = () => {
  const [transactions, setTransactions] = useState([
    {
      sender: "Kidus Dawit",
      beneficiary: "Kalab Dereje",
      transactionNumber: "123456789",
      date: "2024-03-03",
    },
    {
      sender: "Kidus Dawit",
      beneficiary: "Kalab Dereje",
      transactionNumber: "23456789",
      date: "2024-05-03",
    },
    {
      sender: "Kidus Dawit",
      beneficiary: "Kalab Dereje",
      transactionNumber: "3456789",
      date: "2024-04-03",
    },

    // Add more transactions as needed
  ]);
  // Sort transactions by date, earliest first
  const sortedTransactions = [...transactions].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  return (
    <>
      <Link
        to="/"
        className="hover:cursor-pointer transition-transform transform hover:scale-110"
      >
        <img className=" m-12 " src=" src/assets/client landing/back.svg"></img>
      </Link>{" "}
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
                    {transaction.sender}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {transaction.beneficiary}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {transaction.transactionNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {transaction.date}
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
