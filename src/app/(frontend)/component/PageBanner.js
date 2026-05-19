export default function PageBanner({ title, subtitle }) {
  return (
    <section className="relative overflow-hidden text-white py-24 text-center">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/page-banner.png')" }}
      ></div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 via-blue-900/60 to-blue-800/70"></div>

      <div className="absolute top-1/2 left-1/2 w-[700px] h-[700px] -translate-x-1/2 -translate-y-1/2 bg-blue-500/20 blur-[120px] rounded-full"></div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          {title}
        </h1>

        {subtitle && (
          <p className="mt-4 text-blue-200 text-lg max-w-2xl mx-auto">
            {subtitle}
          </p>
        )}
      </div>
    </section>
  );
}
