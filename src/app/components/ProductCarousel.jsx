// src/app/components/ProductCarousel.jsx
"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ProductCarousel({
  images,
  name,
  autoplaySpeed = 40, // px por segundo (ajustalo)
  showArrows = true,
}) {
  const carouselRef = useRef(null);
  const requestRef = useRef(null);
  const lastTimeRef = useRef(null);
  const isDraggingRef = useRef(false);

  const [isDragging, setIsDragging] = useState(false); // para UI/cursor
  const [isPaused, setIsPaused] = useState(false);
  const pauseTimeoutRef = useRef(null);

  if (!images || images.length === 0) return null;

  // duplicamos imágenes para permitir loop continuo sin salto
  const imgs = images.concat(images);

  // --- autoplay loop con requestAnimationFrame ---
  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;

    const loop = (time) => {
      if (!lastTimeRef.current) lastTimeRef.current = time;
      const delta = time - lastTimeRef.current;
      lastTimeRef.current = time;

      if (!isPaused && !isDraggingRef.current) {
        // incremento basado en tiempo para velocidad consistente
        const increment = (autoplaySpeed / 1000) * delta;
        const half = el.scrollWidth / 2;
        let next = el.scrollLeft + increment;

        // wrap suave: si pasamos mitad (porque duplicamos), restamos mitad
        if (next >= half) next = next - half;
        el.scrollLeft = next;
      }

      requestRef.current = requestAnimationFrame(loop);
    };

    requestRef.current = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(requestRef.current);
      lastTimeRef.current = null;
    };
  }, [isPaused, autoplaySpeed]);

  // --- drag handlers para desktop (mouse) ---
  const dragState = useRef({ startX: 0, startScroll: 0 });

  const handleMouseDown = (e) => {
    const el = carouselRef.current;
    if (!el) return;
    isDraggingRef.current = true;
    setIsDragging(true);
    setIsPaused(true);
    dragState.current.startX = e.pageX - el.offsetLeft;
    dragState.current.startScroll = el.scrollLeft;
    if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
  };

  const handleMouseMove = (e) => {
    const el = carouselRef.current;
    if (!el || !isDraggingRef.current) return;
    e.preventDefault();
    const x = e.pageX - el.offsetLeft;
    const walk = (x - dragState.current.startX) * 1.2;
    el.scrollLeft = dragState.current.startScroll - walk;
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
    setIsDragging(false);
    // sincronizar autoplay con la posición actual y reanudar tras timeout
    if (carouselRef.current) {
      // no tocar scrollLeft aquí, el autoplay lee el valor actual
    }
    pauseTimeoutRef.current = setTimeout(() => setIsPaused(false), 600);
  };

  const handleMouseLeave = () => {
    if (isDraggingRef.current) {
      // finalizar drag si sale del área
      handleMouseUp();
    }
  };

  // --- touch handlers (mobile) ---
  const handleTouchStart = () => {
    isDraggingRef.current = true;
    setIsPaused(true);
    if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
  };

  const handleTouchEnd = () => {
    isDraggingRef.current = false;
    // sincronizamos el autoplay para continuar desde donde quedó el usuario
    if (carouselRef.current) {
      // nothing extra, autoplay uses el.scrollLeft
    }
    pauseTimeoutRef.current = setTimeout(() => setIsPaused(false), 600);
  };

  // --- arrow buttons ---
  const scrollBy = (offset) => {
    const el = carouselRef.current;
    if (!el) return;
    el.scrollBy({ left: offset, behavior: "smooth" });
  };

  return (
    <div className="relative w-full">
      {showArrows && (
        <button
          onClick={() => scrollBy(-carouselRef.current.clientWidth * 0.8)}
          className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 bg-gray-800/70 hover:bg-gray-700 text-white p-2 rounded-full shadow-lg transition z-30"
          aria-label="Anterior"
        >
          <ChevronLeft size={20} />
        </button>
      )}

      <div
        ref={carouselRef}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onMouseEnter={() => {
          setIsPaused(true);
          if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
        }}
        onMouseLeaveCapture={() => {
          // si no está arrastrando, reanudar luego de breve timeout
          if (!isDraggingRef.current) {
            pauseTimeoutRef.current = setTimeout(() => setIsPaused(false), 600);
          }
        }}
      >
        {imgs.map((img, idx) => (
          <motion.img
            key={`${img.url}-${idx}`}
            src={img.url}
            alt={`${name} ${idx + 1}`}
            className="w-full md:min-w-[500px] h-80 object-cover rounded-xl flex-shrink-0 snap-center"
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.25 }}
            draggable={false}
          />
        ))}
      </div>

      {showArrows && (
        <button
          onClick={() => scrollBy(carouselRef.current.clientWidth * 0.8)}
          className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 bg-gray-800/70 hover:bg-gray-700 text-white p-2 rounded-full shadow-lg transition z-30"
          aria-label="Siguiente"
        >
          <ChevronRight size={20} />
        </button>
      )}
    </div>
  );
}
