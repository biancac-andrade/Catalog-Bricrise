import type { Asset, ContentfulClientApi, Entry } from "contentful";

import type {
  CatalogData,
  CatalogGroup,
  CatalogProduct,
  CatalogTheme,
} from "@/components/catalog/catalog.types";
import {
  inferCatalogGroupKeyFromTheme,
  normalizeCatalogGroupKey,
} from "@/components/catalog/resolveCatalogGroup";
import { getContentfulLocale } from "@/lib/contentful/env";

const GROUP_TYPE = "group";
const THEME_TYPE = "theme";
const PRODUCT_TYPE = "product";

const DEFAULT_GROUPS: CatalogGroup[] = [
  {
    _id: "default-atelie",
    slug: "atelie",
    title: "Ateliê Criativa",
    key: "atelie",
  },
  {
    _id: "default-papelaria",
    slug: "papelaria",
    title: "Papelaria Criativa",
    key: "papelaria",
  },
];

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

function mergeEntryMaps(...maps: Map<string, Entry>[]): Map<string, Entry> {
  const merged = new Map<string, Entry>();
  for (const map of maps) {
    for (const [id, entry] of map) {
      merged.set(id, entry);
    }
  }
  return merged;
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

function mapGroupEntry(entry: Entry): CatalogGroup | null {
  const f = entry.fields as EntrySkeleton;
  const title = strField(f, "title");
  const slug = strField(f, "slug");
  const keyRaw = strField(f, "key") ?? slug;
  const key = normalizeCatalogGroupKey(keyRaw);
  if (!title || !key) return null;
  return {
    _id: entry.sys.id,
    slug: slug ?? key,
    title,
    key,
  };
}

function mapThemeEntry(
  entry: Entry,
  entryMap: Map<string, Entry>,
): CatalogTheme | null {
  const f = entry.fields as EntrySkeleton;
  const title = strField(f, "title");
  const slug = strField(f, "slug");
  if (!title || !slug) {
    return null;
  }

  const groupKey = strField(f, "groupKey") ?? "geral";
  const groupTitle = strField(f, "groupTitle") ?? "Catálogo";

  let catalogGroupKey = null as CatalogTheme["catalogGroupKey"];
  const groupEntry = resolveEntryLink(f["group"], entryMap);
  if (groupEntry) {
    const mappedGroup = mapGroupEntry(groupEntry);
    catalogGroupKey = mappedGroup?.key ?? null;
  }
  if (!catalogGroupKey) {
    catalogGroupKey = inferCatalogGroupKeyFromTheme({
      groupKey,
      title,
      slug,
    });
  }

  return {
    _id: entry.sys.id,
    slug,
    title,
    groupKey,
    groupTitle,
    catalogGroupKey,
  };
}

function compareThemes(a: CatalogTheme, b: CatalogTheme): number {
  const ga = a.catalogGroupKey ?? "";
  const gb = b.catalogGroupKey ?? "";
  const g = ga.localeCompare(gb, "pt-BR");
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
  const themeData = themeEntry ? mapThemeEntry(themeEntry, entryMap) : null;
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
      catalogGroupKey: themeData.catalogGroupKey,
    },
  };
}

function themesFromProducts(products: CatalogProduct[]): CatalogTheme[] {
  const map = new Map<string, CatalogTheme>();
  for (const p of products) {
    if (!map.has(p.theme._id)) {
      map.set(p.theme._id, {
        _id: p.theme._id,
        slug: p.theme.slug,
        title: p.theme.title,
        groupKey: p.theme.groupKey,
        groupTitle: p.theme.groupTitle,
        catalogGroupKey: p.theme.catalogGroupKey,
      });
    }
  }
  return [...map.values()].sort(compareThemes);
}

export async function mapContentfulToCatalog(
  client: ContentfulClientApi<undefined>,
): Promise<CatalogData> {
  const locale = getContentfulLocale();

  const [groupsRes, themesRes, productsRes] = await Promise.all([
    client.getEntries({ content_type: GROUP_TYPE, locale, limit: 20 }),
    client.getEntries({
      content_type: THEME_TYPE,
      locale,
      limit: 1000,
      include: 2,
    }),
    client.getEntries({
      content_type: PRODUCT_TYPE,
      locale,
      limit: 1000,
      include: 10,
    }),
  ]);

  const entryMap = mergeEntryMaps(
    entryMapFrom(groupsRes as EntryCollectionLike),
    entryMapFrom(themesRes as EntryCollectionLike),
    entryMapFrom(productsRes as EntryCollectionLike),
  );

  const groups: CatalogGroup[] = (groupsRes.items as Entry[])
    .map(mapGroupEntry)
    .filter(Boolean) as CatalogGroup[];

  const finalGroups = groups.length > 0 ? groups : DEFAULT_GROUPS;

  const themes: CatalogTheme[] = (themesRes.items as Entry[])
    .map((entry) => mapThemeEntry(entry, entryMap))
    .filter(Boolean) as CatalogTheme[];
  themes.sort(compareThemes);

  const assetMap = assetMapFrom(productsRes as EntryCollectionLike);

  const products: CatalogProduct[] = (productsRes.items as Entry[])
    .map((raw) => mapProductEntry(raw, entryMap, assetMap))
    .filter(Boolean) as CatalogProduct[];
  products.sort((a, b) => a.title.localeCompare(b.title, "pt-BR"));

  const finalThemes = themes.length > 0 ? themes : themesFromProducts(products);

  return { groups: finalGroups, themes: finalThemes, products };
}