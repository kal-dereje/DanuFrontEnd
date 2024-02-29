import React, { useState } from "react";

const DiagnosisForm = ({ onSubmit }) => {
  const [Diagnosis, setDiagnosis] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ Diagnosis });
    setDiagnosis("");
  };

  return (
    <form onSubmit={handleSubmit} className="">
      <label className="block mb-2 font-semibold" htmlFor="Diagnosis">
        Your Diagnosis
      </label>
      <textarea
        id="Diagnosis"
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

const DiagnosisPage = () => {
  const [Diagnosiss, setDiagnosiss] = useState([]);

  const addDiagnosis = (newDiagnosis) => {
    setDiagnosiss([...Diagnosiss, newDiagnosis]);
  };

  return (
    <div className="container mx-auto px-4 py-2">
      <DiagnosisForm onSubmit={addDiagnosis} />
    </div>
  );
};

export default DiagnosisPage;
