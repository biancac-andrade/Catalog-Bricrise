import type { Asset, ContentfulClientApi, Entry } from "contentful";

import type {
  CatalogData,
  CatalogProduct,
  CatalogTheme,
} from "@/lib/catalog/types";
import { getContentfulLocale } from "@/lib/contentful/env";

const THEME_TYPE = "theme";
const PRODUCT_TYPE = "product";

type EntryCollectionLike = {
  items: Entry[];
  includes?: { Entry?: Entry[]; Asset?: Asset[] };
};

function entryMapFrom(collection: EntryCollectionLike): Map<string, Entry> {
  const map = new Map<string, Entry>();
  for (const item of collection.items) {
    map.set(item.sys.id, item);
  }
  for (const e of collection.includes?.Entry ?? []) {
    map.set(e.sys.id, e);
  }
  return map;
}

function assetMapFrom(collection: EntryCollectionLike): Map<string, Asset> {
  const map = new Map<string, Asset>();
  for (const a of collection.includes?.Asset ?? []) {
    map.set(a.sys.id, a);
  }
  return map;
}

type EntrySkeleton = Record<string, unknown>;

type LooseSys = { type?: string; linkType?: string; id?: string };

function resolveEntryLink(
  field: unknown,
  entryMap: Map<string, Entry>,
): Entry | null {
  if (field == null || typeof field !== "object") {
    return null;
  }
  const sys = (field as { sys?: LooseSys }).sys;
  if (!sys) {
    return null;
  }
  if (sys.type === "Entry") {
    return field as Entry;
  }
  if (sys.type === "Link" && sys.linkType === "Entry" && sys.id) {
    return entryMap.get(sys.id) ?? null;
  }
  return null;
}

function resolveAssetLink(
  field: unknown,
  assetMap: Map<string, Asset>,
): Asset | null {
  if (field == null || typeof field !== "object") {
    return null;
  }
  const sys = (field as { sys?: LooseSys }).sys;
  if (!sys) {
    return null;
  }
  if (sys.type === "Asset") {
    return field as Asset;
  }
  if (sys.type === "Link" && sys.linkType === "Asset" && sys.id) {
    return assetMap.get(sys.id) ?? null;
  }
  return null;
}

function assetToUrl(asset: Asset): string | null {
  const file = asset.fields.file;
  if (!file || typeof file !== "object" || !("url" in file)) {
    return null;
  }
  const url = (file as { url?: string }).url;
  if (!url) {
    return null;
  }
  return url.startsWith("//") ? `https:${url}` : url;
}

function strField(fields: EntrySkeleton, key: string): string | null {
  const v = fields[key];
  if (typeof v === "string" && v.trim()) {
    return v.trim();
  }
  return null;
}

function numField(fields: EntrySkeleton, key: string): number | null {
  const v = fields[key];
  if (typeof v === "number" && Number.isFinite(v)) {
    return v;
  }
  return null;
}

function mapThemeEntry(entry: Entry): CatalogTheme | null {
  const f = entry.fields as EntrySkeleton;
  const title = strField(f, "title");
  const slug = strField(f, "slug");
  if (!title || !slug) {
    return null;
  }
  return {
    _id: entry.sys.id,
    slug,
    title,
    groupKey: strField(f, "groupKey") ?? "geral",
    groupTitle: strField(f, "groupTitle") ?? "Catálogo",
  };
}

function compareThemes(a: CatalogTheme, b: CatalogTheme): number {
  const g = a.groupTitle.localeCompare(b.groupTitle, "pt-BR");
  return g === 0 ? a.title.localeCompare(b.title, "pt-BR") : g;
}

function mapProductEntry(
  raw: Entry,
  entryMap: Map<string, Entry>,
  assetMap: Map<string, Asset>,
): CatalogProduct | null {
  const f = raw.fields as EntrySkeleton;
  const title = strField(f, "title");
  const slug = strField(f, "slug");
  const price = numField(f, "price");
  if (!title || !slug || price == null) return null;

  const themeEntry = resolveEntryLink(f["theme"], entryMap);
  const themeData = themeEntry ? mapThemeEntry(themeEntry) : null;
  if (!themeData) return null;

  const imageAsset = resolveAssetLink(f["image"], assetMap);
  const imageUrl = imageAsset ? assetToUrl(imageAsset) : null;
  if (!imageUrl) return null;

  return {
    _id: raw.sys.id,
    slug,
    title,
    price,
    available: f["available"] !== false,
    imageUrl,
    theme: {
      _id: themeData._id,
      slug: themeData.slug,
      title: themeData.title,
      groupKey: themeData.groupKey,
      groupTitle: themeData.groupTitle,
    },
  };
}

function themesFromProducts(products: CatalogProduct[]): CatalogTheme[] {
  const map = new Map<string, CatalogTheme>();
  for (const p of products) {
    if (!map.has(p.theme._id)) {
      map.set(p.theme._id, { ...p.theme });
    }
  }
  return [...map.values()].sort(compareThemes);
}

export async function mapContentfulToCatalog(
  client: ContentfulClientApi<undefined>,
): Promise<CatalogData> {
  const locale = getContentfulLocale();

  const [themesRes, productsRes] = await Promise.all([
    client.getEntries({ content_type: THEME_TYPE, locale, limit: 1000 }),
    client.getEntries({ content_type: PRODUCT_TYPE, locale, limit: 1000, include: 10 }),
  ]);

  const themes: CatalogTheme[] = (themesRes.items as Entry[])
    .map(mapThemeEntry)
    .filter(Boolean) as CatalogTheme[];
  themes.sort(compareThemes);

  const entryMap = entryMapFrom(productsRes as EntryCollectionLike);
  const assetMap = assetMapFrom(productsRes as EntryCollectionLike);

  const products: CatalogProduct[] = (productsRes.items as Entry[])
    .map((raw) => mapProductEntry(raw, entryMap, assetMap))
    .filter(Boolean) as CatalogProduct[];
  products.sort((a, b) => a.title.localeCompare(b.title, "pt-BR"));

  const finalThemes = themes.length > 0 ? themes : themesFromProducts(products);

  return { themes: finalThemes, products };
}
