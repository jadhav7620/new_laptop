import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, Sparkles, TrendingUp, Package } from 'lucide-react';
import type { Product } from '../../types';
import { fadeInUp, staggerContainer } from '../../lib/animations';

interface ProductCardProps {
  product: Product;
  index?: number;
}

const ProductCard = ({ product, index = 0 }: ProductCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const availabilityColors: Record<string, string> = {
    'In Stock': 'bg-green-100 text-green-700',
    'Low Stock': 'bg-yellow-100 text-yellow-700',
    'Out of Stock': 'bg-red-100 text-red-700',
    'Pre-Order': 'bg-blue-100 text-blue-700',
  };

  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="card card-hover group relative"
    >
      {/* Badges */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
        {product.is_new_arrival && (
          <span className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-blue-600 to-blue-500 text-white text-xs font-medium rounded-full shadow-lg">
            <Sparkles className="w-3 h-3" />
            New Arrival
          </span>
        )}
        {product.is_best_seller && (
          <span className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-accent-600 to-accent-500 text-white text-xs font-medium rounded-full shadow-lg">
            <TrendingUp className="w-3 h-3" />
            Best Seller
          </span>
        )}
        {product.is_featured && !product.is_new_arrival && !product.is_best_seller && (
          <span className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-primary-600 to-primary-500 text-white text-xs font-medium rounded-full shadow-lg">
            <Package className="w-3 h-3" />
            Featured
          </span>
        )}
      </div>

      {/* Image */}
      <div className="relative overflow-hidden h-48 bg-gray-100">
        {!imageLoaded && (
          <div className="absolute inset-0 skeleton" />
        )}
        {product.image_url ? (
          <motion.img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-cover"
            onLoad={() => setImageLoaded(true)}
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.4 }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            <Package className="w-16 h-16 text-gray-400" />
          </div>
        )}

        {/* Quick View Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Link
            to={`/products/${product.slug}`}
            className="flex items-center gap-2 px-6 py-3 bg-white text-gray-900 font-medium rounded-xl shadow-lg hover:bg-primary-500 hover:text-white transition-colors"
          >
            <Eye className="w-5 h-5" />
            View Details
          </Link>
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-3">
        {/* Brand */}
        {product.brand && (
          <span className="text-sm text-gray-500 font-medium">
            {product.brand.name}
          </span>
        )}

        {/* Name */}
        <h3 className="font-display font-semibold text-lg text-gray-900 line-clamp-2 group-hover:text-primary-600 transition-colors">
          {product.name}
        </h3>

        {/* Price */}
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </span>
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${availabilityColors[product.availability]}`}>
            {product.availability}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;

// Product Grid Component
interface ProductGridProps {
  products: Product[];
  loading?: boolean;
}

export const ProductGrid = ({ products, loading }: ProductGridProps) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (!products.length) {
    return (
      <div className="text-center py-12">
        <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-600">No products found</h3>
        <p className="text-gray-400 mt-1">Try adjusting your filters or search</p>
      </div>
    );
  }

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
    >
      {products.map((product, index) => (
        <ProductCard key={product.id} product={product} index={index} />
      ))}
    </motion.div>
  );
};

import { ProductCardSkeleton } from '../ui/Skeleton';
