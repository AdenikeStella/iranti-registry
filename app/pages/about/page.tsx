"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Menu } from "lucide-react";
import { HiUserGroup } from "react-icons/hi2";
import { FaHeart } from "react-icons/fa";
import { AiFillFile } from "react-icons/ai";
import { GiArchiveResearch } from "react-icons/gi";

const builtForData = [
  {
    icon: <HiUserGroup className="text-brass w-4.5 h-4.5 absolute" />,
    header: "Diaspora Nigerians",
    body: "Nigerians abroad searching for the burial site of a parent or grandparent they could not visit — from anywhere in the world.",
  },
  {
    icon: <FaHeart className="text-brass w-4.5 h-4.5 absolute" />,
    header: "Families seeking closure",
    body: "People who lost contact with burial records through relocation, estrangement, or the passing of those who held the knowledge.",
  },
  {
    icon: <AiFillFile className="text-brass w-4.5 h-4.5 absolute" />,
    header: "Pension boards & insurers",
    body: "Institutions verifying deaths to prevent ghost pensioner fraud and fraudulent insurance claims — with family consent built in.",
  },
  {
    icon: <GiArchiveResearch className="text-brass w-4.5 h-4.5 absolute" />,
    header: "Ancestry researchers",
    body: "Individuals and organisations tracing Nigerian family trees and genealogies who need a searchable, verified starting point.",
  },
];

const standForData = [
  {
    icon: "Dignity",
    header: "Every life deserves a permanent record",
    body: "The platform's design, tone, and experience are built around the gravity of remembrance. We treat every memorial with the care a family member would expect.",
  },
  {
    icon: "Trust",
    header: "Verification before anything goes live",
    body: "Nothing is published without a reviewed death certificate. A verified badge on Ìrántí means a real person checked real documents. We will not automate that away.",
  },
  {
    icon: "Privacy",
    header: "Family controls what is shared",
    body: "Sensitive burial details are sealed by default and released only by family decision. Built in compliance with Nigeria's Data Protection Act 2023 and NDPC Guidelines.",
  },
  {
    icon: "Access",
    header: "Free to search, always",
    body: "Searching the registry is always free — no login, no subscription. Built mobile-first for the way most Nigerians access the internet.",
  },
];

export default function AboutPage() {
  // const [isMenuButtonOpen, setIsMenubuttonOpen] = useState(false);

  return (
    <div>
      <section className="flex flex-col md:px-6 px-2 justify-between bg-[#FDFAF5]">
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

      <section className="flex flex-col md:px-52 py-8 px-2 items-center justify-between bg-parchment font-mono">
        <div className="flex flex-col px-8 py-5">
          <div className="flex uppercase text-brass font-mono mb-3 text-[10px] font-light text-left">
            {`who it's built for`}
          </div>
          <div className="flex font-serif text-ink text-3xl md:text-4xl text-left font-semibold mb-14">
            Everyone who has ever lost a grave
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px justify-center bg-line border border-line rounded-xl overflow-hidden">
            {builtForData.map((data) => (
              <div
                key={data.header}
                className="flex flex-col gap-3 p-7 border-r border-line bg-[#FDFAF5]"
              >
                <span className="flex relative bg-parchment border border-line mb-3.5 rounded-lg px-3 py-2 w-9 h-9 items-center justify-center">
                  {data.icon}
                </span>
                <h3 className="flex font-semibold font-serif text-lg md:text-xl text-ink mb-2.5">
                  {data.header}
                </h3>
                <p className="flex text-ink-light text-sm font-sans">
                  {data.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* stand for */}
      <section className="flex flex-col md:px-64 py-8 px-2 items-center justify-between bg-ink font-mono">
        <div className="flex flex-col px-8 py-5">
          <div className="flex uppercase text-brass font-mono mb-3 text-xs md:text-sm text-left">
            What we stand for
          </div>
          <div className="flex font-serif text-parchment text-3xl md:text-4xl text-left font-semibold mb-14">
            Four things we will not compromise on
          </div>

          <div className="flex flex-col">
            {standForData.map((stand) => (
              <div
                key={stand.header}
                className="flex flex-row gap-6 py-8 md:mb-4 border-b last:border-none border-[rgba(231,224,209,0.1)]"
              >
                <span className="text-sm italic text-brass w-22.5 text-right font-serif mt-0.5">
                  {stand.icon}
                </span>
                <div className="w-px bg-[rgba(184,146,63,0.3)] items-stretch flex" />
                <div className="flex flex-col flex-1">
                  <p className="font-semibold font-serif md:text-lg text-sm text-parchment mb-2">
                    {stand.header}
                  </p>
                  <p className="text-slate text-sm md:text-base font-sans">
                    {stand.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* cta section */}
      <section className="flex flex-col px-8 py-22 text-center border-t border-line items-center justify-center bg-[#FDFAF5]">
        <div className="flex flex-col max-w-130 mx-auto my-0 p-0 items-center justify-center">
          <div className="mb-7 flex">
            <svg
              className="candle-icon"
              viewBox="0 0 64 80"
              width="48"
              height="60"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M32 18 C34 12 40 6 37 0 C44 6 42 16 36 20 C42 14 44 4 40 -2 C48 10 44 24 36 28 C33 29 29 29 26 28 C18 24 14 10 22 -2 C18 4 20 14 26 20 C20 16 18 6 25 0 C22 6 28 12 32 18Z"
                fill="#B8923F"
              ></path>
              <path
                d="M22 34 Q18 42 20 48 Q22 44 22 38Z"
                fill="#EDE8DC"
                stroke="#E7E0D1"
                strokeWidth="0.5"
              ></path>
              <path
                d="M42 34 Q46 43 44 50 Q42 46 42 40Z"
                fill="#EDE8DC"
                stroke="#E7E0D1"
                strokeWidth="0.5"
              ></path>
              <ellipse
                cx="32"
                cy="32"
                rx="12"
                ry="4"
                fill="#EDE8DC"
                stroke="#E7E0D1"
                strokeWidth="1"
              ></ellipse>
              <rect
                x="22"
                y="32"
                width="20"
                height="38"
                rx="3"
                fill="#F7F3EA"
                stroke="#E7E0D1"
                strokeWidth="1.5"
              ></rect>
              <rect
                x="25"
                y="36"
                width="5"
                height="30"
                rx="2.5"
                fill="white"
                opacity="0.5"
              ></rect>
              <rect
                x="14"
                y="70"
                width="36"
                height="6"
                rx="3"
                fill="#1E2A44"
              ></rect>
            </svg>
          </div>

          <h2 className="font-semibold font-serif md:text-4xl text-xl text-ink mb-4">
            Help us preserve what time takes away
          </h2>
          <p className="flex text-ink-light text-base font-sans mb-9">
            {`Every memorial submitted makes Nigeria's first burial registry more complete. If you know someone whose resting place should be remembered — add their record today.`}
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/pages/submitMemorial" className="btn-primary">
              {" "}
              Submit a Memorial
            </Link>
            <Link href="/pages/search" className="btn-outline">
              Search the Registry
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
