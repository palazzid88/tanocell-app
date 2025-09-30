// src/app/page.jsx
import Navbar from "./components/Navbar";
import Banner from "./components/Banner";
import Footer from "./components/Footer";
import Servicios from "./components/Servicios";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <Banner />
      <Servicios />
      <div className="flex-grow">
        {/* Aquí después agregamos Productos, Servicios, etc. */}
      </div>
    </main>
  );
}
