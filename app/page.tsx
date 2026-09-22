"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { nigerianStates, type NigerianState } from "./data/states";
import { FileText, Menu, Monitor, Shield, Users } from "lucide-react";

export default function HomePage() {
  const [isMenuButtonOpen, setIsMenubuttonOpen] = useState(false);
  const [naijaStates, setNaijaStates] = useState<NigerianState | "">("");

  return (
    <div className="flex flex-col p-0 m-0 min-h-screen md:max-w-full mx-auto overflow-hidden max-w-md">
      <nav className="bg-ink md:px-6 fixed w-full z-20 mb-20 border-b border-line">
        <div className="p-2 flex flex-row justify-between items-center container">
          <div className="">
            <Image
              src="/iranti-logo-detailed.svg"
              alt="Iranti Logo"
              width={500}
              height={500}
              priority
            />
          </div>

          <div className="md:flex hidden justify-between gap-3 md:py-3 py-1">
            <Link
              href="/search"
              className="btn-outline text-parchment border border-parchment hover:bg-ink-light"
            >
              Search Records
            </Link>
            <Link
              href="/submitMemorial"
              className="btn-outline text-parchment border border-parchment hover:bg-ink-light"
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
        className="flex flex-col md:px-10 px-2 justify-between bg-ink md:bg-black md:mt-40 mt-32"
      >
        {/* search */}
        <div className="flex flex-row">
          <div className="flex flex-col gap-3.5 md:p-5 p-2">
            <div className="flex items-center justify-center gap-4 mt-5 md:mt-20 pl-5 md:pl-10">
              <span className="w-6 h-px border-brass border items-center justify-around inline" />
              <span className="flex mt-2 text-base items-center justify-around mb-5 gap-2 font-medium font-mono text-brass uppercase">
                nigeria`s first digital burial registry
              </span>
            </div>

            <div>
              <h3 className="flex text-3xl md:text-6xl pl-10 font-bold text-[#ffffff] flex-col">
                Every life deserves <br />{" "}
                <span className="text-brass">to be remembered.</span>
              </h3>

              <p className="flex text-slate mb-6 md:mb-10 text-sm md:text-lg pl-10">
                Ìrántí Registry is a community-verified platform where families
                can <br /> preserve and protect burial records across Nigeria —
                so no one is forgotten, <br /> and no grave is lost.
              </p>
            </div>

            <div className="flex justify-center gap-10 md:py-3 py-1">
              <Link
                href="/search"
                className="btn-outline text-parchment border border-parchment hover:bg-ink-light"
              >
                Search Records
              </Link>
              <Link
                href="/submitMemorial"
                className="bg-brass rounded-md py-2 px-3 text-parchment border border-parchment hover:bg-ink-light"
              >
                Submit Memorial
              </Link>
            </div>
          </div>
          <div className="md:flex hidden">
            <Image
              src="/Memorial candle.jpg"
              alt="memorial candle"
              width={1000}
              height={1000}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 border-t border-parchment px-2 md:px-5 items-center justify-between md:mx-5 gap-4 my-2 py-8">
          <div className="flex flex-col gap-2 pl-5 md:pl-20 md:border-r border-parchment mb-4 border-b md:border-b-0">
            <span className="flex text-5xl text-parchment font-serif text-left font-bold">
              36
            </span>
            <span className="flex text-2xs font-light text-slate font-mono mb-2 uppercase my-1.5">
              states covered
            </span>
          </div>

          <div className="flex flex-col gap-2 pl-5 md:pl-20 mb-4 border-b md:border-b-0 border-parchment">
            <span className="flex text-5xl text-parchment font-serif text-left font-bold">
              Family
            </span>
            <span className="flex text-2xs font-light text-slate font-mono mb-2 uppercase my-1.5">
              verified claims
            </span>
          </div>

          <div className="flex flex-col gap-2 pl-5 md:pl-20 md:border-l border-parchment mb-4">
            <span className="flex text-5xl text-parchment font-serif text-left font-bold">
              Protected
            </span>
            <span className="flex text-2xs font-light text-slate font-mono uppercase my-1.5">
              burial details
            </span>
          </div>
        </div>
      </section>

      <section className="flex flex-col md:px-10 px-2 justify-between bg-parchment font-mono">
        <div className="flex flex-col md:flex-row mx-auto border-line rounded-xl shadow-md py-6 px-5 w-full md:w-7xl my-10 bg-[#ffffff] gap-4">
          <div className="flex flex-col gap-3">
            <label htmlFor="search" className="text-xs color-">
              Full Name
            </label>
            <input
              type="search"
              placeholder="search by name"
              className="md:w-4xl w-full border border-line flex p-3 rounded-md"
              id="search"
            />
          </div>

          <div className="flex flex-col gap-3">
            <label htmlFor="search" className="text-xs color-">
              State
            </label>
            <select
              value={naijaStates}
              onChange={(e) =>
                setNaijaStates(e.target.value as NigerianState | "")
              }
              className="w-full rounded-md p-3 border border-line"
            >
              <option value=""> Select state</option>
              {nigerianStates.map((n) => (
                <option value={n} key={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-3">
            <label htmlFor="search" className="text-xs color-"></label>
            <button className="flex bg-ink rounded-md text-[#ffffff] p-4 font-normal text-sm border-box pointer mt-3 whitespace-nowrap mx-auto md:mx-0">
              Search Records
            </button>
          </div>
        </div>

        <div className="flex flex-col mx-auto px-6 py-5 items-center justify-center">
          <div className="flex uppercase text-brass font-mono mb-3 text-sm text-center">
            the process
          </div>
          <div
            id="howItWorks"
            className="flex font-serif text-ink text-2xl md:text-4xl text-center font-semibold mb-10"
          >
            How Ìrántí works
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mt-5 px-2 md:px-25 items-center justify-center">
            <div className="flex flex-col gap-3 mb-4">
              <span className="flex items-center rounded-full border border-line w-14 h-14 bg-ink mb-5 text-brass justify-center font-serif text-4xl font-bold">
                1
              </span>
              <h3 className="flex font-semibold font-serif text-xl">
                Submit a Memorial
              </h3>
              <p className="flex text-ink-light text-base font-sans">
                A family member fills out a 4-step form with the deceased`s
                details, their relationship, and supporting documents.
              </p>
            </div>

            <div className="flex flex-col gap-3 mb-4">
              <span className="flex items-center rounded-full border border-line w-14 h-14 bg-ink mb-5 text-brass justify-center font-serif text-4xl font-bold">
                2
              </span>
              <h3 className="flex font-semibold font-serif text-xl">
                Verification Review
              </h3>
              <p className="flex text-ink-light text-base font-sans">
                Our team reviews the submitted documents — death certificate,
                valid ID, burial permit — before the record goes live.{" "}
              </p>
            </div>

            <div className="flex flex-col gap-3 mb-4">
              <span className="flex items-center rounded-full border border-line w-14 h-14 bg-ink mb-5 text-brass justify-center font-serif text-4xl font-bold">
                3
              </span>
              <h3 className="flex font-semibold font-serif text-xl">
                Record goes public
              </h3>
              <p className="flex text-ink-light text-base font-sans">
                Once verified, the memorial is searchable. Public info is
                visible to all; burial location details stay protected.
              </p>
            </div>

            <div className="flex flex-col gap-3 mb-4">
              <span className="flex items-center rounded-full border border-line w-14 h-14 bg-ink mb-5 text-brass justify-center font-serif text-4xl font-bold">
                4
              </span>
              <h3 className="flex font-semibold font-serif text-xl">
                Access on Request
              </h3>
              <p className="flex text-ink-light text-base font-sans">
                Anyone can request access to sealed burial details. The primary
                family admin reviews and approves or declines.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col md:px-10 px-2 justify-between bg-ink font-mono">
        <div className="flex flex-col mx-auto px-6 py-5 items-center justify-center mt-10">
          <div className="flex uppercase text-brass font-mono mb-3 text-sm text-center">
            why this matters
          </div>
          <div className="flex font-serif text-[#ffffff] text-2xl md:text-4xl text-center font-semibold mb-10">
            {" The problem we're solving "}
          </div>

          <div className="flex text-slate text-sm md:text-base text-center font-normal font-sans mb-10 max-w-520px">
            <p>
              Across Nigeria, burial records are fragmented — scattered across
              LGA <br /> offices, church registries, and paper logs. Families
              lose graves. <br /> Diaspora communities lose history.
              Institutions cannot verify deaths.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mt-5 px-2 md:px-25 items-center justify-center">
            <div className="flex flex-col gap-3 mb-4 border border-[#e7e0d11f] rounded-xl p-7 bg-[rgba(247,243,234,0.05)]">
              <span className="flex items-center rounded-lg w-10 h-10 bg-[#b8923f26] mb-5 text-brass justify-center font-serif text-4xl font-bold">
                <Users />
              </span>
              <h3 className="flex font-semibold font-serif text-xl text-parchment">
                For diaspora families
              </h3>
              <p className="flex text-slate text-sm font-sans">
                Nigerians abroad can search for and locate the graves of
                relatives they could not visit, preserving connection across
                distance.
              </p>
            </div>

            <div className="flex flex-col gap-3 mb-4 border border-[#e7e0d11f] rounded-xl p-7 bg-[rgba(247,243,234,0.05)]">
              <span className="flex items-center rounded-lg w-10 h-10 bg-[#b8923f26] mb-5 text-brass justify-center font-serif text-4xl font-bold">
                <Monitor />
              </span>
              <h3 className="flex font-semibold font-serif text-xl text-parchment">
                For institutions
              </h3>
              <p className="flex text-slate text-sm font-sans">
                Pension boards, insurers, and banks can verify deaths with
                family consent — reducing ghost pensioner fraud and disputed
                claims.
              </p>
            </div>

            <div className="flex flex-col gap-3 mb-4 border border-[#e7e0d11f] rounded-xl p-7 bg-[rgba(247,243,234,0.05)]">
              <span className="flex items-center rounded-lg w-10 h-10 bg-[#b8923f26] mb-5 text-brass justify-center font-serif text-4xl font-bold">
                <Shield />
              </span>
              <h3 className="flex font-semibold font-serif text-xl text-parchment">
                Privacy first
              </h3>
              <p className="flex text-slate text-sm font-sans">
                Burial location details are sealed by default. Only verified
                next of kin control who gets access, and every request is
                logged.
              </p>
            </div>

            <div className="flex flex-col gap-3 mb-4 border border-[#e7e0d11f] rounded-xl p-7 bg-[rgba(247,243,234,0.05)]">
              <span className="flex items-center rounded-lg w-10 h-10 bg-[#b8923f26] mb-5 text-brass justify-center font-serif text-4xl font-bold">
                <FileText />
              </span>
              <h3 className="flex font-semibold font-serif text-xl text-parchment">
                Document Verified
              </h3>
              <p className="flex text-slate text-sm font-sans">
                Every record requires a death certificate and valid ID before
                going live. No unverified submissions appear in search results.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col md:px-10 px-2 justify-between bg-parchment font-mono">
        <div className="flex flex-col mx-auto px-6 py-5 items-center justify-center mt-10">
          <div className="flex mb-3">
            <Image
            src="/iranti-logo-simple.svg"
            alt="iranti logo"
            width={200}
            height={200}
            />
          </div>
          
          <div className="flex font-serif text-ink text-2xl md:text-5xl text-center font-bold mb-10">
            Preserve their memory.
            <br />
            Protect their resting place.
          </div>

          <div className="flex text-ink-light text-sm md:text-base text-center font-normal font-sans mb-10 max-w-520px">
            <p>
              {`Whether you're a family seeking closure, a researcher tracing ancestry, or an institution verifying records — Ìrántí is for you.`}
            </p>
          </div>

          <div className="flex justify-center gap-10 md:py-3 py-1">
              <Link
                href="/search"
                className="bg-ink rounded-md py-3.5 px-2 md:px-7 text-parchment border border-parchment hover:bg-ink-light text-xs md:text-base"
              >
                Search Records
              </Link>
              <Link
                href="/submitMemorial"
                className="bg-brass rounded-md py-3.5 px-2 md:px-7 text-parchment border border-parchment hover:bg-ink-light text-xs md:text-base"
              >
                Submit Memorial
              </Link>
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
