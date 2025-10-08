"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ProductCarousel({ images, name }) {
  const carouselRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  if (!images?.length) return null;

  // --- Scroll manual (arrastre) ---
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
  };
  const handleMouseLeave = () => setIsDragging(false);
  const handleMouseUp = () => setIsDragging(false);
  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 1.2;
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  // --- Scroll con botones ---
  const scrollBy = (offset) => {
    carouselRef.current.scrollBy({ left: offset, behavior: "smooth" });
  };

  return (
    <div className="relative w-full">
      {/* Botón izquierdo */}
      <button
        onClick={() => scrollBy(-300)}
        className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 bg-gray-800/70 hover:bg-gray-700 text-white p-2 rounded-full shadow-lg transition"
      >
        <ChevronLeft size={24} />
      </button>

      {/* Carrusel */}
      <div
        ref={carouselRef}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide cursor-grab active:cursor-grabbing scroll-smooth"
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        {images.map((img, idx) => (
          <motion.img
            key={idx}
            src={img.url}
            alt={`${name} ${idx + 1}`}
            className="w-full h-80 object-cover rounded-xl flex-shrink-0 snap-center"
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.3 }}
          />
        ))}
      </div>

      {/* Botón derecho */}
      <button
        onClick={() => scrollBy(300)}
        className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 bg-gray-800/70 hover:bg-gray-700 text-white p-2 rounded-full shadow-lg transition"
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
}
