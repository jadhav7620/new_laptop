import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { fadeInUp, staggerContainer } from '../../lib/animations';

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Software Developer',
    company: 'Tech Corp',
    image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
    rating: 5,
    text: 'The mechanical keyboard I bought from TechGear is absolutely fantastic. The build quality is premium and the typing experience is smooth. Highly recommend!',
  },
  {
    name: 'Michael Chen',
    role: 'Gamer',
    company: 'Pro Gaming Team',
    image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
    rating: 5,
    text: 'Best gaming mouse I have ever used! The precision and responsiveness are incredible. TechGear has become my go-to store for all laptop accessories.',
  },
  {
    name: 'Emily Rodriguez',
    role: 'Graphic Designer',
    company: 'Creative Studio',
    image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
    rating: 5,
    text: 'The laptop stand and cooling pad combo is a game changer for my workflow. My laptop runs so much cooler now. Great products and fast service!',
  },
  {
    name: 'David Kim',
    role: 'Business Owner',
    company: 'StartUp Inc',
    image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150',
    rating: 5,
    text: 'Purchased a docking station and USB hub for my home office setup. The quality exceeded my expectations. Will definitely buy from TechGear again.',
  },
  {
    name: 'Lisa Thompson',
    role: 'Content Creator',
    company: 'YouTube',
    image: 'https://images.pexels.com/photos/38554/girls-henna-pool-island-38554.jpeg?auto=compress&cs=tinysrgb&w=150',
    rating: 5,
    text: 'The webcam quality is fantastic for my streaming needs. Plus, the customer support team was incredibly helpful in choosing the right product.',
  },
  {
    name: 'James Wilson',
    role: 'IT Manager',
    company: 'Enterprise Solutions',
    image: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=150',
    rating: 5,
    text: 'We have standardized all our office laptop accessories from TechGear. Consistent quality and competitive pricing. Highly recommended for businesses.',
  },
];

const Testimonials = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display font-bold text-3xl sm:text-4xl mb-4">
            What Our Customers Say
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our customers have to say about their experience with TechGear.
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              whileHover={{ y: -5 }}
              className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 relative group"
            >
              {/* Quote Icon */}
              <Quote className="absolute top-4 right-4 w-8 h-8 text-primary-500/20 group-hover:text-primary-500/40 transition-colors" />

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                ))}
              </div>

              {/* Text */}
              <p className="text-gray-300 mb-6 leading-relaxed">
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-white">{testimonial.name}</p>
                  <p className="text-sm text-gray-400">{testimonial.role} at {testimonial.company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
