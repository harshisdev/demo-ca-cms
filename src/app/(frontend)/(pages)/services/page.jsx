import {
  faFileInvoiceDollar,
  faBuilding,
  faChartLine,
  faClipboardCheck,
  faUserTie,
  faMoneyCheckDollar,
} from "@fortawesome/free-solid-svg-icons";

export const metadata = {
  title:
    "Chartered Accountant Services in Delhi NCR | GST, ITR, Company Registration",

  description:
    "Professional Chartered Accountant services in Delhi NCR including GST registration, GST return filing, income tax return filing, company registration, audit, and tax planning for businesses and individuals.",

  keywords: [
    "CA services in Delhi NCR",
    "Chartered Accountant services",
    "GST registration Delhi",
    "GST return filing",
    "Income tax filing CA",
    "Company registration consultant",
    "Tax planning services",
    "Audit services CA",
    "Business compliance CA",
    "GST consultant Delhi NCR",
  ],

  robots: {
    index: true,
    follow: true,
  },

  alternates: {
    canonical: "https://cadelhincr.com/services",
  },

  openGraph: {
    title: "Chartered Accountant Services in Delhi NCR",
    description:
      "Explore professional CA services including GST filing, income tax returns, company registration, audit and tax advisory.",
    url: "https://cadelhincr.com/services",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Chartered Accountant Services in Delhi NCR",
    description:
      "Professional GST, Income Tax, and Company Registration services by experienced Chartered Accountants.",
  },
};

export default function ServicesPage() {
  const services = [
    {
      title: "GST Registration",
      icon: faClipboardCheck,
      desc: "Complete assistance with GST registration, documentation, and compliance for businesses and startups.",
    },
    {
      title: "GST Return Filing",
      icon: faFileInvoiceDollar,
      desc: "Accurate GST return filing services to ensure compliance with government regulations.",
    },
    {
      title: "Income Tax Filing",
      icon: faMoneyCheckDollar,
      desc: "Professional income tax return filing services for individuals, professionals, and companies.",
    },
    {
      title: "Company Registration",
      icon: faBuilding,
      desc: "End-to-end company registration including private limited company, LLP, and startup registration.",
    },
    {
      title: "Tax Planning",
      icon: faChartLine,
      desc: "Smart tax planning strategies to reduce tax liability and improve financial efficiency.",
    },
    {
      title: "Audit & Compliance",
      icon: faUserTie,
      desc: "Comprehensive audit services and compliance management for businesses.",
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "Chartered Accountant Services",
            provider: {
              "@type": "Organization",
              name: "CA in Delhi NCR",
            },
            areaServed: {
              "@type": "AdministrativeArea",
              name: "Delhi NCR",
            },
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: "CA Services",
              itemListElement: [
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "GST Registration",
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "GST Return Filing",
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Income Tax Return Filing",
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Company Registration",
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Tax Planning",
                  },
                },
              ],
            },
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://cadelhincr.com",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Services",
                item: "https://cadelhincr.com/services",
              },
            ],
          }),
        }}
      />

      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          {/* SERVICES GRID */}
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 shadow-sm border hover:shadow-lg transition group"
              >
                <div className="w-12 h-12 flex items-center justify-center bg-blue-100 text-blue-700 rounded-lg mb-4 group-hover:bg-blue-600 group-hover:text-white transition">
                  {/* <FontAwesomeIcon icon={service.icon} /> */}
                </div>

                <h3 className="font-semibold text-lg text-gray-900 mb-2">
                  {service.title}
                </h3>

                <p className="text-sm text-gray-600">{service.desc}</p>
              </div>
            ))}
          </div>

          {/* WHY CHOOSE US */}
          <div className="mt-20">
            <h2 className="text-2xl font-semibold text-center  mb-10">
              Why Choose Our CA Services
            </h2>

            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="bg-white p-6 rounded-xl shadow-sm border">
                <h3 className="font-semibold mb-2">
                  Experienced Professionals
                </h3>
                <p className="text-sm text-gray-600">
                  12+ years of experience handling GST, tax filing, and
                  compliance services.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border">
                <h3 className="font-semibold mb-2">Quick Response</h3>
                <p className="text-sm text-gray-600">
                  Fast consultation and quick support via call, WhatsApp, and
                  email.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm border">
                <h3 className="font-semibold mb-2">Affordable Pricing</h3>
                <p className="text-sm text-gray-600">
                  Transparent and affordable pricing for all CA services.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
