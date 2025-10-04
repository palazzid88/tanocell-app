// src/app/components/ProductCard.jsx
import { getProducts } from "@/lib/getProducts";

export default async function ProductCard() {
  const products = await getProducts();

  if (!products || products.length === 0) {
    return (
      <p className="text-gray-400 text-center mt-10">
        No hay productos disponibles.
      </p>
    );
  }

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {products.map((product) => (
        <div
          key={product.id}
          className="bg-gray-900 rounded-xl shadow-md p-4 border border-gray-700 hover:border-cyan-400 transition"
        >
          {product.images?.[0]?.url && (
            <img
              src={product.images[0].url}
              alt={product.name}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
          )}
          <h3 className="text-xl font-semibold text-white">{product.name}</h3>
          <p className="text-cyan-400 text-lg font-bold">${product.price}</p>
          {product.description && (
            <p className="text-gray-400 mt-2 text-sm">{product.description}</p>
          )}
        </div>
      ))}
    </section>
  );
}
