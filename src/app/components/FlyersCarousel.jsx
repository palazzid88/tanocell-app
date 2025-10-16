"use client";

import { useEffect, useState, useRef } from "react";

export default function FlyersCarousel({ flyers }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef();

  useEffect(() => {
    if (!flyers?.length) return;
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % flyers.length);
    }, 4000);
    return () => clearInterval(intervalRef.current);
  }, [flyers]);

  if (!flyers?.length) return null;

  return (
    <div className="relative w-full max-w-5x3 overflow-hidden rounded-xl shadow-md border border-gray-100">
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {flyers.map((flyer) => (
          <div key={flyer.id} className="flex-shrink-0 w-full">
            <img
              src={flyer.images?.[0]?.url}
              alt={flyer.info || "Flyer"}
              className="w-full h-64 md:h-[550px] object-cover"
            />
          </div>
        ))}
      </div>

      {/* Dots */}
      <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
        {flyers.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition ${
              index === currentIndex ? "bg-gray-700" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
