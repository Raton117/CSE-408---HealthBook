import React, { useState,useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import axios from 'axios';
import medicineSuggestions from '../Components/medicines'; // Importing suggestions from the other file
import form from './Doctor/form';
import { useNavigate, useParams } from 'react-router-dom';
// import { useHistory } from 'react-router-dom';



const PrescriptionUpload = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // Start from step 1
  const userRole = localStorage.getItem('userRole');

  // const history = useHistory();

  // Form state
  const [formData, setFormData] = useState({
    age: '',
    weight: '',
    height: '',
    address: '',
    bp: '',
    nextAppointment: '',
    notes: '',
    date: ''
    // Add more fields as needed
  });

  const treatmentID = parseInt(useParams()['treatmentID']);

  const [symptoms, setSymptoms] = useState([]);
  const [currentSymptom, setCurrentSymptom] = useState('');
  const [tests, setTests] = useState([]);
  const [currentTest, setCurrentTest] = useState('');
  const [diagnosis, setDiagnosis] = useState([]);
  const [currentDiagnosis, setCurrentDiagnosis] = useState('');
  const [advices, setAdvices] = useState([]);
  const [currentAdvice, setCurrentAdvice] = useState('');
  const [prescriptionImage, setPrescriptionImage] = useState(null);

  // Handlers for adding items
  const addSymptom = (e) => {
    console.log('In add symptom');
    e.preventDefault(); // Prevent form submission and page refresh
    if (currentSymptom) {
      setSymptoms([...symptoms, currentSymptom]);
      setCurrentSymptom('');
    }
    console.log(symptoms);
  };

  const addTest = (e) => {
    e.preventDefault(); // Prevent form submission and page refresh
    if (currentTest) {
      setTests([...tests, currentTest]);
      setCurrentTest('');
    }
  };

  const addDiagnosis = (e) => {
    e.preventDefault(); // Prevent form submission and page refresh
    if (currentDiagnosis) {
      setDiagnosis([...diagnosis, currentDiagnosis]);
      setCurrentDiagnosis('');
    }
  };

  const addAdvice = (e) => {
    e.preventDefault(); // Prevent form submission and page refresh
    if (currentAdvice) {
      setAdvices([...advices, currentAdvice]);
      setCurrentAdvice('');
    }
  };

  // Handlers for removing items
  const removeSymptom = (e, index) => {
    e.preventDefault(); // Prevent form submission
    setSymptoms(symptoms.filter((_, i) => i !== index));
  };

  const removeTest = (e,index) => {
    e.preventDefault(); // Prevent form submission
    setTests(tests.filter((_, i) => i !== index));
  };

  const removeDiagnosis = (e,index) => {
    e.preventDefault(); // Prevent form submission
    setDiagnosis(diagnosis.filter((_, i) => i !== index));
  };

  const removeAdvice = (e,index) => {
    e.preventDefault(); // Prevent form submission
    setAdvices(advices.filter((_, i) => i !== index));
  };

  // Handler for file input change
  const handleImageChange = (e) => {
    e.preventDefault(); // Prevent form submission
    setPrescriptionImage(e.target.files[0]);
  };

  useEffect(() => {
    
    

    
  }, [treatmentID]);


    // Prescription Upload
    const [medications, setMedications] = useState([]);
    const [currentMedication, setCurrentMedication] = useState({
      name: '',
      description: '',
      mealTiming: '',
      courses: [],
      duration: '',
    });
  
    // Handler for adding medication
    const addMedication = (e) => {
      e.preventDefault();
      if (currentMedication.name && currentMedication.duration) {
        setMedications([...medications, currentMedication]);
        setCurrentMedication({
          name: '',
          mealTiming: '',
          courses: [],
          duration: '',
        });
      }
      console.log(medications);
    };
  
    // Handler for removing medication
    const removeMedication = (index) => {
      setMedications(medications.filter((_, i) => i !== index));
    };
  
    // Handler for updating courses
    const handleCourseChange = (course) => {
      const newCourses = currentMedication.courses.includes(course)
        ? currentMedication.courses.filter((c) => c !== course)
        : [...currentMedication.courses, course];
      setCurrentMedication({ ...currentMedication, courses: newCourses });
    };

  const nextStep = (e) => {
    e.preventDefault(); // Prevent form submission
    setStep(step + 1);
  };
  
  const prevStep = (e) => {
    e.preventDefault(); // Prevent form submission
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleUpload = async (e) => {
    console.log('In handle Upload');
    e.preventDefault();
    const symptomsObject = symptoms.map(symptom => ({
      symptom: symptom
    }));
    const testsObject = tests.map(test => ({
      test_name: test
    }));
    const diagnosesObject = diagnosis.map(diagnosis => ({
      disease: diagnosis
    }));
    const advicesObject = advices.map(advice => ({
      advice: advice
    }));
    const formattedArray = medications.map(item => {
      const medicineObject = {
          "medicine_name": item.name,
          "duration": parseInt(item.duration), // Parse duration to integer
          "meal_time": item.mealTiming,
          "breakfast": item.courses.includes("breakfast"),
          "lunch": item.courses.includes("lunch"),
          "dinner": item.courses.includes("dinner")
      };
      return medicineObject;
    });  
    const [bp_low, bp_high] = formData.bp.split("/");
    console.log(bp_low);
    console.log(bp_high);
    // const response = await axios.post("http://127.0.0.1:8000/patients/upload-prescription", {
    //   // random: "random"
    //   age: parseInt(formData.age),
    //   weight: parseInt(formData.weight),
    //   height: parseInt(formData.height),
    //   address: formData.address,
    //   bp_low: parseInt(bp_low),
    //   bp_high: parseInt(bp_high),
    //   treatment: treatmentID,
    //   notes: formData.notes,
    //   next_appointment: parseInt(formData.nextAppointment),
    //   //date: new Date("2024-01-12"),
    //   date: formData.date,
    //   symptoms: symptomsObject,
    //   tests: testsObject,
    //   diagnoses: diagnosesObject,
    //   advices: advicesObject,
    //   medicines: formattedArray
    // });

    let response;
    if (userRole === 'doctor') {
      response = await axios.post("http://127.0.0.1:8000/doctors/upload-prescription", {
        // random: "random"
        age: parseInt(formData.age),
        weight: parseInt(formData.weight),
        height: parseInt(formData.height),
        address: formData.address,
        bp_low: parseInt(bp_low),
        bp_high: parseInt(bp_high),
        treatment: treatmentID,
        notes: formData.notes,
        next_appointment: parseInt(formData.nextAppointment),
        //date: new Date("2024-01-12"),
        date: formData.date,
        symptoms: symptomsObject,
        tests: testsObject,
        diagnoses: diagnosesObject,
        advices: advicesObject,
        medicines: formattedArray
      });
    } else {
      response = await axios.post("http://127.0.0.1:8000/patients/upload-prescription", {
        // random: "random"
        age: parseInt(formData.age),
        weight: parseInt(formData.weight),
        height: parseInt(formData.height),
        address: formData.address,
        bp_low: parseInt(bp_low),
        bp_high: parseInt(bp_high),
        treatment: treatmentID,
        notes: formData.notes,
        next_appointment: parseInt(formData.nextAppointment),
        //date: new Date("2024-01-12"),
        date: formData.date,
        symptoms: symptomsObject,
        tests: testsObject,
        diagnoses: diagnosesObject,
        advices: advicesObject,
        medicines: formattedArray
      });
    }

    const data = response.data;
    console.log(data);
    navigate('/mytreatments');
  }
  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    //e.preventDefault();
    // Process the form data
    console.log(formData);
    // Navigate to the next form page or show success message
    // navigate('/nextFormPage'); // Uncomment and replace '/nextFormPage' with your actual path
  };

  const handleNothing = (e) => {
    e.preventDefault();
    // Process the form data
    
    // Navigate to the next form page or show success message
    // navigate('/nextFormPage'); // Uncomment and replace '/nextFormPage' with your actual path
  };

  const handleSuggestionClick = (medicineName) => {
    setCurrentMedication({ ...currentMedication, name: medicineName });
  };

  const filteredSuggestions = medicineSuggestions.filter(medicine =>
    medicine.toLowerCase().includes(currentMedication.name.toLowerCase())
  );

  // Render form page based on the current step
  const renderForm = () => {
    switch (step) {
      case 1:
        return (
          <div>
            {/* Include your form fields for step 1 here */}
            <form onSubmit={handleSubmit} className="max-w-4xl mx-auto my-10 px-4">
      <div className="space-y-4">
        {/* Age and Weight */}
        <div className="flex justify-between">
          <div className="w-1/2 pr-2">
            <label className="block text-sm font-medium text-gray-700">Age</label>
            <input type="number" name="age" value={formData.age} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
          </div>
          <div className="w-1/2 pl-2">
            <label className="block text-sm font-medium text-gray-700">Weight (kg)</label>
            <input type="number" name="weight" value={formData.weight} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
          </div>

        </div>

        {/* Address and Height */}
        <div className="flex justify-between">
          <div className="w-1/2 pr-2">
            <label className="block text-sm font-medium text-gray-700">Address</label>
            <input type="text" name="address" value={formData.address} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
          </div>
          <div className="w-1/2 pl-2">
            <label className="block text-sm font-medium text-gray-700">Height (cm)</label>
            <input type="number" name="height" value={formData.height} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
          </div>

        </div>

        {/* BP and NextAppointment */}
        <div className="flex justify-between">
          <div className="w-1/2 pr-2">
            <label className="block text-sm font-medium text-gray-700">BP</label>
            <input type="text"placeholder='120/80' name="bp" value={formData.bp} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
          </div>
          <div className="w-1/2 pl-2">
            <label className="block text-sm font-medium text-gray-700">Next Appointment (days)</label>
            <input type="number" name="nextAppointment" value={formData.nextAppointment} onChange={handleChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
          </div>
        </div>

        {/* Notes and Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Notes</label>
          <textarea name="notes" value={formData.notes} onChange={handleChange} rows="4" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"></textarea>
        </div>

        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="border p-2 w-full"
            />
          </div>

        
      </div>
    </form>
            <button onClick={nextStep} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Next</button>
          </div>
        );
      case 2:
        return (
          <div>
            {/* Include your form fields for step 2 here */}
            <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <input
          type="text"
          placeholder="Add Symptom"
          value={currentSymptom}
          onChange={(e) => setCurrentSymptom(e.target.value)}
          className="input input-bordered input-primary w-full"
        />
        <button onClick={addSymptom} className="btn btn-primary">Add</button>
      </div>
      <div>
        {symptoms.map((symptom, index) => (
          <div key={index} className="flex items-center justify-between">
            <span>{symptom}</span>
            <button onClick={(e) => removeSymptom(e, index)} className="btn btn-error btn-xs">
  <FaTimes />
</button>

          </div>
        ))}
      </div>


      <div className="flex items-center space-x-2">
        <input
          type="text"
          placeholder="Add Test"
          value={currentTest}
          onChange={(e) => setCurrentTest(e.target.value)}
          className="input input-bordered input-primary w-full"
        />
        <button onClick={addTest} className="btn btn-primary">Add</button>
      </div>
      <div>
        {tests.map((test, index) => (
          <div key={index} className="flex items-center justify-between">
            <span>{test}</span>
            <button onClick={(e) => removeTest(e, index)} className="btn btn-error btn-xs">
  <FaTimes />
</button>

          </div>
        ))}
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="text"
          placeholder="Add Diagnosis"
          value={currentDiagnosis}
          onChange={(e) => setCurrentDiagnosis(e.target.value)}
          className="input input-bordered input-primary w-full"
        />
        <button onClick={addDiagnosis} className="btn btn-primary">Add</button>
      </div>
      <div>
        {diagnosis.map((diagnosis, index) => (
          <div key={index} className="flex items-center justify-between">
            <span>{diagnosis}</span>
            <button onClick={(e) => removeDiagnosis(e, index)} className="btn btn-error btn-xs">
  <FaTimes />
</button>

          </div>
        ))}
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="text"
          placeholder="Add Advice"
          value={currentAdvice}
          onChange={(e) => setCurrentAdvice(e.target.value)}
          className="input input-bordered input-primary w-full"
        />
        <button onClick={addAdvice} className="btn btn-primary">Add</button>
      </div>
      <div>
        {advices.map((advice, index) => (
          <div key={index} className="flex items-center justify-between">
            <span>{advice}</span>
            <button onClick={(e) => removeAdvice(e, index)} className="btn btn-error btn-xs">
  <FaTimes />
</button>

          </div>
        ))}
      </div>
      {/* Repeat the structure for tests, diagnosis, advices */}

      <div>
        <label htmlFor="prescriptionImage" className="block mb-2">Prescription Image</label>
        <input
          type="file"
          id="prescriptionImage"
          onChange={handleImageChange}
          className="input input-bordered mb-8"
        />
      </div>
    </div>
            <button onClick={prevStep} className="px-4 py-2 mr-2 bg-gray-500 text-white rounded-md hover:bg-gray-600">Previous</button>
            <button onClick={nextStep} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">Next</button>
          </div>
        );
      case 3:
        return (
          <div>
             <div className="space-y-6">
      <form onSubmit={addMedication}>
        {/* Medicine Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Medicine Name</label>
          <input
            type="text"
            value={currentMedication.name}
            onChange={(e) => setCurrentMedication({ ...currentMedication, name: e.target.value })}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        <ul>
        {filteredSuggestions.slice(0,2).map((medicine, index) => (
          <li key={index} onClick={() => handleSuggestionClick(medicine)}>
            {medicine}
          </li>
        ))}
      </ul>
        </div>

        {/* Description */}

        {/* Meal Settings */}
        <div className="space-y-2">
        <div>
          <label>Meal Timing</label>
          <div>
            <input
              type="radio"
              value="before"
              checked={currentMedication.mealTiming === 'before'}
              onChange={() => setCurrentMedication({ ...currentMedication, mealTiming: 'before' })}
            /> Before Meal
            <input
              type="radio"
              value="after"
              checked={currentMedication.mealTiming === 'after'}
              onChange={() => setCurrentMedication({ ...currentMedication, mealTiming: 'after' })}
            /> After Meal
          </div>
        </div>
        </div>

        {/* Courses */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Courses</label>
          <div className="space-x-2">
            <label>
              <input
                type="checkbox"
                checked={currentMedication.courses.includes('breakfast')}
                onChange={() => handleCourseChange('breakfast')}
                className="mr-1"
              />
              <span className="text-gray-500">Breakfast</span>
            </label>
            <label>
              <input
                type="checkbox"
                checked={currentMedication.courses.includes('lunch')}
                onChange={() => handleCourseChange('lunch')}
                className="mr-1"
              />
              <span className="text-gray-500">Lunch</span>
            </label>
            <label>
              <input
                type="checkbox"
                checked={currentMedication.courses.includes('dinner')}
                onChange={() => handleCourseChange('dinner')}
                className="mr-1"
              />
              <span className="text-gray-500">Dinner</span>
            </label>
          </div>
        </div>

        {/* Duration */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Duration</label>
          <input
            type="number"
            value={currentMedication.duration}
            onChange={(e) => setCurrentMedication({ ...currentMedication, duration: e.target.value })}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* Add Medication Button */}
        <div className="flex items-center mt-4">
          <button onClick={addMedication} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            Add Medication
          </button>
        </div>
      </form>

      {/* Medication List */}
      <div className="space-y-4">
        {medications.map((medication, index) => (
          <div key={index} className="bg-gray-200 p-4 rounded-md">
            <div className="flex justify-between items-center">
              <span className="text-xl font-semibold">{medication.name}</span>
              <button onClick={() => removeMedication(index)}>
                <FaTimes />
              </button>
            </div>
            <p className="text-gray-600">{medication.description}</p>
            <div className="flex space-x-2 mt-2">
              {medication.mealTiming && <span className="text-green-500">Before Meal</span>}
            </div>
            <div className="flex space-x-2 mt-2">
              {medication.courses.includes('breakfast') && <span className="text-blue-500">Breakfast</span>}
              {medication.courses.includes('lunch') && <span className="text-blue-500">Lunch</span>}
              {medication.courses.includes('dinner') && <span className="text-blue-500">Dinner</span>}
            </div>
            <p className="text-gray-700 mt-2">{`Duration: ${medication.duration}`}</p>
          </div>
        ))}
          </div>
        
            {/* Include your form fields for step 3 here */}
            <button onClick={prevStep} className="px-4 py-2 mr-2 bg-gray-500 text-white rounded-md hover:bg-gray-600">Previous</button>
            <button onClick={handleUpload} className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 ">Submit</button>
          </div>
            </div>
        );
      default:
        return <div>Form Completed!</div>;
    }
  };

  return (
    <div className="max-w-4xl mx-auto my-10 px-4">
      <h2 className="text-xl font-semibold">Prescription Upload - Step {step} of 3</h2>
      <form>
        {renderForm()}
      </form>
    </div>
  );
};

export default PrescriptionUpload;
