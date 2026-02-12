'use client';

import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

export default function HospitalitySection() {
  return (
    <section className="relative py-16 md:py-24 px-4 md:px-8 lg:px-16 overflow-hidden" style={{ backgroundColor: '#f8f7f4' }}>
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          
          {/* Left Side - Image */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
            <div className="relative">
              <img
                src="/reception.jpg"
                alt="Hotel Reception"
                className="w-full h-auto object-cover rounded-lg shadow-lg"
              />
            </div>
          </motion.div>

          {/* Right Side - Content */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-6 lg:pl-8"
          >
            {/* Eyebrow Text */}
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-block text-sm md:text-base font-medium tracking-[0.2em] uppercase"
              style={{ color: '#849826' }}
            >
              The Heart of Hospitality
            </motion.span>

            {/* Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-3xl md:text-4xl lg:text-5xl font-serif leading-tight text-gray-900"
            >
              Welcome To a World of <br className="hidden md:block" /> Warmth & Elegance
            </motion.h2>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-gray-600 text-base md:text-lg leading-relaxed"
            >
              Discover the charm of Udupi through authentic homestay experiences. Nestled in the heart of coastal Karnataka, 
              our carefully curated homestays offer you a perfect blend of traditional hospitality and modern comfort. 
              Whether you're seeking a peaceful retreat or an adventure-filled getaway, we connect you with the finest 
              homestays that feel like a home away from home.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="relative pt-8"
            >
              {/* Decorative Background */}
              <div 
                className="absolute inset-0 rounded-xl opacity-10"
                style={{
                  background: 'radial-gradient(circle at center, #849826 0%, transparent 70%)',
                }}
              />
              
              <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 p-6 rounded-xl">
                {/* Know More Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-3.5 text-white font-medium rounded-md shadow-lg hover:shadow-xl transition-all duration-300 uppercase tracking-wide text-sm"
                  style={{ backgroundColor: '#849826' }}
                >
                  Know more about us
                </motion.button>
                
                {/* View Reels Button with Play Icon */}
                <div className="flex items-center gap-3">
                  <span className="text-gray-700 font-medium uppercase tracking-wide text-sm">
                    view reels
                  </span>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-12 h-12 rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-300 relative group"
                    style={{ backgroundColor: '#849826' }}
                  >
                    <Play className="w-5 h-5 text-white fill-white ml-0.5" />
                    {/* Ripple effect */}
                    <span className="absolute inset-0 rounded-full animate-ping opacity-20" style={{ backgroundColor: '#849826' }} />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}