import axios from "axios";
import React, { useState } from "react";
import endpoint from "../../endpoint";

const DiagnosisForm = ({ client }) => {
  const [Diagnosis, setDiagnosis] = useState("");
  const submitDiagnosis = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${endpoint}/api/medicalDiagnosis/createMedicalDiagnosis`,
        {
          diagnosis: Diagnosis,
          clientUserId: client._id,
          therapyistUserId: sessionStorage.getItem("userID"),
        }
      );

      console.log(response.data);
      setDiagnosis("");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form
      onSubmit={(e) => {
        submitDiagnosis(e);
      }}
      className=""
    >
      <label className="block mb-2 font-semibold" htmlFor="Diagnosis">
        Your Diagnosis
      </label>
      <textarea
        id="Diagnosis"
        rows={5}
        value={Diagnosis}
        onChange={(e) => setDiagnosis(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded"
        required
      ></textarea>

      <button
        type="submit"
        className="inline-flex 
             px-4 py-2 my-10 hover:bg-[#F2894E] bg-[#045257] text-white font-bold rounded-md  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Submit Diagnosis
      </button>
    </form>
  );
};

const DiagnosisPage = ({ client }) => {
  const [Diagnosiss, setDiagnosiss] = useState([]);

  const addDiagnosis = (newDiagnosis) => {
    setDiagnosiss([...Diagnosiss, newDiagnosis]);
  };

  return (
    <div className="container mx-auto px-4 py-2">
      <DiagnosisForm client={client} />
    </div>
  );
};

export default DiagnosisPage;
