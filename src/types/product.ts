import { Product } from '../app/lib/data/definitions';

export interface ProductCardProps {
  product: Product;
  onClick?: (product: Product) => void;
  className?: string;
  showActions?: boolean;
  variant?: 'default' | 'compact' | 'detailed';
}

export interface ProductGridProps {
  products: Product[];
  onProductClick?: (product: Product) => void;
  className?: string;
  gridCols?: 1 | 2 | 3 | 4 | 5 | 6;
  showActions?: boolean;
  variant?: 'default' | 'compact' | 'detailed';
  emptyMessage?: string;
}

export interface ProductCardActionsProps {
  product: Product;
  onEdit?: (product: Product) => void;
  onDelete?: (product: Product) => void;
  onView?: (product: Product) => void;
  className?: string;
}

export type ProductCardVariant = 'default' | 'compact' | 'detailed';
export type ProductGridCols = 1 | 2 | 3 | 4 | 5 | 6;
