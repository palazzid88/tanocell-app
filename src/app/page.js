// src/app/page.js
import Navbar from "./components/Navbar";
import Banner from "./components/Banner";
import Servicios from "./components/Servicios";
import FeaturedProducts from "./components/FeaturedProducts";
import Promotions from "./components/Promotions";
import ProductsGrid from "./components/ProductsGrid";

import { getProducts } from "@/lib/getProducts";
import { getCategories } from "@/lib/getCategories";

// Forzar SSR puro
export const revalidate = 0; // 0 = siempre SSR, no ISR

export default async function Home() {
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  return (
    <main className="flex flex-col min-h-screen bg-white text-gray-800">

      {/* Banner */}
      <Banner />


      {/* Sidebar de Destacados y Promociones + Productos */}
      <section className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row gap-8">

        {/* Sidebar */}
        <aside className="flex flex-col gap-6 md:w-80">
          <FeaturedProducts products={products} />
          <Promotions products={products} />
        </aside>

        {/* Productos generales */}
        <div className="flex-1">
          <h2 className="text-3xl font-bold mb-8 text-center">Nuestros Productos</h2>
          <ProductsGrid products={products} categories={categories} />
        </div>

      </section>

    </main>
  );
}
