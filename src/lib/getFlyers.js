// src/lib/getFlyers.js
import base from "./airtable";

export async function getFlyers() {
  const records = await base("Flyers").select({}).firstPage();

  return records.map((record) => ({
    id: record.id,
    images: (record.fields.image || []).map(img => ({
      url: img.url,
      filename: img.filename
    })),
  })
  )
}

