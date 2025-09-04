import { 
  Product, 
  ProductFilters, 
  ProductStatus, 
  ProductCategory
} from './data/definitions';

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
    let aValue: string | number, bValue: string | number;

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
 * Format price from cents to currency string
 */
export const formatPrice = (priceCents: number, currency: string = 'USD'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency
  }).format(priceCents / 100);
};

// ===== EXPORT ALL UTILITIES =====
export const utils = {
  // Product utilities
  filterProducts,
  sortProducts,
  getLowStockProducts,
  getProductsByStatus,
  calculateTotalValue,
  getUniqueCategories,
  
  // General utilities
  formatPrice
};