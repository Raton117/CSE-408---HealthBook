import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [randomImage, setRandomImage] = useState(null);

  useEffect(() => {
    // Fetch a random image from Lorem Picsum
    fetch('https://picsum.photos/1920/1080') // Adjust dimensions as needed
      .then((response) => {
        setRandomImage(response.url);
      })
      .catch((error) => {
        console.error('Error fetching random image:', error);
      });
  }, []);

  return (
    <div
      className="flex flex-col items-center justify-center h-full bg-cover bg-center"
      style={randomImage ? { backgroundImage: `url(${randomImage})` } : {}}
    >
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">
          Never Lose Your Health Documents
        </h1>
        <p className="text-gray-300">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eget mauris sed nisi ullamcorper cursus.
          Sed ac quam id mi malesuada convallis.
        </p>
      </div>

      <div className="mt-8">
        <Link to="/login">
          <button className="bg-myblue text-4xl font-poppins text-white py-4 px-8 rounded-xl border-myblue border-spacing-2 hover:bg-white hover:text-myblue">
            Login/Signup
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
