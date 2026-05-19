"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

export default function FAQAccordion({ faq }) {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="mt-12 max-w-7xl mx-auto">
      <h3 className="text-xl font-semibold mb-6 text-center">
        Frequently Asked Questions
      </h3>

      <div className="space-y-4">
        {faq?.map((item, i) => {
          const isOpen = activeIndex === i;

          return (
            <div
              key={i}
              className="border rounded-lg bg-white shadow-sm overflow-hidden"
            >
              {/* Question */}
              <button
                onClick={() => toggleFAQ(i)}
                className="w-full cursor-pointer flex justify-between items-center p-4 text-left font-semibold text-gray-800 hover:bg-gray-50"
              >
                {item.question}

                <FontAwesomeIcon
                  icon={faChevronDown}
                  className={`transition-transform duration-300 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Answer */}
              {isOpen && (
                <div className="px-4 pb-4 text-sm text-gray-600">
                  {item.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
