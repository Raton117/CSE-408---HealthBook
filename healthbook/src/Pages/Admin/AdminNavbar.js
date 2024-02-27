import React from "react";
import { Link } from "react-router-dom";

// You can replace 'YourLogo.png' with the actual path to your logo file
import YourLogo from "../../Components/HBlogo.png"

const AdminNavbar = ({ isAuthenticated, onLogout }) => {
  // You can replace this with your actual authentication logic
  console.log();
  if (localStorage.getItem("isAuthenticated") === "true") {
    isAuthenticated = true;
  }
  console.log("this is authentication " + isAuthenticated);
  const logout = () => {
    onLogout(); // Call the passed in logout function to update state in App.js
    // Optionally redirect to the login page
  };
  return (
    <nav className="bg-gray-900 text-white shadow-lg top-0">
      <div className="max-w-full px-4 flex justify-between items-center h-24">
        <div className="flex items-center">
          <Link to="/">
            <img src={YourLogo} alt="Healthbook Logo" className="h-28 mr-20" />
          </Link>

          <Link to="/" className="hover:text-red-500 mr-8 text-2xl">
            Home
          </Link>
          <Link to="/verifydoctor" className="hover:text-red-500 mr-8 text-2xl">
            Verify Doctor
          </Link>
          <Link to="/currentMedication" className="hover:text-red-500 text-2xl">
            Current Medication
          </Link>
          <Link to ="/addtreatment" className="hover:text-red-500 text-2xl ml-8">Add Treatment</Link>
        </div>

        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <div className="flex items-center space-x-4">
             
              <Link
                to="/profileviewpage"
                className="bg-green-500 hover:bg-green-700 text-white p-3 rounded-full text-2xl font-poppins"
              >
                Profile
              </Link>
              <button className="hover:text-gray-300 text-2xl bg-red-400 p-3 rounded-full font-poppins">
                {" "}
                <Link to="/login" onClick={logout}>
                  Logout
                </Link>
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

export default AdminNavbar;