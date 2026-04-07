import CatalogView from "./components/CatalogView";
import SiteHeader from "./components/SiteHeader";
import { fetchCatalog } from "@/lib/catalog/fetchCatalog";

/** Catálogo atualiza em produção sem redeploy completo (alterações no Sanity). */
export const revalidate = 120;

export default async function Home() {
  const { themes, products } = await fetchCatalog();

  return (
    <div id="inicio" className="flex min-h-full flex-col">
      <SiteHeader />
      <CatalogView themes={themes} products={products} />
    </div>
  );
}
