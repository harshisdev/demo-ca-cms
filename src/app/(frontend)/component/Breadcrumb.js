import Link from "next/link";

export default function Breadcrumb({ items }) {
  return (
    <nav className="text-sm text-gray-600 mb-6">
      <ol className="flex flex-wrap items-center space-x-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {index !== 0 && <span className="mx-2">›</span>}

            {item.href ? (
              <Link href={item.href} className="hover:text-blue-700 transition">
                {item.label}
              </Link>
            ) : (
              <span title={item.label} className="text-gray-900 font-medium truncate max-w-[150px] sm:max-w-full">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
