"use client";

import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import CategoriesSidebar from "./CategoriesSidebar";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronDown } from "react-icons/fi";


export default function ProductsGrid({ products, categories }) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [filteredProducts, setFilteredProducts] = useState(products || []);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (selectedCategory === "all") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter(
          (p) =>
            p.category &&
            p.category.toLowerCase() === selectedCategory.toLowerCase()
        )
      );
    }
  }, [selectedCategory, products]);

  return (
    <div className="flex flex-col md:flex-row gap-8">
      {/* Sidebar */}
      <div className="w-full md:w-1/5">
      
        {/* Botón toggle solo en mobile */}

      <div className="md:hidden mb-4">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="w-full bg-gray-200 px-4 py-2 rounded-lg font-semibold text-gray-800 hover:bg-gray-300 flex items-center justify-between transition"
        >
          {sidebarOpen ? "Cerrar categorías" : "Seleccionar categoría"}
          <FiChevronDown
            className={`ml-2 transition-transform duration-300 ${
              sidebarOpen ? "rotate-180" : "rotate-0"
            }`}
          />
        </button>
      </div>


        {/* Sidebar animado solo en mobile */}
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: sidebarOpen ? "auto" : 0, opacity: sidebarOpen ? 1 : 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 25 }}
        className="overflow-hidden md:overflow-visible"
      >
        <motion.div
          initial={{ y: -10 }}
          animate={{ y: sidebarOpen ? 0 : -10 }}
          transition={{ duration: 0.3 }}
        >
          <CategoriesSidebar
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        </motion.div>
      </motion.div>



        {/* Sidebar fijo en desktop */}
        <div className="hidden md:block">
          <CategoriesSidebar
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        </div>
      </div>

      {/* Grid de productos */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 w-full md:w-4/5">
        <AnimatePresence>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -20 }}
                transition={{ type: "spring", stiffness: 500, damping: 25, mass: 0.5 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))
          ) : (
            <motion.p
              className="text-gray-400 text-center col-span-full mt-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              No hay productos en esta categoría.
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
