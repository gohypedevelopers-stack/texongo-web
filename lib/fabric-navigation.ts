export const KNIT_STYLE_ITEMS = [
  "Single Jersey",
  "French Terry",
  "Fleece",
  "Rib",
  "Spandex Knits",
  "Pique",
  "Interlock",
  "Waffle",
  "Jacquard",
  "Stripes",
  "Corduroy Vellour",
  "Printed",
  "Shiffly",
  "Ponte",
  "Yarn",
  "Neps",
  "Popcorn",
] as const;

export const BLEND_ITEMS = [
  "Cotton",
  "Viscose",
  "Cotton Modal",
  "Giza/ Egyptian",
  "Melange",
  "Nylon",
  "Poly Cotton",
  "Polyester",
  "Slubs",
  "Spandex Blends",
  "Australian",
] as const;

export const MENWEAR_ITEMS = [
  "Cargo",
  "Hoodies",
  "Co-ord",
  "Tshirt",
  "Joggers",
  "Loungewear",
  "Polos",
  "Sweatshirt",
] as const;

export const WOMENWEAR_ITEMS = [
  "Tshirt/ tops",
  "Athleisure",
  "Co-ords",
  "Dresses",
  "Hoodie",
  "Jumpsuits",
  "Lining",
  "Polos",
  "Scarves",
  "Skirts",
  "Sweatshirt",
] as const;

export const SUSTAINABLE_BLEND_ITEMS = [
  "Wool",
  "Supima",
  "Banana-Fabric",
  "Eco Vero",
  "Hemp",
  "Linen",
  "Lotus",
  "Modal",
  "Organic Cotton",
  "Recycled Cotton",
  "Tencel",
  "BCI",
] as const;

export const FABRICA_VISION_MENU = [
  {
    title: "Knit Style",
    items: KNIT_STYLE_ITEMS,
  },
  {
    title: "Blends",
    items: BLEND_ITEMS,
  },
  {
    title: "Menwear",
    items: MENWEAR_ITEMS,
  },
  {
    title: "Womenwear",
    items: WOMENWEAR_ITEMS,
  },
  {
    title: "Sustainable Blends",
    items: SUSTAINABLE_BLEND_ITEMS,
  },
] as const;

export function fabricCategorySlug(label: string) {
  return label.toLowerCase().replace(/ /g, "-");
}

export function fabricCategoryHref(label: string) {
  return `/fabrics?category=${fabricCategorySlug(label)}`;
}
