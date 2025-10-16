"use client";

export default function CategoriesSidebar({
  categories = [],
  selectedCategory,
  setSelectedCategory,
}) {
  const handleSelect = (category) => {
    setSelectedCategory(category);

    // Scroll suave hacia la grilla de productos
    const grid = document.getElementById("products-grid");
    if (grid) {
      grid.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="flex flex-col space-y-2 bg-black/70 p-4 rounded-xl border border-gray-600 shadow-lg">
      <h3 className="text-lg font-bold text-gray-100 mb-3">Filtrar productos</h3>

      <button
        onClick={() => handleSelect("all")}
        className={`px-4 py-2 rounded-lg font-semibold w-full text-left transition ${
          selectedCategory === "all"
            ? "bg-cyan-500 text-white"
            : "bg-gray-200 text-gray-800 hover:bg-gray-300"
        }`}
      >
        Todas
      </button>

      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => handleSelect(cat)}
          className={`px-4 py-2 rounded-lg font-semibold w-full text-left transition ${
            selectedCategory === cat
              ? "bg-cyan-500 text-white"
              : "bg-gray-200 text-gray-800 hover:bg-gray-300"
          }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
