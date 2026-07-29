export interface Category {
  id: string;
  name: string;
  slug: string;
  icon?: string;
  description?: string;
  display_order: number;
  created_at: string;
}

export interface Brand {
  id: string;
  name: string;
  slug: string;
  logo_url?: string;
  description?: string;
  display_order: number;
  created_at: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  brand_id?: string;
  category_id?: string;
  image_url?: string;
  price: number;
  quantity: number;
  availability: 'In Stock' | 'Low Stock' | 'Out of Stock' | 'Pre-Order';
  short_description?: string;
  full_description?: string;
  specifications?: Record<string, string>;
  features?: string[];
  warranty?: string;
  sku?: string;
  is_featured: boolean;
  is_best_seller: boolean;
  is_new_arrival: boolean;
  compatible_brands?: string[];
  tags?: string[];
  created_at: string;
  updated_at: string;
  brand?: Brand;
  category?: Category;
}

export interface ProductFormData {
  name: string;
  brand_id?: string;
  category_id?: string;
  image_url?: string;
  price: number;
  quantity: number;
  availability: 'In Stock' | 'Low Stock' | 'Out of Stock' | 'Pre-Order';
  short_description?: string;
  full_description?: string;
  specifications?: Record<string, string>;
  features?: string[];
  warranty?: string;
  sku?: string;
  is_featured: boolean;
  is_best_seller: boolean;
  is_new_arrival: boolean;
  compatible_brands?: string[];
  tags?: string[];
}

export interface DashboardStats {
  totalProducts: number;
  totalCategories: number;
  featuredProducts: number;
  newArrivals: number;
  outOfStock: number;
  bestSellers: number;
}

export interface FilterState {
  search: string;
  category: string;
  brand: string;
  availability: string;
  minPrice: number;
  maxPrice: number;
  sortBy: 'newest' | 'price-asc' | 'price-desc' | 'name-asc' | 'name-desc';
}
