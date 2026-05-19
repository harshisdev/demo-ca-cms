"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

export default function Testimonials({ testimonials }) {
  const [index, setIndex] = useState(0);

  const prev = () =>
    setIndex((index - 1 + testimonials.length) % testimonials.length);

  const next = () => setIndex((index + 1) % testimonials.length);

  useEffect(() => {
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, [index]);

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 w-[600px] h-[600px] rounded-full blur-[120px] opacity-30 -translate-x-1/2"></div>

      <div className="max-w-7xl mx-auto px-4 relative">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold">
            Trusted by Businesses & Individuals Across Delhi NCR
          </h2>
          <p className="text-gray-600 mt-3 text-lg">
            Entrepreneurs, freelancers and growing businesses trust our CA
            expertise.
          </p>
        </div>

        {/* Cards */}
        <div className="relative flex items-center justify-center h-[300px]">
          {testimonials.map((item, i) => {
            const position =
              i === index
                ? "center"
                : i === (index + 1) % testimonials.length
                  ? "right"
                  : i ===
                      (index - 1 + testimonials.length) % testimonials.length
                    ? "left"
                    : "hidden";

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: position === "hidden" ? 0 : 1,
                  scale: position === "center" ? 1 : 0.85,
                  x:
                    position === "left" ? -320 : position === "right" ? 320 : 0,
                  zIndex: position === "center" ? 10 : 5,
                }}
                transition={{ duration: 0.5 }}
                className="absolute w-full md:w-[450px]"
              >
                <div className="backdrop-blur-xl bg-white/70 border border-white/40 shadow-2xl rounded-3xl p-10 hover:scale-[1.02] transition">
                  <Quote className="text-blue-300 mb-4" size={40} />

                  {/* Stars */}
                  <div className="flex gap-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={18}
                        className="text-yellow-400 fill-yellow-400"
                      />
                    ))}
                  </div>

                  <p className="text-gray-700 leading-relaxed mb-8">
                    {item.testimonial}
                  </p>

                  {/* User */}
                  <div className="flex items-center gap-4">
                    <img
                      src={`https://ui-avatars.com/api/?name=${item.name}`}
                      className="w-12 h-12 rounded-full"
                      alt={item.name}
                    />

                    <div>
                      <h4 className="font-semibold text-blue-900">
                        {item.name}
                      </h4>

                      <p className="text-sm text-gray-500">
                        {item.designation}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Controls */}
        <div className="flex justify-center gap-6 mt-16">
          <button
            onClick={prev}
            className="px-6 py-2 rounded-full bg-white shadow hover:shadow-lg cursor-pointer"
          >
            ←
          </button>
          <button
            onClick={next}
            className="px-6 py-2 rounded-full bg-blue-600 text-white shadow hover:shadow-lg cursor-pointer"
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}
