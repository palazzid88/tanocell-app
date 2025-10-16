// src/lib/airtable.js
import Airtable from "airtable";

console.log( process.env.AIRTABLE_API_KEY ? "✅ OK KEY" : "❌ Missing");
console.log(process.env.AIRTABLE_BASE_ID ? "✅ OK BASE" : "❌ Missing");


// Tu token y ID de base
const base = new Airtable({ apiKey: process.env.AIRTABLE_API_KEY }).base(
  process.env.AIRTABLE_BASE_ID
);

export default base;
