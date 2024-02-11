
import React from 'react'

const form = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-transparent pt-20"> {/* Added pt-20 for top padding */}
  <div className="bg-white p-10 rounded shadow-md w-full max-w-4xl"> {/* Adjusted padding and set max width */}
    <h2 className="text-2xl font-bold mb-4 text-center">Update Profile</h2>
    <form  className="grid grid-cols-2 gap-4"> {/* Use grid layout */}
      <div className="mb-4 flex flex-col">
        <label htmlFor="username">Username:</label>
        <input
          id="username"
          type="text"
          name="username"
          
          className="px-3 py-2 border focus:outline-none focus:border-blue-500 rounded"
          placeholder="Enter your username"
        />
      </div>
      <div className="mb-4 flex flex-col">
        <label htmlFor="name">Full Name:</label>
        <input
          id="name"
          type="text"
          name="name"
         
          className="px-3 py-2 border focus:outline-none focus:border-blue-500 rounded"
          placeholder="Enter your name"
        />
      </div>
      {/* Pair the next set of fields */}
      <div className="mb-4 flex flex-col">
        <label htmlFor="hospitalName">Hospital Name:</label>
        <input
          id="hospitalName"
          type="text"
          name="hospitalName"
         
          className="px-3 py-2 border focus:outline-none focus:border-blue-500 rounded"
          placeholder="Enter hospital name"
        />
      </div>
      <div className="mb-4 flex flex-col">
        <label htmlFor="department">Department:</label>
        <input
          id="department"
          type="text"
          name="department"
          
          className="px-3 py-2 border focus:outline-none focus:border-blue-500 rounded"
          placeholder="Enter department"
        />
      </div>
      {/* Continue with the pattern for other fields */}
      {/* For fields not easily split into two, you might span the grid */}
      <div className="col-span-2"> {/* Make a field span both columns */}
        <div className="mb-4 flex flex-col">
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            name="email"
           
            className="px-3 py-2 border focus:outline-none focus:border-blue-500 rounded"
            placeholder="Enter email"
          />
        </div>
      </div>
      {/* Adjust consultancy fields similarly, ensuring they fit within the grid layout you prefer */}
      {/* Additional form content */}
    </form>
  </div>
</div>
  )
}

export default form