"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import ProductCard from "./ProductCard";

export default function Promotions({ products }) {
  const promoProducts = products.filter((p) => p.promotion);
  const scrollRef = useRef(null);
  const scrollAmountRef = useRef(0); // posición persistente
  const requestRef = useRef(null);
  const pauseTimeoutRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const loop = () => {
      if (!isPaused) {
        scrollAmountRef.current += 1; // velocidad de auto-scroll
        if (scrollAmountRef.current >= el.scrollWidth / 2) {
          scrollAmountRef.current = 0; // loop infinito
        }
        el.scrollLeft = scrollAmountRef.current;
      }
      requestRef.current = requestAnimationFrame(loop);
    };

    loop();

    return () => cancelAnimationFrame(requestRef.current);
  }, [isPaused]);

  const handleTouchStart = () => {
    setIsPaused(true);
    if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
  };

  const handleTouchEnd = () => {
    if (scrollRef.current) {
      // sincronizamos el scroll manual con el auto-scroll
      scrollAmountRef.current = scrollRef.current.scrollLeft;
    }
    // reanudar auto-scroll después de 500ms de inactividad
    pauseTimeoutRef.current = setTimeout(() => setIsPaused(false), 500);
  };

  if (promoProducts.length === 0) return null;

  return (
    <section className="max-w-full py-8 px-4 overflow-hidden">
      <h2 className="text-2xl font-bold mb-4 text-center">Promociones</h2>

      <div
        ref={scrollRef}
        className="flex gap-4 py-4 overflow-x-auto md:overflow-visible scrollbar-hide"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {promoProducts.concat(promoProducts).map((product, index) => (
          <motion.div
            key={product.id + "-" + index}
            className="flex-shrink-0 w-64 md:w-72 relative -my-2 z-10"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <ProductCard product={product} promotion={true} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
