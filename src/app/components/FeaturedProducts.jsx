"use client";

import SingleCardCarousel from "./SingleCardCarousel";
import ProductCard from "./ProductCard";
import Link from "next/link";

export default function FeaturedProducts({ products }) {
  const featured = (products || []).filter((p) => !!p.featured);

  if (featured.length === 0) return null;

  return (
    <aside className="w-full md:w-80"> {/* en page.js lo colocarás en sidebar */}
      <div className="bg-black/70 p-4 rounded-xl border border-neon-yellow shadow-neon-yellow">
        <h3 className="text-lg font-bold text-neon-yellow mb-3">Destacados</h3>

        <SingleCardCarousel
          items={featured}
          interval={6000}
          showControls={true}
          renderItem={(item) => (
            <div className="w-full">
              {/* reusar ProductCard pero con estilos compactos */}
              <ProductCard product={item} compact />
            </div>
          )}
        />

        <div className="mt-4 text-center">
          <Link href="/productos?filter=featured" className="inline-block px-4 py-2 border-2 border-neon-yellow rounded-lg text-neon-yellow font-semibold hover:scale-105 transition">
            Ver destacados
          </Link>
        </div>
      </div>
    </aside>
  );
}
