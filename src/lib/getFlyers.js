// src/lib/getFlyers.js
import base from "./airtable";

export async function getFlyers() {
  try {
    const records = await base("Flyers").select({
      view: "Grid view", // asegúrate que esta vista exista y muestre todos los registros
    }).firstPage();

    // Mapeamos cada registro
    const flyers = records.map((record) => {
      // attachments del campo "image"
      const images = (record.fields.image || []).map(img => ({
        url: img.url,
        filename: img.filename,
      }));

      return {
        id: record.id,
        info: record.fields.info || "",
        images, // puede ser array vacío si no hay attachments
      };
    });

    console.log("✅ Flyers obtenidos de Airtable:", flyers);
    return flyers;

  } catch (error) {
    console.error("❌ Error al obtener flyers:", error);
    return [];
  }
}
