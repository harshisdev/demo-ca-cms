import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFileInvoice,
  faBuilding,
  faCalculator,
  faChartLine,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import Breadcrumb from "../../component/Breadcrumb";
import PageBanner from "../../component/PageBanner";

export const metadata = {
  title: "About CA in Delhi NCR",
  description:
    "Professional Chartered Accountant firm providing GST filing, ITR filing, company registration and audit services in Delhi NCR.",
  keywords:
    "CA in Delhi NCR, GST Filing, Income Tax Return, Company Registration, Audit Services",
};

export const viewport = {
  themeColor: "#0f172a",
};

const locations = [
  "Delhi",
  "Noida",
  "Gurgaon",
  "Faridabad",
  "Ghaziabad",
  "Greater Noida",
  "Dwarka",
  "Rohini",
];

const services = [
  { title: "GST Registration", icon: faFileInvoice },
  { title: "Income Tax Return (ITR) Filing", icon: faCalculator },
  { title: "Company Registration", icon: faBuilding },
  { title: "LLP & OPC Registration", icon: faBuilding },
  { title: "ROC Compliance", icon: faChartLine },
  { title: "Tax Audit Services", icon: faCalculator },
  { title: "Accounting & Bookkeeping", icon: faCalculator },
  { title: "TDS Return Filing", icon: faFileInvoice },
  { title: "Startup Advisory Services", icon: faChartLine },
];

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "AboutPage",
                "@id": "https://cadelhincr.com/about#aboutpage",
                url: "https://cadelhincr.com/about",
                name: "About CA in Delhi NCR",
                description:
                  "Learn about our Chartered Accountant firm in Delhi NCR providing GST filing, income tax return filing, company registration and audit services.",
              },
              {
                "@type": "Organization",
                "@id": "https://cadelhincr.com/#organization",
                name: "CA in Delhi NCR",
                url: "https://cadelhincr.com",
                logo: "https://cadelhincr.com/logo.png",
                description:
                  "Professional Chartered Accountant firm providing GST filing, ITR filing, company registration and audit services in Delhi NCR.",
              },
            ],
          }),
        }}
      />

      <PageBanner
        title="About CA in Delhi NCR"
        subtitle="Trusted Chartered Accountant firm serving Delhi NCR"
      />

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <Breadcrumb
            items={[{ label: "Home", href: "/" }, { label: "About" }]}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Who We Are</h2>

            <p className="text-gray-700 leading-relaxed mb-4">
              CA in Delhi NCR is a professional Chartered Accountant firm with
              over 12+ years of experience in providing financial, taxation and
              compliance services.
            </p>

            <p className="text-gray-700 leading-relaxed">
              We specialize in GST filing, Income Tax return, audit & assurance,
              company registration and corporate advisory services across Delhi
              NCR.
            </p>
          </div>

          <div>
            <img
              src="/images/who-are-you-about.png"
              className="rounded-2xl shadow-xl w-full h-64 object-cover"
              alt="About CA in Delhi NCR"
            />
          </div>
        </div>
      </section>

      <section className="bg-white pt-7 pb-16">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-10">
          <div className="p-8 rounded-2xl shadow-md">
            <h3 className="text-xl font-semibold text-blue-900 mb-4">
              Our Mission
            </h3>

            <p className="text-gray-600 text-sm">
              To deliver reliable, transparent and professional financial
              services that help individuals and businesses grow confidently.
            </p>
          </div>

          <div className="p-8 rounded-2xl shadow-md">
            <h3 className="text-xl font-semibold text-blue-900 mb-4">
              Our Vision
            </h3>

            <p className="text-gray-600 text-sm">
              To be one of the most trusted Chartered Accountant firms in Delhi
              NCR known for integrity and excellence.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold">Our Services</h2>

            <p className="text-gray-600 mt-3 text-lg">
              Comprehensive Chartered Accountant services tailored for
              businesses & individuals
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="group bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
              >
                <div className="w-14 h-14 flex items-center justify-center bg-blue-100 text-blue-700 rounded-full mb-4 group-hover:bg-blue-700 group-hover:text-white transition-all duration-300 mx-auto">
                  <FontAwesomeIcon icon={service.icon} />
                </div>

                <h3 className="text-lg font-semibold text-blue-900 group-hover:text-blue-700">
                  {service.title}
                </h3>

                <p className="text-gray-500 text-sm mt-2">
                  Professional and reliable {service.title.toLowerCase()}{" "}
                  services with expert support.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold">Locations We Cover</h2>

            <p className="text-gray-600 mt-3 text-lg">
              Professional CA services available across major locations in Delhi
            </p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {locations.map((location, index) => (
              <div
                key={index}
                className="group bg-white border border-gray-200 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 ease-in-out"
              >
                <div className="flex items-center justify-center mb-4">
                  <div className="w-12 h-12 flex items-center justify-center bg-blue-100 text-blue-700 rounded-full group-hover:bg-blue-700 group-hover:text-white transition-all duration-300">
                    <FontAwesomeIcon icon={faLocationDot} />
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-blue-900 group-hover:text-blue-700 transition">
                  CA in {location}
                </h3>

                <p className="text-sm text-gray-500 mt-2">
                  Expert Chartered Accountant services in {location}.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-b from-gray-50 to-white py-16">
        <div className="max-w-7xl mx-auto px-4 items-center">
          <h5 className="text-3xl font-bold mb-6 text-center">
            Delhi NCR Chartered Accountants
          </h5>

          <p className="text-gray-700 leading-relaxed">
            CA in Delhi NCR is a trusted platform to find verified Chartered
            Accountants in Delhi NCR for GST registration, income tax return
            filing, audit services, company registration, accounting, and
            financial advisory.
          </p>
        </div>
      </section>
    </>
  );
}
