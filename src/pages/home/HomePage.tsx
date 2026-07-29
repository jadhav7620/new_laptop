import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import HeroSection from '../../components/home/HeroSection';
import CategoryCard, { CategoryGrid } from '../../components/home/CategoryCard';
import FeaturedProducts from '../../components/home/FeaturedProducts';
import WhyChooseUs from '../../components/home/WhyChooseUs';
import Testimonials from '../../components/home/Testimonials';
import BrandsSection from '../../components/home/BrandsSection';
import ProductCard from '../../components/products/ProductCard';
import { PageLoader } from '../../components/ui/Skeleton';
import { api } from '../../lib/api';
import { fadeInUp, staggerContainer } from '../../lib/animations';
import type { Category, Product, Brand } from '../../types';

const categoryProductSections = [
  { slug: 'gaming-mouse', title: 'Gaming Mouse' },
  { slug: 'mechanical-keyboard', title: 'Mechanical Keyboards' },
  { slug: 'ssd', title: 'SSD Storage' },
  { slug: 'cooling-pad', title: 'Cooling Pads' },
  { slug: 'laptop-bags', title: 'Laptop Bags' },
];

const HomePage = () => {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<Category[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [categoryProducts, setCategoryProducts] = useState<Record<string, Product[]>>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesData, featuredData, brandsData] = await Promise.all([
          api.getCategories(),
          api.getProducts({ featured: true, limit: 8 }),
          api.getBrands(),
        ]);

        setCategories(categoriesData);
        setFeaturedProducts(featuredData);
        setBrands(brandsData);

        // Fetch products for each category section
        const productsMap: Record<string, Product[]> = {};
        await Promise.all(
          categoryProductSections.map(async (section) => {
            const category = categoriesData.find((c) => c.slug === section.slug);
            if (category) {
              const products = await api.getProducts({ categoryId: category.id, limit: 4 });
              productsMap[section.slug] = products;
            }
          })
        );
        setCategoryProducts(productsMap);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <PageLoader />;

  return (
    <div>
      <HeroSection />

      {/* Categories Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-gray-900 mb-4">
              Shop by Category
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Browse our extensive collection of laptop accessories organized by category.
            </p>
          </motion.div>
          <CategoryGrid categories={categories.slice(0, 17)} />
        </div>
      </section>

      {/* Featured Products Section */}
      <FeaturedProducts products={featuredProducts} />

      {/* Category Products Sections */}
      {categoryProductSections.map((section) => {
        const products = categoryProducts[section.slug];
        if (!products?.length) return null;

        return (
          <section key={section.slug} className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="flex items-center justify-between mb-8"
              >
                <h2 className="font-display font-bold text-2xl sm:text-3xl text-gray-900">
                  {section.title}
                </h2>
                <Link
                  to={`/products?category=${section.slug}`}
                  className="flex items-center gap-2 text-primary-600 font-medium hover:text-primary-500 transition-colors"
                >
                  View All
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>

              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
              >
                {products.map((product, index) => (
                  <ProductCard key={product.id} product={product} index={index} />
                ))}
              </motion.div>
            </div>
          </section>
        );
      })}

      <WhyChooseUs />
      <Testimonials />
      <BrandsSection brands={brands} />
    </div>
  );
};

export default HomePage;
