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
  shippingCost: 500,
  country: 'RS',
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
        price: 1990,
        oldPrice: 3390, // Approx 40% discount logic
        label: "Start Paket (1 soba)",
        savings: 1400 // In RSD
    },
    {
        id: 2,
        quantity: 2,
        coverage: 30,
        price: 3490,
        oldPrice: 5890, // Approx 40% discount logic
        label: "Standard (Stan/Studio)",
        isPopular: true,
        savings: 2400 // In RSD
    },
    {
        id: 3,
        quantity: 3,
        coverage: 45,
        price: 4490,
        oldPrice: 7490, // Approx 40% discount logic
        label: "Porodični (Ceo stan)",
        savings: 3000 // In RSD
    },
    {
        id: 4,
        quantity: 4,
        coverage: 60,
        price: 5490,
        oldPrice: 9190, // Approx 40% discount logic
        label: "Kuća Paket (Max zaštita)",
        savings: 3700 // In RSD
    }
];

export const TESTIMONIALS = [
  {
    name: "Milica Jovanović",
    city: "Beograd",
    text: "Imali smo problem sa miševima u podrumu. Posle 3 dana korišćenja Pest Reject-a, više ih nismo videli. Neverovatno!",
    rating: 5
  },
  {
    name: "Dragan Petrović",
    city: "Novi Sad",
    text: "Uzeo sam paket od 2 komada za stan od 35 kvadrata. Pokrilo je sve, bube su nestale iz kuhinje.",
    rating: 5
  },
  {
    name: "Ana Nikolić",
    city: "Niš",
    text: "Najbolja stvar je što je bezbedno za mog psa. Ranije sam brinula zbog otrova, sad sam mirna.",
    rating: 4
  }
];
