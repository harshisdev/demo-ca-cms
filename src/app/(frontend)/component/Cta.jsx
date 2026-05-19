export default function Cta() {
  return (
    <div className="mt-20 text-center">
      <h2 className="text-2xl font-semibold text-blue-900 mb-4">
        Need Help with Tax or GST?
      </h2>

      <p className="text-gray-600 mb-6">
        Contact our Chartered Accountant for expert consultation today.
      </p>

      <div className="flex justify-center gap-4">
        <a
          href="tel:+919582300775"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700"
        >
          Call Now
        </a>

        <a
          href="https://wa.me/919582300775"
          target="_blank"
          className="bg-green-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-600"
        >
          WhatsApp
        </a>
      </div>
    </div>
  );
}
