'use client';
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function PagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
      const [isMenuButtonOpen, setIsMenubuttonOpen] = useState(false);
    
  return (
    <div className="min-h-screen w-full bg-[#f8f8f8] flex flex-col">
        <nav className="bg-ink md:px-6 fixed w-full z-20 border-b border-line">
                <div className="p-2 flex flex-row justify-between items-center container">
                  <div className="flex">
                    <Link href="/">
                    <Image
                      src="/iranti-logo-detailed.svg"
                      alt="Iranti Logo"
                      width={200}
                      height={200}
                      priority
                    />
                    </Link>
                    
                  </div>
        
                  <div className="md:flex hidden justify-between gap-3 py-1">
                    <Link
                      href="/"
                      className="btn-primary bg-brass text-xs py-2 px-3  text-parchment border border-brass hover:bg-ink-light"
                    >
                      Home
                    </Link>
                    <Link
                      href="/pages/search"
                      className="btn-primary bg-brass text-xs py-2 px-3 text-parchment border border-brass hover:bg-ink-light"
                    >
                      Search Records
                    </Link>
                    <Link
                      href="/pages/submitMemorial"
                      className="btn-primary bg-brass text-xs py-2 px-3  text-parchment border border-brass hover:bg-ink-light"
                    >
                      Submit Memorial
                    </Link>
                  </div>
                  <button
                    className="relative md:hidden flex p-2 rounded bg-amber-50"
                    onClick={() => setIsMenubuttonOpen((prev) => !prev)}
                  >
                    <Menu className="h-6 w-6" />
                  </button>
        
                  {isMenuButtonOpen && (
                    <div className="absolute mt-40 flex flex-col border rounded-md bg-amber-50 border-brass px-4 py-2.5 z-9999 right-2">
                      <Link
                        href="/"
                        className=" text-black border-b border-brass hover:bg-ink-light py-2"
                      >
                        Home
                      </Link>
                      <Link
                        href="/pages/search"
                        className=" text-black border-b border-brass hover:bg-ink-light py-2"
                      >
                        Search Records
                      </Link>
                      <Link
                        href="/pages/submitMemorial"
                        className=" text-black border-brass hover:bg-ink-light py-2"
                      >
                        Submit Memorial
                      </Link>
                    </div>
                  )}
                </div>
              </nav>

      <main className="flex-1 w-full pt-15">
        <div className="w-full bg-[#f8f8f8]">
          {children}
        </div>
      </main>

      <footer className="flex flex-col bg-ink pt-8 pb-4 px-10 md:px-25 font-sans w-full">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-80 md:mb-8 mb-6 border-b border-line md:pb-8 px-2">
          <nav aria-label="Registry" className="flex flex-col gap-3">
            <h5 className="flex uppercase text-brass font-mono text-xs mb-3">
              Registry
            </h5>
            <ul className="text-slate text-sm space-y-2">
              <li>
                {" "}
                <Link href="/pages/search" className="text-slate">
                  Search Records
                </Link>
              </li>
              <li>
                {" "}
                <Link href="/pages/submitMemorial" className="text-slate">
                  Submit a Memorial
                </Link>
              </li>
              <li>
                {" "}
                <Link href="/" className="text-slate">
                  Request Access
                </Link>
              </li>
              <li>
                {" "}
                <Link href="/#howItWorks" className="text-slate">
                  How it Works
                </Link>
              </li>
            </ul>
          </nav>

          <nav aria-label="Legal" className="flex flex-col gap-3">
            <h5 className="flex uppercase text-brass font-mono text-xs mb-3">
              Legal
            </h5>
            <ul className="text-slate text-sm space-y-2">
              <li>
                {" "}
                <Link href="/pages/terms_privacy/privacy" className="text-slate">
                  Privacy Policy
                </Link>
              </li>
              <li>
                {" "}
                <Link href="/pages/terms_privacy/terms" className="text-slate">
                  Terms of Use
                </Link>
              </li>
              <li>
                {" "}
                <Link href="/#" className="text-slate">
                  Data protection
                </Link>
              </li>
            </ul>
          </nav>

          <nav
            aria-label="Contact"
            className="flex flex-col gap-3 md:mb-0 mb-8"
          >
            <h5 className="flex uppercase text-brass font-mono text-xs mb-3">
              Contact
            </h5>
            <ul className="text-slate text-sm space-y-2">
              <li className="text-slate">info@iranting.com</li>
              <li className="text-slate"> Submit a Memorial</li>
            </ul>
          </nav>
        </div>

        <div className="mb-2 flex flex-col md:flex-row justify-between px-0 md:items-center gap-4 md:gap-0">
          <div className="flex text-slate md:justify-start">
            <p className="text-xs font-normal font-mono">
              &copy; 2026 . Ìrántí Registry.
            </p>
          </div>

          <div className="flex uppercase text-slate md:justify-end">
            <p className="text-xs font-normal font-mono">
              {" "}
              Ìrántí — {` `} <span className="text-brass"> {` `} Memory </span>{" "}
              {` `} in Yoruba
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
