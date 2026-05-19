"use client";

import { useRouter } from "next/navigation";

export default function PricingSection() {
  const plans = [
    {
      name: "ITR Filing",
      price: "₹999",
      description: "Best for salaried individuals",
      features: [
        "Salary ITR Filing",
        "Tax Calculation",
        "Form 16 Support",
        "Email Support",
      ],
      popular: false,
    },
    {
      name: "GST Compliance",
      price: "₹1,499",
      description: "Perfect for small businesses",
      features: [
        "GST Registration",
        "Monthly GST Filing",
        "GST Consultation",
        "Penalty Avoidance",
      ],
      popular: true,
    },
    {
      name: "Company Registration",
      price: "₹7,999",
      description: "Start your business easily",
      features: [
        "Pvt Ltd / LLP Registration",
        "DIN & DSC",
        "PAN & TAN",
        "Startup Guidance",
      ],
      popular: false,
    },
  ];

  const router = useRouter();

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}

        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800">
           Affordable CA Service Pricing
          </h2>
          <p className="text-gray-500 mt-4">
            Affordable Chartered Accountant Services for Individuals & Businesses.
          </p>
        </div>

        {/* Cards */}

        <div className="grid md:grid-cols-3 gap-10">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-2xl p-8 shadow-lg border transition transform hover:-translate-y-2 hover:shadow-2xl 
${plan.popular ? "border-blue-600 scale-105" : "border-gray-200"}
`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-blue-600 text-white text-sm px-4 py-1 rounded-full shadow">
                    Most Popular
                  </span>
                </div>
              )}

              <h3 className="text-2xl font-semibold text-gray-800">
                {plan.name}
              </h3>

              <p className="text-gray-500 mt-2">{plan.description}</p>

              <div className="mt-6">
                <span className="text-5xl font-bold text-blue-600">
                  {plan.price}
                </span>
              </div>

              <ul className="mt-8 space-y-4">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center text-gray-600">
                    <svg
                      className="w-5 h-5 text-green-500 mr-2"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>

                    {feature}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => router.push("/contact")}
                className={`mt-10 w-full py-3 rounded-lg font-semibold transition cursor-pointer
  ${
    plan.popular
      ? "bg-blue-600 text-white hover:bg-blue-700"
      : "bg-gray-100 text-gray-800 hover:bg-gray-200"
  }`}
              >
                Get Started
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
