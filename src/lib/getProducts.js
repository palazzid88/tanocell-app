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
    // Mapeamos todas las imágenes como un array de objetos { url, filename }
    images: (record.fields.image || []).map(img => ({
      url: img.url,
      filename: img.filename
    })),
    category: record.fields.category || null,
  }));
}
