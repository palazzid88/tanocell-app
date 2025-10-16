import Banner from "./components/Banner";
import Promotions from "./components/Promotions";
import FeaturedProducts from "./components/FeaturedProducts";
import ProductsGrid from "./components/ProductsGrid";
import FlyersCarousel from "./components/FlyersCarousel";

import { getProducts } from "@/lib/getProducts";
import { getCategories } from "@/lib/getCategories";
import { getFlyers } from "@/lib/getFlyers";

export const revalidate = 0;

export default async function Home() {
  const [products, categories, flyers] = await Promise.all([
    getProducts(),
    getCategories(),
    getFlyers(),
  ]);

  return (
    <main className="flex flex-col min-h-screen bg-white text-gray-800">
      {/* Banner */}
      <Banner />

      {/* Sección principal */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row items-center md:items-center gap-8">
          
          {/* Columna izquierda: Featured + Promotions */}
          <div className="flex flex-col gap-6 w-full md:w-[30%] max-w-md mx-auto">
            <FeaturedProducts products={products} />
            <Promotions products={products} />
          </div>

          {/* Columna derecha: Flyers */}
          <div className="w-full md:w-[70%] flex justify-center">
            <FlyersCarousel flyers={flyers} />
          </div>

        </div>
      </section>

      {/* Grid de productos */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <ProductsGrid products={products} categories={categories} />
      </section>
    </main>
  );
}
