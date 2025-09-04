import { 
  Product, 
  User, 
  ProductFilters, 
  UserFilters, 
  ProductStatus, 
  UserRole,
  ProductCategory,
  ProductsResponse,
  UsersResponse
} from './definitions';

// ===== PRODUCT UTILITIES =====

/**
 * Filter products based on criteria
 */
export const filterProducts = (products: Product[], filters: ProductFilters): Product[] => {
  return products.filter(product => {
    // Category filter
    if (filters.category && product.category !== filters.category) {
      return false;
    }

    // Status filter
    if (filters.status && product.status !== filters.status) {
      return false;
    }

    // Price range filter
    if (filters.minPrice && product.priceCents < filters.minPrice * 100) {
      return false;
    }
    if (filters.maxPrice && product.priceCents > filters.maxPrice * 100) {
      return false;
    }

    // Rating filter
    if (filters.minRating && product.rating < filters.minRating) {
      return false;
    }

    // Tags filter
    if (filters.tags && filters.tags.length > 0) {
      const hasMatchingTag = filters.tags.some(tag => 
        product.tags.some(productTag => 
          productTag.toLowerCase().includes(tag.toLowerCase())
        )
      );
      if (!hasMatchingTag) return false;
    }

    // Search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      const searchableFields = [
        product.name,
        product.description,
        product.sku,
        product.category,
        ...product.tags
      ].join(' ').toLowerCase();
      
      if (!searchableFields.includes(searchTerm)) {
        return false;
      }
    }

    return true;
  });
};

/**
 * Sort products by different criteria
 */
export const sortProducts = (products: Product[], sortBy: 'name' | 'price' | 'rating' | 'createdAt' | 'updatedAt', order: 'asc' | 'desc' = 'asc'): Product[] => {
  return [...products].sort((a, b) => {
    let aValue: any, bValue: any;

    switch (sortBy) {
      case 'name':
        aValue = a.name.toLowerCase();
        bValue = b.name.toLowerCase();
        break;
      case 'price':
        aValue = a.priceCents;
        bValue = b.priceCents;
        break;
      case 'rating':
        aValue = a.rating;
        bValue = b.rating;
        break;
      case 'createdAt':
        aValue = new Date(a.createdAt).getTime();
        bValue = new Date(b.createdAt).getTime();
        break;
      case 'updatedAt':
        aValue = new Date(a.updatedAt).getTime();
        bValue = new Date(b.updatedAt).getTime();
        break;
      default:
        return 0;
    }

    if (aValue < bValue) return order === 'asc' ? -1 : 1;
    if (aValue > bValue) return order === 'asc' ? 1 : -1;
    return 0;
  });
};

/**
 * Paginate products
 */
export const paginateProducts = (products: Product[], page: number = 1, limit: number = 10): ProductsResponse => {
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedProducts = products.slice(startIndex, endIndex);

  return {
    products: paginatedProducts,
    total: products.length,
    page,
    limit
  };
};

/**
 * Get product by ID
 */
export const getProductById = (products: Product[], id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

/**
 * Get products by category
 */
export const getProductsByCategory = (products: Product[], category: ProductCategory): Product[] => {
  return products.filter(product => product.category === category);
};

/**
 * Get products with low stock
 */
export const getLowStockProducts = (products: Product[], threshold: number = 10): Product[] => {
  return products.filter(product => product.stock <= threshold);
};

/**
 * Get products by status
 */
export const getProductsByStatus = (products: Product[], status: ProductStatus): Product[] => {
  return products.filter(product => product.status === status);
};

/**
 * Calculate total value of products
 */
export const calculateTotalValue = (products: Product[]): number => {
  return products.reduce((total, product) => total + (product.priceCents * product.stock), 0) / 100;
};

/**
 * Get unique categories from products
 */
export const getUniqueCategories = (products: Product[]): ProductCategory[] => {
  const categories = new Set(products.map(product => product.category));
  return Array.from(categories) as ProductCategory[];
};

/**
 * Get all unique tags from products
 */
export const getAllTags = (products: Product[]): string[] => {
  const tags = new Set<string>();
  products.forEach(product => {
    product.tags.forEach(tag => tags.add(tag));
  });
  return Array.from(tags).sort();
};

// ===== USER UTILITIES =====

/**
 * Filter users based on criteria
 */
export const filterUsers = (users: User[], filters: UserFilters): User[] => {
  return users.filter(user => {
    // Role filter
    if (filters.role && user.role !== filters.role) {
      return false;
    }

    // Active status filter
    if (filters.isActive !== undefined && user.isActive !== filters.isActive) {
      return false;
    }

    // Email verified filter
    if (filters.emailVerified !== undefined && user.emailVerified !== filters.emailVerified) {
      return false;
    }

    // Search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      const searchableFields = [
        user.username,
        user.fullName,
        user.email
      ].join(' ').toLowerCase();
      
      if (!searchableFields.includes(searchTerm)) {
        return false;
      }
    }

    return true;
  });
};

/**
 * Sort users by different criteria
 */
export const sortUsers = (users: User[], sortBy: 'username' | 'fullName' | 'email' | 'createdAt' | 'lastLoginAt', order: 'asc' | 'desc' = 'asc'): User[] => {
  return [...users].sort((a, b) => {
    let aValue: any, bValue: any;

    switch (sortBy) {
      case 'username':
        aValue = a.username.toLowerCase();
        bValue = b.username.toLowerCase();
        break;
      case 'fullName':
        aValue = a.fullName.toLowerCase();
        bValue = b.fullName.toLowerCase();
        break;
      case 'email':
        aValue = a.email.toLowerCase();
        bValue = b.email.toLowerCase();
        break;
      case 'createdAt':
        aValue = new Date(a.createdAt).getTime();
        bValue = new Date(b.createdAt).getTime();
        break;
      case 'lastLoginAt':
        aValue = new Date(a.lastLoginAt).getTime();
        bValue = new Date(b.lastLoginAt).getTime();
        break;
      default:
        return 0;
    }

    if (aValue < bValue) return order === 'asc' ? -1 : 1;
    if (aValue > bValue) return order === 'asc' ? 1 : -1;
    return 0;
  });
};

/**
 * Paginate users
 */
export const paginateUsers = (users: User[], page: number = 1, limit: number = 10): UsersResponse => {
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedUsers = users.slice(startIndex, endIndex);

  return {
    users: paginatedUsers,
    total: users.length,
    page,
    limit
  };
};

/**
 * Get user by ID
 */
export const getUserById = (users: User[], id: string): User | undefined => {
  return users.find(user => user.id === id);
};

/**
 * Get users by role
 */
export const getUsersByRole = (users: User[], role: UserRole): User[] => {
  return users.filter(user => user.role === role);
};

/**
 * Get active users
 */
export const getActiveUsers = (users: User[]): User[] => {
  return users.filter(user => user.isActive);
};

/**
 * Get users with verified email
 */
export const getVerifiedUsers = (users: User[]): User[] => {
  return users.filter(user => user.emailVerified);
};

/**
 * Get recently active users (logged in within last N days)
 */
export const getRecentlyActiveUsers = (users: User[], days: number = 7): User[] => {
  const cutoffDate = new Date();
  cutoffDate.setDate(cutoffDate.getDate() - days);
  
  return users.filter(user => {
    const lastLogin = new Date(user.lastLoginAt);
    return lastLogin >= cutoffDate;
  });
};

// ===== GENERAL UTILITIES =====

/**
 * Format price from cents to currency string
 */
export const formatPrice = (priceCents: number, currency: string = 'USD'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency
  }).format(priceCents / 100);
};

/**
 * Format date to readable string
 */
export const formatDate = (dateString: string, locale: string = 'en-US'): string => {
  return new Date(dateString).toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

/**
 * Format relative time (e.g., "2 days ago")
 */
export const formatRelativeTime = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return 'Just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} days ago`;
  if (diffInSeconds < 31536000) return `${Math.floor(diffInSeconds / 2592000)} months ago`;
  return `${Math.floor(diffInSeconds / 31536000)} years ago`;
};

/**
 * Generate search suggestions based on products
 */
export const generateSearchSuggestions = (products: Product[], query: string, limit: number = 5): string[] => {
  const suggestions = new Set<string>();
  const queryLower = query.toLowerCase();

  products.forEach(product => {
    // Add product name if it contains the query
    if (product.name.toLowerCase().includes(queryLower)) {
      suggestions.add(product.name);
    }
    
    // Add category if it contains the query
    if (product.category.toLowerCase().includes(queryLower)) {
      suggestions.add(product.category);
    }
    
    // Add tags if they contain the query
    product.tags.forEach(tag => {
      if (tag.toLowerCase().includes(queryLower)) {
        suggestions.add(tag);
      }
    });
  });

  return Array.from(suggestions).slice(0, limit);
};

/**
 * Validate email format
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Generate unique ID
 */
export const generateId = (prefix: string = 'id'): string => {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Deep clone an object
 */
export const deepClone = <T>(obj: T): T => {
  return JSON.parse(JSON.stringify(obj));
};

/**
 * Debounce function for search inputs
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

// ===== EXPORT ALL UTILITIES =====
export const utils = {
  // Product utilities
  filterProducts,
  sortProducts,
  paginateProducts,
  getProductById,
  getProductsByCategory,
  getLowStockProducts,
  getProductsByStatus,
  calculateTotalValue,
  getUniqueCategories,
  getAllTags,
  
  // User utilities
  filterUsers,
  sortUsers,
  paginateUsers,
  getUserById,
  getUsersByRole,
  getActiveUsers,
  getVerifiedUsers,
  getRecentlyActiveUsers,
  
  // General utilities
  formatPrice,
  formatDate,
  formatRelativeTime,
  generateSearchSuggestions,
  isValidEmail,
  generateId,
  deepClone,
  debounce
};
