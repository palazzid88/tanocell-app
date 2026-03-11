import Banner from "./components/Banner";
import Promotions from "./components/Promotions";
import FeaturedProducts from "./components/FeaturedProducts";
import ProductsGrid from "./components/ProductsGrid";
import FlyersCarousel from "./components/FlyersCarousel";

import { getProducts } from "@/lib/getProducts";
import { getFlyers } from "@/lib/getFlyers";
import MapSection from "./components/MapSection";

// Cache por 2 horas
export const revalidate = 7200;

export default async function Home() {

  const [products, flyers] = await Promise.all([
    getProducts(),
    getFlyers(),
  ]);

  // Generar categorías desde products
  const categories = [
    ...new Set(
      products
        .map((p) => p.category)
        .filter(Boolean)
    ),
  ].sort();

  return (
    <main className="flex flex-col min-h-screen bg-black text-gray-800">

      {/* Banner superior */}
      <Banner flyers={flyers} />

      {/* Sección principal */}
      <section className="max-w-7xl mx-auto px-4 py-12 flex flex-col gap-10">

        {/* Featured y Promotions */}
        <div className="flex flex-col md:flex-row justify-center items-start gap-8">
          
          <div className="w-[350px] mx-auto">
            <FeaturedProducts products={products} />
          </div>

          <div className="w-[350px] mx-auto">
            <Promotions products={products} />
          </div>

        </div>

        {/* Flyers */}
        <div className="w-full">
          <FlyersCarousel flyers={flyers} />
        </div>

      </section>

      {/* Grid de productos */}
      <section id="productos" className="max-w-7xl mx-auto px-4 py-12">
        <ProductsGrid products={products} categories={categories} />
      </section>

      {/* Mapa */}
      <section>
        <MapSection
          title="Nuestra Ubicación"
          googleMapsLink="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3347.1893796713035!2d-68.6005767!3d-32.7221935!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x967e0942c7b2a2f3%3A0x3e13e2b6a1e0e4d9!2s32%C2%B043'19.9%22S%2068%C2%B035'52.8%22W!5e0!3m2!1ses-419!2sar!4v1739999999999!5m2!1ses-419!2sar"
        />
      </section>

    </main>
  );
}