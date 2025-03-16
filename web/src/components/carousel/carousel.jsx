import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Carousel() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const images = [
        "/images/banana.jpg",
        "/images/carbonara.jpg",
        "/images/avocado.jpg",
      ];

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      };
    
      const handlePrev = () => {
        setCurrentIndex((prevIndex) =>
          prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
      };

      // Change image automatically
      useEffect(() => {
        const interval = setInterval(() => {
          handleNext();
        }, 3000);
    
        return () => clearInterval(interval);
      }, [currentIndex]);

      return (
        <div id="default-Carousel" className="relative w-full m-0">
          <div className="relative overflow-hidden rounded-lg md:h-200">
            {images.map((src, index) => (
              <div
                key={index}
                className={`duration-700 ease-in-out ${
                  index === currentIndex ? 'block' : 'hidden'
                }`}
                data-Carousel-item
              >
              <Link to="/planner">
                <img
                  src={src}
                  className="w-full h-full object-cover object-[50%_100%]"
                  alt={`Slide ${index + 1}`}
                />
                </Link>
              </div>
            ))}
          </div>
          <button
            onClick={handlePrev}
            className="text-white hover:text-beige-medium absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer"
          >
            &#9664;
          </button>
          <button
            onClick={handleNext}
            className="text-white hover:text-beige-medium absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer"
          >
            &#9654;
          </button>
        </div>
      );
    }

export default Carousel;
