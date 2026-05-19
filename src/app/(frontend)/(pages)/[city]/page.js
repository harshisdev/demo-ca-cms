import { notFound } from "next/navigation";
import PageBanner from "../../component/PageBanner";
import CityClient from "../../component/CityClient";
import NotFound from "@/app/not-found";

const API_URL = "http://localhost:3001/api/location";

// ====================================
// SEO Metadata
// ====================================
export async function generateMetadata({ params }) {
  const { city } = await params;

  const cityData = await getCityData(city);

  if (!cityData) {
    return {
      title: "Not Found",
    };
  }

  const cityName = cityData.name;
  const parentCity = cityData.cityName || cityName;

  return {
    title: cityData.isArea
      ? `CA in ${cityName}, ${parentCity}`
      : `CA in ${cityName}`,

    description: cityData.isArea
      ? `Best Chartered Accountant services in ${cityName}, ${parentCity}`
      : `Best Chartered Accountant services in ${cityName}`,
  };
}

// ====================================
// Generate Static Params
// ====================================
export async function generateStaticParams() {
  try {
    const res = await fetch(API_URL, {
      cache: "no-store",
    });

    const locations = await res.json();

    const allRoutes = [];

    locations.forEach((item) => {
      // city route
      allRoutes.push({
        city: item.slug,
      });

      // child area routes
      if (item.children?.length > 0) {
        item.children.forEach((child) => {
          allRoutes.push({
            city: child.slug,
          });
        });
      }
    });

    return allRoutes;
  } catch (error) {
    return [];
  }
}

// ====================================
// Get Single City/Area Data
// ====================================
async function getCityData(slug) {
  try {
    const res = await fetch(API_URL, {
      cache: "no-store",
    });

    const locations = await res.json();

    // Find City
    const city = locations.find((item) => item.slug === slug);

    if (city) {
      return {
        ...city,
        isArea: false,
      };
    }

    // Find Child Area
    for (const location of locations) {
      const area = location.children?.find((child) => child.slug === slug);

      if (area) {
        return {
          ...area,
          cityName: location.name,
          isArea: true,
        };
      }
    }

    return null;
  } catch (error) {
    return null;
  }
}

// ====================================
// Page Component
// ====================================
export default async function CityPage({ params }) {
  const { city } = await params;

  const cityData = await getCityData(city);

  const cityName = cityData?.name;
  const parentCity = cityData?.cityName || cityName;

  // dummy data for existing component props
  const data = {
    locationname: cityName,
    parentcity: parentCity,
    pagetitle: `CA Services in ${cityName}`,
    pagecontent: `Professional Chartered Accountant services in ${cityName}.`,
    cas: [],
  };

  if (!cityData) {
    <NotFound />;
  }

  return (
    <>
      {/* JSON LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AccountingService",
            "@id": `https://cadelhincr.com/${city}#accountingservice`,
            name: `CA in ${cityName}`,
            url: `https://cadelhincr.com/${city}`,
            description: `Professional Chartered Accountant services in ${cityName} including GST filing, income tax return filing, company registration and audit services.`,
            areaServed: {
              "@type": "City",
              name: cityName,
            },
            serviceType: [
              "GST Registration",
              "GST Return Filing",
              "Income Tax Return Filing",
              "Company Registration",
              "Corporate Audit",
              "Startup Tax Consulting",
            ],
            provider: {
              "@type": "Organization",
              name: "CA Delhi NCR",
              url: "https://cadelhincr.com",
            },
          }),
        }}
      />

      {/* Banner */}
      <PageBanner
        title={`Chartered Accountant in ${cityName}`}
        subtitle={`Professional CA Services in ${cityName}`}
      />

      {/* Main Client Component */}
      <CityClient
        data={data.cas}
        locationname={data.locationname}
        locationparent={data.parentcity}
        pagetitle={data.pagetitle}
        pagecontent={data.pagecontent}
      />
    </>
  );
}
