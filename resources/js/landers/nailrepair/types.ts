
export interface Bundle {
    quantity: number;
    price: number;
    label: string;
    sku: string;
    savings?: string;
    badge?: string;
    freeShipping: boolean;
}

export interface Product {
    id: string;
    name: string;
    subtitle: string;
    brand: string;
    basePrice: number;
    currency: string;
    volume: string;
    description: string;
    features: string[];
    ingredients: string[];
    images: string[];
    bundles: Bundle[];
    manufacturer: string;
}

export interface Review {
    id: string;
    author: string;
    rating: number;
    date: string;
    content: string;
    verified: boolean;
}

export interface FAQItem {
    q: string;
    a: string;
}

export enum ChatRole {
    USER = 'user',
    MODEL = 'model'
}

export interface ChatMessage {
    id: string;
    role: ChatRole;
    text: string;
    isError?: boolean;
    image?: string; // base64
}

export interface IngredientInfo {
    name: string;
    benefits: string;
}
