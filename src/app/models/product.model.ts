export interface Product {
  id: number;
  name: string;
  price: number;
  barcode: string;
  image?: string;
  description?: string;
  stock?: number;
  discount?: number;
}

export interface CartItem extends Product {
  quantity: number;
}