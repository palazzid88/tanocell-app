// src/app/page.js
import Banner from "./components/Banner";
import Promotions from "./components/Promotions";
import FeaturedProducts from "./components/FeaturedProducts";
import ProductsGrid from "./components/ProductsGrid";
import CategoriesSidebar from "./components/CategoriesSidebar";

import { getProducts } from "@/lib/getProducts";
import { getCategories } from "@/lib/getCategories";
import Flyers from "./components/FlyersCarousel";

// SSR puro, siempre consulta Airtable
export const revalidate = 0;

export default async function Home() {
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  return (
    <main className="flex flex-col min-h-screen bg-white text-gray-800">

      {/* Banner */}
      <Banner />

<section className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row gap-8">

  <div className="flex-1 flex flex-col md:flex-row gap-6">
    <div className="flex-1">
      <FeaturedProducts products={products} />
    </div>

    <div className="flex-1">
      <Promotions products={products} />
    </div>

    <div className="flex-1">
      {/* <Flyers /> */}
    </div>
  </div>
</section>

      {/* Grid de productos filtrables */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <ProductsGrid products={products} categories={categories} />
      </section>

    </main>
  );
}
