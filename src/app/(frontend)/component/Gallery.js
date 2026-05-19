export default function GallerySection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">
            Trusted Chartered Accountant Firm in Delhi NCR
          </h2>
          <p className="text-gray-600 mt-3">
            Delivering professional CA services across Delhi, Noida & Gurgaon.
          </p>
        </div>

        <div className="rounded-2xl overflow-hidden shadow-xl">
          <img
            src="/images/ca-office.png"
            alt="Chartered Accountant Office"
            className="w-full rounded-xl"
          />
        </div>
      </div>
    </section>
  );
}
