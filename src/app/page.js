import Navbar from "./components/Navbar";
import Banner from "./components/Banner";
import Servicios from "./components/Servicios";
import CategoriesSidebar from "./components/CategoriesSidebar";
import ProductCard from "./components/ProductCard";
import FeaturedProducts from "./components/FeaturedProducts";
import Promotions from "./components/Promotions";

import { getProducts } from "@/lib/getProducts";
import { getCategories } from "@/lib/getCategories";

export default async function Home() {
  // SSR: obtenemos los productos y categorías directamente desde Airtable
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  return (
    <main className="flex flex-col min-h-screen bg-white text-gray-800">
      {/* NAVBAR */}
      {/* <Navbar /> */}

      {/* BANNER */}
      <section>
        <Banner />
      </section>

      {/* SERVICIOS */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <Servicios />
      </section>

      {/* DESTACADOS */}
      <FeaturedProducts products={products} />

      {/* PROMOCIONES */}
      <Promotions products={products} />

      {/* PRODUCTOS POR CATEGORÍA */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Nuestros Productos
        </h2>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Menú lateral de categorías */}
          <CategoriesSidebar categories={categories} />

          {/* Grilla de productos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
