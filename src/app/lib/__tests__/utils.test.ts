import { utils } from '../utils';
import { Product } from '../data/definitions';

// Mock products for testing
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Product 1',
    sku: 'SKU-001',
    category: 'Electronics',
    priceCents: 1000,
    rating: 4.5,
    stock: 25,
    tags: ['tag1', 'tag2'],
    status: 'active',
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-01-01T00:00:00Z',
    description: 'Test product 1',
    imageUrl: 'test.jpg'
  },
  {
    id: '2',
    name: 'Product 2',
    sku: 'SKU-002',
    category: 'Fitness',
    priceCents: 2000,
    rating: 3.5,
    stock: 0,
    tags: ['tag2', 'tag3'],
    status: 'inactive',
    createdAt: '2023-01-02T00:00:00Z',
    updatedAt: '2023-01-02T00:00:00Z',
    description: 'Test product 2',
    imageUrl: 'test2.jpg'
  },
  {
    id: '3',
    name: 'Another Product',
    sku: 'SKU-003',
    category: 'Electronics',
    priceCents: 1500,
    rating: 5.0,
    stock: 10,
    tags: ['tag1'],
    status: 'active',
    createdAt: '2023-01-03T00:00:00Z',
    updatedAt: '2023-01-03T00:00:00Z',
    description: 'Another test product',
    imageUrl: 'test3.jpg'
  }
];

describe('Utils Functions', () => {
  describe('formatPrice', () => {
    it('should format price correctly in cents', () => {
      expect(utils.formatPrice(1000)).toBe('$10.00');
      expect(utils.formatPrice(1599)).toBe('$15.99');
      expect(utils.formatPrice(0)).toBe('$0.00');
      expect(utils.formatPrice(12345)).toBe('$123.45');
    });

    it('should handle large numbers', () => {
      expect(utils.formatPrice(100000)).toBe('$1,000.00');
      expect(utils.formatPrice(1234567)).toBe('$12,345.67');
    });
  });

  describe('getUniqueCategories', () => {
    it('should return unique categories from products', () => {
      const categories = utils.getUniqueCategories(mockProducts);
      expect(categories).toEqual(['Electronics', 'Fitness']);
      expect(categories).toHaveLength(2);
    });

    it('should return empty array for empty products', () => {
      const categories = utils.getUniqueCategories([]);
      expect(categories).toEqual([]);
    });
  });

  describe('filterProducts', () => {
    it('should filter products by search term', () => {
      const filtered = utils.filterProducts(mockProducts, { search: 'Product 1' });
      expect(filtered).toHaveLength(1);
      expect(filtered[0].name).toBe('Product 1');
    });

    it('should filter products by category', () => {
      const filtered = utils.filterProducts(mockProducts, { category: 'Electronics' });
      expect(filtered).toHaveLength(2);
      expect(filtered.every(p => p.category === 'Electronics')).toBe(true);
    });

    it('should filter products by search and category', () => {
      const filtered = utils.filterProducts(mockProducts, { 
        search: 'Another', 
        category: 'Electronics' 
      });
      expect(filtered).toHaveLength(1);
      expect(filtered[0].name).toBe('Another Product');
    });

    it('should return all products when no filters applied', () => {
      const filtered = utils.filterProducts(mockProducts, {});
      expect(filtered).toHaveLength(3);
    });

    it('should be case insensitive for search', () => {
      const filtered = utils.filterProducts(mockProducts, { search: 'product 1' });
      expect(filtered).toHaveLength(1);
      expect(filtered[0].name).toBe('Product 1');
    });
  });

  describe('sortProducts', () => {
    it('should sort products by name ascending', () => {
      const sorted = utils.sortProducts(mockProducts, 'name', 'asc');
      expect(sorted[0].name).toBe('Another Product');
      expect(sorted[1].name).toBe('Product 1');
      expect(sorted[2].name).toBe('Product 2');
    });

    it('should sort products by name descending', () => {
      const sorted = utils.sortProducts(mockProducts, 'name', 'desc');
      expect(sorted[0].name).toBe('Product 2');
      expect(sorted[1].name).toBe('Product 1');
      expect(sorted[2].name).toBe('Another Product');
    });

    it('should sort products by price ascending', () => {
      const sorted = utils.sortProducts(mockProducts, 'price', 'asc');
      expect(sorted[0].priceCents).toBe(1000);
      expect(sorted[1].priceCents).toBe(1500);
      expect(sorted[2].priceCents).toBe(2000);
    });

    it('should sort products by rating descending', () => {
      const sorted = utils.sortProducts(mockProducts, 'rating', 'desc');
      expect(sorted[0].rating).toBe(5.0);
      expect(sorted[1].rating).toBe(4.5);
      expect(sorted[2].rating).toBe(3.5);
    });

    it('should sort products by creation date', () => {
      const sorted = utils.sortProducts(mockProducts, 'createdAt', 'desc');
      expect(sorted[0].id).toBe('3'); // Most recent
      expect(sorted[1].id).toBe('2');
      expect(sorted[2].id).toBe('1'); // Oldest
    });
  });

  describe('calculateTotalValue', () => {
    it('should calculate total value of all products', () => {
      const totalValue = utils.calculateTotalValue(mockProducts);
      // (1000 * 25) + (2000 * 0) + (1500 * 10) = 25000 + 0 + 15000 = 40000 cents = $400
      expect(totalValue).toBe(400);
    });

    it('should return 0 for empty products', () => {
      const totalValue = utils.calculateTotalValue([]);
      expect(totalValue).toBe(0);
    });
  });

  describe('getLowStockProducts', () => {
    it('should return products with stock below threshold', () => {
      const lowStock = utils.getLowStockProducts(mockProducts, 20);
      expect(lowStock).toHaveLength(2); // Products with stock 0 and 10
      expect(lowStock.map(p => p.id)).toEqual(['2', '3']);
    });

    it('should return empty array when no products below threshold', () => {
      const lowStock = utils.getLowStockProducts(mockProducts, 5);
      expect(lowStock).toHaveLength(1); // Only product with stock 0
      expect(lowStock[0].id).toBe('2');
    });
  });

  describe('getProductsByStatus', () => {
    it('should return only active products', () => {
      const activeProducts = utils.getProductsByStatus(mockProducts, 'active');
      expect(activeProducts).toHaveLength(2);
      expect(activeProducts.every(p => p.status === 'active')).toBe(true);
    });

    it('should return only inactive products', () => {
      const inactiveProducts = utils.getProductsByStatus(mockProducts, 'inactive');
      expect(inactiveProducts).toHaveLength(1);
      expect(inactiveProducts[0].id).toBe('2');
    });
  });
});
