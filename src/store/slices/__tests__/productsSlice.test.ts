import productsReducer, {
  addProduct,
  updateProduct,
  deleteProduct,
  setProducts,
  setLoading,
  setError
} from '../productsSlice';
import { CreateProductInput, Product } from '../../../app/lib/data/definitions';

// Mock the placeholders module
jest.mock('../../../app/lib/data/placeholders', () => ({
  sampleProducts: [
    {
      id: 'test-1',
      name: 'Test Product',
      sku: 'TEST-001',
      category: 'Electronics',
      priceCents: 1000,
      rating: 4.5,
      stock: 10,
      tags: ['test'],
      status: 'active',
      createdAt: '2023-01-01T00:00:00Z',
      updatedAt: '2023-01-01T00:00:00Z',
      description: 'Test description',
      imageUrl: 'test.jpg'
    }
  ],
  generateFakeImageUrl: jest.fn(() => 'https://fake-image.com/400x400'),
  generateCreateProductInput: jest.fn(() => ({
    name: '',
    sku: '',
    category: 'Electronics',
    priceCents: 0,
    stock: 0,
    tags: [],
    description: '',
    dimensions: undefined,
    imageUrl: ''
  }))
}));

describe('Products Slice', () => {
  const initialState = {
    products: [
      {
        id: 'test-1',
        name: 'Test Product',
        sku: 'TEST-001',
        category: 'Electronics',
        priceCents: 1000,
        rating: 4.5,
        stock: 10,
        tags: ['test'],
        status: 'active',
        createdAt: '2023-01-01T00:00:00Z',
        updatedAt: '2023-01-01T00:00:00Z',
        description: 'Test description',
        imageUrl: 'test.jpg'
      }
    ] as Product[],
    loading: false,
    error: null
  };

  describe('reducers', () => {
    it('should return the initial state', () => {
      expect(productsReducer(undefined, { type: 'unknown' })).toEqual(
        expect.objectContaining({
          loading: false,
          error: null
        })
      );
    });

    it('should handle setLoading', () => {
      const actual = productsReducer(initialState, setLoading(true));
      expect(actual.loading).toBe(true);
    });

    it('should handle setError', () => {
      const errorMessage = 'Something went wrong';
      const actual = productsReducer(initialState, setError(errorMessage));
      expect(actual.error).toBe(errorMessage);
    });

    it('should handle setProducts', () => {
      const newProducts: Product[] = [
        {
          id: 'new-1',
          name: 'New Product',
          sku: 'NEW-001',
          category: 'Fitness',
          priceCents: 2000,
          rating: 3.5,
          stock: 5,
          tags: ['new'],
          status: 'active',
          createdAt: '2023-01-02T00:00:00Z',
          updatedAt: '2023-01-02T00:00:00Z',
          description: 'New description',
          imageUrl: 'new.jpg'
        }
      ];

      const actual = productsReducer(initialState, setProducts(newProducts));
      expect(actual.products).toEqual(newProducts);
      expect(actual.products).toHaveLength(1);
    });
  });

  describe('addProduct', () => {
    beforeEach(() => {
      // Mock Date.now() to have consistent timestamps in tests
      jest.spyOn(Date, 'now').mockReturnValue(1234567890000);
      jest.spyOn(Date.prototype, 'toISOString').mockReturnValue('2023-01-01T00:00:00.000Z');
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it('should add a new product with generated values', () => {
      const newProductInput: CreateProductInput = {
        name: 'New Product',
        sku: 'NEW-001',
        category: 'Fitness',
        priceCents: 1500,
        stock: 20,
        tags: ['new', 'fitness'],
        description: 'A new fitness product',
        imageUrl: ''
      };

      const actual = productsReducer(initialState, addProduct(newProductInput));
      
      expect(actual.products).toHaveLength(2);
      expect(actual.products[0]).toEqual({
        id: '1234567890000',
        ...newProductInput,
        imageUrl: 'https://fake-image.com/400x400',
        rating: 0,
        status: 'active',
        createdAt: '2023-01-01T00:00:00.000Z',
        updatedAt: '2023-01-01T00:00:00.000Z'
      });
    });

    it('should use provided imageUrl if available', () => {
      const newProductInput: CreateProductInput = {
        name: 'New Product',
        sku: 'NEW-001',
        category: 'Fitness',
        priceCents: 1500,
        stock: 20,
        tags: ['new'],
        description: 'A new product',
        imageUrl: 'custom-image.jpg'
      };

      const actual = productsReducer(initialState, addProduct(newProductInput));
      expect(actual.products[0].imageUrl).toBe('custom-image.jpg');
    });

    it('should add product to the beginning of the array', () => {
      const newProductInput: CreateProductInput = {
        name: 'Newer Product',
        sku: 'NEWER-001',
        category: 'Home',
        priceCents: 2500,
        stock: 15,
        tags: ['newer'],
        description: 'An even newer product',
        imageUrl: ''
      };

      const actual = productsReducer(initialState, addProduct(newProductInput));
      expect(actual.products[0].name).toBe('Newer Product');
      expect(actual.products[1].name).toBe('Test Product');
    });
  });

  describe('updateProduct', () => {
    beforeEach(() => {
      jest.spyOn(Date.prototype, 'toISOString').mockReturnValue('2023-01-02T00:00:00.000Z');
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    it('should update an existing product', () => {
      const updatedProduct: Product = {
        ...initialState.products[0],
        name: 'Updated Product',
        priceCents: 1200
      };

      const actual = productsReducer(initialState, updateProduct(updatedProduct));
      
      expect(actual.products[0].name).toBe('Updated Product');
      expect(actual.products[0].priceCents).toBe(1200);
      expect(actual.products[0].updatedAt).toBe('2023-01-02T00:00:00.000Z');
    });

    it('should not update if product ID not found', () => {
      const nonExistentProduct: Product = {
        id: 'non-existent',
        name: 'Non-existent Product',
        sku: 'NONE-001',
        category: 'Electronics',
        priceCents: 1000,
        rating: 4.0,
        stock: 5,
        tags: [],
        status: 'active',
        createdAt: '2023-01-01T00:00:00Z',
        updatedAt: '2023-01-01T00:00:00Z',
        description: 'Does not exist',
        imageUrl: 'none.jpg'
      };

      const actual = productsReducer(initialState, updateProduct(nonExistentProduct));
      expect(actual.products).toEqual(initialState.products);
    });
  });

  describe('deleteProduct', () => {
    it('should delete a product by ID', () => {
      const actual = productsReducer(initialState, deleteProduct('test-1'));
      expect(actual.products).toHaveLength(0);
    });

    it('should not change state if product ID not found', () => {
      const actual = productsReducer(initialState, deleteProduct('non-existent'));
      expect(actual.products).toEqual(initialState.products);
    });
  });
});
