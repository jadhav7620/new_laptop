import { motion } from 'framer-motion';
import {
  Target,
  Eye,
  Heart,
  Shield,
  Award,
  Users,
  Globe,
  Zap,
  Check,
} from 'lucide-react';
import { fadeInUp, fadeInLeft, fadeInRight, staggerContainer } from '../../lib/animations';

const AboutPage = () => {
  const values = [
    {
      icon: Shield,
      title: 'Quality First',
      description: 'We never compromise on quality. Every product is carefully inspected and sourced from authorized distributors.',
    },
    {
      icon: Heart,
      title: 'Customer Focus',
      description: 'Our customers are at the heart of everything we do. We strive to exceed expectations in every interaction.',
    },
    {
      icon: Award,
      title: 'Excellence',
      description: 'We pursue excellence in product selection, customer service, and overall experience.',
    },
    {
      icon: Users,
      title: 'Trust',
      description: 'Building lasting relationships through transparency, honesty, and reliable service.',
    },
  ];

  const milestones = [
    { year: '2018', title: 'Founded', description: 'TechGear was established with a vision to provide premium laptop accessories.' },
    { year: '2019', title: 'Brand Partnerships', description: 'Partnered with leading brands like Logitech, Razer, and Corsair.' },
    { year: '2020', title: 'Online Expansion', description: 'Launched our e-commerce platform to serve customers nationwide.' },
    { year: '2021', title: 'Catalog Growth', description: 'Expanded to over 500+ products across 17 categories.' },
    { year: '2022', title: 'Community', description: 'Built a thriving community of tech enthusiasts and professionals.' },
    { year: '2023', title: 'Innovation', description: 'Introduced AI-powered product recommendations and support.' },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary-600 via-primary-500 to-primary-400 text-white overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl mb-6">
              Our Story
            </h1>
            <p className="text-xl text-primary-100 leading-relaxed">
              From a small startup to a trusted name in premium laptop accessories,
              we have been on a journey of passion, quality, and innovation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              variants={fadeInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <img
                src="https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Our Team"
                className="rounded-3xl shadow-2xl"
              />
            </motion.div>
            <motion.div
              variants={fadeInRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-gray-900">
                The TechGear Journey
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Founded in 2018, TechGear started with a simple mission: to provide
                professionals, gamers, and everyday users with premium laptop accessories
                that enhance their digital experience.
              </p>
              <p className="text-gray-600 leading-relaxed">
                What began as a small operation has grown into a trusted destination
                for quality laptop accessories. We partner with world-renowned brands
                and maintain strict quality standards to ensure every product meets
                our customers' expectations.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Today, we serve thousands of customers across the globe, offering
                a curated selection of over 500 products from more than 20 premium brands.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="card p-8"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center mb-6">
                <Target className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-display font-semibold text-2xl text-gray-900 mb-4">
                Our Mission
              </h3>
              <p className="text-gray-600 leading-relaxed">
                To provide premium laptop accessories that enhance productivity,
                gaming experiences, and digital lifestyles. We are committed to
                offering authentic products, exceptional customer service, and
                expert guidance to help our customers make informed decisions.
              </p>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="card p-8"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent-500 to-accent-600 flex items-center justify-center mb-6">
                <Eye className="w-7 h-7 text-white" />
              </div>
              <h3 className="font-display font-semibold text-2xl text-gray-900 mb-4">
                Our Vision
              </h3>
              <p className="text-gray-600 leading-relaxed">
                To become the most trusted destination for laptop accessories worldwide.
                We envision a future where every professional and gamer has access to
                quality products that elevate their digital experience, backed by
                outstanding service and support.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-gray-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do at TechGear.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {values.map((value, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-primary-100 flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="font-display font-semibold text-lg text-gray-900 mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="font-display font-bold text-3xl sm:text-4xl mb-4">
              Our Journey
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Key milestones in the TechGear story.
            </p>
          </motion.div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gray-700" />

            {milestones.map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative flex items-center mb-12 ${
                  index % 2 === 0 ? 'justify-start' : 'justify-end'
                }`}
              >
                <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                  <div className={`bg-gray-800 rounded-2xl p-6 inline-block ${index % 2 === 0 ? 'ml-auto' : ''}`}>
                    <span className="text-primary-500 font-bold text-lg">{milestone.year}</span>
                    <h3 className="font-display font-semibold text-xl mt-1 mb-2">{milestone.title}</h3>
                    <p className="text-gray-400">{milestone.description}</p>
                  </div>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary-500 rounded-full border-4 border-gray-900" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Summary */}
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
              Why TechGear?
            </h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {[
              { icon: Check, text: 'Authentic products from authorized distributors' },
              { icon: Check, text: 'Comprehensive warranty on all products' },
              { icon: Check, text: 'Expert product guidance and support' },
              { icon: Check, text: 'Wide selection from 20+ premium brands' },
              { icon: Check, text: 'Competitive pricing without compromising quality' },
              { icon: Check, text: 'Fast response to all inquiries' },
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl"
              >
                <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-5 h-5 text-green-600" />
                </div>
                <span className="text-gray-700 font-medium">{item.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
