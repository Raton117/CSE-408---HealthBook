import React from 'react'
import MyDoctors from '../Pages/MyDoctors';
const Forms = () => {

  return (
    <>

{/* <input
              name="doctorName"
              id="doctorName"
              placeholder="Enter Doctor's Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label htmlFor="designation" style={{ margin: "25px" }}>
              Designation
            </label>
            <input
              name="designation"
              id="designation"
              placeholder="Designation of Doctor"
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
            />
            <label htmlFor="department" style={{ margin: "30px" }}>
              Department
            </label>
            <input
              name="department"
              id="department"
              placeholder="Department"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            />
            <label htmlFor="area" style={{ margin: "30px" }}>
              Area
            </label>
            <input
              name="area"
              id="area"
              placeholder="Doctor's Chamber's Area"
              value={area}
              onChange={(e) => setArea(e.target.value)}
            /> */}
   <form class="max-w-lg mx-auto">
  <div class="mb-4">
    <label for="name" class="block text-gray-700 text-sm font-bold mb-2">Name</label>
    <input id="doctorName" name="doctorName" type="text" placeholder="Enter Doctor's Name" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
  </div>
  <div class="mb-4">
    <label for="email" class="block text-gray-700 text-sm font-bold mb-2">Designation</label>
    <input id="email" type="email" placeholder="Designation" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
  </div>
  <div class="mb-4">
    <label for="password" class="block text-gray-700 text-sm font-bold mb-2">Department</label>
    <input id="password" type="password" placeholder="Department" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
  </div>
  <div class="mb-4">
    <label for="confirmPassword" class="block text-gray-700 text-sm font-bold mb-2">Area</label>
    <input id="confirmPassword" type="password" placeholder="Area" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
  </div>
  <div class="flex items-center justify-center">
    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline " type="button" >
      Search
    </button>
  </div>
</form>



    </>
   
  )
}

export default Forms