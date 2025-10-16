{flyers.map((flyer) => (
  <div key={flyer.id} className="overflow-hidden rounded-xl border border-cyan-400/40">
    {flyer.images[0] ? (
      <img
        src={flyer.images[0].url}
        alt={flyer.info || "Flyer"}
        className="w-full h-80 object-cover hover:scale-105 transition-transform duration-300"
      />
    ) : (
      <p className="text-gray-400 text-center p-4">No hay imagen disponible</p>
    )}
  </div>
))}
