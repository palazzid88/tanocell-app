"use client";

import SingleCardCarousel from "./SingleCardCarousel";
import ProductCard from "./ProductCard";
import Link from "next/link";

export default function FeaturedProducts({ products }) {
  const featured = (products || []).filter((p) => !!p.featured);
  if (!featured.length) return null;

  return (
    <div className="bg-white rounded-xl shadow-md p-4 border border-gray-100">
      <h3 className="text-lg font-bold mb-3 text-gray-700 text-center">
        Destacados
      </h3>

      <SingleCardCarousel
        items={featured}
        interval={6000}
        showControls={true}
        renderItem={(item) => <ProductCard product={item} compact />}
      />

      <div className="mt-4 text-center">
        <Link
          href="/productos?filter=featured"
          className="inline-block px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition"
        >
          Ver todos
        </Link>
      </div>
    </div>
  );
}
