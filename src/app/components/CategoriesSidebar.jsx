// src/app/components/CategoriesSidebar.jsx
"use client";

export default function CategoriesSidebar({
  categories = [],
  selectedCategory,
  setSelectedCategory,
}) {
  return (
    <div className="flex flex-col space-y-2">
      <button
        onClick={() => setSelectedCategory("all")}
        className={`px-4 py-2 rounded-lg font-semibold w-full text-left ${
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
          onClick={() => setSelectedCategory(cat)}
          className={`px-4 py-2 rounded-lg font-semibold w-full text-left ${
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
