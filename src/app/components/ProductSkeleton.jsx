export default function ProductSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200 animate-pulse">
      {/* Imagen simulada */}
      <div className="h-40 bg-gray-300"></div>

      {/* Contenido simulado */}
      <div className="p-4 space-y-3">
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        <div className="h-8 bg-gray-300 rounded w-full mt-2"></div>
      </div>
    </div>
  );
}
