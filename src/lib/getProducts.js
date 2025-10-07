// src/lib/getProducts.js
import base from "./airtable";

export async function getProducts() {
  const records = await base("Products").select({}).firstPage();

  return records.map((record) => ({
    id: record.id,
    name: record.fields.name,
    description: record.fields.description,
    price: record.fields.price,
    oldPrice: record.fields.oldPrice,
    code: record.fields.code,
    promotion: record.fields.promotion,
    featured: record.fields.featured,
    images: record.fields.image || [],
    category: record.fields.category || null, // ✅ agregar categoría
  }));
}
