import { OrderData } from '../types';

// Simulating a backend API call
export const submitOrder = async (order: OrderData): Promise<{ success: boolean; message: string }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // In a real scenario, this would POST to https://api.homecarshop.com/api/orders
      // or a specific landing page route.
      console.log("Order submitted to backend:", order);
      
      resolve({
        success: true,
        message: "Vaša narudžba je uspješno primljena!"
      });
    }, 1500);
  });
};