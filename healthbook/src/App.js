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

// import HealthAnalysis from './Pages/HealthAnalysis'
// import MyDoctors from './Pages/MyDoctors'
// import Warnings from './Pages/Warnings'
import PrescriptionRequest from './Pages/Request'

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  //console.log("this is authentication in app.js"+isAuthenticated)

  const handleLogout = () => {
    setIsAuthenticated(false);
    // Add any other logout logic here, e.g., clearing localStorage
    localStorage.removeItem('patient_username'); // Example of clearing user data
  };
  return (
<>



    <nav class=" shadow-lg top-0">
  <div class="max-w-full  px-4">
    
        <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout}/>
        {/* navbar 22 */}
      </div>
    
    </nav>

    <div class="flex flex-wrap flex-row">
    <div className="bg-dimBlue h-lvh w-1/6 top left-0">
      <div className="p-4">
        <Sidebar/>
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