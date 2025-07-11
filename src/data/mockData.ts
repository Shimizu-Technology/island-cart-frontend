import { User, Item, Order } from '../types';

export const mockUsers: User[] = [
  { id: '1', email: 'customer@test.com', role: 'customer', name: 'Maria Santos' },
  { id: '2', email: 'customer2@test.com', role: 'customer', name: 'John Perez' },
  { id: '3', email: 'customer3@test.com', role: 'customer', name: 'Lisa Cruz' },
  { id: '4', email: 'driver@test.com', role: 'driver', name: 'Miguel Rodriguez' },
  { id: '5', email: 'driver2@test.com', role: 'driver', name: 'Anna Flores' },
  { id: '6', email: 'admin@test.com', role: 'admin', name: 'David Kim' },
];

export const mockItems: Item[] = [
  {
    id: '1',
    name: 'Fresh Bananas',
    price: 2.99,
    image: 'https://images.pexels.com/photos/2872755/pexels-photo-2872755.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Fruits',
    description: 'Sweet ripe bananas',
    inStock: true
  },
  {
    id: '2',
    name: 'Whole Milk',
    price: 4.50,
    image: 'https://images.pexels.com/photos/416322/pexels-photo-416322.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Dairy',
    description: 'Fresh whole milk',
    inStock: true
  },
  {
    id: '3',
    name: 'Bread Loaf',
    price: 3.25,
    image: 'https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Bakery',
    description: 'Fresh white bread',
    inStock: true
  },
  {
    id: '4',
    name: 'Chicken Breast',
    price: 8.99,
    image: 'https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Meat',
    description: 'Fresh chicken breast',
    inStock: true
  },
  {
    id: '5',
    name: 'Fresh Spinach',
    price: 3.99,
    image: 'https://images.pexels.com/photos/2325843/pexels-photo-2325843.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Vegetables',
    description: 'Fresh baby spinach',
    inStock: true
  },
  {
    id: '6',
    name: 'Tomatoes',
    price: 4.50,
    image: 'https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Vegetables',
    description: 'Fresh red tomatoes',
    inStock: true
  },
  {
    id: '7',
    name: 'Eggs (12 pack)',
    price: 3.75,
    image: 'https://images.pexels.com/photos/162712/egg-white-food-protein-162712.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Dairy',
    description: 'Fresh large eggs',
    inStock: true
  },
  {
    id: '8',
    name: 'Orange Juice',
    price: 5.99,
    image: 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Beverages',
    description: 'Fresh orange juice',
    inStock: true
  }
];

export const mockOrders: Order[] = [
  {
    id: '1',
    customerId: '1',
    driverId: '4',
    items: [
      {
        id: '1',
        item: mockItems[0],
        quantity: 2,
        substitution: 'similar'
      },
      {
        id: '2',
        item: mockItems[1],
        quantity: 1,
        substitution: 'none'
      }
    ],
    status: 'delivering',
    address: '123 Marine Corps Dr, Apt 2B, Tamuning, GU 96913',
    deliveryWindow: 'Today 5-7 PM',
    total: 10.48,
    createdAt: new Date().toISOString(),
    eta: 900
  },
  {
    id: '2',
    customerId: '2',
    items: [
      {
        id: '3',
        item: mockItems[2],
        quantity: 1,
        substitution: 'refund'
      }
    ],
    status: 'new',
    address: '456 Pale San Vitores Rd, Suite 100, Tumon, GU 96913',
    deliveryWindow: 'ASAP',
    total: 3.25,
    createdAt: new Date().toISOString()
  },
  {
    id: '3',
    customerId: '1',
    items: [
      {
        id: '4',
        item: mockItems[3],
        quantity: 2,
        substitution: 'similar'
      },
      {
        id: '5',
        item: mockItems[4],
        quantity: 1,
        substitution: 'none'
      }
    ],
    status: 'new',
    address: '789 Route 1, Dededo, GU 96929',
    deliveryWindow: 'Tomorrow 2-4 PM',
    total: 21.97,
    createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString()
  }
];