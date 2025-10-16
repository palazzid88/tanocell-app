// src/app/components/Flyers.jsx
export default function Flyers({ flyers }) {

  if (!flyers?.length) {
    return (
      <aside className="w-full md:w-72 mt-6 md:mt-0">
        <div className="bg-black/70 p-4 rounded-xl border border-cyan-500 shadow-lg text-center text-gray-400">
          No hay flyers disponibles
        </div>
      </aside>
    );
  }

  return (
    <aside className="w-full md:w-72 mt-6 md:mt-0">
      <div className="bg-black/70 p-4 rounded-xl border border-cyan-500 shadow-cyan-500/50">
        <h3 className="text-lg font-bold text-cyan-400 mb-3 text-center">
          Flyers
        </h3>

        <div className="flex flex-col gap-4">
          {flyers.map((flyer) => (
            <div
              key={flyer.id}
              className="overflow-hidden rounded-xl border border-cyan-400/40"
            >
              <img
                src={flyer.images?.[0]?.url}
                alt={flyer.info || "Flyer"}
                className="w-full h-80 object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
