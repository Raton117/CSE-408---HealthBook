import React from "react";

const Request = () => {
  return (
    <>
      <div className="flex  justify-center min-h-screen bg-gray-100">
        <div className="bg-white rounded-lg shadow-lg p-8 m-4 max-w-sm h-auto w-full">
          <div className="text-center font-bold text-xl mb-4">Requests</div>
          <div className="border-t border-gray-200 pt-4">
            <p className="text-gray-700 text-base mb-4">
              Doctor Nadim Zaman wants access to your prescriptions and current
              medications
            </p>
            <div className="flex justify-between">
              <button className="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-700 focus:outline-none focus:shadow-outline">
                Grant Access
              </button>
              <button className="bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-700 focus:outline-none focus:shadow-outline">
                Deny Access
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Request;
