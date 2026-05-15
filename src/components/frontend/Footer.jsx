export default function Footer() {
  return (
    <footer className="relative overflow-hidden text-gray-200 bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-900">
      {/* MAIN FOOTER */}
      <div className="max-w-7xl mx-auto px-6 py-14 grid gap-10 md:grid-cols-4">
        {/* Company Info */}
        <div>
          <a href="/" className="text-xl font-bold text-white">
            <svg
              width="220"
              height="60"
              viewBox="0 0 220 60"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="0" y="8" width="44" height="44" rx="10" fill="#1D4ED8" />

              <text
                x="22"
                y="38"
                textAnchor="middle"
                fontFamily="Roboto, sans-serif"
                fontSize="22"
                fontWeight="700"
                fill="white"
              >
                CA
              </text>

              <text
                x="60"
                y="32"
                fontFamily="Roboto, sans-serif"
                fontSize="20"
                fontWeight="700"
                fill="#fff"
              >
                Delhi NCR
              </text>

              <text
                x="60"
                y="48"
                fontFamily="Roboto, sans-serif"
                fontSize="11"
                fill="#fff"
              >
                Chartered Accountants
              </text>
            </svg>
          </a>

          <p className="text-gray-300 text-sm leading-relaxed mb-6 max-w-md">
            CA Delhi NCR provides professional Chartered Accountant services
            including Income Tax Filing, GST Registration, Company Registration,
            Audit, and Financial Advisory across Delhi NCR.
          </p>

          <div className="space-y-2 text-sm text-gray-300">
            <p>📧 rahulray100@gmail.com</p>
            <p>📍 Delhi | Noida | Gurgaon, India</p>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-white tracking-wide">
            Quick Links
          </h3>

          <ul className="space-y-2 text-sm text-gray-300">
            <li>
              <a href="/" className="hover:text-white transition">
                Home
              </a>
            </li>

            <li>
              <a href="/about" className="hover:text-white transition">
                About Us
              </a>
            </li>

            <li>
              <a href="/services" className="hover:text-white transition">
                Services
              </a>
            </li>

            <li>
              <a href="/blog" className="hover:text-white transition">
                Blog
              </a>
            </li>

            <li>
              <a href="/contact" className="hover:text-white transition">
                Contact Us
              </a>
            </li>
          </ul>
        </div>

        {/* Top Cities */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-white tracking-wide">
            Top Cities in NCR
          </h3>

          <ul className="space-y-2 text-sm text-gray-300">
            <li>
              <a href="/delhi" className="hover:text-white transition">
                CA in Delhi
              </a>
            </li>

            <li>
              <a href="/noida" className="hover:text-white transition">
                CA in Noida
              </a>
            </li>

            <li>
              <a href="/gurgaon" className="hover:text-white transition">
                CA in Gurgaon
              </a>
            </li>

            <li>
              <a href="/faridabad" className="hover:text-white transition">
                CA in Faridabad
              </a>
            </li>
          </ul>
        </div>

        {/* Locations */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-white tracking-wide">
            CA Services in Delhi NCR
          </h3>

          <ul className="grid gap-x-6 gap-y-2 text-sm text-gray-300">
            <li>
              <a href="/rohini" className="hover:text-white transition">
                Rohini
              </a>
            </li>

            <li>
              <a href="/dwarka" className="hover:text-white transition">
                Dwarka
              </a>
            </li>

            <li>
              <a href="/pitampura" className="hover:text-white transition">
                Pitampura
              </a>
            </li>

            <li>
              <a href="/laxmi-nagar" className="hover:text-white transition">
                Laxmi Nagar
              </a>
            </li>

            <li>
              <a href="/karol-bagh" className="hover:text-white transition">
                Karol Bagh
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* LEGAL LINKS */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-wrap justify-center gap-4 text-sm text-gray-300">
          <a href="/privacy-policy" className="hover:text-white transition">
            Privacy Policy
          </a>

          <span>|</span>

          <a
            href="/terms-and-conditions"
            className="hover:text-white transition"
          >
            Terms & Conditions
          </a>

          <span>|</span>

          <a href="/cookie-policy" className="hover:text-white transition">
            Cookie Policy
          </a>

          <span>|</span>

          <a href="/disclaimer" className="hover:text-white transition">
            Disclaimer
          </a>
        </div>
      </div>

      {/* COPYRIGHT */}
      <div className="border-t border-white/10 bg-black/20 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-gray-300 text-sm text-center md:text-left">
            © 2026 CA Delhi NCR. All Rights Reserved.
          </p>

          <p className="text-gray-300 text-sm text-center md:text-right">
            Designed & Developed by Harsh Kumar
          </p>
        </div>
      </div>
    </footer>
  );
}
