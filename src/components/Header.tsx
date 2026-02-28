import Link from "next/link";
import { PHONE } from "@/lib/seo";

export default function Header() {
  return (
    <header className="border-b border-zinc-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold tracking-tight text-zinc-900">
            The<span className="text-blue-600">NYC</span>SEO
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <Link
            href="/services"
            className="text-sm font-medium text-zinc-600 hover:text-zinc-900"
          >
            Services
          </Link>
          <Link
            href="/areas"
            className="text-sm font-medium text-zinc-600 hover:text-zinc-900"
          >
            Service Areas
          </Link>
          <Link
            href="/about"
            className="text-sm font-medium text-zinc-600 hover:text-zinc-900"
          >
            About
          </Link>
          <a
            href={`tel:${PHONE.replace(/-/g, "")}`}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
          >
            {PHONE}
          </a>
        </nav>

        <a
          href={`tel:${PHONE.replace(/-/g, "")}`}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 md:hidden"
        >
          Call Now
        </a>
      </div>
    </header>
  );
}
