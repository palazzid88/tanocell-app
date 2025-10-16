"use client";

import { useEffect, useState } from "react";
import ProductCarousel from "./ProductCarousel"; // o tu carrusel actual
import { getFlyers } from "@/lib/getFlyers";

export default function Flyers() {
  const [flyers, setFlyers] = useState([]);

  console.log("flyers1", flyers);
  

  useEffect(() => {
    getFlyers().then(setFlyers);
  }, []);

  if (flyers.length === 0) return null;

  return <ProductCarousel images={flyers.map((url) => ({ url }))} name="Flyers" />;
}
