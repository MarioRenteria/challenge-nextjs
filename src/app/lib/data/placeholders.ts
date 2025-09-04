import { Product, User, ProductDimensions, CreateProductInput, CreateUserInput } from './definitions';

// Placeholder data generators
export const generateProductDimensions = (): ProductDimensions => ({
  widthCm: Math.floor(Math.random() * 50) + 10,
  heightCm: Math.floor(Math.random() * 30) + 5,
  depthCm: Math.floor(Math.random() * 20) + 5,
});

export const generateProductId = (): string => `p-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`;

export const generateUserId = (): string => `u-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`;

export const generateSku = (category: string): string => {
  const categoryPrefix = category.toUpperCase().substring(0, 4);
  const randomNumber = Math.floor(Math.random() * 1000);
  return `${categoryPrefix}-${randomNumber}`;
};

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
    imageUrl: "/images/products/wireless-headphones.jpg"
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
    imageUrl: "/images/products/adjustable-dumbbell.jpg"
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
    imageUrl: "/images/products/smart-led-bulb.jpg"
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
    imageUrl: "/images/products/steel-bottle.jpg"
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
    imageUrl: "/images/products/yoga-mat.jpg"
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
    imageUrl: "/images/products/gaming-keyboard.jpg"
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
    imageUrl: "/images/products/green-tea.jpg"
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
    imageUrl: "/images/products/wireless-charger.jpg"
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
    imageUrl: "/images/products/resistance-bands.jpg"
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
    imageUrl: "/images/products/bluetooth-speaker.jpg"
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
    imageUrl: "/images/products/protein-powder.jpg"
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
    imageUrl: "/images/products/smartwatch.jpg"
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
    imageUrl: "/images/products/essential-oils.jpg"
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
    imageUrl: "/images/products/gaming-mouse.jpg"
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
    imageUrl: "/images/products/meditation-cushion.jpg"
  }
];

// Sample user data
export const sampleUsers: User[] = [
  {
    id: "u-001",
    username: "admin.mario",
    fullName: "Mario Admin",
    email: "admin@example.com",
    role: "admin",
    isActive: true,
    emailVerified: true,
    createdAt: generateDateString(45),
    updatedAt: generateDateString(2),
    lastLoginAt: generateDateString(0),
    avatarUrl: "/images/avatars/admin-mario.png",
    permissions: ["manage:users", "manage:products", "view:reports", "manage:settings"]
  },
  {
    id: "u-002",
    username: "sofia.user",
    fullName: "Sofia Rivera",
    email: "sofia@example.com",
    role: "user",
    isActive: true,
    emailVerified: true,
    createdAt: generateDateString(30),
    updatedAt: generateDateString(5),
    lastLoginAt: generateDateString(1),
    avatarUrl: "/images/avatars/sofia.png",
    permissions: ["view:products", "create:items"]
  },
  {
    id: "u-003",
    username: "diego.user",
    fullName: "Diego Martínez",
    email: "diego@example.com",
    role: "user",
    isActive: true,
    emailVerified: false,
    createdAt: generateDateString(25),
    updatedAt: generateDateString(7),
    lastLoginAt: generateDateString(2),
    avatarUrl: "/images/avatars/diego.png",
    permissions: ["view:products"]
  },
  {
    id: "u-004",
    username: "moderator.ana",
    fullName: "Ana Moderator",
    email: "ana@example.com",
    role: "moderator",
    isActive: true,
    emailVerified: true,
    createdAt: generateDateString(20),
    updatedAt: generateDateString(3),
    lastLoginAt: generateDateString(0),
    avatarUrl: "/images/avatars/ana.png",
    permissions: ["view:products", "moderate:content", "view:reports"]
  }
];

// Placeholder data generators for forms
export const generateCreateProductInput = (): CreateProductInput => ({
  name: "New Product",
  sku: generateSku("Electronics"),
  category: "Electronics",
  priceCents: 9999,
  stock: 10,
  tags: ["new", "featured"],
  description: "Description for the new product",
  dimensions: generateProductDimensions(),
  imageUrl: "/images/products/placeholder.jpg"
});

export const generateCreateUserInput = (): CreateUserInput => ({
  username: "new.user",
  fullName: "New User",
  email: "newuser@example.com",
  role: "user",
  avatarUrl: "/images/avatars/default.png",
  permissions: ["view:products"]
});

// Utility functions for generating random data
export const generateRandomProduct = (): Product => ({
  id: generateProductId(),
  name: `Random Product ${Math.floor(Math.random() * 1000)}`,
  sku: generateSku("Electronics"),
  category: "Electronics",
  priceCents: Math.floor(Math.random() * 50000) + 1000,
  rating: Math.round((Math.random() * 2 + 3) * 10) / 10, // 3.0 to 5.0
  stock: Math.floor(Math.random() * 100),
  tags: ["random", "generated"],
  status: Math.random() > 0.1 ? "active" : "inactive",
  createdAt: generateDateString(Math.floor(Math.random() * 365)),
  updatedAt: generateDateString(Math.floor(Math.random() * 30)),
  description: "This is a randomly generated product description.",
  dimensions: Math.random() > 0.3 ? generateProductDimensions() : undefined,
  imageUrl: "/images/products/placeholder.jpg"
});

export const generateRandomUser = (): User => ({
  id: generateUserId(),
  username: `user${Math.floor(Math.random() * 10000)}`,
  fullName: `Random User ${Math.floor(Math.random() * 1000)}`,
  email: `user${Math.floor(Math.random() * 10000)}@example.com`,
  role: Math.random() > 0.8 ? "admin" : "user",
  isActive: Math.random() > 0.1,
  emailVerified: Math.random() > 0.2,
  createdAt: generateDateString(Math.floor(Math.random() * 365)),
  updatedAt: generateDateString(Math.floor(Math.random() * 30)),
  lastLoginAt: generateDateString(Math.floor(Math.random() * 7)),
  avatarUrl: "/images/avatars/default.png",
  permissions: ["view:products"]
});

// Export all placeholder data
export const placeholderData = {
  products: sampleProducts,
  users: sampleUsers,
  generateRandomProduct,
  generateRandomUser,
  generateCreateProductInput,
  generateCreateUserInput
};
