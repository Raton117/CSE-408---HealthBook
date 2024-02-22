import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MdPersonSearch, MdHealthAndSafety, MdPeople, MdWarning, MdMedication } from 'react-icons/md'; // Example icons

const Sidebar = () => {
  const iconSize = '30px'; // Adjust icon size as needed
  const [activeMenu, setActiveMenu] = useState(null);

  const handleMenuClick = (menuName) => {
    setActiveMenu(menuName);
  };

  return (
    <div className="text-black h-full flex flex-col justify-center items-center">
      <ul className="space-y-8 mt-8"> {/* Increased vertical space */}
        <li>
          <Link to="/mypatients" className={`flex items-center space-x-2 hover:text-gray-300 ${activeMenu === 'mypatients' ? 'text-rose-500' : ''}`} onClick={() => handleMenuClick('mypatients')}>
            <MdPeople size={iconSize} />
            <span className="text-2xl">My Patients</span>
          </Link>
        </li>
        <li>
          <Link to="/analysis" className={`flex items-center space-x-2 hover:text-gray-300 ${activeMenu === 'analysis' ? 'text-rose-500' : ''}`} onClick={() => handleMenuClick('analysis')}>
            <MdHealthAndSafety size={iconSize} />
            <span className="text-2xl"> Analysis</span>
          </Link>
        </li>
       
          <Link to="/Warnings" className={`flex items-center space-x-2 hover:text-gray-300 ${activeMenu === 'Warnings' ? 'text-rose-500' : ''}`} onClick={() => handleMenuClick('Warnings')}>
            <MdWarning size={iconSize} />
            <span className="text-2xl">Warnings</span>
          </Link>
      
        <li>
          <Link to="/requestpatient" className={`flex items-center space-x-2 hover:text-gray-300 ${activeMenu === 'requestpatient' ? 'text-rose-500' : ''}`} onClick={() => handleMenuClick('requestpatient')}>
            <MdMedication size={iconSize} />
            <span className="text-2xl">Request Prescription</span>
          </Link>
        </li>
        
      </ul>
    </div>
  );
}

export default Sidebar;
