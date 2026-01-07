'use client'
import { usePathname } from "next/navigation";

export default function Nav({}) {
  const pathname = usePathname()
  return <div className="flex justify-center bg-zinc-50">
          <div className="w-full max-w-4xl h-16 border-b-1 bg-white
            flex flex-row justify-start px-6 gap-4 items-center
            text-2xl text-foreground font-bold"
          >
            <a href="/" className={`
              ${"/" === pathname ? "italic" : ""}`}>
              Home
            </a>
            <a href="/about" className={`
              ${"/about" === pathname ? "italic" : ""}`}>
              About
            </a>
          </div>
        </div>
}
