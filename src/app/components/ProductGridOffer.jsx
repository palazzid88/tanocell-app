'use client';

import Link from "next/link";
import ProductCard from "./ProductCard";

export default function ProductGridOffer({ products, title = "Productos destacados" }) {
  if (!products || products.length === 0) {
    return (
      <div className="p-8 text-center">
        <p className="text-gray-500">No hay productos disponibles.</p>
        <Link href="/" className="text-cyan-500 font-bold mt-4 inline-block">
          Volver al inicio
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 flex flex-col gap-6">
      {/* Título */}
      {/* <h2 className="text-2xl font-bold text-gray-800 text-center">{title}</h2> */}

      {/* Grid de productos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Botón de volver */}
      <div className="mt-6 text-center">
        <Link
          href="/"
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg transition"
        >
          Volver
        </Link>
      </div>
    </div>
  );
}
