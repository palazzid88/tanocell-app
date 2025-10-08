// src/app/page.js
import Navbar from "./components/Navbar";
import Banner from "./components/Banner";
import Servicios from "./components/Servicios";
import FeaturedProducts from "./components/FeaturedProducts";
import Promotions from "./components/Promotions";

import { getProducts } from "@/lib/getProducts";
import { getCategories } from "@/lib/getCategories";
import ProductsGrid from "./components/ProductsGrid";

// Forzar SSR puro
export const revalidate = 0; // 0 = siempre SSR, no ISR

export default async function Home() {
  // SSR: obtenemos los productos y categorías directamente desde Airtable en cada request
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  console.log("Productos:", products.length, "Categorías:", categories);

  return (
    <main className="flex flex-col min-h-screen bg-white text-gray-800">

      {/* BANNER */}
      <section>
        <Banner />
      </section>

      {/* SERVICIOS */}
      {/* <section className="max-w-7xl mx-auto px-6 py-12">
        <Servicios />
      </section> */}

      {/* DESTACADOS */}
      <FeaturedProducts products={products} />

      {/* PROMOCIONES */}
      <Promotions products={products} />

      {/* PRODUCTOS POR CATEGORÍA */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Nuestros Productos
        </h2>

        {/* ProductsGrid maneja sidebar + filtrado + grid */}
        <ProductsGrid products={products} categories={categories} />
      </section>
    </main>
  );
}
