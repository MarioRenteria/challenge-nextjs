import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import NewProductPage from '../page';
import productsReducer from '../../../../store/slices/productsSlice';

// Mock next/navigation
const mockPush = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

// Mock the placeholders
jest.mock('../../../lib/data/placeholders', () => ({
  generateCreateProductInput: () => ({
    name: '',
    sku: '',
    category: 'Electronics',
    priceCents: 0,
    stock: 0,
    tags: [],
    description: '',
    dimensions: undefined,
    imageUrl: ''
  }),
  generateFakeImageUrl: jest.fn(() => 'https://fake-image.com/400x400')
}));

const createTestStore = () => {
  return configureStore({
    reducer: {
      products: productsReducer,
    },
    preloadedState: {
      products: {
        products: [],
        loading: false,
        error: null,
      },
    },
  });
};

const renderWithStore = (component: React.ReactElement) => {
  const store = createTestStore();
  return {
    ...render(
      <Provider store={store}>
        {component}
      </Provider>
    ),
    store,
  };
};

describe('NewProductPage - Simple Tests', () => {
  beforeEach(() => {
    mockPush.mockClear();
  });

  it('should render the form', () => {
    renderWithStore(<NewProductPage />);
    
    expect(screen.getByText('Add New Product')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /create product/i })).toBeInTheDocument();
  });

  it('should show validation errors when submitting empty form', async () => {
    const user = userEvent.setup();
    renderWithStore(<NewProductPage />);

    const submitButton = screen.getByRole('button', { name: /create product/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Product name is required')).toBeInTheDocument();
      expect(screen.getByText('SKU is required')).toBeInTheDocument();
      expect(screen.getByText('Description is required')).toBeInTheDocument();
    });
  });

  it('should clear validation errors when typing in fields', async () => {
    const user = userEvent.setup();
    renderWithStore(<NewProductPage />);

    // Trigger validation errors first
    const submitButton = screen.getByRole('button', { name: /create product/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Product name is required')).toBeInTheDocument();
    });

    // Type in name field using placeholder
    const nameInput = screen.getByPlaceholderText('e.g., Wireless Bluetooth Headphones');
    await user.type(nameInput, 'T');

    await waitFor(() => {
      expect(screen.queryByText('Product name is required')).not.toBeInTheDocument();
    });
  });

  it('should handle price validation', async () => {
    const user = userEvent.setup();
    renderWithStore(<NewProductPage />);

    // Fill required fields but leave price as 0
    await user.type(screen.getByPlaceholderText('e.g., Wireless Bluetooth Headphones'), 'Test Product');
    await user.type(screen.getByPlaceholderText('e.g., ELEC-001'), 'TEST-001');
    await user.type(screen.getByPlaceholderText(/High-quality wireless headphones/), 'Test description');
    await user.type(screen.getByPlaceholderText('e.g., 50'), '10');

    const submitButton = screen.getByRole('button', { name: /create product/i });
    await user.click(submitButton);

    // Check that validation error appears (price defaults to 0)
    await waitFor(() => {
      expect(screen.getByText('Price must be greater than 0')).toBeInTheDocument();
    }, { timeout: 1000 });
  });

  it('should have category dropdown with correct options', () => {
    renderWithStore(<NewProductPage />);

    expect(screen.getByRole('option', { name: 'Electronics' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Fitness' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Home' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Clothing' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Books' })).toBeInTheDocument();
  });

  it('should display header with correct title', () => {
    renderWithStore(<NewProductPage />);

    expect(screen.getByText('Add New Product')).toBeInTheDocument();
    expect(screen.getByText('Fill in the details to create a new product')).toBeInTheDocument();
  });

  it('should have cancel link that goes to home', () => {
    renderWithStore(<NewProductPage />);

    const cancelLink = screen.getByRole('link', { name: /cancel/i });
    expect(cancelLink).toHaveAttribute('href', '/');
  });

  it('should render all input fields', () => {
    renderWithStore(<NewProductPage />);

    // Check that all placeholders exist
    expect(screen.getByPlaceholderText('e.g., Wireless Bluetooth Headphones')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('e.g., ELEC-001')).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/High-quality wireless headphones/)).toBeInTheDocument();
    expect(screen.getByPlaceholderText('e.g., 50')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('0.00')).toBeInTheDocument();
  });

  it('should allow typing in form fields', async () => {
    const user = userEvent.setup();
    renderWithStore(<NewProductPage />);

    const nameInput = screen.getByPlaceholderText('e.g., Wireless Bluetooth Headphones');
    await user.type(nameInput, 'Test Product');

    expect(nameInput).toHaveValue('Test Product');
  });
});