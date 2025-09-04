'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import { Product } from '../../app/lib/data/definitions';

interface ProductCategoryChartProps {
  products: Product[];
  type?: 'pie' | 'bar';
  dataType?: 'category' | 'priceRange' | 'stockStatus' | 'categoryValue';
  className?: string;
}

const COLORS = [
  '#3B82F6', // Blue
  '#10B981', // Emerald
  '#F59E0B', // Amber
  '#EF4444', // Red
  '#8B5CF6', // Violet
  '#F97316', // Orange
  '#06B6D4', // Cyan
];

export default function ProductCategoryChart({ products, type = 'pie', dataType = 'category', className = '' }: ProductCategoryChartProps) {
  
  const getChartData = () => {
    switch (dataType) {
      case 'priceRange':
        return getPriceRangeData();
      case 'stockStatus':
        return getStockStatusData();
      case 'categoryValue':
        return getCategoryValueData();
      default:
        return getCategoryData();
    }
  };

  // Calculate products per category
  const getCategoryData = () => {
    const categoryData = products.reduce((acc, product) => {
      const category = product.category;
      acc[category] = (acc[category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(categoryData).map(([category, count], index) => ({
      name: category,
      value: count,
      fill: COLORS[index % COLORS.length],
    }));
  };

  // Calculate products by price range
  const getPriceRangeData = () => {
    const priceRanges = {
      'Under $25': 0,
      '$25 - $50': 0,
      '$50 - $100': 0,
      '$100 - $200': 0,
      'Over $200': 0,
    };

    products.forEach(product => {
      const price = product.priceCents / 100;
      if (price < 25) priceRanges['Under $25']++;
      else if (price < 50) priceRanges['$25 - $50']++;
      else if (price < 100) priceRanges['$50 - $100']++;
      else if (price < 200) priceRanges['$100 - $200']++;
      else priceRanges['Over $200']++;
    });

    return Object.entries(priceRanges)
      .filter(([, count]) => count > 0)
      .map(([range, count], index) => ({
        name: range,
        value: count,
        fill: COLORS[index % COLORS.length],
      }));
  };

  // Calculate products by stock status
  const getStockStatusData = () => {
    const stockStatus = {
      'Out of Stock': 0,
      'Low Stock (1-10)': 0,
      'Medium Stock (11-50)': 0,
      'High Stock (50+)': 0,
    };

    products.forEach(product => {
      if (product.stock === 0) stockStatus['Out of Stock']++;
      else if (product.stock <= 10) stockStatus['Low Stock (1-10)']++;
      else if (product.stock <= 50) stockStatus['Medium Stock (11-50)']++;
      else stockStatus['High Stock (50+)']++;
    });

    return Object.entries(stockStatus)
      .filter(([, count]) => count > 0)
      .map(([status, count], index) => ({
        name: status,
        value: count,
        fill: COLORS[index % COLORS.length],
      }));
  };

  // Calculate total value by category
  const getCategoryValueData = () => {
    const categoryValue = products.reduce((acc, product) => {
      const category = product.category;
      const value = (product.priceCents / 100) * product.stock;
      acc[category] = (acc[category] || 0) + value;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(categoryValue).map(([category, value], index) => ({
      name: category,
      value: Math.round(value),
      fill: COLORS[index % COLORS.length],
    }));
  };

  const chartData = getChartData();

  // Custom tooltip
  const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: Array<{ name: string; value: number; }> }) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      
      const getTooltipContent = () => {
        switch (dataType) {
          case 'priceRange':
            return `${data.value} product${data.value !== 1 ? 's' : ''}`;
          case 'stockStatus':
            return `${data.value} product${data.value !== 1 ? 's' : ''}`;
          case 'categoryValue':
            return `$${data.value.toLocaleString()} total value`;
          default:
            return `${data.value} product${data.value !== 1 ? 's' : ''}`;
        }
      };

      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
          <p className="font-semibold text-gray-900">{data.name}</p>
          <p className="text-sm text-gray-600">
            {getTooltipContent()}
          </p>
        </div>
      );
    }
    return null;
  };

  if (chartData.length === 0) {
    return (
      <div className={`flex items-center justify-center h-64 bg-gray-50 rounded-lg ${className}`}>
        <p className="text-gray-500">No data available</p>
      </div>
    );
  }

  if (type === 'bar') {
    return (
      <div className={`w-full h-64 ${className}`}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis 
              dataKey="name" 
              stroke="#6B7280"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              stroke="#6B7280"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="value" 
              radius={[4, 4, 0, 0]}
              fill="#3B82F6"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }

  return (
    <div className={`w-full h-64 ${className}`}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            outerRadius={80}
            paddingAngle={2}
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            verticalAlign="bottom" 
            height={36}
            formatter={(value) => (
              <span style={{ color: '#374151', fontSize: '12px' }}>{value}</span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
