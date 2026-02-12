'use client';

import { motion } from 'framer-motion';
import {
  Car,
  Wifi,
  Bell,
  Key,
  Utensils,
  Waves,
  Phone,
} from 'lucide-react';

const facilities = [
  { title: 'Free Car Parking', icon: Car, filled: false },
  { title: 'Fast Wi-Fi Internet', icon: Wifi, filled: true },
  { title: 'Room Service', icon: Bell, filled: false },
  { title: "Smart key's", icon: Key, filled: true },
  { title: 'Food & Drink', icon: Utensils, filled: false },
  { title: 'Swimming – Pool', icon: Waves, filled: true },
];

export default function FacilitiesSection() {
  return (
    <section className="bg-[#fdfbf7] py-8 md:py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:grid lg:grid-cols-2 lg:gap-20 lg:items-center gap-8 md:gap-12">

          {/* LEFT – FACILITY GRID (2x3 on mobile, 3x2 on desktop) */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6 lg:gap-8 order-2 lg:order-1"
          >
            {facilities.map((item, index) => {
              const Icon = item.icon;
              const filled = item.filled;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className={`flex flex-col items-center justify-center rounded-xl md:rounded-2xl p-3 sm:p-6 md:p-8 text-center transition-all duration-300 cursor-pointer
                    ${
                      filled
                        ? 'bg-[#849826] text-white shadow-lg'
                        : 'border-2 border-[#d4c5a0] bg-white text-[#1f1f1f] hover:border-[#849826]'
                    }
                  `}
                  style={{
                    minHeight: '120px',
                  }}
                >
                  <Icon
                    size={24}
                    strokeWidth={1.5}
                    className={`mb-2 sm:mb-4 md:mb-3 ${filled ? 'text-white' : 'text-[#849826]'}`}
                  />

                  <p
                    className={`text-xs sm:text-base font-medium leading-tight ${
                      filled ? 'text-white' : 'text-[#1f1f1f]'
                    }`}
                  >
                    {item.title}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>

          {/* RIGHT – CONTENT */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col justify-center lg:pl-8 order-1 lg:order-2"
          >
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mb-2 md:mb-4 text-xs md:text-sm tracking-[0.25em] uppercase text-[#849826] font-medium"
            >
              Our Best Facilities
            </motion.p>

            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mb-4 md:mb-6 font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight text-[#1f1f1f]"
            >
              Our Facilities & Amenities
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mb-6 md:mb-10 text-[#5f5f5f] leading-relaxed text-sm sm:text-base md:text-lg"
            >
              Welcome to Udupi Homestays, your trusted platform for discovering and
              booking the best homestays in Udupi. Since our journey
              began, we've been committed to making travel easier, more
              comfortable, and affordable for everyone.
            </motion.p>

            {/* CTA ROW */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4"
            >
              {/* Phone Button */}
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="flex items-center justify-center sm:justify-start gap-3 sm:gap-4 rounded-lg md:rounded-xl bg-white px-4 sm:px-6 py-3 sm:py-4 shadow-md border border-gray-100 cursor-pointer"
              >
                <div className="flex h-10 sm:h-14 w-10 sm:w-14 items-center justify-center rounded-full bg-[#849826] flex-shrink-0">
                  <Phone size={18} className="text-white sm:w-5 sm:h-5" />
                </div>
                <span className="font-medium text-[#1f1f1f] text-sm sm:text-lg">
                  +001 6520 698 00
                </span>
              </motion.div>

              {/* Book Now Button */}
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="rounded-lg md:rounded-xl bg-[#849826] px-6 sm:px-10 py-3 sm:py-4 font-semibold text-white transition-all duration-300 shadow-md hover:shadow-lg uppercase tracking-wide text-xs sm:text-base"
              >
                Book Now
              </motion.button>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}