"use client";

import { useState } from "react";
import EnquiryModal from "./EnquiryModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

export default function Hero({ data }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!data) return null;

  const {
    title,
    subtitle,
    button1,
    button2,
    phone,
    highlight1,
    highlight2,
    highlight3,
  } = data;

  return (
    <>
      <section className="relative overflow-hidden text-white">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/hero-bg.png')" }}
        ></div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/85 via-indigo-800/80 to-purple-800/85"></div>

        {/* Glass Blur Layer */}
        <div className="absolute inset-0 backdrop-blur-[2px]"></div>

        {/* Soft Glow */}
        <div className="absolute top-0 left-1/2 w-[600px] h-[600px] -translate-x-1/2 bg-blue-500/30 blur-[120px] rounded-full"></div>

        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-4 py-36 md:py-44 text-center">
          {/* Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            {title}
          </h1>

          {/* Subtitle */}
          {subtitle && (
            <p className="mt-6 text-lg md:text-xl text-blue-100 max-w-3xl mx-auto">
              {subtitle}
            </p>
          )}

          {/* Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
            {button1 && (
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-white text-blue-900 px-8 cursor-pointer py-3 rounded-xl font-semibold shadow-lg hover:scale-105 hover:bg-gray-100 transition w-full sm:w-auto"
              >
                {button1}
              </button>
            )}

            {button2 && phone && (
              <a
                href={`tel:+${phone}`}
                className="border border-white px-8 py-3 rounded-xl hover:bg-white hover:text-blue-900 transition w-full sm:w-auto"
              >
                {button2}
              </a>
            )}
          </div>

          {/* Highlights */}
          <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm md:text-base text-blue-200">
            {highlight1 && (
              <span className="flex items-center gap-2">
                <FontAwesomeIcon
                  icon={faCheckCircle}
                  className="text-green-500"
                />{" "}
                {highlight1}
              </span>
            )}

            {highlight2 && (
              <span className="flex items-center gap-2">
                <FontAwesomeIcon
                  icon={faCheckCircle}
                  className="text-green-500"
                />{" "}
                {highlight2}
              </span>
            )}

            {highlight3 && (
              <span className="flex items-center gap-2">
                <FontAwesomeIcon
                  icon={faCheckCircle}
                  className="text-green-500"
                />{" "}
                {highlight3}
              </span>
            )}
          </div>
        </div>
      </section>

      <EnquiryModal
        isOpen={isModalOpen}
        locations={[
          { location: "Delhi" },
          { location: "Noida" },
          { location: "Gurgaon" },
        ]}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
