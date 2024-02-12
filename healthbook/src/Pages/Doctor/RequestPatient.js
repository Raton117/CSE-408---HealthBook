import React, { useState } from 'react';

const RequestPatient = () => {
  const [name, setName] = useState("");
  const [area, setArea] = useState("");

  return (
    <>
      <div className="max-w-[1320px] mx-auto">
        <h1 className="text-3xl font-bold text-center mt-10">My Doctors</h1>
      </div>
      <div className="flex flex-row ml-10 mt-10">
        <div className="bg-white h-auto w-3/4 mr-4">
          <div className="grid grid-cols-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-10 my-10">
            {/* Content here */}
          </div>
        </div>
        <div className="h-400 w-64">
          <form className="max-w-lg mx-auto">
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Name
              </label>
              <input
                name="patient"
                id="patient"
                placeholder="Enter Patient's Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="area"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Area
              </label>
              <input
                name="area"
                id="area"
                placeholder="Enter Patient's Area"
                value={area}
                onChange={(e) => setArea(e.target.value)}
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="flex items-center justify-center">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default RequestPatient;
