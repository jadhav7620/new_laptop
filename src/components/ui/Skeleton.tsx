import { motion } from 'framer-motion';

interface SkeletonProps {
  className?: string;
}

export const Skeleton = ({ className = '' }: SkeletonProps) => (
  <div className={`skeleton ${className}`} />
);

export const ProductCardSkeleton = () => (
  <div className="card p-0">
    <Skeleton className="w-full h-48 rounded-none" />
    <div className="p-6 space-y-3">
      <Skeleton className="w-1/4 h-4" />
      <Skeleton className="w-3/4 h-6" />
      <Skeleton className="w-1/2 h-4" />
      <div className="pt-2">
        <Skeleton className="w-1/3 h-6" />
      </div>
    </div>
  </div>
);

export const CategoryCardSkeleton = () => (
  <div className="card p-6">
    <Skeleton className="w-12 h-12 rounded-xl mb-4" />
    <Skeleton className="w-3/4 h-5 mb-2" />
    <Skeleton className="w-1/2 h-3" />
  </div>
);

export const BrandLogoSkeleton = () => (
  <Skeleton className="w-24 h-12 rounded-lg" />
);

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const LoadingSpinner = ({ size = 'md', className = '' }: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <motion.div
      className={`${sizeClasses[size]} ${className}`}
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
    >
      <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          className="text-gray-200"
        />
        <path
          d="M12 2a10 10 0 0 1 10 10"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          className="text-primary-500"
        />
      </svg>
    </motion.div>
  );
};

export const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <LoadingSpinner size="lg" />
  </div>
);
