"use client";

import { useEffect, useState, useRef } from "react";

export default function SingleCardCarousel({
  items = [],
  interval = 5000, // ms
  renderItem, // fn(item) => JSX
  className = "",
  showControls = false,
}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef(null);
  const touchStartX = useRef(null);

  useEffect(() => {
    if (!items || items.length <= 1) return;

    if (!paused) {
      timerRef.current = setInterval(() => {
        setIndex((i) => (i + 1) % items.length);
      }, interval);
    }

    return () => clearInterval(timerRef.current);
  }, [items, interval, paused]);

  useEffect(() => {
    // ensure index valid if items change
    if (index >= items.length) setIndex(0);
  }, [items, index]);

  const prev = () => {
    setIndex((i) => (i - 1 + items.length) % items.length);
    resetTimer();
  };
  const next = () => {
    setIndex((i) => (i + 1) % items.length);
    resetTimer();
  };
  const resetTimer = () => {
    clearInterval(timerRef.current);
    if (!paused) {
      timerRef.current = setInterval(() => {
        setIndex((i) => (i + 1) % items.length);
      }, interval);
    }
  };

  const onTouchStart = (e) => {
    touchStartX.current = e.touches?.[0]?.clientX ?? null;
    setPaused(true);
  };
  const onTouchEnd = (e) => {
    const endX = e.changedTouches?.[0]?.clientX ?? null;
    if (touchStartX.current && endX) {
      const dx = endX - touchStartX.current;
      if (dx > 40) prev();
      else if (dx < -40) next();
    }
    setPaused(false);
    touchStartX.current = null;
  };

  if (!items || items.length === 0) return null;

  const activeItem = items[index];

  return (
    <div
      className={`relative ${className}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="w-full">
        {/* renderItem debe devolver la card (ya con estilos) */}
        {renderItem(activeItem, index)}
      </div>

      {/* controles opcionales */}
      {showControls && items.length > 1 && (
        <>
          <button
            aria-label="Anterior"
            onClick={prev}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/60 text-white rounded-full p-2 shadow-md"
          >
            ‹
          </button>
          <button
            aria-label="Siguiente"
            onClick={next}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/60 text-white rounded-full p-2 shadow-md"
          >
            ›
          </button>
        </>
      )}

      {/* indicators */}
      <div className="flex gap-2 justify-center mt-3">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setIndex(i);
              resetTimer();
            }}
            className={`w-2 h-2 rounded-full ${i === index ? "bg-white" : "bg-white/30"}`}
            aria-label={`Ir a ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
