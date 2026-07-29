import { supabase } from './supabase';
import type { Category, Brand, Product, ProductFormData, DashboardStats } from '../types';

export const api = {
  // Categories
  async getCategories(): Promise<Category[]> {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('display_order', { ascending: true });
    if (error) throw error;
    return data || [];
  },

  async getCategoryBySlug(slug: string): Promise<Category | null> {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .eq('slug', slug)
      .maybeSingle();
    if (error) throw error;
    return data;
  },

  // Brands
  async getBrands(): Promise<Brand[]> {
    const { data, error } = await supabase
      .from('brands')
      .select('*')
      .order('display_order', { ascending: true });
    if (error) throw error;
    return data || [];
  },

  async getBrandBySlug(slug: string): Promise<Brand | null> {
    const { data, error } = await supabase
      .from('brands')
      .select('*')
      .eq('slug', slug)
      .maybeSingle();
    if (error) throw error;
    return data;
  },

  // Products
  async getProducts(options?: {
    categoryId?: string;
    brandId?: string;
    featured?: boolean;
    newArrival?: boolean;
    bestSeller?: boolean;
    limit?: number;
    search?: string;
    sortBy?: string;
    minPrice?: number;
    maxPrice?: number;
    availability?: string;
  }): Promise<Product[]> {
    let query = supabase
      .from('products')
      .select(`
        *,
        brand:brands(*),
        category:categories(*)
      `);

    if (options?.categoryId) {
      query = query.eq('category_id', options.categoryId);
    }
    if (options?.brandId) {
      query = query.eq('brand_id', options.brandId);
    }
    if (options?.featured) {
      query = query.eq('is_featured', true);
    }
    if (options?.newArrival) {
      query = query.eq('is_new_arrival', true);
    }
    if (options?.bestSeller) {
      query = query.eq('is_best_seller', true);
    }
    if (options?.search) {
      query = query.or(`name.ilike.%${options.search}%,short_description.ilike.%${options.search}%`);
    }
    if (options?.availability && options.availability !== 'all') {
      query = query.eq('availability', options.availability);
    }
    if (options?.minPrice !== undefined) {
      query = query.gte('price', options.minPrice);
    }
    if (options?.maxPrice !== undefined) {
      query = query.lte('price', options.maxPrice);
    }

    // Sorting
    switch (options?.sortBy) {
      case 'price-asc':
        query = query.order('price', { ascending: true });
        break;
      case 'price-desc':
        query = query.order('price', { ascending: false });
        break;
      case 'name-asc':
        query = query.order('name', { ascending: true });
        break;
      case 'name-desc':
        query = query.order('name', { ascending: false });
        break;
      default:
        query = query.order('created_at', { ascending: false });
    }

    if (options?.limit) {
      query = query.limit(options.limit);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  },

  async getProductBySlug(slug: string): Promise<Product | null> {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        brand:brands(*),
        category:categories(*)
      `)
      .eq('slug', slug)
      .maybeSingle();
    if (error) throw error;
    return data;
  },

  async getProductById(id: string): Promise<Product | null> {
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        brand:brands(*),
        category:categories(*)
      `)
      .eq('id', id)
      .maybeSingle();
    if (error) throw error;
    return data;
  },

  async createProduct(product: ProductFormData): Promise<Product> {
    const { data, error } = await supabase
      .from('products')
      .insert(product)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async updateProduct(id: string, product: Partial<ProductFormData>): Promise<Product> {
    const { data, error } = await supabase
      .from('products')
      .update({ ...product, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async deleteProduct(id: string): Promise<void> {
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (error) throw error;
  },

  // Dashboard Stats
  async getDashboardStats(): Promise<DashboardStats> {
    const [
      { count: totalProducts },
      { count: totalCategories },
      { count: featuredProducts },
      { count: newArrivals },
      { count: outOfStock },
      { count: bestSellers },
    ] = await Promise.all([
      supabase.from('products').select('*', { count: 'exact', head: true }),
      supabase.from('categories').select('*', { count: 'exact', head: true }),
      supabase.from('products').select('*', { count: 'exact', head: true }).eq('is_featured', true),
      supabase.from('products').select('*', { count: 'exact', head: true }).eq('is_new_arrival', true),
      supabase.from('products').select('*', { count: 'exact', head: true }).eq('availability', 'Out of Stock'),
      supabase.from('products').select('*', { count: 'exact', head: true }).eq('is_best_seller', true),
    ]);

    return {
      totalProducts: totalProducts || 0,
      totalCategories: totalCategories || 0,
      featuredProducts: featuredProducts || 0,
      newArrivals: newArrivals || 0,
      outOfStock: outOfStock || 0,
      bestSellers: bestSellers || 0,
    };
  },
};
