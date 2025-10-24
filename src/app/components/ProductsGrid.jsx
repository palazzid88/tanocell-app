"use client";

import { useState, useEffect, useRef } from "react";
import ProductCard from "./ProductCard";
import CategoriesSidebar from "./CategoriesSidebar";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronDown, FiChevronLeft, FiChevronRight } from "react-icons/fi";

export default function ProductsGrid({ products, categories }) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [filteredProducts, setFilteredProducts] = useState(products || []);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true); // 👈 Nuevo estado de carga

  // 🔹 Paginación
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(8);
  const scrollRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200); // simula tiempo de carga
    return () => clearTimeout(timer);
  }, []);

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
    setCurrentPage(1);
  }, [selectedCategory, products]);

  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  useEffect(() => {
    if (!scrollRef.current) return;
    if (currentPage === 1 && productsPerPage === 8) return;
    scrollRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [currentPage, productsPerPage]);

  const goToPrevious = () =>
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
  const goToNext = () =>
    setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));

  return (
    <div className="flex flex-col gap-8">
      {/* 🔹 Selector de categorías - MOBILE */}
      <div className="md:hidden">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="w-full bg-gray-200 px-4 py-2 rounded-lg font-semibold text-gray-800 hover:bg-grey-800 flex items-center justify-between transition"
        >
          {sidebarOpen ? "Cerrar categorías" : "Seleccionar categoría"}
          <FiChevronDown
            className={`ml-2 transition-transform duration-300 ${
              sidebarOpen ? "rotate-180" : "rotate-0"
            }`}
          />
        </button>

        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{
            height: sidebarOpen ? "auto" : 0,
            opacity: sidebarOpen ? 1 : 0,
          }}
          transition={{ type: "spring", stiffness: 200, damping: 25 }}
          className="overflow-hidden mt-2"
        >
          <CategoriesSidebar
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        </motion.div>
      </div>

      {/* 🔹 Selector de categorías - DESKTOP */}
      <div className="hidden md:flex flex-wrap items-center gap-3 bg-gray-800 p-4 rounded-xl border border-grey-300">
        <button
          onClick={() => setSelectedCategory("all")}
          className={`px-4 py-2 rounded-lg font-semibold transition ${
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
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              selectedCategory === cat
                ? "bg-cyan-500 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 🔹 Selector de cantidad + total productos */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <h2 className="text-lg font-semibold text-gray-700">
          {filteredProducts.length} productos disponibles
        </h2>

        <div className="flex items-center">
          <label className="text-gray-700 font-medium mr-2">Mostrar:</label>
          <select
            value={productsPerPage}
            onChange={(e) => {
              setProductsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="border border-gray-300 rounded-lg px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value={5}>5</option>
            <option value={8}>8</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
          </select>
        </div>
      </div>

      {/* 🔹 Grilla de productos o Skeleton */}
      <div ref={scrollRef} id="products-grid" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {loading ? (
          // 🦴 Skeleton Loader
          Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="animate-pulse bg-white rounded-xl shadow p-4 border border-gray-100"
            >
              <div className="h-48 bg-gray-200 rounded-xl mb-4" />
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
              <div className="h-4 bg-gray-200 rounded w-1/2" />
            </div>
          ))
        ) : (
          <AnimatePresence>
            {currentProducts.length > 0 ? (
              currentProducts.map((product) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: -20 }}
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 25,
                    mass: 0.5,
                  }}
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
        )}
      </div>

      {/* 🔹 Paginación */}
      {!loading && totalPages > 1 && (
        <div className="flex justify-center items-center mt-10 flex-wrap gap-2">
          <button
            onClick={goToPrevious}
            disabled={currentPage === 1}
            className={`flex items-center px-4 py-2 rounded-lg font-semibold transition ${
              currentPage === 1
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            <FiChevronLeft className="mr-1" />
            Anterior
          </button>

          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                currentPage === index + 1
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={goToNext}
            disabled={currentPage === totalPages}
            className={`flex items-center px-4 py-2 rounded-lg font-semibold transition ${
              currentPage === totalPages
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Siguiente
            <FiChevronRight className="ml-1" />
          </button>
        </div>
      )}
    </div>
  );
}
