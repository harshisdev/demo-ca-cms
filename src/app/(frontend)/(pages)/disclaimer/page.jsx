import Breadcrumb from "@/components/Breadcrumb";
import PageBanner from "@/components/PageBanner";

export const metadata = {
  title: "Disclaimer | CA in Delhi NCR",
  description:
    "Disclaimer regarding the information and services provided on the CA in Delhi NCR website.",
  alternates: {
    canonical: "https://cadelhincr.com/disclaimer",
  },
};

export default function DisclaimerPage() {
  return (
    <>
<section className="py-16 bg-gray-50"> 

        <div className="max-w-7xl mx-auto px-4 rounded-2xl">
          <h1 className="text-3xl font-bold mb-4">
            Website Disclaimer
          </h1>

          <p className="text-gray-600 text-sm mb-8">
            Last Updated: January 2026
          </p>

          <p className="text-gray-700 mb-6">
            The information contained on this website is provided by
            <strong> CA Delhi NCR </strong> for general informational purposes
            only. While we strive to keep the information accurate and
            up-to-date, we make no guarantees of any kind regarding the
            completeness, accuracy, reliability, suitability, or availability of
            the information contained on the website.
          </p>

          {/* No Professional Advice */}
          <h2 className="text-xl font-semibold  mt-8 mb-3">
            1. No Professional Advice
          </h2>

          <p className="text-gray-700 mb-6">
            The content on this website is intended for general information only
            and should not be considered as professional, financial, legal, or
            tax advice. Visitors are advised to seek professional consultation
            before making any financial or business decisions.
          </p>

          {/* No Client Relationship */}
          <h2 className="text-xl font-semibold  mt-8 mb-3">
            2. No Client Relationship
          </h2>

          <p className="text-gray-700 mb-6">
            Accessing or using this website does not create a Chartered
            Accountant–client relationship between the user and CA Delhi NCR. A
            professional relationship is established only after a formal
            engagement agreement has been signed.
          </p>

          {/* Accuracy */}
          <h2 className="text-xl font-semibold  mt-8 mb-3">
            3. Accuracy of Information
          </h2>

          <p className="text-gray-700 mb-6">
            Although we make every effort to keep the website information
            current and accurate, laws, tax regulations, and financial rules
            change frequently. Therefore, we cannot guarantee that all
            information on the website is always up-to-date or free from errors.
          </p>

          {/* External Links */}
          <h2 className="text-xl font-semibold  mt-8 mb-3">
            4. External Links
          </h2>

          <p className="text-gray-700 mb-6">
            This website may contain links to third-party websites for
            additional resources or information. We have no control over the
            nature, content, and availability of those websites and do not
            endorse or assume responsibility for their content.
          </p>

          {/* Limitation of Liability */}
          <h2 className="text-xl font-semibold  mt-8 mb-3">
            5. Limitation of Liability
          </h2>

          <p className="text-gray-700 mb-6">
            Under no circumstances shall CA Delhi NCR or its partners,
            employees, or affiliates be liable for any loss or damage, including
            indirect or consequential loss, arising from the use of this website
            or reliance on any information provided on this website.
          </p>

          {/* Website Availability */}
          <h2 className="text-xl font-semibold  mt-8 mb-3">
            6. Website Availability
          </h2>

          <p className="text-gray-700 mb-6">
            We strive to keep the website accessible and functioning smoothly.
            However, we take no responsibility for temporary unavailability due
            to technical issues beyond our control.
          </p>

          {/* Consent */}
          <h2 className="text-xl font-semibold  mt-8 mb-3">
            7. Consent
          </h2>

          <p className="text-gray-700 mb-6">
            By using our website, you hereby consent to this disclaimer and
            agree to its terms.
          </p>

          {/* Contact */}
          <h2 className="text-xl font-semibold  mt-8 mb-3">
            8. Contact Us
          </h2>

          <p className="text-gray-700">
            If you have any questions regarding this disclaimer, you may contact
            us at:
          </p>

          <p className="text-gray-800 mt-4">
            <strong>Email:</strong> rahulray100@gmail.com
          </p>
        </div>
      </section>
    </>
  );
}
