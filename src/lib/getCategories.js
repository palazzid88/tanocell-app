// src/lib/getCategories.js
import base from "./airtable";

export async function getCategories() {
  const records = await base("Products").select({
    fields: ["category"], // solo traemos el campo necesario
  }).firstPage();

  // Extraer categorías y eliminar duplicados
  const categories = records
    .map((record) => record.fields.category)
    .filter(Boolean); // quita null/undefined

  // Si el campo category es un select único (string)
  const unique = [...new Set(categories)];

  // Si el campo category fuera un array (linked records), haríamos un aplanado
  // const unique = [...new Set(categories.flat())];

  return unique.sort();
}
