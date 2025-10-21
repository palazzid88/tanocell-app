import { getProducts } from "@/lib/getProducts";
import ProductGridOffer from "../components/ProductGridOffer";

export default async function ProductsPage({ searchParams }) {
  const { filter } = searchParams;
  const products = await getProducts();

  let filtered = products;

  if (filter === "featured") {
    filtered = products.filter((p) => !!p.featured);
  } else if (filter === "promotion") {
    filtered = products.filter((p) => !!p.promotion);
  }

  return (
    <main className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold mb-6 text-center">
        {filter === "featured"
          ? "Productos Destacados"
          : filter === "promotion"
          ? "Promociones"
          : "Todos los Productos"}
      </h1>

      <ProductGridOffer products={filtered} title={
        filter === "featured" ? "Productos Destacados" : "Productos en Promoción"
      } />
    </main>
  );
}
