import React, { useEffect, useState } from "react";
import styles from "./style";
import { Route, Routes } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Navbar from "./Pages/navbar";
import Sidebar from "./Pages/sidebar";
import HomePage from "./Pages/Home";
import LoginPage from "./Pages/Login";
import MyDoctors from "./Pages/MyDoctors";
import FindDoctor from "./Pages/FindDoctors";
import DoctorProfile from "./Pages/DoctorProfile";
import Signup from "./Pages/Signup";
import ProfileViewPage from "./Pages/ProfileView";
import UpdateProfilePage from "./Pages/updateprofile";
import PrescriptionRequest from "./Pages/Request";
import MyPrescriptions from "./Pages/MyPrescriptions";
import ReportUpload from "./Pages/ReportUpload1";
import Prescription from "./Pages/Prescription";
import Chat from "./Pages/Chats";
import CurrentMedications from "./Pages/currentMedications";


//doctor's pages
import DocNavbar from "./Pages/Doctor/Docnavbar";
import DoctorLogin from "./Pages/Doctor/DoctorLogin";
import DoctorSidebar from "./Pages/Doctor/DoctorSidebar";
import DoctorProfileView from "./Pages/Doctor/DoctorProfileView";
import DoctorProfileUpdate from "./Pages/Doctor/DoctorProfileUpdate";
import Tryform from "./Pages/Doctor/form";
import RequestPatient from "./Pages/Doctor/RequestPatient";
import PostPage from "./Pages/Doctor/Posts";
import DoctorSignup from "./Pages/Doctor/DoctorSignup";


import AllPosts from "./Pages/Forum/PostList";
import PostDetail from "./Pages/Forum/PostDetails";


const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("username")) {
      alert("You are not Logged In");
      navigate("/login");
    }
  }, []);

  const getUserRole = () => {
    return localStorage.getItem("userRole"); // Or sessionStorage if you used that
  };

  const renderNavbar = () => {
    const userRole = getUserRole();
    console.log(userRole + " user role is app.ks");
    switch (userRole) {
      case "doctor":
        return (
          <DocNavbar
            isAuthenticated={isAuthenticated}
            onLogout={handleLogout}
          />
        );

      default:
        return (
          <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
        );
    }
  };

  const renderSidebar = () => {
    const userRole = getUserRole();

    switch (userRole) {
      case "doctor":
        return <DoctorSidebar />;

      default:
        return <Sidebar />;
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("username");
    localStorage.removeItem("userRole"); // Example of clearing user data
  };
  return (
    <>
      <nav className=" shadow-lg top-0 ">
        <div className="max-w-full  px-4">
          {renderNavbar()}
          {/* navbar 22 */}
        </div>
      </nav>

      <div className="flex flex-row min-h-screen">
        <div className="bg-dimBlue h-lvh w-1/6 top left-0">
          <div className="p-4">{renderSidebar()}</div>
        </div>

        <div className="bg-amber-50  flex-1 overflow-auto text-black h-screen w-5/6">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/login"
              element={<LoginPage setIsAuthenticated={setIsAuthenticated} />}
            />

            <Route path="/MyDoctors" element={<MyDoctors />} />
            <Route path="/FindDoctor" element={<FindDoctor />} />
            <Route path="/doctorprofile" element={<DoctorProfile />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/PrescriptionRequest"
              element={<PrescriptionRequest />}
            />
            <Route path='/prescription/:id' element={<Prescription />} />
            <Route path="/myprescriptions" element={<MyPrescriptions />} />
            <Route path='/currentMedication' element={<CurrentMedications />} />
            <Route path="/profileviewpage" element={<ProfileViewPage />} />
            <Route path="/updateprofile" element={<UpdateProfilePage />} />
            <Route
              path="/doctorlogin"
              element={<DoctorLogin setIsAuthenticated={setIsAuthenticated} />}
            />
            <Route path="/doctorprofileview" element={<DoctorProfileView />} />
            <Route
              path="/updatedoctorprofile"
              element={<DoctorProfileUpdate />}
            />
            <Route path="/requestpatient" element={<RequestPatient />} />
            <Route path="/prescriptionupload" element={<ReportUpload />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/createpost" element={<PostPage />} />
            <Route path="/doctorsignup" element={<DoctorSignup />} />
            <Route path="/posts" element={<AllPosts />} />
            <Route path="/posts/:id" element={<PostDetail />} />
            {/* } />
      doctorprofileview
      <Route path="/HealthAnalysis" element={<HealthAnalysis />} />
      <Route path="/MyDoctors" element={<MyDoctors />} />
      <Route path="/Warnings" element={<Warnings />} />
      <Route path="/PrescriptionRequest" element={<PrescriptionRequest />} /> */}
          </Routes>
        </div>
      </div>
    </>
  );
};

export default App;
