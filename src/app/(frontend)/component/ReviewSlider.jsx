"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

import "swiper/css";
import "swiper/css/pagination";
import { Quote } from "lucide-react";

export default function ReviewSlider({ reviews }) {
  if (!reviews) return null;

  return (
    <Swiper
      modules={[Autoplay, Pagination]}
      spaceBetween={20}
      slidesPerView={1}
      autoplay={{ delay: 4000 }}
      pagination={{ clickable: true }}
      breakpoints={{
        768: {
          slidesPerView: 2,
        },
      }}
    >
      {reviews.map((review, i) => (
        <SwiperSlide key={i}>
          <div className="border rounded-xl p-6 shadow-sm bg-white h-full mb-20">
            <div className="flex text-yellow-400 text-sm mb-2">
              {[...Array(review.rating || 5)].map((_, i) => (
                <FontAwesomeIcon key={i} icon={faStar} />
              ))}
            </div>

            <p className="text-gray-600 text-sm leading-relaxed">
              <Quote className="text-blue-300 mb-4" size={20} />
              {review.comment}
            </p>

            <p className="text-sm font-semibold mt-4">_____{review.name}</p>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
