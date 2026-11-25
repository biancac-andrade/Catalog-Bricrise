import { fetchCatalog } from "@/lib/contentful/fetchCatalog";

import CatalogSection from "@/components/sections/CatalogSection";

export const revalidate = 120;

export default async function CatalogoPage() {
  const { themes, products } = await fetchCatalog();

  return (
    <div>
      <CatalogSection themes={themes} products={products} />
    </div>
  );
}