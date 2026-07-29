import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Mouse, Keyboard, HardDrive, Fan, Cpu, Wifi, Headphones, Video, Speaker, Battery, Cable, Monitor, Briefcase, Usb } from 'lucide-react';
import type { Category } from '../../types';

const categoryIcons: Record<string, React.ElementType> = {
  'laptop-bags': Briefcase,
  'gaming-mouse': Mouse,
  'wireless-mouse': Mouse,
  'mechanical-keyboard': Keyboard,
  'ssd': HardDrive,
  'ram': Cpu,
  'cooling-pad': Fan,
  'usb-hub': Usb,
  'docking-station': Monitor,
  'laptop-stand': Monitor,
  'headphones': Headphones,
  'webcam': Video,
  'speakers': Speaker,
  'laptop-charger': Battery,
  'adapters': Cable,
  'hdmi-cable': Cable,
  'usb-cable': Cable,
};

interface CategoryCardProps {
  category: Category;
  index?: number;
}

const CategoryCard = ({ category, index = 0 }: CategoryCardProps) => {
  const Icon = categoryIcons[category.slug] || Cpu;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -5 }}
    >
      <Link
        to={`/products?category=${category.slug}`}
        className="card p-6 block group relative overflow-hidden"
      >
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Content */}
        <div className="relative">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-100 to-primary-50 flex items-center justify-center mb-4 group-hover:from-primary-500 group-hover:to-primary-600 transition-all duration-300">
            <Icon className="w-7 h-7 text-primary-600 group-hover:text-white transition-colors" />
          </div>
          <h3 className="font-display font-semibold text-lg text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
            {category.name}
          </h3>
          {category.description && (
            <p className="text-sm text-gray-500 line-clamp-2">{category.description}</p>
          )}
          <div className="mt-4 flex items-center text-sm font-medium text-primary-600 group-hover:text-primary-500 transition-colors">
            Browse Products
            <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default CategoryCard;

// Category Grid Component
interface CategoryGridProps {
  categories: Category[];
  loading?: boolean;
}

export const CategoryGrid = ({ categories, loading }: CategoryGridProps) => {
  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {[...Array(12)].map((_, i) => (
          <CategoryCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {categories.map((category, index) => (
        <CategoryCard key={category.id} category={category} index={index} />
      ))}
    </div>
  );
};

import { CategoryCardSkeleton } from '../ui/Skeleton';
