import React from 'react';
import { Link } from 'react-router-dom';
import { MdPersonSearch, MdHealthAndSafety, MdPeople, MdWarning, MdMedication } from 'react-icons/md'; // Example icons

const Sidebar = () => {
  const iconSize = '30px'; // Adjust icon size as needed

  return (
    <div className=" text-black h-full flex flex-col justify-center items-center">
      <ul className="space-y-8 mt-8"> {/* Increased vertical space */}
        <li>
          <Link to="/FindDoctor" className="flex items-center space-x-2 hover:text-gray-300">
            <MdPersonSearch size={iconSize} />
            <span className="text-2xl">Find Doctor</span>
          </Link>
        </li>
        <li>
          <Link to="/HealthAnalysis" className="flex items-center space-x-2 hover:text-gray-300">
            <MdHealthAndSafety size={iconSize} />
            <span className="text-2xl">Health Analysis</span>
          </Link>
        </li>
        <li>
          <Link to="/MyDoctors" className="flex items-center space-x-2 hover:text-gray-300">
            <MdPeople size={iconSize} />
            <span className="text-2xl">My Doctors</span>
          </Link>
        </li>
        <li>
          <Link to="/Warnings" className="flex items-center space-x-2 hover:text-gray-300">
            <MdWarning size={iconSize} />
            <span className="text-2xl">Warnings</span>
          </Link>
        </li>
        <li>
          <Link to="/PrescriptionRequest" className="flex items-center space-x-2 hover:text-gray-300">
            <MdMedication size={iconSize} />
            <span className="text-2xl">Requests</span>
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
