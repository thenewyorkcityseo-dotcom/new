import Link from "next/link";
import { getBreadcrumbSchema } from "@/lib/seo";

interface BreadcrumbItem {
  name: string;
  url: string;
}

export default function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  const allItems = [{ name: "Home", url: "/" }, ...items];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getBreadcrumbSchema(allItems)),
        }}
      />
      <nav aria-label="Breadcrumb" className="text-sm text-zinc-500">
        <ol className="flex flex-wrap items-center gap-1">
          {allItems.map((item, i) => (
            <li key={item.url} className="flex items-center gap-1">
              {i > 0 && <span className="text-zinc-300">/</span>}
              {i < allItems.length - 1 ? (
                <Link href={item.url} className="hover:text-blue-600">
                  {item.name}
                </Link>
              ) : (
                <span className="text-zinc-900 font-medium">{item.name}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
