export interface Bundle {
  id: number;
  quantity: number;
  coverage: number; // in square meters
  price: number;
  oldPrice: number;
  label: string;
  isPopular?: boolean;
  savings: number;
    freeShipping: boolean;
}

export interface OrderData {
  fullName: string;
  phone: string;
  address: string;
  city: string;
  zip: string;
  email?: string; // Optional
  bundleId: number;
  quantity: number;
  totalPrice: number;
}

export enum OrderStatus {
  IDLE,
  SUBMITTING,
  SUCCESS,
  ERROR
}
