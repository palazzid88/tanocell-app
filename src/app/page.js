// src/app/page.jsx
import Navbar from "./components/Navbar";
import Banner from "./components/Banner";
import ProductCard from "./components/ProductCard";
import Servicios from "./components/Servicios";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <Banner />
      <Servicios />
      <h1 className="text-3xl font-bold mb-6">Nuestros Productos</h1>
      <ProductCard />
    </main>
  );
}
