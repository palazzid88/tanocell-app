"use client";

import { useState } from "react";
import CategoriesSidebar from "./CategoriesSidebar";
import ProductsGrid from "./ProductsGrid";


export default function FilterSection({ categories, products }) {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  return (
    <div className="flex flex-col md:flex-row gap-6">
      <div className="md:w-1/3 lg:w-1/4">
        <CategoriesSidebar
          categories={categories}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </div>

      <div className="flex-1">
        <ProductsGrid products={filteredProducts} />
      </div>
    </div>
  );
}
