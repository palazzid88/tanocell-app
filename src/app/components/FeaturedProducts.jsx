// src/app/components/FeaturedProducts.jsx
import ProductCard from "./ProductCard";

export default function FeaturedProducts({ products = [] }) {
  const featured = products.filter((p) => p.featured);

  if (featured.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold mb-8 text-center">Destacados</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {featured.map((product) => (
          <ProductCard key={product.id} product={product} featured />
        ))}
      </div>
    </section>
  );
}
