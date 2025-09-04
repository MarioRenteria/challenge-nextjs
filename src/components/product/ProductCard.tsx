'use client';

import { ProductCardProps } from '../../types/product';
import { formatPrice } from '../../app/lib/data/utils';

const ProductCard = ({
  product,
  onClick,
  className = '',
  variant = 'default'
}: ProductCardProps) => {
  const handleClick = () => {
    onClick?.(product);
  };

  const getVariantClasses = () => {
    switch (variant) {
      case 'compact':
        return 'p-3';
      case 'detailed':
        return 'p-6';
      default:
        return 'p-5';
    }
  };

  const getImageSize = () => {
    switch (variant) {
      case 'compact':
        return 'w-8 h-8';
      case 'detailed':
        return 'w-16 h-16';
      default:
        return 'w-12 h-12';
    }
  };

  const getTitleSize = () => {
    switch (variant) {
      case 'compact':
        return 'text-sm';
      case 'detailed':
        return 'text-xl';
      default:
        return 'text-lg';
    }
  };

  return (
    <div 
      className={`
        group relative bg-white/80 backdrop-blur-sm rounded-2xl 
        hover:shadow-xl transition-all duration-300 
        border border-gray-200/50 hover:border-blue-200/50 
        overflow-hidden cursor-pointer
        ${getVariantClasses()}
        ${className}
      `}
      onClick={handleClick}
    >
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      <div className="relative">
        {/* Product Image */}
        <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl mb-4 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
          <svg 
            className={`${getImageSize()} text-gray-400 group-hover:text-blue-500 transition-colors duration-300`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
            />
          </svg>
        </div>
        
        {/* Product Info */}
        <div className="space-y-3">
          <div>
            <h3 className={`font-bold text-gray-900 truncate ${getTitleSize()} group-hover:text-blue-600 transition-colors duration-300`}>
              {product.name}
            </h3>
            <p className="text-sm text-gray-600 font-medium">{product.category}</p>
            <p className="text-xs text-gray-500 font-mono">{product.sku}</p>
          </div>
          
          {/* Price and Rating */}
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
              {formatPrice(product.priceCents)}
            </span>
            <div className="flex items-center bg-yellow-50 px-2 py-1 rounded-lg">
              <svg className="w-4 h-4 text-yellow-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-sm font-semibold text-yellow-700">{product.rating}</span>
            </div>
          </div>
          
          {/* Stock Status */}
          <div className="flex items-center justify-between text-sm">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              product.stock > 10 
                ? 'bg-green-100 text-green-800' 
                : product.stock > 0 
                ? 'bg-yellow-100 text-yellow-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
            </span>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              product.status === 'active' 
                ? 'bg-green-100 text-green-800' 
                : product.status === 'inactive' 
                ? 'bg-yellow-100 text-yellow-800' 
                : 'bg-gray-100 text-gray-800'
            }`}>
              {product.status}
            </span>
          </div>
          
          {/* Tags */}
          {product.tags.length > 0 && variant !== 'compact' && (
            <div className="flex flex-wrap gap-1">
              {product.tags.slice(0, 3).map((tag, index) => (
                <span 
                  key={index}
                  className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-md font-medium"
                >
                  {tag}
                </span>
              ))}
              {product.tags.length > 3 && (
                <span className="px-2 py-1 bg-gray-50 text-gray-600 text-xs rounded-md font-medium">
                  +{product.tags.length - 3} more
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
