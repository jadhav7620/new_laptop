import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Shield, Truck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { fadeInUp, fadeInLeft, fadeInRight, staggerContainer } from '../../lib/animations';

const HeroSection = () => {
  const features = [
    { icon: Sparkles, text: 'Premium Quality' },
    { icon: Shield, text: 'Warranty Included' },
    { icon: Truck, text: 'Fast Response' },
  ];

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-gray-50 via-white to-primary-50">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-primary-500/5 to-accent-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="text-center lg:text-left"
          >
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 text-primary-700 rounded-full mb-6"
            >
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-medium">Premium Laptop Accessories</span>
            </motion.div>

            <motion.h1
              variants={fadeInUp}
              className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-gray-900 leading-tight mb-6"
            >
              Elevate Your
              <span className="gradient-text block mt-2">Digital Experience</span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="text-lg text-gray-600 mb-8 max-w-xl mx-auto lg:mx-0"
            >
              Discover premium laptop accessories from world-renowned brands.
              Quality products designed to enhance your productivity and gaming experience.
            </motion.p>

            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Link to="/products" className="btn-primary text-lg px-8 py-4">
                Explore Products
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <Link to="/about" className="btn-secondary text-lg px-8 py-4">
                Learn More
              </Link>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="mt-12 flex flex-wrap justify-center lg:justify-start gap-8"
            >
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white shadow-lg flex items-center justify-center">
                    <feature.icon className="w-5 h-5 text-primary-600" />
                  </div>
                  <span className="text-gray-600 font-medium">{feature.text}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            variants={fadeInRight}
            initial="hidden"
            animate="visible"
            className="relative hidden lg:block"
          >
            <div className="relative">
              {/* Main Image Container */}
              <motion.div
                animate={{ y: [-10, 0, -10] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                className="relative"
              >
                <div className="w-full aspect-square max-w-lg mx-auto rounded-3xl bg-gradient-to-br from-primary-500 to-primary-600 p-1 shadow-2xl shadow-primary-500/30">
                  <div className="w-full h-full rounded-3xl bg-gradient-to-br from-gray-100 to-white flex items-center justify-center overflow-hidden">
                    <img
                      src="https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg?auto=compress&cs=tinysrgb&w=800"
                      alt="Laptop accessories"
                      className="w-full h-full object-cover rounded-3xl"
                    />
                  </div>
                </div>
              </motion.div>

              {/* Floating Cards */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="absolute -left-8 top-8 glass rounded-2xl p-4 shadow-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                    <Shield className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">2 Year Warranty</p>
                    <p className="text-sm text-gray-500">On all products</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
                className="absolute -right-8 bottom-8 glass rounded-2xl p-4 shadow-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-accent-100 flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-accent-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">50+ Brands</p>
                    <p className="text-sm text-gray-500">Premium selection</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" className="w-full h-auto">
          <path
            d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
