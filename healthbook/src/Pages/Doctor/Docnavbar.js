import React from "react";
import { Link } from "react-router-dom";

// You can replace 'YourLogo.png' with the actual path to your logo file
import YourLogo from "../../Components/HBlogo.png"

const DocNavbar = ({isAuthenticated,onLogout}) => {
  
  // You can replace this with your actual authentication logic
  console.log()
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
          <Link to="/allrecords" className="hover:text-black mr-8 text-2xl">
            All Records
          </Link>
          <Link to="/posts" className="hover:text-black mr-8 text-2xl">
            Posts
          </Link>
          <Link to="/currentTreatment" className="hover:text-black text-2xl">
            Current Treatment
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <div className="flex items-center space-x-4">
              <Link
                to="/doctorprofileview"
                className="bg-blue-500 text-2xl font-poppins text-white p-3 rounded hover:bg-blue-700"
              >
                Profile
              </Link>
              <button className="hover:text-gray-300 text-2xl bg-red-400 p-3 rounded"> <Link to="/login" onClick={logout}>Logout</Link>
                
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="hover:text-gray-300 bg-myblue p-3 ml-8 text-2xl"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="hover:text-gray-300 bg-myblue p-3 ml-8 text-2xl"
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
