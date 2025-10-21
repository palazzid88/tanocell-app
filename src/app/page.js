import Banner from "./components/Banner";
import Promotions from "./components/Promotions";
import FeaturedProducts from "./components/FeaturedProducts";
import ProductsGrid from "./components/ProductsGrid";
import FlyersCarousel from "./components/FlyersCarousel";

import { getProducts } from "@/lib/getProducts";
import { getCategories } from "@/lib/getCategories";
import { getFlyers } from "@/lib/getFlyers";
import MapSection from "./components/MapSection";

export const revalidate = 0;

export default async function Home() {
  const [products, categories, flyers] = await Promise.all([
    getProducts(),
    getCategories(),
    getFlyers(),
  ]);

  return (
    <main className="flex flex-col min-h-screen bg-white text-gray-800">
      {/* Banner superior */}
      <Banner flyers={flyers} />

      {/* Sección principal */}
      <section className="max-w-7xl mx-auto px-4 py-12 flex flex-col gap-10">
        {/* Featured y Promotions uno al lado del otro en desktop */}
        <div className="flex flex-col md:flex-row justify-center items-start gap-8">
          <div className="w-[350px] mx-auto">
            <FeaturedProducts products={products} />
          </div>
          <div className="w-[350px] mx-auto">
            <Promotions products={products} />
          </div>
        </div>

        {/* Flyers debajo */}
        <div className="w-full">
          <FlyersCarousel flyers={flyers} />
        </div>
      </section>

      {/* Grid de productos */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <ProductsGrid products={products} categories={categories} />
      </section>

            {/* Mapa */}
      <section>
        <MapSection
          title="Nuestra Ubicación"
          googleMapsLink="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3347.1893796713035!2d-68.6005767!3d-32.7221935!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x967e0942c7b2a2f3%3A0x3e13e2b6a1e0e4d9!2s32%C2%B043&#39;19.9%22S%2068%C2%B035&#39;52.8%22W!5e0!3m2!1ses-419!2sar!4v1739999999999!5m2!1ses-419!2sar"
        />
      </section>

    </main>
  );
}
