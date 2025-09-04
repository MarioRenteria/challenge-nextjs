// Product model type definitions
export interface ProductDimensions {
  widthCm: number;
  heightCm: number;
  depthCm: number;
}

export interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  priceCents: number;
  rating: number;
  stock: number;
  tags: string[];
  status: 'active' | 'inactive' | 'archived';
  createdAt: string; // ISO 8601 date string
  updatedAt: string; // ISO 8601 date string
  description: string;
  dimensions?: ProductDimensions; // Optional as not all products have dimensions
  imageUrl: string;
}

// User model type definitions
export interface User {
  id: string;
  username: string;
  fullName: string;
  email: string;
  role: 'admin' | 'user' | 'moderator';
  isActive: boolean;
  emailVerified: boolean;
  createdAt: string; // ISO 8601 date string
  updatedAt: string; // ISO 8601 date string
  lastLoginAt: string; // ISO 8601 date string
  avatarUrl: string;
  permissions: string[];
}

// Utility types for working with the data
export type ProductStatus = Product['status'];
export type UserRole = User['role'];
export type ProductCategory = 'Electronics' | 'Fitness' | 'Home' | 'Clothing' | 'Books';

// API response types
export interface ProductsResponse {
  products: Product[];
  total: number;
  page?: number;
  limit?: number;
}

export interface UsersResponse {
  users: User[];
  total: number;
  page?: number;
  limit?: number;
}

// Filter and search types
export interface ProductFilters {
  category?: ProductCategory;
  status?: ProductStatus;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  tags?: string[];
  search?: string;
}

export interface UserFilters {
  role?: UserRole;
  isActive?: boolean;
  emailVerified?: boolean;
  search?: string;
}

// Form input types
export interface CreateProductInput {
  name: string;
  sku: string;
  category: string;
  priceCents: number;
  stock: number;
  tags: string[];
  description: string;
  dimensions?: ProductDimensions;
  imageUrl: string;
}

export interface UpdateProductInput extends Partial<CreateProductInput> {
  id: string;
  status?: ProductStatus;
}

export interface CreateUserInput {
  username: string;
  fullName: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
  permissions?: string[];
}

export interface UpdateUserInput extends Partial<CreateUserInput> {
  id: string;
  isActive?: boolean;
  emailVerified?: boolean;
}
