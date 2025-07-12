export interface User {
  id: string;
  email: string;
  role: 'customer' | 'driver' | 'admin';
  name: string;
}

export interface NutritionFacts {
  servingSize: string;
  calories: number;
  totalFat: string;
  saturatedFat: string;
  transFat: string;
  cholesterol: string;
  sodium: string;
  totalCarbohydrates: string;
  dietaryFiber: string;
  sugars: string;
  protein: string;
  vitaminC?: string;
  calcium?: string;
  iron?: string;
}

export interface Item {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description?: string;
  inStock: boolean;
  brand?: string;
  origin?: string;
  weight?: string;
  ingredients?: string[];
  allergens?: string[];
  nutritionFacts?: NutritionFacts;
  storageInstructions?: string;
  shelfLife?: string;
  benefits?: string[];
  certifications?: string[];
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