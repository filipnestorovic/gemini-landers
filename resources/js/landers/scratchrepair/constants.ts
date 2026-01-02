export const PRODUCT_SETTINGS = {
  storeName: "HomeCarShop",
  name: "Scratch Repair",
  sku: "11-SCRATCHREPAIR",
  currency: "RSD",
  shippingCost: 500,
  pixelId: "1016213196582153",
};

export const BUNDLES = [
  {
    id: 1,
    name: "Start Paket",
    qty: 1,
    price: 1990,
    oldPrice: 3980,
    savings: "50%",
    description: "1 x Scratch repair (50ml)",
    freeShipping: false
  },
  {
    id: 2,
    name: "Pro Paket",
    qty: 2,
    price: 3490,
    oldPrice: 7960,
    savings: "500 RSD EXTRA",
    label: "NAJPRODAVANIJE",
    popular: true,
    description: "2 x Scratch repair",
    freeShipping: false
  },
  {
    id: 3,
    name: "Mega Paket",
    qty: 3,
    price: 4490,
    oldPrice: 11940,
    savings: "1500 RSD EXTRA",
    label: "MAX UŠTEDA",
    description: "3 x Scratch repair",
    freeShipping: true // Samo ovaj paket ima besplatnu dostavu
  }
];

export const REVIEWS = [
  {
    name: "Marko Jovanović",
    city: "Beograd",
    text: "Nisam verovao dok nisam probao. Imao sam ružnu ogrebotinu na vratima od parkinga. Naprskao sam, obrisao i nestala je! Svaka čast.",
    rating: 5,
    image: "https://i.pravatar.cc/150?img=11"
  },
  {
    name: "Petar Petrović",
    city: "Novi Sad",
    text: "Dostava je bila stvarno brza, stiglo je za jedan dan. Sprej radi tačno ono što piše. Preporuka svima koji čuvaju auto.",
    rating: 5,
    image: "https://i.pravatar.cc/150?img=3"
  },
  {
    name: "Jelena Kovačević",
    city: "Niš",
    text: "Koristila sam na crnom autu, strah me bilo da se ne vidi razlika jer je univerzalan. Savršeno se stopilo. Odlična stvar!",
    rating: 5,
    image: "https://i.pravatar.cc/150?img=5"
  },
  {
    name: "Miloš B.",
    city: "Kragujevac",
    text: "Kupio sam dva pakovanja. Mnogo lakše se koristi od onih pasti što se trljaju satima. Samo naprskaš i obrišeš.",
    rating: 4,
    image: "https://i.pravatar.cc/150?img=60"
  }
];
