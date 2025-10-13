"use client";

import SingleCardCarousel from "./SingleCardCarousel";
import ProductCard from "./ProductCard";
import Link from "next/link";

export default function Promotions({ products }) {
  const promos = (products || []).filter((p) => !!p.promotion);

  if (promos.length === 0) return null;

  return (
    <aside className="w-full md:w-80 mt-6 md:mt-0">
      <div className="bg-black/70 p-4 rounded-xl border border-neon-pink shadow-neon-pink">
        <h3 className="text-lg font-bold text-neon-pink mb-3">Promociones</h3>

        <SingleCardCarousel
          items={promos}
          interval={6000}
          showControls={true}
          renderItem={(item) => (
            <div className="w-full">
              <ProductCard product={item} compact promotion />
            </div>
          )}
        />

        <div className="mt-4 text-center">
          <Link href="/productos?filter=promotion" className="inline-block px-4 py-2 border-2 border-neon-pink rounded-lg text-neon-pink font-semibold hover:scale-105 transition">
            Ver promociones
          </Link>
        </div>
      </div>
    </aside>
  );
}
