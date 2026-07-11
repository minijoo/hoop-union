'use client'
import { usePathname } from "next/navigation";

export default function Nav({ }) {
  const pathname = usePathname()
  return <div className="sticky flex justify-center bg-zinc-50 top-0" style={{ zIndex: 10 }}>
    <div className="w-full max-w-4xl h-10 bg-blue-200 border-b-2 py-1 flex flex-row justify-start px-6 gap-4 items-center text-lg text-foreground">
      <a href="/" className="click-icon size-7 bg-white border-x-3 border-y-4 border-blue-900 text-blue-900 flex justify-center items-center">
        <div className="row-span-4 text-center text-sm font-bold scale-y-75">HU</div>
      </a>
      <a href="/" className={`click-link no-underline! hover:underline!
              ${"/" === pathname ? "font-bold" : ""}`}>
        Home
      </a>
      <a href="/about" className={`click-link no-underline! hover:underline!
              ${"/about" === pathname ? "font-bold" : ""}`}>
        About
      </a>
    </div>
  </div>
}
