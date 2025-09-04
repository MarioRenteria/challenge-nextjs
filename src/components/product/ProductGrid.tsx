'use client';

import { ProductGridProps } from '../../types/product';
import ProductCard from './ProductCard';
import { EmptyBoxIcon } from '../icons';

const ProductGrid = ({
  products,
  onProductClick,
  className = '',
  gridCols = 4,
  showActions = false,
  variant = 'default',
  emptyMessage = 'No products found'
}: ProductGridProps) => {
  const getGridColsClass = () => {
    switch (gridCols) {
      case 1:
        return 'grid-cols-1';
      case 2:
        return 'grid-cols-1 md:grid-cols-2';
      case 3:
        return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
      case 4:
        return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4';
      case 5:
        return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5';
      case 6:
        return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6';
      default:
        return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4';
    }
  };

  if (products.length === 0) {
    return (
      <div className={`flex flex-col items-center justify-center py-12 ${className}`}>
        <div className="text-center">
          <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl p-8 mb-6 inline-block">
            <EmptyBoxIcon 
              className="text-gray-400 mx-auto" 
              size="xl"
            />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Products Found</h3>
          <p className="text-gray-600 max-w-md mx-auto">{emptyMessage}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`grid ${getGridColsClass()} gap-6 ${className}`}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onClick={onProductClick}
          showActions={showActions}
          variant={variant}
        />
      ))}
    </div>
  );
};

export default ProductGrid;
