"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import ProductCard from "./ProductCard";

// Generamos URL fresca de Airtable
function getAirtableImageUrl(image) {
  if (!image || !image.id) return null;
  return `https://api.airtable.com/v0/meta/buckets/${image.id}/files/${image.id}?format=png`;
}

export default function FeaturedProducts({ products, scrollSpeed = 1 }) {
  const featuredProducts = products.filter((p) => p.featured).map(p => ({
    ...p,
    images: p.images?.map(img => ({ ...img, url: getAirtableImageUrl(img) }))
  }));

  const scrollRef = useRef(null);
  const scrollAmountRef = useRef(0);
  const requestRef = useRef(null);
  const pauseTimeoutRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const loop = () => {
      if (!isPaused) {
        scrollAmountRef.current += scrollSpeed;
        if (scrollAmountRef.current >= el.scrollWidth / 2) scrollAmountRef.current = 0;
        el.scrollLeft = scrollAmountRef.current;
      }
      requestRef.current = requestAnimationFrame(loop);
    };

    loop();
    return () => cancelAnimationFrame(requestRef.current);
  }, [isPaused, scrollSpeed]);

  const handleTouchStart = () => {
    setIsPaused(true);
    if (pauseTimeoutRef.current) clearTimeout(pauseTimeoutRef.current);
  };

  const handleTouchEnd = () => {
    if (scrollRef.current) scrollAmountRef.current = scrollRef.current.scrollLeft;
    pauseTimeoutRef.current = setTimeout(() => setIsPaused(false), 500);
  };

  if (featuredProducts.length === 0) return null;

  return (
    <section className="max-w-full py-8 px-4 overflow-hidden">
      <h2 className="text-2xl font-bold mb-4 text-center">Destacados</h2>

      <div
        ref={scrollRef}
        className="flex gap-4 py-4 overflow-x-auto md:overflow-visible scrollbar-hide"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {featuredProducts.concat(featuredProducts).map((product, index) => (
          <motion.div
            key={product.id + "-" + index}
            className="flex-shrink-0 w-64 md:w-72 relative -my-2 z-10"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
