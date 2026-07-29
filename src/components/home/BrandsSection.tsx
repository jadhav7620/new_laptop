import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '../../lib/animations';
import type { Brand } from '../../types';

const defaultBrands = [
  { name: 'Dell', logo: 'https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=200' },
  { name: 'HP', logo: 'https://images.pexels.com/photos/35175/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=200' },
  { name: 'Lenovo', logo: 'https://images.pexels.com/photos/109619/pexels-photo-109619.jpeg?auto=compress&cs=tinysrgb&w=200' },
  { name: 'ASUS', logo: 'https://images.pexels.com/photos/205316/pexels-photo-205316.png?auto=compress&cs=tinysrgb&w=200' },
  { name: 'Logitech', logo: 'https://images.pexels.com/photos/2740956/pexels-photo-2740956.jpeg?auto=compress&cs=tinysrgb&w=200' },
  { name: 'Razer', logo: 'https://images.pexels.com/photo-1618761715599-3b0b0b0b0b0b0' },
  { name: 'Corsair', logo: 'https://images.pexels.com/photos/114919/pexels-photo-114919.jpeg?auto=compress&cs=tinysrgb&w=200' },
  { name: 'Kingston', logo: 'https://images.pexels.com/photo-1618761715599-3b0b0b0b0b0b0' },
  { name: 'WD', logo: 'https://images.pexels.com/photos/174833/pexels-photo-174833.jpeg?auto=compress&cs=tinysrgb&w=200' },
  { name: 'Samsung', logo: 'https://images.pexels.com/photos/35175/pexels-photo-35175.jpg?auto=compress&cs=tinysrgb&w=200' },
];

interface BrandsSectionProps {
  brands?: Brand[];
}

const BrandsSection = ({ brands }: BrandsSectionProps) => {
  const displayBrands = brands?.length ? brands : defaultBrands.slice(0, 10);

  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-gray-900 mb-4">
            Trusted Brands
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We partner with the world's leading technology brands to bring you the best laptop accessories.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative"
        >
          <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-12">
            {displayBrands.map((brand, index) => (
              <motion.div
                key={brand.name}
                variants={fadeInUp}
                whileHover={{ scale: 1.1 }}
                className="group"
              >
                <div className="w-32 h-20 flex items-center justify-center rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors p-4">
                  {'logo_url' in brand && brand.logo_url ? (
                    <img
                      src={brand.logo_url}
                      alt={brand.name}
                      className="max-w-full max-h-full object-contain opacity-60 group-hover:opacity-100 transition-opacity"
                    />
                  ) : (
                    <span className="font-display font-bold text-xl text-gray-400 group-hover:text-gray-600 transition-colors">
                      {brand.name}
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BrandsSection;
