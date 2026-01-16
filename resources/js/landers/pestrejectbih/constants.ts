import { Bundle } from './types';

import productImg from './assets/product.png';
import ratImg from './assets/rat.png';
import bugImg from './assets/bug.png';
import familyImg from './assets/family.png';

export const BRAND_NAME = "HomeCarShop";
export const PRODUCT_NAME = "Pest Reject";
export const PIXEL_ID = "1016213196582153";

// Configuration for backend order processing
export const PRODUCT_SETTINGS = {
    sku: '31-PESTREJECT',
    shippingCost: 13,
    country: 'BA'
};

// Using explicit placeholders so the layout looks correct immediately.
// The user will replace these with real images based on the dimensions provided.
export const IMAGES = {
    // Main Product: Square (1:1) is most versatile for responsive hero splits
    PRODUCT: productImg,

    // Pests: Landscape (4:3 or 3:2) for cards
    PEST_RAT: ratImg,

    // Insects: Landscape (4:3 or 3:2) for cards
    PEST_BUG: bugImg,

    // Family: Landscape
    FAMILY_SAFE: familyImg,
};

export const BUNDLES: Bundle[] = [
  {
    id: 1,
    quantity: 1,
    coverage: 15,
    price: 35, // KM
    oldPrice: 59,
    label: "Start Paket (1 soba)",
    savings: 24 // KM
  },
  {
    id: 2,
    quantity: 2,
    coverage: 30,
    price: 59, // KM
    oldPrice: 99,
    label: "Standard (Stan/Studio)",
    isPopular: true,
    savings: 40 // KM
  },
  {
    id: 3,
    quantity: 3,
    coverage: 45,
    price: 79, // KM
    oldPrice: 129,
    label: "Porodični (Cijeli stan)",
    savings: 50 // KM
  },
  {
    id: 4,
    quantity: 4,
    coverage: 60,
    price: 95, // KM
    oldPrice: 159,
    label: "Kuća Paket (Max zaštita)",
    savings: 64 // KM
  }
];

export const TESTIMONIALS = [
  {
    name: "Amila Hodžić",
    city: "Sarajevo",
    text: "Imali smo problem sa miševima u podrumu. Poslije 3 dana korišćenja Pest Reject-a, više ih nismo vidjeli. Nevjerovatno!",
    rating: 5
  },
  {
    name: "Marko Kovačević",
    city: "Banja Luka",
    text: "Uzeo sam paket od 2 komada za stan od 35 kvadrata. Pokrilo je sve, bube su nestale iz kuhinje.",
    rating: 5
  },
  {
    name: "Ivana Marić",
    city: "Mostar",
    text: "Najbolja stvar je što je bezbjedno za mog psa. Ranije sam brinula zbog otrova, sad sam mirna.",
    rating: 4
  }
];
