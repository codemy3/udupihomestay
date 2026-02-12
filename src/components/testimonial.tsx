'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    rating: 5,
    text: "From the moment we arrived, every detail was flawless. The staff anticipated our every need, and the suite was pure perfection. We'll be back soon!",
    name: 'Rajesh Kumar',
    role: 'Business Traveler',
    avatar: '/1.webp',
  },
  {
    id: 2,
    rating: 5,
    text: "An unforgettable experience! The homestay exceeded all expectations. The hospitality was warm, the rooms were spotless, and the location was perfect. Highly recommended!",
    name: 'Priya Sharma',
    role: 'Family Vacation',
    avatar: '/testimonial-2.jpg',
  },
  {
    id: 3,
    rating: 5,
    text: "The perfect blend of comfort and authenticity. We felt right at home with the amazing amenities and personalized service. Will definitely return for our next Udupi visit!",
    name: 'Amit Patel',
    role: 'Weekend Getaway',
    avatar: '/testimonial-3.jpg',
  },
];

export default function TestimonialsSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);

  // Auto-play slider
  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentSlide((prev) => (prev + 1) % testimonials.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToSlide = (index: number) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  return (
    <section 
      className="relative py-8 md:py-20 lg:py-28 bg-cover bg-center overflow-hidden"
      style={{
        backgroundImage: 'url(/testimonial-bg.jpg)',
        backgroundColor: '#1a2e2e',
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-6 md:gap-12 lg:gap-16 items-center">
          
          {/* LEFT SIDE - Testimonial Card Slider */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="bg-white rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-8 shadow-2xl relative overflow-hidden">
              {/* Testimonial Content with AnimatePresence */}
              <div className="space-y-3 sm:space-y-4 md:space-y-5 min-h-[240px] sm:min-h-[300px] md:min-h-[340px] relative">
                <AnimatePresence initial={false} custom={direction} mode="wait">
                  <motion.div
                    key={currentSlide}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      x: { type: "spring", stiffness: 300, damping: 30 },
                      opacity: { duration: 0.4 }
                    }}
                    className="absolute inset-0"
                  >
                    {/* Star Rating */}
                    <div className="flex gap-1 mb-2 sm:mb-4 md:mb-6">
                      {[...Array(testimonials[currentSlide].rating)].map((_, i) => (
                        <Star
                          key={i}
                          size={20}
                          className="fill-[#849826] text-[#849826]"
                        />
                      ))}
                    </div>

                    {/* Testimonial Text */}
                    <p className="text-gray-700 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed italic mb-4 sm:mb-6 md:mb-8">
                      "{testimonials[currentSlide].text}"
                    </p>

                    {/* Client Info */}
                    <div className="flex items-center justify-between absolute bottom-0 left-0 right-0">
                      <div className="flex items-center gap-2 sm:gap-3">
                        {/* Avatar */}
                        <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 overflow-hidden flex-shrink-0">
                          <img
                            src={testimonials[currentSlide].avatar}
                            alt={testimonials[currentSlide].name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              const target = e.currentTarget;
                              target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23849826" width="100" height="100"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="40" fill="white"%3E' + testimonials[currentSlide].name.charAt(0) + '%3C/text%3E%3C/svg%3E';
                            }}
                          />
                        </div>

                        {/* Name & Role */}
                        <div>
                          <h5 className="font-semibold text-gray-900 text-sm sm:text-base md:text-lg">
                            {testimonials[currentSlide].name}
                          </h5>
                          <span className="text-gray-500 text-[10px] sm:text-xs md:text-sm">
                            {testimonials[currentSlide].role}
                          </span>
                        </div>
                      </div>

                      {/* Quote Icon */}
                      <div className="flex-shrink-0 hidden sm:block">
                        <Quote size={48} className="text-[#849826] fill-[#849826] opacity-30" />
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Navigation Dots */}
              <div className="flex gap-2 mt-4 sm:mt-6 md:mt-8 justify-center lg:justify-start relative z-20">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      currentSlide === index
                        ? 'w-8 bg-[#849826]'
                        : 'w-2 bg-gray-300 hover:bg-gray-400'
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Shadow decoration */}
            <div className="absolute -bottom-4 -right-4 w-full h-full bg-[#849826]/10 rounded-2xl md:rounded-3xl -z-10 hidden sm:block" />
          </motion.div>

          {/* RIGHT SIDE - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Heading */}
            <div className="space-y-2 sm:space-y-3 md:space-y-4">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-xs md:text-sm tracking-[0.25em] uppercase text-[#849826] font-medium"
              >
                Our Homestay Testimonials
              </motion.p>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-tight text-white"
              >
                What Our Guest's Say
              </motion.h2>
            </div>

            {/* Client Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex items-center gap-3 sm:gap-4 md:gap-6 pt-2 md:pt-4"
            >
              {/* Group Images */}
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full border-3 sm:border-4 border-[#1a2e2e] bg-gradient-to-br from-gray-300 to-gray-400 overflow-hidden flex-shrink-0"
                    style={{
                      backgroundImage: `url(/client-${i}.jpg)`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  >
                    <div className="w-full h-full bg-[#849826]/20" />
                  </div>
                ))}
                <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full border-3 sm:border-4 border-[#1a2e2e] bg-white flex items-center justify-center flex-shrink-0">
                  <span className="text-[9px] sm:text-xs font-semibold text-gray-700">10k+</span>
                </div>
              </div>

              {/* Stats Text */}
              <div className="min-w-0">
                <h6 className="text-white text-base sm:text-lg md:text-xl lg:text-2xl font-semibold whitespace-nowrap md:whitespace-normal">
                  More than <span className="text-[#849826]">25k</span>
                </h6>
                <p className="text-white/70 text-xs sm:text-sm md:text-base">clients Reviews</p>
              </div>
            </motion.div>

            {/* Navigation Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex gap-2 sm:gap-3 pt-2 md:pt-4"
            >
              <button
                onClick={prevSlide}
                className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-lg bg-white text-[#849826] hover:bg-white/90 transition-all shadow-md hover:scale-110 flex-shrink-0"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={22} strokeWidth={2.5} />
              </button>
              <button
                onClick={nextSlide}
                className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-lg bg-[#849826] text-white hover:bg-[#849826]/90 transition-all shadow-md hover:scale-110 flex-shrink-0"
                aria-label="Next testimonial"
              >
                <ChevronRight size={22} strokeWidth={2.5} />
              </button>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}