// src/lib/getProducts.js
import base from "./airtable";

export async function getProducts() {
  console.log("📡 Consultando Airtable…");

  try {
    const records = await base("Products").select({}).all();

    console.log("📦 Registros obtenidos:", records.length);
    if (records.length > 0) {
      console.log("📝 Primer registro:", JSON.stringify(records[0], null, 2));
    }

    return records.map((record) => {
      const f = record.fields;

      // LOG POR PRODUCTO QUE FALTA ALGÚN CAMPO
      if (!f.name || !f.price || !f.image) {
        console.warn("⚠ Producto con campos faltantes:", {
          id: record.id,
          name: f.name,
          price: f.price,
          image: f.image,
        });
      }

      return {
        id: record.id,
        name: f.name || "",
        description: f.description || "",
        price: f.price || 0,
        oldPrice: f.oldPrice || null,
        code: f.code || "",
        promotion: f.promotion || false,
        featured: f.featured || false,

        // Manejar imágenes opcionales
        images:
          Array.isArray(f.image)
            ? f.image.map((img) => ({
                url: img?.url || "",
                filename: img?.filename || "",
              }))
            : [],

        category: f.category || null,
      };
    });
  } catch (error) {
    console.error("❌ ERROR GRAVE AL CONSULTAR AIRTABLE:", error);
    return [];
  }
}
