"use client";

import { useState } from "react";

export default function CategoriesSidebar({ categories = [], onSelect }) {
  const [active, setActive] = useState("Todas");

  const handleClick = (category) => {
    setActive(category);
    onSelect?.(category); // comunica la selección al componente padre
  };

  console.log("categories", categories);
  

  return (
    <aside className="w-full md:w-64 bg-gray-50 border border-gray-200 rounded-2xl p-4 shadow-sm">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        Categorías
      </h2>

      <ul className="space-y-2">
        {/* Opción “Todas” */}
        <li>
          <button
            onClick={() => handleClick("Todas")}
            className={`w-full text-left px-4 py-2 rounded-xl transition-colors ${
              active === "Todas"
                ? "bg-blue-600 text-white font-medium"
                : "hover:bg-blue-50 text-gray-700"
            }`}
          >
            Todas
          </button>
        </li>

        {/* Categorías dinámicas */}
        {categories.map((cat) => (
          <li key={cat}>
            <button
              onClick={() => handleClick(cat)}
              className={`w-full text-left px-4 py-2 rounded-xl transition-colors ${
                active === cat
                  ? "bg-blue-600 text-white font-medium"
                  : "hover:bg-blue-50 text-gray-700"
              }`}
            >
              {cat}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}
