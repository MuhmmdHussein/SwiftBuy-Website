import React, { useState, useEffect } from 'react';
import scrol1 from "../assets/lastday.webp"
import scrol2 from "../assets/image110.png"
import scrol3 from "../assets/selas.jpg"
import scrol4 from "../assets/seals2.jpeg"

const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    <div className="w-screen h-96 bg-red-500"><img  className="w-full h-95% object-cover pb-10" src={scrol1}   /></div>,
    <div className="w-screen h-96 bg-blue-500"><img  className="w-full h-95% object-cover pb-10" src={scrol2} /></div>,
    <div className="w-screen h-96 bg-green-500"><img  className="w-full h-95% object-cover pb-10" src={scrol3} /></div>,
    <div className="w-screen h-96 bg-red-500"><img  className="w-full h-95% object-cover pb-10" src={scrol4}   /></div>,

  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentSlide((currentSlide + 1) % slides.length);
    }, 4000); // scroll every 3 seconds
    return () => clearInterval(intervalId);
  }, [currentSlide, slides.length]);

  const handlePrev = () => {
    setCurrentSlide((currentSlide - 1 + slides.length) % slides.length);
  };

  const handleNext = () => {
    setCurrentSlide((currentSlide + 1) % slides.length);
  };

  return (
    <div className="relative overflow-x-hidden scrollbar-hide">
      {/* Carousel slides */}
      <div
        className="flex scroll-snap-type x mandatory scroll-snap-align end transition-all duration-500"
        style={{
          transform: `translateX(-${currentSlide * 100}vw)`,
        }}
      >
        {slides.map((slide, index) => (
          <div key={index} className="w-screen h-56 flex-shrink-0">
            {slide}
          </div>
        ))}
      </div>
     
    </div>
  );
};

export default Carousel;