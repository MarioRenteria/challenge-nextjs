import React from 'react';
import {
  // Product & UI Icons
  Image,
  Package,
  Star,
  Search,
  Plus,
  Filter,
  ArrowUpDown,
  ChevronDown,
  
  // Dashboard Icons
  BarChart3,
  TrendingUp,
  Package2,
  Box,
  ShoppingBag,
  DollarSign,
  Tag,
  CheckCircle,
  AlertTriangle,
  XCircle,
  
  // Additional useful icons
  Eye,
  Edit,
  Trash2,
  Heart,
  ShoppingCart,
  Users,
  Settings,
  Home,
  Menu,
  X
} from 'lucide-react';

interface IconProps {
  className?: string;
  size?: number | 'sm' | 'md' | 'lg' | 'xl';
}

const getSize = (size: IconProps['size']) => {
  if (typeof size === 'number') return size;
  
  switch (size) {
    case 'sm': return 16;
    case 'md': return 24;
    case 'lg': return 32;
    case 'xl': return 48;
    default: return 24;
  }
};

// Product & UI Icons
export const ProductImageIcon: React.FC<IconProps> = ({ 
  className = "text-gray-400", 
  size = 'xl' 
}) => (
  /* eslint-disable-next-line jsx-a11y/alt-text */
  <Image 
    className={className}
    size={getSize(size)}
    strokeWidth={1.5}
    aria-hidden="true"
  />
);

export const EmptyBoxIcon: React.FC<IconProps> = ({ 
  className = "text-gray-400", 
  size = 'xl' 
}) => (
  <Package 
    className={className}
    size={getSize(size)}
    strokeWidth={1.5}
  />
);

export const StarIcon: React.FC<IconProps & { filled?: boolean }> = ({ 
  className = "text-yellow-500", 
  size = 'sm',
  filled = true 
}) => (
  <Star 
    className={className}
    size={getSize(size)}
    strokeWidth={1.5}
    fill={filled ? "currentColor" : "none"}
  />
);

export const SearchIcon: React.FC<IconProps> = ({ 
  className = "text-gray-400", 
  size = 'md' 
}) => (
  <Search 
    className={className}
    size={getSize(size)}
    strokeWidth={1.5}
  />
);

export const PlusIcon: React.FC<IconProps> = ({ 
  className = "text-white", 
  size = 'md' 
}) => (
  <Plus 
    className={className}
    size={getSize(size)}
    strokeWidth={2}
  />
);

export const FilterIcon: React.FC<IconProps> = ({ 
  className = "text-gray-400", 
  size = 'md' 
}) => (
  <Filter 
    className={className}
    size={getSize(size)}
    strokeWidth={1.5}
  />
);

export const SortIcon: React.FC<IconProps> = ({ 
  className = "text-gray-400", 
  size = 'md' 
}) => (
  <ArrowUpDown 
    className={className}
    size={getSize(size)}
    strokeWidth={1.5}
  />
);

export const ChevronDownIcon: React.FC<IconProps> = ({ 
  className = "text-gray-400", 
  size = 'sm' 
}) => (
  <ChevronDown 
    className={className}
    size={getSize(size)}
    strokeWidth={2}
  />
);

// Dashboard Icons
export const StatsIcon: React.FC<IconProps> = ({ 
  className = "text-blue-500", 
  size = 'md' 
}) => (
  <BarChart3 
    className={className}
    size={getSize(size)}
    strokeWidth={1.5}
  />
);

export const TrendingUpIcon: React.FC<IconProps> = ({ 
  className = "text-green-500", 
  size = 'md' 
}) => (
  <TrendingUp 
    className={className}
    size={getSize(size)}
    strokeWidth={1.5}
  />
);

export const PackageIcon: React.FC<IconProps> = ({ 
  className = "text-purple-500", 
  size = 'md' 
}) => (
  <Package2 
    className={className}
    size={getSize(size)}
    strokeWidth={1.5}
  />
);

export const CubeIcon: React.FC<IconProps> = ({ 
  className = "text-indigo-500", 
  size = 'md' 
}) => (
  <Box 
    className={className}
    size={getSize(size)}
    strokeWidth={1.5}
  />
);

export const ShoppingBagIcon: React.FC<IconProps> = ({ 
  className = "text-emerald-500", 
  size = 'md' 
}) => (
  <ShoppingBag 
    className={className}
    size={getSize(size)}
    strokeWidth={1.5}
  />
);

export const DollarIcon: React.FC<IconProps> = ({ 
  className = "text-green-500", 
  size = 'sm' 
}) => (
  <DollarSign 
    className={className}
    size={getSize(size)}
    strokeWidth={1.5}
  />
);

export const TagIcon: React.FC<IconProps> = ({ 
  className = "text-blue-500", 
  size = 'sm' 
}) => (
  <Tag 
    className={className}
    size={getSize(size)}
    strokeWidth={1.5}
  />
);

export const CheckCircleIcon: React.FC<IconProps> = ({ 
  className = "text-green-500", 
  size = 'sm' 
}) => (
  <CheckCircle 
    className={className}
    size={getSize(size)}
    strokeWidth={1.5}
    fill="currentColor"
  />
);

export const ExclamationTriangleIcon: React.FC<IconProps> = ({ 
  className = "text-yellow-500", 
  size = 'sm' 
}) => (
  <AlertTriangle 
    className={className}
    size={getSize(size)}
    strokeWidth={1.5}
    fill="currentColor"
  />
);

export const XCircleIcon: React.FC<IconProps> = ({ 
  className = "text-red-500", 
  size = 'sm' 
}) => (
  <XCircle 
    className={className}
    size={getSize(size)}
    strokeWidth={1.5}
    fill="currentColor"
  />
);

// Additional useful icons
export const EyeIcon: React.FC<IconProps> = ({ 
  className = "text-gray-500", 
  size = 'sm' 
}) => (
  <Eye 
    className={className}
    size={getSize(size)}
    strokeWidth={1.5}
  />
);

export const EditIcon: React.FC<IconProps> = ({ 
  className = "text-blue-500", 
  size = 'sm' 
}) => (
  <Edit 
    className={className}
    size={getSize(size)}
    strokeWidth={1.5}
  />
);

export const DeleteIcon: React.FC<IconProps> = ({ 
  className = "text-red-500", 
  size = 'sm' 
}) => (
  <Trash2 
    className={className}
    size={getSize(size)}
    strokeWidth={1.5}
  />
);

export const HeartIcon: React.FC<IconProps & { filled?: boolean }> = ({ 
  className = "text-red-500", 
  size = 'sm',
  filled = false 
}) => (
  <Heart 
    className={className}
    size={getSize(size)}
    strokeWidth={1.5}
    fill={filled ? "currentColor" : "none"}
  />
);

export const CartIcon: React.FC<IconProps> = ({ 
  className = "text-gray-600", 
  size = 'md' 
}) => (
  <ShoppingCart 
    className={className}
    size={getSize(size)}
    strokeWidth={1.5}
  />
);

export const UsersIcon: React.FC<IconProps> = ({ 
  className = "text-blue-500", 
  size = 'md' 
}) => (
  <Users 
    className={className}
    size={getSize(size)}
    strokeWidth={1.5}
  />
);

export const SettingsIcon: React.FC<IconProps> = ({ 
  className = "text-gray-500", 
  size = 'md' 
}) => (
  <Settings 
    className={className}
    size={getSize(size)}
    strokeWidth={1.5}
  />
);

export const HomeIcon: React.FC<IconProps> = ({ 
  className = "text-gray-600", 
  size = 'md' 
}) => (
  <Home 
    className={className}
    size={getSize(size)}
    strokeWidth={1.5}
  />
);

export const MenuIcon: React.FC<IconProps> = ({ 
  className = "text-gray-600", 
  size = 'md' 
}) => (
  <Menu 
    className={className}
    size={getSize(size)}
    strokeWidth={1.5}
  />
);

export const CloseIcon: React.FC<IconProps> = ({ 
  className = "text-gray-600", 
  size = 'md' 
}) => (
  <X 
    className={className}
    size={getSize(size)}
    strokeWidth={1.5}
  />
);
