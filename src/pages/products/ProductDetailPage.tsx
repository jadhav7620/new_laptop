import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Package,
  Shield,
  Truck,
  Check,
  Tag,
  Star,
  ChevronRight,
} from 'lucide-react';
import { api } from '../../lib/api';
import ProductCard from '../../components/products/ProductCard';
import { PageLoader } from '../../components/ui/Skeleton';
import { fadeInUp, fadeInLeft, fadeInRight, staggerContainer } from '../../lib/animations';
import type { Product } from '../../types';

const ProductDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [selectedTab, setSelectedTab] = useState<'specs' | 'features' | 'compatibility'>('specs');

  useEffect(() => {
    const fetchProduct = async () => {
      if (!slug) return;
      setLoading(true);
      try {
        const productData = await api.getProductBySlug(slug);
        setProduct(productData);

        if (productData?.category_id) {
          const related = await api.getProducts({ categoryId: productData.category_id, limit: 4 });
          setRelatedProducts(related.filter((p) => p.id !== productData.id));
        }
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [slug]);

  if (loading) return <PageLoader />;
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-display font-bold text-gray-900 mb-2">Product Not Found</h2>
          <p className="text-gray-600 mb-6">The product you're looking for doesn't exist.</p>
          <Link to="/products" className="btn-primary">
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  const availabilityColors: Record<string, string> = {
    'In Stock': 'bg-green-100 text-green-700',
    'Low Stock': 'bg-yellow-100 text-yellow-700',
    'Out of Stock': 'bg-red-100 text-red-700',
    'Pre-Order': 'bg-blue-100 text-blue-700',
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center gap-2 text-sm">
            <Link to="/" className="text-gray-500 hover:text-primary-600">Home</Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <Link to="/products" className="text-gray-500 hover:text-primary-600">Products</Link>
            {product.category && (
              <>
                <ChevronRight className="w-4 h-4 text-gray-400" />
                <Link
                  to={`/products?category=${product.category.slug}`}
                  className="text-gray-500 hover:text-primary-600"
                >
                  {product.category.name}
                </Link>
              </>
            )}
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-gray-900 font-medium truncate">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Link
          to="/products"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-primary-600 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Products
        </Link>

        {/* Product Details */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <motion.div
            variants={fadeInLeft}
            initial="hidden"
            animate="visible"
            className="space-y-4"
          >
            <div className="card overflow-hidden">
              {product.image_url ? (
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="w-full aspect-square object-cover"
                />
              ) : (
                <div className="w-full aspect-square bg-gray-100 flex items-center justify-center">
                  <Package className="w-32 h-32 text-gray-300" />
                </div>
              )}
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            variants={fadeInRight}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            {/* Badges */}
            <div className="flex flex-wrap gap-2">
              {product.is_new_arrival && (
                <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full">
                  New Arrival
                </span>
              )}
              {product.is_best_seller && (
                <span className="px-3 py-1 bg-accent-100 text-accent-700 text-sm font-medium rounded-full">
                  Best Seller
                </span>
              )}
              {product.is_featured && (
                <span className="px-3 py-1 bg-primary-100 text-primary-700 text-sm font-medium rounded-full">
                  Featured
                </span>
              )}
            </div>

            {/* Brand & Category */}
            <div className="flex items-center gap-4 text-sm text-gray-500">
              {product.brand && (
                <Link
                  to={`/products?brand=${product.brand.slug}`}
                  className="hover:text-primary-600 transition-colors"
                >
                  {product.brand.name}
                </Link>
              )}
              {product.category && (
                <>
                  <span>|</span>
                  <Link
                    to={`/products?category=${product.category.slug}`}
                    className="hover:text-primary-600 transition-colors"
                  >
                    {product.category.name}
                  </Link>
                </>
              )}
            </div>

            {/* Name */}
            <h1 className="font-display font-bold text-3xl sm:text-4xl text-gray-900">
              {product.name}
            </h1>

            {/* SKU */}
            {product.sku && (
              <p className="text-sm text-gray-500">SKU: {product.sku}</p>
            )}

            {/* Short Description */}
            {product.short_description && (
              <p className="text-gray-600 leading-relaxed">
                {product.short_description}
              </p>
            )}

            {/* Price & Availability */}
            <div className="flex items-center gap-6">
              <span className="text-4xl font-bold text-gray-900">
                ${product.price.toFixed(2)}
              </span>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${availabilityColors[product.availability]}`}>
                {product.availability}
              </span>
            </div>

            {/* Key Features */}
            <div className="grid grid-cols-3 gap-4 py-6 border-y border-gray-200">
              <div className="text-center">
                <div className="w-12 h-12 rounded-xl bg-primary-100 flex items-center justify-center mx-auto mb-2">
                  <Shield className="w-6 h-6 text-primary-600" />
                </div>
                <p className="text-sm font-medium text-gray-900">Warranty</p>
                <p className="text-xs text-gray-500">{product.warranty || 'Included'}</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center mx-auto mb-2">
                  <Package className="w-6 h-6 text-green-600" />
                </div>
                <p className="text-sm font-medium text-gray-900">Stock</p>
                <p className="text-xs text-gray-500">{product.quantity} units</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 rounded-xl bg-accent-100 flex items-center justify-center mx-auto mb-2">
                  <Truck className="w-6 h-6 text-accent-600" />
                </div>
                <p className="text-sm font-medium text-gray-900">Support</p>
                <p className="text-xs text-gray-500">Fast Response</p>
              </div>
            </div>

            {/* Contact CTA */}
            <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl p-6 text-white">
              <h3 className="font-display font-semibold text-lg mb-2">
                Interested in this product?
              </h3>
              <p className="text-primary-100 mb-4">
                Contact us for more information, bulk orders, or technical support.
              </p>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-white text-primary-600 px-6 py-3 rounded-xl font-medium hover:bg-primary-50 transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Product Details Tabs */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-16"
        >
          {/* Tab Headers */}
          <div className="flex gap-4 border-b border-gray-200 mb-8">
            <button
              onClick={() => setSelectedTab('specs')}
              className={`pb-4 px-4 font-medium transition-colors ${
                selectedTab === 'specs'
                  ? 'text-primary-600 border-b-2 border-primary-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Specifications
            </button>
            <button
              onClick={() => setSelectedTab('features')}
              className={`pb-4 px-4 font-medium transition-colors ${
                selectedTab === 'features'
                  ? 'text-primary-600 border-b-2 border-primary-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Features
            </button>
            <button
              onClick={() => setSelectedTab('compatibility')}
              className={`pb-4 px-4 font-medium transition-colors ${
                selectedTab === 'compatibility'
                  ? 'text-primary-600 border-b-2 border-primary-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Compatibility
            </button>
          </div>

          {/* Tab Content */}
          <div className="card p-8">
            {selectedTab === 'specs' && (
              <div>
                <h3 className="font-display font-semibold text-xl text-gray-900 mb-6">
                  Product Specifications
                </h3>
                {product.specifications && Object.keys(product.specifications).length > 0 ? (
                  <div className="grid md:grid-cols-2 gap-4">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between py-3 border-b border-gray-100">
                        <span className="text-gray-600">{key}</span>
                        <span className="font-medium text-gray-900">{value}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No specifications available.</p>
                )}
              </div>
            )}

            {selectedTab === 'features' && (
              <div>
                <h3 className="font-display font-semibold text-xl text-gray-900 mb-6">
                  Key Features
                </h3>
                {product.features && product.features.length > 0 ? (
                  <ul className="space-y-3">
                    {product.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500">No features listed.</p>
                )}
              </div>
            )}

            {selectedTab === 'compatibility' && (
              <div>
                <h3 className="font-display font-semibold text-xl text-gray-900 mb-6">
                  Compatible Laptop Brands
                </h3>
                {product.compatible_brands && product.compatible_brands.length > 0 ? (
                  <div className="flex flex-wrap gap-3">
                    {product.compatible_brands.map((brand, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-gray-100 rounded-lg text-gray-700 font-medium"
                      >
                        {brand}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">Compatibility information not available.</p>
                )}

                {/* Full Description */}
                {product.full_description && (
                  <div className="mt-8 pt-8 border-t border-gray-200">
                    <h3 className="font-display font-semibold text-xl text-gray-900 mb-4">
                      Full Description
                    </h3>
                    <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                      {product.full_description}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.div>

        {/* Product Tags */}
        {product.tags && product.tags.length > 0 && (
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-8 flex items-center gap-2 flex-wrap"
          >
            <Tag className="w-5 h-5 text-gray-400" />
            {product.tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full"
              >
                {tag}
              </span>
            ))}
          </motion.div>
        )}

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-16"
          >
            <h2 className="font-display font-bold text-2xl text-gray-900 mb-8">
              Related Products
            </h2>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {relatedProducts.map((p, index) => (
                <ProductCard key={p.id} product={p} index={index} />
              ))}
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;
