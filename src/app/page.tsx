'use client';

import { useState } from 'react';
import Link from 'next/link';
import { sampleProducts } from './lib/data/placeholders';
import { utils } from './lib/data/utils';
import { ProductCategory } from './lib/data/definitions';
import { ProductGrid } from '../components/product';
import { 
  SearchIcon, 
  PlusIcon, 
  StatsIcon,
  TrendingUpIcon,
  PackageIcon,
  CubeIcon
} from '../components/icons';

export default function Dashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | ''>('');
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'rating' | 'createdAt'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // Get unique categories
  const categories = utils.getUniqueCategories(sampleProducts);

  // Filter and sort products
  const filteredProducts = utils.filterProducts(sampleProducts, {
    search: searchTerm,
    category: selectedCategory || undefined,
  });

  const sortedProducts = utils.sortProducts(filteredProducts, sortBy, sortOrder);

  // Calculate stats
  const totalValue = utils.calculateTotalValue(sampleProducts);
  const lowStockProducts = utils.getLowStockProducts(sampleProducts, 20);
  const activeProducts = utils.getProductsByStatus(sampleProducts, 'active');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent">
              Product Dashboard
            </h1>
            <p className="text-gray-600 text-lg">Manage and monitor your product inventory</p>
          </div>
          <Link
            href="/products/new"
            className="group relative inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-white transition-all duration-200 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <PlusIcon 
              className="mr-2 transition-transform group-hover:rotate-90" 
              size="md"
            />
            New Item
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
          <div className="group relative overflow-hidden bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20 hover:border-blue-200/50">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative flex items-center">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg">
                <CubeIcon 
                  className="text-white" 
                  size="md"
                />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 mb-1">Total Products</p>
                <p className="text-3xl font-bold text-gray-900">{sampleProducts.length}</p>
              </div>
            </div>
          </div>

          <div className="group relative overflow-hidden bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20 hover:border-green-200/50">
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative flex items-center">
              <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl shadow-lg">
                <TrendingUpIcon 
                  className="text-white" 
                  size="md"
                />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 mb-1">Active Products</p>
                <p className="text-3xl font-bold text-gray-900">{activeProducts.length}</p>
              </div>
            </div>
          </div>

          <div className="group relative overflow-hidden bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20 hover:border-yellow-200/50">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative flex items-center">
              <div className="p-3 bg-gradient-to-br from-yellow-500 to-amber-600 rounded-xl shadow-lg">
                <PackageIcon 
                  className="text-white" 
                  size="md"
                />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 mb-1">Low Stock</p>
                <p className="text-3xl font-bold text-gray-900">{lowStockProducts.length}</p>
              </div>
            </div>
          </div>

          <div className="group relative overflow-hidden bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20 hover:border-purple-200/50">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-violet-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative flex items-center">
              <div className="p-3 bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl shadow-lg">
                <StatsIcon 
                  className="text-white" 
                  size="md"
                />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 mb-1">Total Value</p>
                <p className="text-3xl font-bold text-gray-900">{utils.formatPrice(totalValue)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">Search</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <SearchIcon 
                    className="text-gray-400" 
                    size="md"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white focus:text-gray-900 transition-[background-color,border-color,box-shadow] duration-200 bg-white/50 text-gray-800 font-medium"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value as ProductCategory | '')}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white focus:text-gray-900 transition-[background-color,border-color,box-shadow] duration-200 bg-white/50 appearance-none cursor-pointer text-gray-800 font-medium"
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'name' | 'price' | 'rating' | 'createdAt')}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white focus:text-gray-900 transition-[background-color,border-color,box-shadow] duration-200 bg-white/50 appearance-none cursor-pointer text-gray-800 font-medium"
              >
                <option value="name">Name</option>
                <option value="price">Price</option>
                <option value="rating">Rating</option>
                <option value="createdAt">Date Created</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">Order</label>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white focus:text-gray-900 transition-[background-color,border-color,box-shadow] duration-200 bg-white/50 appearance-none cursor-pointer text-gray-800 font-medium"
              >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200/50 bg-gradient-to-r from-gray-50 to-blue-50/30">
            <h2 className="text-xl font-bold text-gray-900">
              Products ({sortedProducts.length})
            </h2>
          </div>
          <div className="p-6">
            <ProductGrid
              products={sortedProducts}
              onProductClick={(product) => {
                console.log('Product clicked:', product);
              }}
              gridCols={4}
              variant="default"
              emptyMessage="Try adjusting your search or filter criteria."
            />
          </div>
        </div>
      </div>
    </div>
  );
}
