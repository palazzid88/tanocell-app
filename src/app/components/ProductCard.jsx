// src/app/components/ProductCard.jsx
export default function ProductCard({ product, featured = false, promotionBadge = false }) {
  if (!product) return null;

  const telefono = "549XXXXXXXXX"; // tu WhatsApp
  const mensaje = encodeURIComponent(
    `Hola Tanocell 👋, quiero consultar por el producto "${product.name}"`
  );
  const urlWtp = `https://wa.me/${telefono}?text=${mensaje}`;

  return (
    <div className="relative bg-gray-900 border border-gray-800 rounded-xl overflow-hidden shadow-md hover:border-cyan-400 transition flex flex-col">
      {/* Badges */}
      {featured && (
        <span className="absolute top-2 left-2 bg-yellow-400 text-gray-900 text-xs font-bold px-2 py-1 rounded">
          Destacado
        </span>
      )}
      {promotionBadge && (
        <span className="absolute top-2 right-2 bg-cyan-500 text-white text-xs font-bold px-2 py-1 rounded">
          Promo
        </span>
      )}

      {/* Imagen */}
      {product.images?.[0]?.url ? (
        <img
          src={product.images[0].url}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
      ) : (
        <div className="w-full h-48 bg-gray-800 flex items-center justify-center text-gray-500 text-sm">
          Sin imagen
        </div>
      )}

      {/* Contenido */}
      <div className="flex flex-col flex-grow justify-between p-4">
        <div>
          <h3 className="text-lg font-semibold text-white mb-1">
            {product.name}
          </h3>
          <p className="text-cyan-400 text-md font-bold mb-2">${product.price}</p>
          {product.description && (
            <p className="text-gray-400 text-sm line-clamp-3">{product.description}</p>
          )}
        </div>

        <a
          href={urlWtp}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 w-full text-center bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-2 px-4 rounded-lg transition"
        >
          Consultar por WhatsApp
        </a>
      </div>
    </div>
  );
}
