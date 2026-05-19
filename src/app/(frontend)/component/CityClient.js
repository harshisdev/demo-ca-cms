"use client";

import CACard from "./CACard";
import Breadcrumb from "./Breadcrumb";

export default function CityClient({
  data,
  locationname,
  pagetitle,
  pagecontent,
  locationparent,
}) {
  if (!data || data.length === 0) {
    return (
      <div className="text-center py-20 text-gray-600">
        No CA available in {locationname}
      </div>
    );
  }

  return (
    <>
      {/* CA LIST SECTION */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },

              ...(locationname ===  locationparent.charAt(0).toUpperCase() +locationparent.slice(1)
                ? []
                : [
                    {
                      label:
                        locationparent.charAt(0).toUpperCase() +
                        locationparent.slice(1),
                      href: `/ca-${locationparent.toLowerCase()}`,
                    },
                  ]),

              { label: locationname },
            ]}
          />

          <div className="grid">
            {data
              .filter((ca) => ca.profileshow === true)
              .map((ca, index) => (
                <CACard key={index} ca={ca} />
              ))}
          </div>
        </div>
      </section>

      {/* PAGE CONTENT */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4">
          {pagetitle && (
            <h1 className="text-2xl font-bold text-gray-900 mb-6">
              {pagetitle}
            </h1>
          )}

          {pagecontent?.map((item, index) => {
            if (item.type === "h2")
              return (
                <h2
                  key={index}
                  className="text-2xl font-bold text-gray-900 mt-10 mb-4"
                >
                  {item.text}
                </h2>
              );

            if (item.type === "h3")
              return (
                <h3
                  key={index}
                  className="text-2xl font-semibold text-gray-900 mt-8 mb-3"
                >
                  {item.text}
                </h3>
              );

            if (item.type === "h4")
              return (
                <h4
                  key={index}
                  className="text-xl font-semibold text-gray-800 mt-6 mb-2"
                >
                  {item.text}
                </h4>
              );

            if (item.type === "p")
              return (
                <p key={index} className="mb-4 text-gray-700 leading-relaxed">
                  {item.text}
                </p>
              );

            if (item.type === "ul")
              return (
                <ul
                  key={index}
                  className="list-disc pl-6 mb-5 space-y-2 text-gray-700"
                >
                  {item.items.map((li, i) => (
                    <li key={i}>{li}</li>
                  ))}
                </ul>
              );

            /* FAQ SECTION */

            if (item.type === "faq")
              return (
                <div key={index} className="space-y-4 mt-6">
                  {item.items.map((faq, i) => (
                    <div
                      key={i}
                      className="p-4 border border-gray-200 rounded-lg bg-gray-50"
                    >
                      <p className="font-semibold text-gray-900">
                        Q{i + 1}: {faq.q}
                      </p>
                      <p className="text-gray-700 mt-1">{faq.a}</p>
                    </div>
                  ))}
                </div>
              );

            return null;
          })}
        </div>
      </section>
    </>
  );
}
