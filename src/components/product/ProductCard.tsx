'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ProductCardProps } from '../../types/product';
import { formatPrice } from '../../app/lib/utils';
import { StarIcon } from '../icons';

const ProductCard = ({
  product,
  onClick,
  className = '',
  variant = 'default'
}: ProductCardProps) => {
  const router = useRouter();

  const handleClick = () => {
    // If there's a custom onClick handler, use it, otherwise navigate to detail page
    if (onClick) {
      onClick(product);
    } else {
      router.push(`/products/${product.id}`);
    }
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
        <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl mb-4 overflow-hidden group-hover:scale-105 transition-transform duration-300 relative">
          <Image 
            src={product.imageUrl} 
            alt={product.name}
            fill
            className="object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              // Intentar con un ID diferente si falla
              const fallbackUrl = `https://picsum.photos/400/400?random=${Math.floor(Math.random() * 1000) + 3000}`;
              if (!target.dataset.fallbackAttempted) {
                target.dataset.fallbackAttempted = 'true';
                target.src = fallbackUrl;
              } else {
                // Si el fallback también falla, mostrar icono
                target.style.display = 'none';
                if (target.parentElement) {
                  target.parentElement.innerHTML = `
                    <div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
                      <div class="text-blue-400 text-6xl opacity-50">📦</div>
                    </div>
                  `;
                }
              }
            }}
          />
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
            <div className="flex items-center bg-gradient-to-r from-yellow-50 to-amber-50 px-2 py-1 rounded-lg border border-yellow-200/50">
              <StarIcon 
                className="text-yellow-500 mr-1" 
                size="sm"
                filled={true}
              />
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
