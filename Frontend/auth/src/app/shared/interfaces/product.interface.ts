// product.interface.ts
export interface Product {
  _id?: string;
  name: string;
  price: number;
  presentation: string;
  number: number;
}

export interface ProductResponse {
  // Añadido response
  success: boolean;
  message: string;
  data?: Product;
  products: Product[];
}
export interface ApiError {
  message: string;
  status?: number;
  error?: any;
}
