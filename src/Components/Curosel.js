import React, { useState, useEffect } from 'react';
import scrol1 from '../assets/1.jpg';
import scrol2 from '../assets/2.png';
import '../index.css';

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Define slides with each image as a separate slide
  const slides = [
    <div key={0} className="carousel-slide">
      <img className="carousel-image" src={scrol1} alt="Slide 1" />
    </div>,
    <div key={1} className="carousel-slide">
      <img className="carousel-image" src={scrol2} alt="Slide 2" />
    </div>,
    // Add more slides as needed
  ];

  const handlePrev = () => {
    setCurrentSlide(prevSlide => (prevSlide === 0 ? slides.length - 1 : prevSlide - 1));
  };

  const handleNext = () => {
    setCurrentSlide(prevSlide => (prevSlide === slides.length - 1 ? 0 : prevSlide + 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 3000); 

    return () => clearInterval(interval); // Clean up interval on component unmount
  }, []);

  return (
    <div className="relative carousel-container">
      {/* Carousel Slides */}
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={handlePrev}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 text-white p-4 rounded-full shadow-lg"
      >
        &lt;
      </button>
      <button
        onClick={handleNext}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 text-white p-4 rounded-full shadow-lg"
      >
        &gt;
      </button>
    </div>
  );
};

export default Carousel;
