"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FileText, Menu, Monitor, Shield, Users } from "lucide-react";

export default function AboutPage() {
  const [isMenuButtonOpen, setIsMenubuttonOpen] = useState(false);

  return (
    <div className="flex flex-col p-0 m-0 min-h-screen md:max-w-full mx-auto overflow-hidden max-w-md">
      <nav className="bg-ink md:px-6 fixed w-full z-20 border-b border-line">
        <div className="p-2 flex flex-row justify-between items-center container">
          <div className="flex">
            <Image
              src="/iranti-logo-detailed.svg"
              alt="Iranti Logo"
              width={200}
              height={200}
              priority
            />
          </div>

          <div className="md:flex hidden justify-between gap-3 py-1">
            <Link
              href="/search"
              className="btn-primary bg-transparent text-xs py-2 px-3 text-parchment border border-parchment hover:bg-ink-light"
            >
              Search Records
            </Link>
            <Link
              href="/submitMemorial"
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
                href="/search"
                className=" text-black border-b border-brass hover:bg-ink-light py-2"
              >
                Search Records
              </Link>
              <Link
                href="/submitMemorial"
                className=" text-black border-brass hover:bg-ink-light py-2"
              >
                Submit Memorial
              </Link>
            </div>
          )}
        </div>
      </nav>

      <section
        id="submit"
        className="flex flex-col md:px-6 px-2 justify-between bg-[#FDFAF5] mt-20"
      >
        {/* search */}
        <div className="flex flex-row">
          <div className="flex flex-col gap-3.5 p-2 mx-auto">
            <div className="flex items-center gap-2 mt-5 md:mt-20 pl-5 md:pl-0">
              <span className="w-6 h-px border-brass border items-center justify-around inline" />
              <span className="flex mt-4 text-xs items-center justify-around mb-5 gap-2 font-medium font-mono text-brass uppercase">
                About Ìrántí{" "}
              </span>
            </div>

            <div className="flex flex-col">
              <h1 className="flex text-3xl md:text-6xl font-light text-ink flex-col">
                A registry born from a <br /> <span>question</span>
                <span className="text-brass italic">never answered.</span>
              </h1>

              <p className="flex text-ink-light mb-6 md:mb-10 text-sm md:text-base mt-7">
                Ìrántí means memory in Yoruba. This platform exists because
                burial
                <br /> records in Nigeria disappear — and families are left with
                silence where
                <br /> graves should be.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col md:px-64 px-2 py-8 justify-between bg-ink font-mono overflow-hidden">
        <div className="flex flex-col mx-auto px-6 md:px-16 py-5 items-center justify-center">
          <p className="font-serif font-normal italic text-parchment mb-6 text-center md:text-[3vw] text-2xl">
            {'"I asked my dad where my mom was buried'} <br /> {"He said"}{" "}
            <span className="text-brass">{`he doesn't remember"`}</span>
          </p>
          <p className="font-mono uppercase text-center text-xs text-slate">
            - The question that started this project
          </p>
        </div>
      </section>

      <section className="flex flex-col items-center justify-center bg-[#FDFAF5] font-mono">
        <div className="flex flex-col mx-auto px-8 py-20 my-0 max-w-170">
          <p className="uppercase text-base mb-5 font-mono text-ink-light">
            the origin
          </p>
          <p className="md:text-3xl text-2xl font-serif text-ink font-semibold mb-8">
            Where this idea came from
          </p>

          <p className="text-base text-ink-light mb-5 font-sans">
            My mother passed away in 1993 — the same year I was born. For all 33
            years of my life, I have not known where she is buried. No grave to
            visit. No location to return to. No record that pointed to where she
            was laid to rest.
          </p>

          <p className="text-base text-ink-light mb-5 font-sans">
            When I finally asked my father, he could not remember. Not because
            he did not care — but because in Nigeria in 1993, and still today,
            there is no system that preserves that information. Burial records
            are written on paper, kept by church administrators, LGA offices, or
            family members who have since passed. Over time, the knowledge
            disappears.
          </p>

          <p className="text-base text-ink-light mb-5 font-sans">
            That silence made me ask a question I could not stop thinking about:{" "}
            <b>
              what if there was a national platform that kept this information?
            </b>{" "}
            What if families never had to lose a grave again?
          </p>

          <p className="text-base text-ink-light mb-5 font-sans">
            That question became Ìrántí Registry. I am building it so that no
            child grows up without knowing where their parent rests. So that no
            family loses a grave to fading memory, missing paperwork, or the
            passage of time.
          </p>

          <p className="font-serif text-[1.1rem] italic text-ink pt-8 border-t border-line">
            This is not just a software project. It is something I needed to
            exist in the world — and it is being built for every Nigerian family
            that has carried the same silence.
          </p>
        </div>
      </section>

      <section className="flex flex-col md:px-64 py-8 px-2 items-center justify-between bg-parchment font-mono">
        <div className="flex flex-col px-8 py-5">
          <div className="flex uppercase text-brass font-mono mb-3 text-xs md:text-sm text-left">
            What Ìrántí does
          </div>
          <div className="flex font-serif text-ink text-3xl md:text-4xl text-left font-semibold mb-14">
            A registry that protects, preserves, and gives access
          </div>

          <div className="flex flex-col gap-5 justify-center">

            <div className="flex flex-col gap-1  md:py-8 pb-8 md:mb-4 border-b border-line">
              <h3 className="flex font-semibold font-serif text-lg md:text-xl text-ink mb-2.5">
                Searchable public records across all 36 states
              </h3>
              <p className="flex text-ink-light text-sm md:text-base font-sans">
                Anyone can search verified burial records by name, state, or
                year of passing — from Lagos, London, or wherever they are in
                the world. No account required.
              </p>
            </div>

            <div className="flex flex-col gap-1  md:py-8 pb-8 md:mb-4 border-b border-line">
              <h3 className="flex font-semibold font-serif text-lg md:text-xl text-ink mb-2.5">
                Family-submitted, document-verified memorials
              </h3>
              <p className="flex text-ink-light text-sm md:text-base font-sans">
                Every record requires a death certificate and valid ID before
                going live. A verified badge means a real person reviewed real
                documents — not an algorithm.
              </p>
            </div>

            <div className="flex flex-col gap-1  md:py-8 pb-8 md:mb-4 border-b border-line">
              <h3 className="flex font-semibold font-serif text-lg md:text-xl text-ink mb-2.5">
                Burial location sealed and family-controlled
              </h3>
              <p className="flex text-ink-light text-sm md:text-base font-sans">
                Exact plot numbers, GPS coordinates, and caretaker contacts are
                never publicly visible. The next of kin decides who sees them.
                Every access request is logged.
              </p>
            </div>

            <div className="flex flex-col gap-1 md:py-8 pb-8 md:mb-4">
              <h3 className="flex font-semibold font-serif text-lg md:text-xl text-ink mb-2.5">
                Built for institutions as well as families
              </h3>
              <p className="flex text-ink-light text-sm md:text-base font-sans">
                Pension boards, insurers, and banks can request verified death
                confirmation with family consent — reducing ghost pensioner
                fraud and disputed estate claims.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="flex flex-col bg-ink pt-12 pb-6 px-10 md:px-25 font-sans w-full">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-80 md:mb-12 mb-6 border-b border-line pb-6 md:pb-16 px-2">
          <nav aria-label="Registry" className="flex flex-col gap-3">
            <h5 className="flex uppercase text-brass font-mono text-xs mb-3">
              Registry
            </h5>
            <ul className="text-slate text-sm space-y-2">
              <li>
                {" "}
                <Link href="/#search" className="text-slate">
                  Search Records
                </Link>
              </li>
              <li>
                {" "}
                <Link href="/submitMemorial" className="text-slate">
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
                <Link href="/#" className="text-slate">
                  Privacy Policy
                </Link>
              </li>
              <li>
                {" "}
                <Link href="/#" className="text-slate">
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

        <div className="mb-12 flex flex-col md:flex-row justify-between px-0 md:items-center gap-4 md:gap-0">
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
