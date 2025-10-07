import Link from "next/link";
import { getProducts } from "@/lib/getProducts";
import ProductCarousel from "@/app/components/ProductCarousel";

export default async function ProductDetail({ params }) {
  const { id } = params;
  const products = await getProducts();
  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="p-8 text-center">
        <p className="text-gray-500">Producto no encontrado.</p>
        <Link href="/" className="text-cyan-500 font-bold mt-4 inline-block">
          Volver al inicio
        </Link>
      </div>
    );
  }

  const { name, price, oldPrice, description, images } = product;

  const whatsappMessage = encodeURIComponent(
    `Hola Tanocell, quiero consultar por el producto: ${name}`
  );
  const whatsappLink = `https://wa.me/5492615985233?text=${whatsappMessage}`;

  return (
    <main className="max-w-4xl mx-auto p-6 flex flex-col gap-6">
      {/* Carrusel de imágenes */}
      <ProductCarousel images={images} name={name} />

      <h1 className="text-3xl font-bold">{name}</h1>

      <div className="flex items-center gap-4">
        <p className="text-cyan-500 text-2xl font-bold">${price}</p>
        {oldPrice && <p className="text-gray-400 line-through">${oldPrice}</p>}
      </div>

      {description && <p className="text-gray-300 leading-relaxed">{description}</p>}

      <div className="flex flex-col md:flex-row gap-4 mt-4">
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg text-center transition-all duration-300"
        >
          Consultar por WhatsApp
        </a>

        <Link
          href="/"
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg text-center transition-all duration-300"
        >
          Volver
        </Link>
      </div>
    </main>
  );
}
