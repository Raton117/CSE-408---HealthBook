import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MdPersonSearch, MdHealthAndSafety, MdPeople, MdWarning, MdMedication } from 'react-icons/md'; // Example icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

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
          <Link to="/FindDoctor" className={`flex items-center space-x-2 hover:text-gray-300 ${activeMenu === 'FindDoctor' ? 'text-rose-500' : ''}`} onClick={() => handleMenuClick('FindDoctor')}>
            <MdPersonSearch size={iconSize} />
            <span className="text-2xl">Find Doctor</span>
          </Link>
        </li>
        <li>
          <Link to={`/patient-analysis/${localStorage.getItem('username')}`} className={`flex items-center space-x-2 hover:text-gray-300 ${activeMenu === 'HealthAnalysis' ? 'text-rose-500' : ''}`} onClick={() => handleMenuClick('HealthAnalysis')}>
            <MdHealthAndSafety size={iconSize} />
            <span className="text-2xl">Health Analysis</span>
          </Link>
        </li>
        <li>
          <Link to="/MyDoctors" className={`flex items-center space-x-2 hover:text-gray-300 ${activeMenu === 'MyDoctors' ? 'text-rose-500' : ''}`} onClick={() => handleMenuClick('MyDoctors')}>
            <MdPeople size={iconSize} />
            <span className="text-2xl">My Doctors</span>
          </Link>
        </li>
        
        
      </ul>
    </div>
  );
}

export default Sidebar;
