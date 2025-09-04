import { Product, ProductDimensions, CreateProductInput } from './definitions';

// Placeholder data generators
export const generateProductDimensions = (): ProductDimensions => ({
  widthCm: Math.floor(Math.random() * 50) + 10,
  heightCm: Math.floor(Math.random() * 30) + 5,
  depthCm: Math.floor(Math.random() * 20) + 5,
});

export const generateDateString = (daysAgo: number = 0): string => {
  const date = new Date();
  date.setDate(date.getDate() - daysAgo);
  return date.toISOString();
};

// Sample product data
export const sampleProducts: Product[] = [
  {
    id: "p-001",
    name: "Wireless Bluetooth Headphones",
    sku: "ELEC-001",
    category: "Electronics",
    priceCents: 8999,
    rating: 4.5,
    stock: 32,
    tags: ["bluetooth", "audio", "wireless"],
    status: "active",
    createdAt: generateDateString(30),
    updatedAt: generateDateString(5),
    description: "High-quality wireless headphones with noise cancellation and 30-hour battery life.",
    dimensions: { widthCm: 18, heightCm: 20, depthCm: 8 },
    imageUrl: "https://picsum.photos/400/400?random=1001"
  },
  {
    id: "p-002",
    name: "Adjustable Dumbbell Set 20kg",
    sku: "FIT-020",
    category: "Fitness",
    priceCents: 12999,
    rating: 4.2,
    stock: 12,
    tags: ["home-gym", "strength", "adjustable"],
    status: "active",
    createdAt: generateDateString(25),
    updatedAt: generateDateString(3),
    description: "Space-saving adjustable dumbbell system with quick-change plates.",
    dimensions: { widthCm: 40, heightCm: 18, depthCm: 18 },
    imageUrl: "https://picsum.photos/400/400?random=1101"
  },
  {
    id: "p-003",
    name: "Smart LED Light Bulb",
    sku: "HOME-101",
    category: "Home",
    priceCents: 1599,
    rating: 4.3,
    stock: 120,
    tags: ["smart-home", "lighting", "wifi"],
    status: "active",
    createdAt: generateDateString(20),
    updatedAt: generateDateString(1),
    description: "Wi-Fi enabled LED bulb with app control and voice assistant compatibility.",
    imageUrl: "https://picsum.photos/400/400?random=1201"
  },
  {
    id: "p-004",
    name: "Stainless Steel Water Bottle 1L",
    sku: "HOME-205",
    category: "Home",
    priceCents: 2199,
    rating: 4.7,
    stock: 75,
    tags: ["hydration", "outdoor", "insulated"],
    status: "active",
    createdAt: generateDateString(40),
    updatedAt: generateDateString(10),
    description: "Double-wall insulated bottle that keeps drinks cold for 24 hours.",
    dimensions: { widthCm: 8, heightCm: 29, depthCm: 8 },
    imageUrl: "https://picsum.photos/400/400?random=1202"
  },
  {
    id: "p-005",
    name: "Yoga Mat Pro 6mm",
    sku: "FIT-112",
    category: "Fitness",
    priceCents: 3499,
    rating: 4.6,
    stock: 56,
    tags: ["yoga", "pilates", "non-slip"],
    status: "active",
    createdAt: generateDateString(35),
    updatedAt: generateDateString(8),
    description: "Premium non-slip yoga mat with high-density cushioning and alignment lines.",
    imageUrl: "https://picsum.photos/400/400?random=1102"
  },
  {
    id: "p-006",
    name: "Mechanical Gaming Keyboard RGB",
    sku: "ELEC-156",
    category: "Electronics",
    priceCents: 12999,
    rating: 4.8,
    stock: 23,
    tags: ["gaming", "rgb", "mechanical", "keyboard"],
    status: "active",
    createdAt: generateDateString(25),
    updatedAt: generateDateString(3),
    description: "High-performance mechanical gaming keyboard with RGB backlighting and tactile switches.",
    dimensions: { widthCm: 45, heightCm: 15, depthCm: 3 },
    imageUrl: "https://picsum.photos/400/400?random=1002"
  },
  {
    id: "p-007",
    name: "Organic Green Tea 100g",
    sku: "FOOD-089",
    category: "Food & Beverages",
    priceCents: 1599,
    rating: 4.4,
    stock: 89,
    tags: ["organic", "tea", "healthy", "natural"],
    status: "active",
    createdAt: generateDateString(60),
    updatedAt: generateDateString(15),
    description: "Premium organic green tea leaves sourced from high-altitude gardens.",
    imageUrl: "https://picsum.photos/400/400?random=1501"
  },
  {
    id: "p-008",
    name: "Wireless Charging Pad",
    sku: "ELEC-234",
    category: "Electronics",
    priceCents: 2999,
    rating: 4.3,
    stock: 67,
    tags: ["wireless", "charging", "phone", "convenient"],
    status: "active",
    createdAt: generateDateString(45),
    updatedAt: generateDateString(12),
    description: "Fast wireless charging pad compatible with all Qi-enabled devices.",
    dimensions: { widthCm: 10, heightCm: 10, depthCm: 1 },
    imageUrl: "https://picsum.photos/400/400?random=1003"
  },
  {
    id: "p-009",
    name: "Resistance Bands Set",
    sku: "FIT-345",
    category: "Fitness",
    priceCents: 2499,
    rating: 4.5,
    stock: 41,
    tags: ["resistance", "bands", "home-workout", "portable"],
    status: "active",
    createdAt: generateDateString(20),
    updatedAt: generateDateString(5),
    description: "Complete set of resistance bands for full-body workouts at home or gym.",
    imageUrl: "https://picsum.photos/400/400?random=1103"
  },
  {
    id: "p-010",
    name: "Bluetooth Speaker Waterproof",
    sku: "ELEC-567",
    category: "Electronics",
    priceCents: 5999,
    rating: 4.6,
    stock: 34,
    tags: ["bluetooth", "speaker", "waterproof", "portable"],
    status: "active",
    createdAt: generateDateString(15),
    updatedAt: generateDateString(2),
    description: "Portable Bluetooth speaker with IPX7 waterproof rating and 12-hour battery life.",
    dimensions: { widthCm: 15, heightCm: 8, depthCm: 8 },
    imageUrl: "https://picsum.photos/400/400?random=1004"
  },
  {
    id: "p-011",
    name: "Protein Powder Vanilla 2kg",
    sku: "FOOD-123",
    category: "Food & Beverages",
    priceCents: 8999,
    rating: 4.7,
    stock: 28,
    tags: ["protein", "fitness", "vanilla", "supplement"],
    status: "active",
    createdAt: generateDateString(50),
    updatedAt: generateDateString(7),
    description: "High-quality whey protein powder with vanilla flavor, perfect for post-workout recovery.",
    imageUrl: "https://picsum.photos/400/400?random=1502"
  },
  {
    id: "p-012",
    name: "Smart Watch Fitness Tracker",
    sku: "ELEC-789",
    category: "Electronics",
    priceCents: 15999,
    rating: 4.4,
    stock: 19,
    tags: ["smartwatch", "fitness", "tracker", "health"],
    status: "active",
    createdAt: generateDateString(30),
    updatedAt: generateDateString(4),
    description: "Advanced smartwatch with heart rate monitoring, GPS, and 7-day battery life.",
    dimensions: { widthCm: 4, heightCm: 4, depthCm: 1 },
    imageUrl: "https://picsum.photos/400/400?random=1005"
  },
  {
    id: "p-013",
    name: "Essential Oils Set 6x10ml",
    sku: "HEAL-456",
    category: "Health & Wellness",
    priceCents: 3999,
    rating: 4.2,
    stock: 52,
    tags: ["essential-oils", "aromatherapy", "natural", "wellness"],
    status: "active",
    createdAt: generateDateString(40),
    updatedAt: generateDateString(9),
    description: "Premium essential oils set with lavender, eucalyptus, peppermint, and more.",
    imageUrl: "https://picsum.photos/400/400?random=1601"
  },
  {
    id: "p-014",
    name: "Gaming Mouse RGB",
    sku: "ELEC-901",
    category: "Electronics",
    priceCents: 4999,
    rating: 4.5,
    stock: 38,
    tags: ["gaming", "mouse", "rgb", "precision"],
    status: "active",
    createdAt: generateDateString(22),
    updatedAt: generateDateString(6),
    description: "High-precision gaming mouse with RGB lighting and customizable DPI settings.",
    dimensions: { widthCm: 12, heightCm: 6, depthCm: 4 },
    imageUrl: "https://picsum.photos/400/400?random=1006"
  },
  {
    id: "p-015",
    name: "Meditation Cushion Set",
    sku: "HEAL-234",
    category: "Health & Wellness",
    priceCents: 4499,
    rating: 4.6,
    stock: 31,
    tags: ["meditation", "cushion", "mindfulness", "comfort"],
    status: "active",
    createdAt: generateDateString(18),
    updatedAt: generateDateString(1),
    description: "Comfortable meditation cushion set with buckwheat hull filling for optimal support.",
    dimensions: { widthCm: 35, heightCm: 15, depthCm: 35 },
    imageUrl: "https://picsum.photos/400/400?random=1602"
  }
];

// Genera URLs de imágenes orientadas a productos usando placeholders más confiables
export const generateFakeImageUrl = (width: number = 400, height: number = 400, category?: string): string => {
  // IDs específicos para cada categoría que generan imágenes consistentes
  const categoryIds: { [key: string]: number[] } = {
    'Electronics': [1001, 1002, 1003, 1004, 1005, 1006, 1007, 1008, 1009, 1010],
    'Fitness': [1101, 1102, 1103, 1104, 1105, 1106, 1107, 1108, 1109, 1110],
    'Home': [1201, 1202, 1203, 1204, 1205, 1206, 1207, 1208, 1209, 1210],
    'Clothing': [1301, 1302, 1303, 1304, 1305, 1306, 1307, 1308, 1309, 1310],
    'Books': [1401, 1402, 1403, 1404, 1405, 1406, 1407, 1408, 1409, 1410],
    'Food & Beverages': [1501, 1502, 1503, 1504, 1505, 1506, 1507, 1508, 1509, 1510],
    'Health & Wellness': [1601, 1602, 1603, 1604, 1605, 1606, 1607, 1608, 1609, 1610]
  };
  
  let imageId: number;
  
  if (category && categoryIds[category]) {
    const ids = categoryIds[category];
    imageId = ids[Math.floor(Math.random() * ids.length)];
  } else {
    // ID aleatorio para productos genéricos
    imageId = Math.floor(Math.random() * 100) + 2000;
  }
  
  return `https://picsum.photos/${width}/${height}?random=${imageId}`;
};

export const generateCreateProductInput = (): CreateProductInput => ({
  name: "",
  sku: "",
  category: "Electronics",
  priceCents: 0,
  stock: 0,
  tags: [],
  description: "",
  dimensions: undefined,
  imageUrl: ""
});