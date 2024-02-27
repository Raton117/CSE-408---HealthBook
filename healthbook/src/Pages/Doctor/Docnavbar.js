import React from "react";
import { Link } from "react-router-dom";

// You can replace 'YourLogo.png' with the actual path to your logo file
import YourLogo from "../../Components/HBlogo.png"

const DocNavbar = ({isAuthenticated,onLogout}) => {
  
  // You can replace this with your actual authentication logic
  console.log()
  if (localStorage.getItem("isAuthenticated") === "true") {
    isAuthenticated = true;
  }
  console.log("this is authentication "+isAuthenticated)
  const logout = () => {
    onLogout(); // Call the passed in logout function to update state in App.js
     // Optionally redirect to the login page
  };
  return (
    <nav className="bg-white text-gray-500 shadow-lg top-0">
      <div className="max-w-full px-4 flex justify-between items-center h-24">
        <div className="flex items-center">
          <Link to="/">
            <img src={YourLogo} alt="Healthbook Logo" className="h-28 mr-20" />
          </Link>

          <Link to="/" className="hover:text-black mr-8 text-2xl">
            Home
          </Link>
          {/* <Link to="/allrecords" className="hover:text-black mr-8 text-2xl">
            All Records
          </Link> */}
          <Link to="/doctorTreatments" className="hover:text-black mr-8 text-2xl">
            Treatments
          </Link>
          <Link to="/posts" className="hover:text-black mr-8 text-2xl">
            Posts
          </Link>
          <Link to="/doctoraddtreatment" className="hover:text-black text-2xl">
            Add Treatment
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <div className="flex items-center space-x-4">
              <Link
                to="/doctorprofileview"
                className="bg-green-500 hover:bg-green-700 text-white p-3 rounded-full text-2xl font-poppins"
              >
                Profile
              </Link>
              <button className="hover:text-gray-300 text-2xl bg-red-400 p-3 rounded-full"> <Link to="/login" onClick={logout}>Logout</Link>
                
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="bg-green-500 hover:bg-green-700 text-white p-3 rounded-full text-2xl font-poppins"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-green-500 hover:bg-green-700 text-white p-3 rounded-full text-2xl font-poppins"
              >
                Signup
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default DocNavbar;
