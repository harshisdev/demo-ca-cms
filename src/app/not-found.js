import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-cutom-height flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white px-6">
      <div className="text-center">
        {/* 404 Big Text */}
        <h1 className="text-8xl font-extrabold bg-gradient-to-r from-cyan-400 to-blue-500 text-transparent bg-clip-text">
          404
        </h1>

        {/* Title */}
        <h2 className="mt-6 text-2xl font-semibold">Page Not Found</h2>

        {/* Description */}
        <p className="mt-4 text-gray-300 text-sm leading-relaxed">
          The page you’re looking for doesn’t exist or may have been moved.
          Please check the URL or return to the homepage.
        </p>
      </div>
    </div>
  );
}
