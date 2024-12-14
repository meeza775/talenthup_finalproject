export interface Food {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
}

export interface CartItem extends Food {
  quantity: number;
}

export interface Order {
  items: CartItem[];
  totalAmount: number;
  customerName: string;
  address: string;
  phone: string;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
  error?: string;
}