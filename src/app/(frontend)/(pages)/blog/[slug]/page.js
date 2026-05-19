// src/app/(frontend)/(pages)/blog/[slug]/page.js

import { notFound } from "next/navigation";
import Script from "next/script";

const blogs = [
  {
    id: 1,
    title: "GST Registration Process in Delhi",
    description:
      "Complete step-by-step GST registration process for businesses in Delhi NCR.",
    slug: "gst-registration-delhi",
    content: `
      GST registration is mandatory for businesses crossing the prescribed turnover limit.
      
      Documents required:
      - PAN Card
      - Aadhaar Card
      - Business Address Proof
      - Bank Details
      
      Benefits of GST Registration:
      - Input Tax Credit
      - Legal Recognition
      - Easy Business Expansion
    `,
  },

  {
    id: 2,
    title: "ITR Filing Due Dates 2026",
    description:
      "Know the latest ITR filing due dates and penalties for late filing.",
    slug: "itr-filing-due-dates-2026",
    content: `
      Filing Income Tax Return before the due date avoids penalties.
      
      Important Due Dates:
      - Individuals: 31 July
      - Audit Cases: 31 October
      
      Penalties:
      - Late fee under section 234F
      - Interest on tax dues
    `,
  },

  {
    id: 3,
    title: "Company Registration in India",
    description:
      "Learn how to register a private limited company in India easily.",
    slug: "company-registration-india",
    content: `
      Private Limited Company registration can be completed online.
      
      Required Documents:
      - PAN Card
      - Aadhaar Card
      - Address Proof
      
      Advantages:
      - Limited Liability
      - Separate Legal Entity
      - Better Funding Opportunities
    `,
  },
];

export async function generateMetadata({ params }) {
  const blog = blogs.find((item) => item.slug === params.slug);

  if (!blog) {
    return {
      title: "Blog Not Found",
    };
  }

  return {
    title: blog.title,
    description: blog.description,
  };
}

export default function BlogDetailsPage({ params }) {
  const blog = blogs.find((item) => item.slug === params.slug);

  if (!blog) {
    notFound();
  }

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog.title,
    description: blog.description,
    url: `https://cadelhincr.com/blog/${blog.slug}`,
  };

  return (
    <>
      {/* Schema */}
      <Script
        id="blog-details-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(blogSchema),
        }}
      />

      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20">
        <div className="max-w-5xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">{blog.title}</h1>

          <p className="text-lg text-blue-100">{blog.description}</p>
        </div>
      </section>

      {/* Blog Content */}
      <section className="max-w-4xl mx-auto px-4 py-16">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <div className="prose max-w-none text-gray-700 leading-8 whitespace-pre-line">
            {blog.content}
          </div>
        </div>
      </section>
    </>
  );
}
