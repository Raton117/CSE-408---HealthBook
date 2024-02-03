import React,{useState} from 'react'
import { Link } from 'react-router-dom';
import doctor from '../Images/doctor.jpg'
const DoctorProfile = () => {
    const [activeTab, setActiveTab] = useState('about');

    return (
      <div className="bg-white shadow-lg rounded-lg mx-auto my-8 max-w-2xl">
        {/* Profile Header */}
        <div className="px-6 py-4">
          <div className="flex items-center">
            <div className="flex-shrink-0 h-24 w-24">
              <img className="h-24 w-24 rounded-full" src={doctor}alt="Dr. David Bowden" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Dr. David Bowden, MD
              </h3>
              <p className="text-sm text-gray-500">
                Ear, Nose & Throat Doctor
              </p>
              <p className="text-sm text-gray-500">
                72 E. 7th Street New York, NY 10002
              </p>
              <div className="mt-2">
                <button className="text-blue-500 text-sm mr-2">Save</button>
                <button className="text-blue-500 text-sm">Show Map</button>
              </div>
            </div>
          </div>
        </div>
  
        {/* Profile Tabs */}
        <div className="border-t border-gray-200">
          <div className="flex justify-center -mb-px">
            {['about', 'education', 'message'].map((tab) => (
              <div key={tab} className="w-1/3 px-4 py-3">
                <button
                  onClick={() => setActiveTab(tab)}
                  className={`${
                    activeTab === tab ? 'text-blue-600 border-blue-500' : 'text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300'
                  } border-b-2 -mb-px pb-3 block text-center font-medium`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              </div>
            ))}
          </div>
        </div>
  
        {/* Profile Tab Content */}
        <div className="px-6 py-4">
          <p className="text-gray-600">
            {/* You would put your tab content here, conditional on activeTab */}
            {activeTab === 'about' && <div> <h4 className="text-lg font-semibold mb-2">About Dr. David Bowden</h4>
      <p className="text-gray-600">
        Dr. David Bowden is a leading Ear, Nose, and Throat Doctor based in New York, with over 15 years of experience in the field. He has dedicated his career to providing comprehensive care for a variety of ENT conditions, offering both medical and surgical solutions.
      </p>
      <p className="text-gray-600 mt-4">
        Dr. Bowden is known for his patient-centered approach to care, ensuring that each patient receives a thorough evaluation and a personalized treatment plan. His areas of expertise include pediatric ENT, sinusitis treatment, and minimally invasive surgical techniques.
      </p></div>}
            {activeTab === 'education' && <div><h4 className="text-lg font-semibold mb-2">Education & Qualifications</h4>
      <ul className="list-disc pl-5 text-gray-600">
        <li>Bachelor of Science in Biology - NY University</li>
        <li>Doctor of Medicine (MD) - Harvard Medical School</li>
        <li>Residency in Otolaryngology - UCLA Medical Center</li>
        <li>Board Certified in Otolaryngology</li>
      </ul>
      </div>}
            {activeTab === 'message' && <div>Message Content</div>}
          </p>
        </div>
      </div>
    );

   
  
}

export default DoctorProfile