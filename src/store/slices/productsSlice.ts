import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product, CreateProductInput } from '../../app/lib/data/definitions';
import { sampleProducts, generateFakeImageUrl } from '../../app/lib/data/placeholders';

interface ProductsState {
  products: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  products: sampleProducts,
  loading: false,
  error: null,
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    addProduct: (state, action: PayloadAction<CreateProductInput>) => {
      const newProduct: Product = {
        id: Date.now().toString(),
        ...action.payload,
        imageUrl: action.payload.imageUrl || generateFakeImageUrl(400, 400, action.payload.category),
        rating: 0,
        status: 'active',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      state.products.unshift(newProduct);
    },
    updateProduct: (state, action: PayloadAction<Product>) => {
      const index = state.products.findIndex(p => p.id === action.payload.id);
      if (index !== -1) {
        state.products[index] = {
          ...action.payload,
          updatedAt: new Date().toISOString(),
        };
      }
    },
    deleteProduct: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter(p => p.id !== action.payload);
    },
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
  },
});

export const {
  setLoading,
  setError,
  addProduct,
  updateProduct,
  deleteProduct,
  setProducts,
} = productsSlice.actions;

export default productsSlice.reducer;
