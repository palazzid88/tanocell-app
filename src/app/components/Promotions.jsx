// src/app/components/Promotions.jsx
import ProductCard from "./ProductCard";

export default function Promotions({ products = [] }) {
  const promos = products.filter((p) => p.promotion || p.oldPrice);

  if (promos.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-6 py-12 bg-gray-50 rounded-2xl">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Promociones</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {promos.map((product) => (
          <ProductCard key={product.id} product={product} promotionBadge />
        ))}
      </div>
    </section>
  );
}
