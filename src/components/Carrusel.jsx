import { useState, useEffect } from "react";
import "./Carrusel.css";

const images = [
  { src: "/images/pizza_imagineto_1.jpg", alt: "Pizza Pepperoni" },
  { src: "/images/pizza_imagineto_2.jpg", alt: "Pizza Tropical" },
  { src: "/images/pizza_imagineto_3.png", alt: "Pizza Mexicana" },
];

export default function Carrusel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToSlide = (slideIndex) => {
    setIndex(slideIndex);
  };

  return (
    <div className="carrusel">
      <img 
        src={images[index].src} 
        alt={images[index].alt} 
        className="carrusel-img"
      />
      <button 
        onClick={prevSlide} 
        className="carrusel-arrow prev"
        aria-label="Anterior"
      >
        ‹
      </button>
      <button 
        onClick={nextSlide} 
        className="carrusel-arrow next"
        aria-label="Siguiente"
      >
        ›
      </button>
      <div className="carrusel-controls">
        {images.map((_, i) => (
          <button
            key={i}
            className={`dot ${i === index ? 'active' : ''}`}
            onClick={() => goToSlide(i)}
            aria-label={`Ir a imagen ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
