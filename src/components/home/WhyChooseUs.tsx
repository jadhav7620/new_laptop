import { motion } from 'framer-motion';
import { Shield, DollarSign, Clock, Award, Headphones, Package } from 'lucide-react';
import { fadeInUp, staggerContainer } from '../../lib/animations';

const features = [
  {
    icon: Shield,
    title: 'Trusted Products',
    description: 'All products sourced from authorized distributors with genuine warranty.',
    color: 'from-blue-500 to-blue-600',
    bgColor: 'bg-blue-100',
  },
  {
    icon: DollarSign,
    title: 'Affordable Prices',
    description: 'Competitive pricing without compromising on quality or authenticity.',
    color: 'from-green-500 to-green-600',
    bgColor: 'bg-green-100',
  },
  {
    icon: Clock,
    title: 'Fast Response',
    description: 'Quick response to all inquiries with dedicated customer support.',
    color: 'from-accent-500 to-accent-600',
    bgColor: 'bg-accent-100',
  },
  {
    icon: Award,
    title: 'Premium Quality',
    description: 'Only the best brands and products that meet our strict quality standards.',
    color: 'from-purple-500 to-purple-600',
    bgColor: 'bg-purple-100',
  },
  {
    icon: Headphones,
    title: 'Expert Support',
    description: 'Technical guidance from our team of laptop accessory specialists.',
    color: 'from-pink-500 to-pink-600',
    bgColor: 'bg-pink-100',
  },
  {
    icon: Package,
    title: 'Wide Selection',
    description: 'Comprehensive range of accessories for all laptop brands and models.',
    color: 'from-primary-500 to-primary-600',
    bgColor: 'bg-primary-100',
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-gray-900 mb-4">
            Why Choose TechGear?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We are committed to providing the best laptop accessories with exceptional service and support.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              whileHover={{ y: -8 }}
              className="card p-8 group relative overflow-hidden"
            >
              {/* Background Gradient */}
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${feature.color} opacity-5 rounded-bl-full group-hover:opacity-10 transition-opacity`} />

              <div className="relative">
                <div className={`w-14 h-14 rounded-2xl ${feature.bgColor} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <feature.icon className={`w-7 h-7 bg-gradient-to-br ${feature.color} bg-clip-text`} style={{ color: feature.color.includes('primary') ? '#2563eb' : feature.color.includes('blue') ? '#3b82f6' : feature.color.includes('green') ? '#22c55e' : feature.color.includes('accent') ? '#f97316' : feature.color.includes('purple') ? '#a855f7' : feature.color.includes('pink') ? '#ec4899' : '#3b82f6' }} />
                </div>
                <h3 className="font-display font-semibold text-xl text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
