import React from 'react'
import styles from './style'
import {Route,Routes} from 'react-router-dom'
import Navbar from './Pages/navbar'
import Sidebar from './Pages/sidebar'
import HomePage from './Pages/Home'
import LoginPage from './Pages/Login'
// import FindDoctor from './Pages/FindDoctor'
// import HealthAnalysis from './Pages/HealthAnalysis'
// import MyDoctors from './Pages/MyDoctors'
// import Warnings from './Pages/Warnings'
// import PrescriptionRequest from './Pages/PrescriptionRequest'

const App = () => {
  return (
<>



    <nav class=" shadow-lg top-0">
  <div class="max-w-full  px-4">
    
        <Navbar />
        {/* navbar 22 */}
      </div>
    
    </nav>

    <div class="flex flex-wrap flex-row">
    <div className="bg-black h-lvh w-1/6 top left-0">
      <div className="p-4">
        <Sidebar/>
      </div>
    </div>

    <div className="bg-amber-50 text-black h-screen w-5/6">
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      {/* <Route path="/FindDoctor" element={<FindDoctor />} />
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