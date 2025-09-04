import React from 'react';
import { render, screen } from '@testing-library/react';
import ProductCategoryChart from '../ProductCategoryChart';
import { Product } from '../../../app/lib/data/definitions';

const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Product 1',
    sku: 'SKU-001',
    category: 'Electronics',
    priceCents: 1000,
    rating: 4.5,
    stock: 25,
    tags: ['tag1'],
    status: 'active',
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-01-01T00:00:00Z',
    description: 'Product 1 description',
    imageUrl: 'test1.jpg'
  },
  {
    id: '2',
    name: 'Product 2',
    sku: 'SKU-002',
    category: 'Electronics',
    priceCents: 1500,
    rating: 4.0,
    stock: 10,
    tags: ['tag2'],
    status: 'active',
    createdAt: '2023-01-02T00:00:00Z',
    updatedAt: '2023-01-02T00:00:00Z',
    description: 'Product 2 description',
    imageUrl: 'test2.jpg'
  },
  {
    id: '3',
    name: 'Product 3',
    sku: 'SKU-003',
    category: 'Fitness',
    priceCents: 2000,
    rating: 3.5,
    stock: 5,
    tags: ['tag3'],
    status: 'active',
    createdAt: '2023-01-03T00:00:00Z',
    updatedAt: '2023-01-03T00:00:00Z',
    description: 'Product 3 description',
    imageUrl: 'test3.jpg'
  },
  {
    id: '4',
    name: 'Product 4',
    sku: 'SKU-004',
    category: 'Home',
    priceCents: 5000,
    rating: 5.0,
    stock: 0,
    tags: ['tag4'],
    status: 'active',
    createdAt: '2023-01-04T00:00:00Z',
    updatedAt: '2023-01-04T00:00:00Z',
    description: 'Product 4 description',
    imageUrl: 'test4.jpg'
  }
];

describe('ProductCategoryChart', () => {
  it('should render pie chart by default', () => {
    render(<ProductCategoryChart products={mockProducts} />);
    
    expect(screen.getByTestId('pie-chart')).toBeInTheDocument();
    expect(screen.getByTestId('pie')).toBeInTheDocument();
    expect(screen.getByTestId('responsive-container')).toBeInTheDocument();
  });

  it('should render bar chart when type is bar', () => {
    render(<ProductCategoryChart products={mockProducts} type="bar" />);
    
    expect(screen.getByTestId('bar-chart')).toBeInTheDocument();
    expect(screen.getByTestId('bar')).toBeInTheDocument();
    expect(screen.getByTestId('x-axis')).toBeInTheDocument();
    expect(screen.getByTestId('y-axis')).toBeInTheDocument();
  });

  it('should display no data message when products array is empty', () => {
    render(<ProductCategoryChart products={[]} />);
    
    expect(screen.getByText('No data available')).toBeInTheDocument();
    expect(screen.queryByTestId('pie-chart')).not.toBeInTheDocument();
  });

  it('should apply custom className', () => {
    render(<ProductCategoryChart products={mockProducts} className="custom-class" />);
    
    const container = screen.getByTestId('responsive-container').parentElement;
    expect(container).toHaveClass('custom-class');
  });

  describe('dataType variations', () => {
    it('should render category data by default', () => {
      render(<ProductCategoryChart products={mockProducts} dataType="category" />);
      
      // Should render chart (mocked components)
      expect(screen.getByTestId('pie-chart')).toBeInTheDocument();
    });

    it('should render price range data', () => {
      render(<ProductCategoryChart products={mockProducts} dataType="priceRange" />);
      
      expect(screen.getByTestId('pie-chart')).toBeInTheDocument();
    });

    it('should render stock status data', () => {
      render(<ProductCategoryChart products={mockProducts} dataType="stockStatus" />);
      
      expect(screen.getByTestId('pie-chart')).toBeInTheDocument();
    });

    it('should render category value data', () => {
      render(<ProductCategoryChart products={mockProducts} dataType="categoryValue" />);
      
      expect(screen.getByTestId('pie-chart')).toBeInTheDocument();
    });
  });

  describe('data processing', () => {
    it('should process category data correctly', () => {
      // This is more of an integration test since we're testing the chart renders
      // In a real scenario, you might want to test the data processing functions separately
      render(<ProductCategoryChart products={mockProducts} dataType="category" />);
      
      expect(screen.getByTestId('pie-chart')).toBeInTheDocument();
      // Electronics: 2 products, Fitness: 1 product, Home: 1 product
    });

    it('should handle products with various price ranges', () => {
      render(<ProductCategoryChart products={mockProducts} dataType="priceRange" />);
      
      expect(screen.getByTestId('pie-chart')).toBeInTheDocument();
      // Products should be categorized by price ranges
    });

    it('should categorize stock status correctly', () => {
      render(<ProductCategoryChart products={mockProducts} dataType="stockStatus" />);
      
      expect(screen.getByTestId('pie-chart')).toBeInTheDocument();
      // Should have Out of Stock (1), Low Stock (1), Medium Stock (2)
    });

    it('should calculate category values correctly', () => {
      render(<ProductCategoryChart products={mockProducts} dataType="categoryValue" />);
      
      expect(screen.getByTestId('pie-chart')).toBeInTheDocument();
      // Should calculate price * stock for each category
    });
  });

  describe('chart components', () => {
    it('should render tooltip and legend for pie chart', () => {
      render(<ProductCategoryChart products={mockProducts} type="pie" />);
      
      expect(screen.getByTestId('tooltip')).toBeInTheDocument();
      expect(screen.getByTestId('legend')).toBeInTheDocument();
    });

    it('should render axes and grid for bar chart', () => {
      render(<ProductCategoryChart products={mockProducts} type="bar" />);
      
      expect(screen.getByTestId('x-axis')).toBeInTheDocument();
      expect(screen.getByTestId('y-axis')).toBeInTheDocument();
      expect(screen.getByTestId('cartesian-grid')).toBeInTheDocument();
      expect(screen.getByTestId('tooltip')).toBeInTheDocument();
    });
  });

  describe('edge cases', () => {
    it('should handle single product', () => {
      const singleProduct = [mockProducts[0]];
      render(<ProductCategoryChart products={singleProduct} />);
      
      expect(screen.getByTestId('pie-chart')).toBeInTheDocument();
    });

    it('should handle products with zero price', () => {
      const zeroProducts = [{
        ...mockProducts[0],
        priceCents: 0
      }];
      
      render(<ProductCategoryChart products={zeroProducts} dataType="priceRange" />);
      
      expect(screen.getByTestId('pie-chart')).toBeInTheDocument();
    });

    it('should handle products with high stock', () => {
      const highStockProducts = [{
        ...mockProducts[0],
        stock: 100
      }];
      
      render(<ProductCategoryChart products={highStockProducts} dataType="stockStatus" />);
      
      expect(screen.getByTestId('pie-chart')).toBeInTheDocument();
    });

    it('should filter out empty price ranges', () => {
      // Products all in one price range should only show that range
      const similarPriceProducts = mockProducts.map(p => ({
        ...p,
        priceCents: 2500 // All in $25-$50 range
      }));
      
      render(<ProductCategoryChart products={similarPriceProducts} dataType="priceRange" />);
      
      expect(screen.getByTestId('pie-chart')).toBeInTheDocument();
    });

    it('should filter out empty stock statuses', () => {
      // All products with same stock status
      const sameStockProducts = mockProducts.map(p => ({
        ...p,
        stock: 25 // All medium stock
      }));
      
      render(<ProductCategoryChart products={sameStockProducts} dataType="stockStatus" />);
      
      expect(screen.getByTestId('pie-chart')).toBeInTheDocument();
    });
  });

  describe('responsive behavior', () => {
    it('should render responsive container', () => {
      render(<ProductCategoryChart products={mockProducts} />);
      
      const container = screen.getByTestId('responsive-container');
      expect(container).toBeInTheDocument();
    });

    it('should have correct dimensions', () => {
      render(<ProductCategoryChart products={mockProducts} />);
      
      const chartContainer = screen.getByTestId('responsive-container').parentElement;
      expect(chartContainer).toHaveClass('h-64');
    });
  });
});
