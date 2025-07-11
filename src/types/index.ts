export interface User {
  id: string;
  email: string;
  role: 'customer' | 'driver' | 'admin';
  name: string;
}

export interface Item {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description?: string;
  inStock: boolean;
}

export interface CartItem {
  id: string;
  item: Item;
  quantity: number;
  substitution?: 'none' | 'similar' | 'refund';
}

export interface Order {
  id: string;
  customerId: string;
  driverId?: string;
  items: CartItem[];
  status: 'new' | 'shopping' | 'delivering' | 'delivered';
  address: string;
  deliveryWindow: string;
  total: number;
  createdAt: string;
  eta?: number;
}

export interface SMSMessage {
  id: string;
  orderId: string;
  message: string;
  timestamp: string;
  status: 'sent' | 'delivered' | 'failed';
}