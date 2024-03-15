import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";

import axios from "axios";

const MyDoctors = () => {
 
  const [doctors, setDoctors] = useState([]);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [hospitalName, setHospitalName] = useState("");
  const [department, setDepartment] = useState("");
  const [designation, setDesignation] = useState("");
  const [area, setArea] = useState("");

  const [query, setQuery] = useState();

  const loadDoctors = async () => {
    const url = "http://localhost:8000/patients/doctor-list";

    const res = axios
      .get(url, { params: query })
      .then((response) => {
        
        setDoctors(response.data.doctors);
        console.log(response.data.doctors[0].consultency[0]);
       
      })
      .catch((error) => {
        console.log(error);
      });
   
  };

  const doDoctorSearch = () => {
    setQuery({
      department: department,
      designation: designation,
      name: name,
      area: area,
    });
  };

  useEffect(() => {
   
    loadDoctors();
  }, [query]);

  
  return (
    <>

<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
  
  <div class="bg-white shadow-md rounded-lg overflow-hidden">
    <img class="w-full h-56 object-cover object-center" src="image1.jpg" alt="Card Image"/>
    <div class="p-4">
      <h2 class="font-bold text-xl mb-2">Card Title 1</h2>
      <p class="text-gray-700">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </div>
  </div>


  <div class="bg-white shadow-md rounded-lg overflow-hidden">
    <img class="w-full h-56 object-cover object-center" src="image2.jpg" alt="Card Image"/>
    <div class="p-4">
      <h2 class="font-bold text-xl mb-2">Card Title 2</h2>
      <p class="text-gray-700">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </div>
  </div>

  <div class="bg-white shadow-md rounded-lg overflow-hidden">
    <img class="w-full h-56 object-cover object-center" src="image3.jpg" alt="Card Image"/>
    <div class="p-4">
      <h2 class="font-bold text-xl mb-2">Card Title 3</h2>
      <p class="text-gray-700">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
    </div>
  </div>


</div>
</>
  )
      {/* <div
          {/* Second column content */}
          <h1>Current Doctors</h1>
          {doctors && doctors.length > 0 ? (
    doctors.map((doctor, index) => (
      <Card key={index} style={{ width: "28rem", border: "2px solid white", margin: '5px' }}>
        <Card.Img variant="top" src="holder.js/100px180" />
        <Card.Body>
          <Card.Title>{doctor.name}</Card.Title>
          <Card.Text>{doctor.department}</Card.Text>
          <Card.Text>{doctor.designation}</Card.Text>
          <Card.Text>Clinic: {doctor.consultency[0] ? doctor.consultency[0].clinic_name : 'Not available'}</Card.Text>
          <h5>Visiting Hour :</h5>
          {doctor.consultency[0] && doctor.consultency[0].days ? (
            <Card.Text>
              Days: {doctor.consultency[0].days.map(day => day.day).join(', ')}
            </Card.Text>
          ) : (
            <Card.Text>Days: Not available</Card.Text>
          )}
          <Card.Text>Start Time: {doctor.consultency[0] ? doctor.consultency[0].start_time : 'Not available'}</Card.Text>
          <Card.Text>End Time: {doctor.consultency[0] ? doctor.consultency[0].end_time : 'Not available'}</Card.Text>
          <Card.Text>Room: {doctor.consultency[0] ? doctor.consultency[0].room : 'Not available'}</Card.Text>
        </Card.Body>
      </Card>
    ))
  ) : (
    <p>No doctors available</p>
  )}
        {/* </div>
        <div style={{ flexDirection: "column", padding: "10px" }}>
          {/* Third column content */}
          <form className="filter" style={{ flexDirection: "column" }}>
            <label htmlFor="doctorName" style={{ margin: "39px" }}>
              Name
            </label>
            <input
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
            />

            <Button
              //type="submit"
              onClick={doDoctorSearch}
              style={{
                backgroundColor: "white",
                color: "#7439db",
                width: "100px",
                height: "40px",
                borderRadius: "5px",
                
              }}
            >
              Search
            </Button>
          </form>
       
      </div> } */}
   
  );
  
}

export default MyDoctors




