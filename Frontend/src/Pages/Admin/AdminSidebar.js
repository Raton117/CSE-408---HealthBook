import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MdPersonSearch, MdHealthAndSafety, MdPeople, MdWarning, MdMedication } from 'react-icons/md'; // Example icons

const AdminSidebar = () => {
  const iconSize = '30px'; // Adjust icon size as needed
  const [activeMenu, setActiveMenu] = useState(null);

  const handleMenuClick = (menuName) => {
    setActiveMenu(menuName);
  };

  return (
    <div className="text-black h-full flex flex-col justify-center items-center">
      <ul className="space-y-8 mt-8"> {/* Increased vertical space */}
        <li>
          <Link to="/reported-posts" className={`flex items-center space-x-2 hover:text-gray-300 ${activeMenu === 'FindDoctor' ? 'text-rose-500' : ''}`} onClick={() => handleMenuClick('FindDoctor')}>
            <MdPersonSearch size={iconSize} />
            <span className="text-2xl">Reported Posts</span>
          </Link>
        </li>
        <li>
          <Link to="/general-analysis" className={`flex items-center space-x-2 hover:text-gray-300 ${activeMenu === 'HealthAnalysis' ? 'text-rose-500' : ''}`} onClick={() => handleMenuClick('HealthAnalysis')}>
            <MdHealthAndSafety size={iconSize} />
            <span className="text-2xl">General Analysis</span>
          </Link>
        </li>
        
      </ul>
    </div>
  );
}

export default AdminSidebar;