import base from "./airtable";

export async function getCategories() {
  const records = await base("Products").select({
    fields: ["category"],
  }).firstPage();


  // Extraemos los strings de category
  const categories = records
    .map((record) => record.fields.category)
    .filter(Boolean); // elimina null/undefined

  const unique = [...new Set(categories)];

  // console.log("✅ Categorías únicas extraídas:", unique);

  return unique.sort();
}
