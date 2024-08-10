import React, { useState, useEffect } from 'react';
import scrol1 from "../assets/lastday.webp"
import scrol2 from "../assets/image110.png"
import scrol3 from "../assets/selas.jpg"
import scrol4 from "../assets/seals2.jpeg"
import "../index.css"

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    <div className="w-screen h-80  bg-500"><img  className="w-full h-95% object-cover pb-20" src={scrol1}   /></div>,
    <div className="w-screen h-80  bg-500"><img  className="w-full h-95% object-cover pb-20" src={scrol2} /></div>,
    <div className="w-screen h-80  bg-500"><img  className="w-full h-95% object-cover pb-20" src={scrol3} /></div>,
    <div className="w-screen h-80  bg-500"><img  className="w-full h-95% object-cover pb-20" src={scrol4}   /></div>,

  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentSlide((currentSlide + 1) % slides.length);
    }, 4000); 
    return () => clearInterval(intervalId);
  }, [currentSlide, slides.length]);

  const handlePrev = () => {
    setCurrentSlide((currentSlide - 1 + slides.length) % slides.length);
  };

  const handleNext = () => {
    setCurrentSlide((currentSlide + 1) % slides.length);
  };

  return (
    <div className="relative overflow-x-hidden carousel scrollbar-hide">
      {/* Carousel slides */}
      <div
        className="flex scroll-snap-type x mandatory scroll-snap-align end transition-all duration-500"
        style={{
          transform: `translateX(-${currentSlide * 100}vw)`,
        }}
      >
        {slides.map((slide, index) => (
          <div key={index} className="w-screen h-1/2 flex-shrink-0">
            {slide}
          </div>
        ))}
      </div>
     
    </div>
  );
};

export default Carousel;