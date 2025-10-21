export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-gray-700">
      {/* Logo */}
      <img
        src="/img/logo.png" // 🧠 reemplazá por el path real del logo
        alt="Logo Tanocell"
        className="w-60 h-60 object-contain mb-6 animate-pulse"
      />

      {/* Texto */}
      <p className="text-lg font-semibold animate-pulse">
        Cargando...
      </p>
    </div>
  );
}
