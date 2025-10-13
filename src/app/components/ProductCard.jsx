import Link from "next/link";

export default function ProductCard({ product, featured, promotion, compact = false }) {
  const { name, price, images } = product;

  const whatsappMessage = encodeURIComponent(
    `Hola Tanocell, quiero consultar por el producto: ${name}`
  );
  const whatsappLink = `https://wa.me/5492615985233?text=${whatsappMessage}`;

  const imageUrl = images?.find(img => img.url)?.url ?? null;

  if (compact) {
    // Modo compacto para carousel
    return (
      <div className="bg-gray-900 rounded-xl shadow-md p-3 border border-gray-700 flex flex-col gap-2 relative hover:scale-105 transition-all duration-300">
        {featured && <span className="absolute top-2 left-2 bg-yellow-400 text-black px-2 py-1 rounded font-semibold text-xs">Destacado</span>}
        {promotion && <span className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded font-semibold text-xs">En Promoción</span>}

        {imageUrl && <img src={imageUrl} alt={name} className="w-full h-36 md:h-40 object-cover rounded-md" />}

        <h4 className="text-white font-semibold text-lg truncate">{name}</h4>
        <p className={`font-bold ${promotion ? "text-neon-pink" : "text-neon-blue"} text-lg`}>${price}</p>

        {/* Solo WhatsApp para compact */}
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-block bg-green-500 hover:bg-green-600 text-white font-semibold py-1 px-3 rounded text-sm text-center transition-all duration-300"
        >
          Consultar
        </a>
      </div>
    );
  }

  // Full card original
  return (
    <div className="bg-gray-900 rounded-xl shadow-md hover:shadow-xl p-4 border border-gray-700 hover:border-cyan-400 hover:scale-105 transition-all duration-300 flex flex-col relative">
      {featured && <span className="absolute top-2 left-2 bg-yellow-400 text-black px-2 py-1 rounded font-semibold text-xs">Destacado</span>}
      {promotion && <span className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded font-semibold text-xs">En Promoción</span>}

      {imageUrl && <img src={imageUrl} alt={name} className="w-full h-35 md:h-50 lg:h-50 object-cover rounded-lg mb-4" />}

      <div className="flex flex-col justify-between flex-1">
        <div>
          <h3 className="text-xl font-semibold text-white">{name}</h3>
          <p className="text-cyan-400 text-lg font-bold">${price}</p>
        </div>

        <Link href={`/products/${product.id}`} className="mt-2 inline-block bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded-lg text-center transition-all duration-300">
          Ver más
        </Link>

        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-block bg-green-500 hover:bg-green-600 shadow-md hover:shadow-lg text-white font-semibold py-2 px-4 rounded-lg text-center transition-all duration-300"
        >
          Consultar por WhatsApp
        </a>
      </div>
    </div>
  );
}
