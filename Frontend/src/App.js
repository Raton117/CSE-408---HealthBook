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
import DoctorProfile from "./Pages/DoctorProfileNew";
import Signup from "./Pages/Signup";
import ProfileViewPage from "./Pages/ProfileView";
import UpdateProfilePage from "./Pages/updateprofile";
import PrescriptionRequest from "./Pages/Request";
import MyPrescriptions from "./Pages/MyPrescriptions";
import ReportUpload from "./Pages/ReportUpload1";
import Prescription from "./Pages/Prescription";
import Chat from "./Pages/Chats";
import CurrentMedications from "./Pages/currentMedications";
import MyTreatments from "./Pages/MyTreatments";
import UpdateTreatment from "./UpdateTreatment";

// Patient Analysis
import PatientAnalysis from "./Pages/PatientAnalysis";

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
import AddConsultancy from "./Pages/Doctor/AddConsultancy";
import AddDegreeForm from "./Pages/Doctor/AddDegrees";
import DoctorAddTreatment from "./Pages/Doctor/DoctorAddTreatment";
import DocTreatments from "./Pages/Doctor/DoctorTreatments";
import DocMyPrescriptions from "./Pages/Doctor/DoctorMyPrescriptions";

// Doctor Analysis
import DoctorAnalysis from "./Pages/Doctor/Analysis";


import AllPosts from "./Pages/Forum/PostList";
import PostDetail from "./Pages/Forum/PostDetails";
import PostPageNew from "./Pages/Forum/PostPageNew";
import CreatePost from "./Pages/Forum/CreatePost";

import AddTreatment from "./Pages/AddTreatment";

//admin pages
import AdminLogin from "./Pages/Admin/AdminLogin";
import AdminNavbar from "./Pages/Admin/AdminNavbar";
import AdminSidebar from "./Pages/Admin/AdminSidebar";
import VerifyDoctor from "./Pages/Admin/Doctor/VerifyDoctor";

// Reports
import ReportedPosts from "./Pages/Admin/Reports/ReportedPosts";
import PostReportBox from "./Components/Doctor/PostReportBox";

// download data
import DownloadData from "./Pages/Admin/Data/DataDownload";

// Analysis
import GeneralAnalysis from "./Pages/Admin/Analysis/GeneralAnalysis";

// profile
import AdminProfile from "./Pages/Admin/AdminProfile";


const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("username")) {
      if(window.location.pathname !== '/adminlogin') {
        alert("You are not Logged In");
        navigate("/login");
      }
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

      case "admin":
        return (
          <AdminNavbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
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

      case "admin":
        return <AdminSidebar />;

      default:
        return <Sidebar />;
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("username");
    localStorage.removeItem("userRole"); // Example of clearing user data
    localStorage.removeItem("isAuthenticated");
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
            <Route path="/" element={<AllPosts />} />
            <Route
              path="/login"
              element={<LoginPage setIsAuthenticated={setIsAuthenticated} />}
            />

            <Route path="/MyDoctors" element={<MyDoctors />} />
            <Route path="/FindDoctor" element={<FindDoctor />} />
            <Route path="/doctor/:username" element={<DoctorProfile />} />
            <Route path="/signup" element={<Signup />} />
            <Route
              path="/PrescriptionRequest"
              element={<PrescriptionRequest />}
            />
            <Route path='/prescription/:id' element={<Prescription />} />
            <Route path="/myprescriptions/:treatmentID" element={<MyPrescriptions />} />
            <Route path='/currentMedication' element={<CurrentMedications />} />
            <Route path="/profileviewpage" element={<ProfileViewPage />} />
            <Route path="/updateprofile" element={<UpdateProfilePage />} />

            {/* patient analysis */}
            <Route path="/patient-analysis/:username" element={<PatientAnalysis />} />

            <Route
              path="/doctorlogin"
              element={<DoctorLogin setIsAuthenticated={setIsAuthenticated} />}
            />
            <Route path="/doctorprofileview" element={<DoctorProfileView />} />
            <Route
              path="/updatedoctorprofile"
              element={<DoctorProfileUpdate />}
            />

            <Route path="/doctorTreatments" element={<DocTreatments />} />
            <Route path="/doctoraddtreatment" element={<DoctorAddTreatment />} />
            <Route path="doctormyprescriptions/:treatmentID" element={<DocMyPrescriptions />} />

            <Route path="/requestpatient" element={<RequestPatient />} />
            <Route path="/prescriptionupload/:treatmentID" element={<ReportUpload />} />
            <Route path="/chat" element={<Chat />} />
            {/* <Route path="/createpost" element={<PostPage />} /> */}
            <Route path="/createpost" element={<CreatePost />} />
            <Route path="/doctorsignup" element={<DoctorSignup />} />
            <Route path="/posts" element={<AllPosts />} />
            <Route path="/posts/:id" element={<PostDetail />} />
            <Route path="/mytreatments" element={<MyTreatments />} />
            <Route path="/addtreatment" element={<AddTreatment />} />
            <Route path="/updateTreatment/:id" element={<UpdateTreatment />} />
            <Route path="/addconsultancy" element={<AddConsultancy />} />
            <Route path="/adddegree" element={<AddDegreeForm />} />
            {/* doctor analysis */}
            <Route path="/doctoranalysis" element={<DoctorAnalysis />} />

            {/* admin routes */}
            <Route path="/adminlogin" element={<AdminLogin setIsAuthenticated={setIsAuthenticated}/>} />
            <Route path="/verifydoctor" element={<VerifyDoctor />} />

            {/* download data */}
            <Route path="/download-data" element={<DownloadData />} />

            {/* Reports */}
            <Route path="/reported-posts" element={<ReportedPosts />} />

            {/* Analysis */}
            <Route path="/general-analysis" element={<GeneralAnalysis />} />

            <Route path="/adminprofileviewpage" element={<AdminProfile />} />

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
