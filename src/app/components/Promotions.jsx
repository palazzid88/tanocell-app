"use client";

import SingleCardCarousel from "./SingleCardCarousel";
import ProductCard from "./ProductCard";
import Link from "next/link";

export default function Promotions({ products }) {
  const promos = (products || []).filter((p) => !!p.promotion);

  if (!promos.length) return null;

  return (
    <div className="bg-white rounded-xl shadow-md p-4 border border-gray-100">
      <h3 className="text-lg font-bold mb-3 text-gray-700 text-center">Promociones</h3>

      <SingleCardCarousel
        items={promos}
        interval={6000}
        showControls={true}
        renderItem={(item) => (
          <ProductCard product={item} compact promotion />
        )}
      />

      <div className="mt-4 text-center">
        <Link href="/productos?filter=promotion" className="inline-block px-4 py-2 border rounded-lg text-gray-800 font-semibold hover:bg-gray-100 transition">
          Ver promociones
        </Link>
      </div>
    </div>
  );
}
