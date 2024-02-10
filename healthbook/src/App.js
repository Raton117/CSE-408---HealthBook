import React,{useState} from 'react'
import styles from './style'
import {Route,Routes} from 'react-router-dom'
import Navbar from './Pages/navbar'
import Sidebar from './Pages/sidebar'
import HomePage from './Pages/Home'
import LoginPage from './Pages/Login'
import MyDoctors from './Pages/MyDoctors'
import FindDoctor from './Pages/FindDoctors'
import DoctorProfile from './Pages/DoctorProfile'
import Signup from './Pages/Signup'
import ProfileViewPage from './Pages/ProfileView'
import UpdateProfilePage from './Pages/updateprofile'
import PrescriptionRequest from './Pages/Request'
//doctor's pages
import DocNavbar from './Pages/Doctor/Docnavbar'
import DoctorLogin from './Pages/Doctor/DoctorLogin'
import DoctorSidebar from './Pages/Doctor/DoctorSidebar'


const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const getUserRole = () => {
    return localStorage.getItem('userRole'); // Or sessionStorage if you used that
  };
  const renderNavbar = () => {
    const userRole = getUserRole();
    console.log(userRole+" user role is app.ks");
    switch (userRole) {
      case 'doctor':
        console.log("doctor is here");
        return <DocNavbar isAuthenticated={isAuthenticated} onLogout={handleLogout}/>;
      
      default:
        return <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout}/>
    }
  };
  const renderSidebar = () => {
    const userRole = getUserRole();
    
    switch (userRole) {
      case 'doctor':
        
        return <DoctorSidebar />;
      
      default:
        return <Sidebar/>
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('patient_username'); // Example of clearing user data
  };
  return (
<>



    <nav class=" shadow-lg top-0">
  <div class="max-w-full  px-4">
    
       {renderNavbar()}
        {/* navbar 22 */}
      </div>
    
    </nav>

    <div class="flex flex-wrap flex-row">
    <div className="bg-dimBlue h-lvh w-1/6 top left-0">
      <div className="p-4">
        {renderSidebar()}
      </div>
    </div>

    <div className="bg-amber-50 text-black h-screen w-5/6">
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage setIsAuthenticated={setIsAuthenticated} />} />
      
     
      <Route path="/MyDoctors" element={<MyDoctors />} />
      <Route path="/FindDoctor" element={<FindDoctor />}  />
      <Route path="/doctorprofile" element={<DoctorProfile />}  />
      <Route path="/signup" element={<Signup />}  />
      <Route path="/PrescriptionRequest" element={<PrescriptionRequest />} />
      <Route path="/profileviewpage" element={<ProfileViewPage />} />
      <Route path="/updateprofile" element={<UpdateProfilePage />} />
      <Route path='/doctorlogin' element={<DoctorLogin setIsAuthenticated={setIsAuthenticated}/>}/>
      {/* } />
      <Route path="/HealthAnalysis" element={<HealthAnalysis />} />
      <Route path="/MyDoctors" element={<MyDoctors />} />
      <Route path="/Warnings" element={<Warnings />} />
      <Route path="/PrescriptionRequest" element={<PrescriptionRequest />} /> */}
    </Routes>
    
    </div>
    
  </div>

    

    
    
    
    </>
  )
}

export default App