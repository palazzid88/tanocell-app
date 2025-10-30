"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export default function ProductCarousel({ images, name }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isZoomOpen, setIsZoomOpen] = useState(false);

  if (!images?.length) return null;

  const prevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* Imagen principal */}
      <div
        className="relative w-full max-w-2xl aspect-square overflow-hidden rounded-2xl shadow-lg cursor-zoom-in"
        onClick={() => setIsZoomOpen(true)}
      >
        <motion.img
          key={currentIndex}
          src={images[currentIndex].url}
          alt={`${name} ${currentIndex + 1}`}
          className="w-full h-full object-cover"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        />

        {/* Botones de navegación */}
        {images.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition"
            >
              <ChevronLeft size={24} />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition"
            >
              <ChevronRight size={24} />
            </button>
          </>
        )}
      </div>

      {/* Miniaturas */}
      {images.length > 1 && (
        <div className="flex gap-3 mt-4 overflow-x-auto px-2 scrollbar-hide">
          {images.map((img, idx) => (
            <motion.img
              key={idx}
              src={img.url}
              alt={`${name} thumbnail ${idx + 1}`}
              className={`w-20 h-20 object-cover rounded-xl cursor-pointer border-2 ${
                idx === currentIndex
                  ? "border-cyan-500"
                  : "border-transparent hover:border-gray-400"
              }`}
              whileHover={{ scale: 1.05 }}
              onClick={() => setCurrentIndex(idx)}
            />
          ))}
        </div>
      )}

      {/* Modal de Zoom */}
      <AnimatePresence>
        {isZoomOpen && (
          <motion.div
            className="fixed inset-0 bg-black/90 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsZoomOpen(false)} // 🔹 Cierra al hacer clic fuera
          >
            <div
              className="relative w-full max-w-4xl px-4"
              onClick={(e) => e.stopPropagation()} // 🔹 Evita cierre al hacer clic dentro
            >
              <motion.img
                key={currentIndex}
                src={images[currentIndex].url}
                alt={`${name} zoom ${currentIndex + 1}`}
                className="w-full h-auto max-h-[90vh] object-contain rounded-lg"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
              />

              {/* Botones dentro del modal */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-3 rounded-full transition"
                  >
                    <ChevronLeft size={30} />
                  </button>

                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-3 rounded-full transition"
                  >
                    <ChevronRight size={30} />
                  </button>
                </>
              )}

              {/* Cerrar modal */}
              <button
                onClick={() => setIsZoomOpen(false)}
                className="absolute top-4 right-4 bg-black/70 hover:bg-black/90 text-white p-2 rounded-full transition"
              >
                <X size={24} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
