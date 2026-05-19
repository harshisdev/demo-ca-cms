// app/blog/page.jsx

import Link from "next/link";
import Script from "next/script";

export const metadata = {
  title: "CA Blog Delhi | GST, ITR & Tax Updates",
  description:
    "Latest GST registration, ITR filing and company registration updates in Delhi.",
};

const blogs = [
  {
    id: 1,
    title: "GST Registration Process in Delhi",
    description:
      "Complete step-by-step GST registration process for businesses in Delhi NCR.",
    slug: "gst-registration-delhi",
  },
  {
    id: 2,
    title: "ITR Filing Due Dates 2026",
    description:
      "Know the latest ITR filing due dates and penalties for late filing.",
    slug: "itr-filing-due-dates-2026",
  },
  {
    id: 3,
    title: "Company Registration in India",
    description:
      "Learn how to register a private limited company in India easily.",
    slug: "company-registration-india",
  },
  {
    id: 4,
    title: "Benefits of MSME Registration",
    description:
      "Discover government benefits available after MSME registration.",
    slug: "benefits-of-msme-registration",
  },
];

export default function BlogPage() {
  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "CA in Delhi NCR Blog",
    url: "https://cadelhincr.com/blog",
  };

  return (
    <>
      {/* JSON-LD Schema */}
      <Script
        id="blog-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(blogSchema),
        }}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20 text-center">
        <div className="max-w-5xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            CA Blog Delhi NCR
          </h1>

          <p className="text-lg text-blue-100 max-w-3xl mx-auto">
            Latest GST registration, ITR filing, taxation, ROC compliance,
            company registration and finance updates in India.
          </p>
        </div>
      </section>

      {/* Blog Listing */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold mb-10 text-center text-gray-800">
          Latest Articles
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
            >
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                {blog.title}
              </h2>

              <p className="text-gray-600 mb-6 leading-7">{blog.description}</p>

              <Link
                href={`/blog/${blog.slug}`}
                className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-800"
              >
                Read More →
              </Link>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
