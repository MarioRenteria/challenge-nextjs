'use client';

import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAppSelector } from '../../../store/hooks';
import { formatPrice } from '../../lib/utils';
import { 
  ChevronLeft,
  Package,
  DollarSign,
  Warehouse,
  Calendar,
  Tag,
  Ruler,
  Star,
  Edit,
  Trash2
} from 'lucide-react';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const productId = params.id as string;

  // Get product from Redux store
  const product = useAppSelector((state) => 
    state.products.products.find(p => p.id === productId)
  );

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">📦</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Product Not Found</h1>
          <p className="text-gray-600 mb-6">The product you're looking for doesn't exist.</p>
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 font-semibold"
          >
            <ChevronLeft className="w-5 h-5 mr-2" />
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const getStockStatus = () => {
    if (product.stock === 0) return { label: 'Out of Stock', color: 'text-red-600 bg-red-50' };
    if (product.stock <= 10) return { label: 'Low Stock', color: 'text-amber-600 bg-amber-50' };
    if (product.stock <= 50) return { label: 'Medium Stock', color: 'text-blue-600 bg-blue-50' };
    return { label: 'In Stock', color: 'text-green-600 bg-green-50' };
  };

  const stockStatus = getStockStatus();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Link
              href="/"
              className="group p-3 hover:bg-white/70 backdrop-blur-sm rounded-xl transition-all duration-200 hover:shadow-lg border border-white/20"
            >
              <ChevronLeft 
                className="w-6 h-6 text-gray-600 group-hover:text-blue-600 transition-colors duration-200"
                strokeWidth={2}
              />
            </Link>
            <div className="flex-1">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent">
                {product.name}
              </h1>
              <p className="text-gray-600 text-lg mt-1">Product Details</p>
            </div>
            <div className="flex gap-3">
              <button
                className="group p-3 hover:bg-white/70 backdrop-blur-sm rounded-xl transition-all duration-200 hover:shadow-lg border border-white/20 cursor-pointer"
                title="Edit Product"
              >
                <Edit className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors duration-200" />
              </button>
              <button
                className="group p-3 hover:bg-white/70 backdrop-blur-sm rounded-xl transition-all duration-200 hover:shadow-lg border border-white/20 cursor-pointer"
                title="Delete Product"
              >
                <Trash2 className="w-5 h-5 text-gray-600 group-hover:text-red-600 transition-colors duration-200" />
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Product Image */}
          <div className="lg:col-span-1">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6">
              <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl overflow-hidden mb-4">
                <img 
                  src={product.imageUrl} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    if (target.parentElement) {
                      target.parentElement.innerHTML = `
                        <div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
                          <div class="text-blue-400 text-8xl opacity-50">📦</div>
                        </div>
                      `;
                    }
                  }}
                />
              </div>
              
              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-white/50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900">{product.rating}</div>
                  <div className="text-sm text-gray-600 flex items-center justify-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    Rating
                  </div>
                </div>
                <div className="text-center p-3 bg-white/50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900">{product.stock}</div>
                  <div className="text-sm text-gray-600">In Stock</div>
                </div>
              </div>
            </div>
          </div>

          {/* Product Details */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Basic Information */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                  <Package className="w-4 h-4 text-white" />
                </div>
                Basic Information
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">SKU</label>
                    <div className="px-4 py-3 bg-gray-50 rounded-lg font-mono text-gray-900">
                      {product.sku}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Category</label>
                    <div className="px-4 py-3 bg-gray-50 rounded-lg text-gray-900">
                      {product.category}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Status</label>
                    <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${stockStatus.color}`}>
                      {stockStatus.label}
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Price</label>
                    <div className="px-4 py-3 bg-gray-50 rounded-lg text-2xl font-bold text-gray-900">
                      {formatPrice(product.priceCents)}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Stock Quantity</label>
                    <div className="px-4 py-3 bg-gray-50 rounded-lg text-gray-900 font-semibold">
                      {product.stock} units
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Total Value</label>
                    <div className="px-4 py-3 bg-gray-50 rounded-lg text-xl font-bold text-green-600">
                      {formatPrice(product.priceCents * product.stock)}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Description</h2>
              <p className="text-gray-700 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Tags and Dimensions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Tags */}
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Tag className="w-5 h-5 text-blue-600" />
                  Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Dimensions */}
              {product.dimensions && (
                <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Ruler className="w-5 h-5 text-purple-600" />
                    Dimensions
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Width:</span>
                      <span className="font-semibold">{product.dimensions.widthCm} cm</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Height:</span>
                      <span className="font-semibold">{product.dimensions.heightCm} cm</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Depth:</span>
                      <span className="font-semibold">{product.dimensions.depthCm} cm</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Metadata */}
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-green-600" />
                Metadata
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Created:</span>
                  <span className="font-semibold">
                    {new Date(product.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Last Updated:</span>
                  <span className="font-semibold">
                    {new Date(product.updatedAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Product ID:</span>
                  <span className="font-mono text-xs">{product.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span className={`font-semibold ${product.status === 'active' ? 'text-green-600' : 'text-gray-600'}`}>
                    {product.status}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
