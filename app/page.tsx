import { fetchCatalog } from "@/lib/contentful/fetchCatalog";

import AboutContent from "./components/AboutContent";
import CatalogView from "./components/CatalogView";
import SiteHeader from "./components/SiteHeader";

export const revalidate = 120;

export default async function Page() {
  const { themes, products } = await fetchCatalog();

  return (
    <div id="inicio" className="flex min-h-full flex-col">
      <SiteHeader />
      <CatalogView
        themes={themes}
        products={products}
        aboutSlot={<AboutContent />}
      />
    </div>
  );
}
