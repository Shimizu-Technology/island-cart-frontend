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
    description: 'Sweet ripe bananas perfect for snacking or baking',
    inStock: true,
    brand: 'Fresh Valley',
    origin: 'Philippines',
    weight: '2 lbs (approx. 6-8 bananas)',
    benefits: ['Rich in potassium', 'Natural energy boost', 'Heart healthy', 'Supports muscle function'],
    nutritionFacts: {
      servingSize: '1 medium banana (118g)',
      calories: 105,
      totalFat: '0.4g',
      saturatedFat: '0.1g',
      transFat: '0g',
      cholesterol: '0mg',
      sodium: '1mg',
      totalCarbohydrates: '27g',
      dietaryFiber: '3.1g',
      sugars: '14g',
      protein: '1.3g',
      vitaminC: '17% DV',
      calcium: '1% DV'
    },
    storageInstructions: 'Store at room temperature. Refrigerate when ripe to extend freshness.',
    shelfLife: '5-7 days at room temperature',
    certifications: ['Sustainably Grown']
  },
  {
    id: '2',
    name: 'Whole Milk',
    price: 4.50,
    image: 'https://images.pexels.com/photos/416322/pexels-photo-416322.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Dairy',
    description: 'Fresh whole milk from local Guam dairy farms',
    inStock: true,
    brand: 'Island Fresh Dairy',
    origin: 'Guam, USA',
    weight: '1 gallon (3.78L)',
    ingredients: ['Grade A Pasteurized Milk', 'Vitamin D3'],
    allergens: ['Milk'],
    benefits: ['High in calcium', 'Protein source', 'Vitamin D fortified', 'Supports bone health'],
    nutritionFacts: {
      servingSize: '1 cup (240ml)',
      calories: 150,
      totalFat: '8g',
      saturatedFat: '5g',
      transFat: '0g',
      cholesterol: '35mg',
      sodium: '125mg',
      totalCarbohydrates: '12g',
      dietaryFiber: '0g',
      sugars: '12g',
      protein: '8g',
      calcium: '30% DV'
    },
    storageInstructions: 'Keep refrigerated at 40°F or below. Do not freeze.',
    shelfLife: 'Use by date on container, typically 5-7 days past sell-by date',
    certifications: ['Grade A', 'Locally Sourced']
  },
  {
    id: '3',
    name: 'Artisan Bread Loaf',
    price: 3.25,
    image: 'https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Bakery',
    description: 'Freshly baked artisan white bread with a crispy crust',
    inStock: true,
    brand: 'Island Bakery',
    origin: 'Baked fresh daily in Guam',
    weight: '1.5 lbs (680g)',
    ingredients: ['Enriched Wheat Flour', 'Water', 'Yeast', 'Salt', 'Sugar', 'Olive Oil'],
    allergens: ['Wheat', 'May contain Eggs, Milk'],
    benefits: ['Freshly baked daily', 'No preservatives', 'Perfect for sandwiches'],
    nutritionFacts: {
      servingSize: '1 slice (28g)',
      calories: 80,
      totalFat: '1g',
      saturatedFat: '0g',
      transFat: '0g',
      cholesterol: '0mg',
      sodium: '160mg',
      totalCarbohydrates: '15g',
      dietaryFiber: '1g',
      sugars: '1g',
      protein: '3g',
      iron: '6% DV'
    },
    storageInstructions: 'Store in a cool, dry place. Freeze for longer storage.',
    shelfLife: '3-5 days at room temperature',
    certifications: ['Freshly Baked']
  },
  {
    id: '4',
    name: 'Organic Chicken Breast',
    price: 8.99,
    image: 'https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Meat',
    description: 'Premium organic boneless chicken breast, hormone-free',
    inStock: true,
    brand: 'Pacific Organic',
    origin: 'California, USA',
    weight: '1 lb (454g)',
    benefits: ['High protein', 'Lean meat', 'Hormone-free', 'Antibiotic-free', 'Organic certified'],
    nutritionFacts: {
      servingSize: '4 oz (113g)',
      calories: 185,
      totalFat: '4g',
      saturatedFat: '1.1g',
      transFat: '0g',
      cholesterol: '85mg',
      sodium: '75mg',
      totalCarbohydrates: '0g',
      dietaryFiber: '0g',
      sugars: '0g',
      protein: '35g',
      iron: '4% DV'
    },
    storageInstructions: 'Keep refrigerated at 40°F or below. Cook to internal temperature of 165°F.',
    shelfLife: '2-3 days refrigerated, 6 months frozen',
    certifications: ['USDA Organic', 'Hormone-Free', 'Antibiotic-Free']
  },
  {
    id: '5',
    name: 'Fresh Spinach',
    price: 3.99,
    image: 'https://images.pexels.com/photos/2325843/pexels-photo-2325843.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Vegetables',
    description: 'Fresh baby spinach leaves, perfect for salads and cooking',
    inStock: true,
    brand: 'Garden Fresh',
    origin: 'California, USA',
    weight: '5 oz (142g)',
    benefits: ['Rich in iron', 'High in vitamins', 'Antioxidants', 'Low calorie', 'Versatile cooking ingredient'],
    nutritionFacts: {
      servingSize: '1 cup (30g)',
      calories: 7,
      totalFat: '0.1g',
      saturatedFat: '0g',
      transFat: '0g',
      cholesterol: '0mg',
      sodium: '24mg',
      totalCarbohydrates: '1.1g',
      dietaryFiber: '0.7g',
      sugars: '0.1g',
      protein: '0.9g',
      vitaminC: '14% DV',
      iron: '5% DV'
    },
    storageInstructions: 'Keep refrigerated in original container. Wash before eating.',
    shelfLife: '5-7 days refrigerated',
    certifications: ['Sustainably Grown']
  },
  {
    id: '6',
    name: 'Vine-Ripened Tomatoes',
    price: 4.50,
    image: 'https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Vegetables',
    description: 'Fresh vine-ripened tomatoes bursting with flavor',
    inStock: true,
    brand: 'Sunny Fields',
    origin: 'California, USA',
    weight: '2 lbs (907g)',
    benefits: ['Rich in lycopene', 'High in vitamin C', 'Supports heart health', 'Natural antioxidants'],
    nutritionFacts: {
      servingSize: '1 medium tomato (148g)',
      calories: 22,
      totalFat: '0.2g',
      saturatedFat: '0g',
      transFat: '0g',
      cholesterol: '0mg',
      sodium: '6mg',
      totalCarbohydrates: '4.8g',
      dietaryFiber: '1.5g',
      sugars: '3.2g',
      protein: '1.1g',
      vitaminC: '28% DV'
    },
    storageInstructions: 'Store at room temperature for best flavor. Refrigerate when fully ripe.',
    shelfLife: '5-7 days at room temperature',
    certifications: ['Vine-Ripened']
  },
  {
    id: '7',
    name: 'Farm Fresh Eggs',
    price: 3.75,
    image: 'https://images.pexels.com/photos/162712/egg-white-food-protein-162712.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Dairy',
    description: 'Grade A large eggs from free-range hens',
    inStock: true,
    brand: 'Happy Hens Farm',
    origin: 'Local Guam Farms',
    weight: '12 count (24 oz)',
    benefits: ['Complete protein', 'Rich in vitamins', 'Free-range', 'Omega-3 enriched'],
    allergens: ['Eggs'],
    nutritionFacts: {
      servingSize: '1 large egg (50g)',
      calories: 70,
      totalFat: '5g',
      saturatedFat: '1.5g',
      transFat: '0g',
      cholesterol: '185mg',
      sodium: '70mg',
      totalCarbohydrates: '0g',
      dietaryFiber: '0g',
      sugars: '0g',
      protein: '6g',
      iron: '4% DV'
    },
    storageInstructions: 'Keep refrigerated at 40°F or below in original carton.',
    shelfLife: '3-5 weeks past purchase date',
    certifications: ['Grade A', 'Free-Range', 'Local Farm']
  },
  {
    id: '8',
    name: 'Fresh Orange Juice',
    price: 5.99,
    image: 'https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Beverages',
    description: 'Freshly squeezed orange juice with pulp, no preservatives',
    inStock: true,
    brand: 'Citrus Grove',
    origin: 'Florida, USA',
    weight: '64 fl oz (1.89L)',
    ingredients: ['100% Fresh Orange Juice'],
    benefits: ['High in vitamin C', 'Natural antioxidants', 'No added sugar', 'Freshly squeezed'],
    nutritionFacts: {
      servingSize: '8 fl oz (240ml)',
      calories: 110,
      totalFat: '0g',
      saturatedFat: '0g',
      transFat: '0g',
      cholesterol: '0mg',
      sodium: '0mg',
      totalCarbohydrates: '26g',
      dietaryFiber: '0g',
      sugars: '22g',
      protein: '2g',
      vitaminC: '120% DV'
    },
    storageInstructions: 'Keep refrigerated. Shake well before serving.',
    shelfLife: '7-10 days after opening',
    certifications: ['100% Pure', 'No Preservatives']
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