"use client";
import Image from "next/image";
import Link from "next/link";
import deceasedRecords from '../../lib/data/deaceasedRecords.json'
import { nigerianStates, type NigerianState } from "../../lib/data/states";
import { useMemo, useState } from "react";
import { SearchIcon } from "lucide-react";

const PAGE_SIZE = 10;

type QuickFilter = "all" | "verified" | "recent";
type SortOption = "name" | "recent" | "oldest";

const normalize = (text: string) =>
  text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();

    const getYear = (date: string): number | null => {
  const matches = String(date ?? "").match(/\b(1[89]\d{2}|20\d{2})\b/g);
  return matches ? Number(matches[matches.length - 1]) : null;
};
 
const getTime = (date: string): number => {
  const parsed = Date.parse(date);
  if (!Number.isNaN(parsed)) return parsed;
  const year = getYear(date);
  return year ? new Date(year, 0, 1).getTime() : 0;
};
 
const getPageItems = (current: number, total: number): (number | "…")[] => {
  const wanted = new Set([1, total, current - 1, current, current + 1]);
  const pages = [...wanted].filter((p) => p >= 1 && p <= total).sort((a, b) => a - b);
 
  const items: (number | "…")[] = [];
  pages.forEach((p, i) => {
    if (i > 0 && p - pages[i - 1] > 1) items.push("…");
    items.push(p);
  });
  return items;
};

export default function SearchPage() {
const [nameInput, setNameInput] = useState("");
  const [naijaStates, setNaijaStates] = useState<NigerianState | "">("");
  const [yearFrom, setYearFrom] = useState("");
  const [yearTo, setYearTo] = useState("");
 
  const [applied, setApplied] = useState({
    name: "",
    state: "" as NigerianState | "",
    from: "",
    to: "",
  });
 
  const [quickFilter, setQuickFilter] = useState<QuickFilter>("all");
  const [sortBy, setSortBy] = useState<SortOption>("name");
  const [page, setPage] = useState(1);
  const initials = (name: string) => {
    return name
      .trim()
      .split(/\s+/)
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  const handleSearch = () => {
    setApplied({
      name: nameInput,
      state: naijaStates,
      from: yearFrom,
      to: yearTo,
    });
    setPage(1);
  };
 
  const filteredRecords = useMemo(() => {
    const query = normalize(applied.name);
    const from = applied.from ? Number(applied.from) : null;
    const to = applied.to ? Number(applied.to) : null;
 
    const results = deceasedRecords.filter((d) => {
      if (query && !normalize(d.full_name).includes(query)) return false;
 
      if (applied.state && d.state !== applied.state) return false;
 
      const year = getYear(d.date_of_death);
      if (from !== null && !Number.isNaN(from) && (year === null || year < from)) return false;
      if (to !== null && !Number.isNaN(to) && (year === null || year > to)) return false;
 
      if (quickFilter === "verified" && normalize(String(d.status)) !== "verified") return false;
      if (quickFilter === "recent" && (year === null || year < 2020)) return false;
 
      return true;
    });
 
    return [...results].sort((a, b) => {
      if (sortBy === "recent") return getTime(b.date_of_death) - getTime(a.date_of_death);
      if (sortBy === "oldest") return getTime(a.date_of_death) - getTime(b.date_of_death);
      return a.full_name.localeCompare(b.full_name);
    });
  }, [applied, quickFilter, sortBy]);
 
  const totalRecords = filteredRecords.length;
  const totalPages = Math.max(1, Math.ceil(totalRecords / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const pageRecords = filteredRecords.slice(startIndex, startIndex + PAGE_SIZE);
 
  const goToPage = (p: number) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

   return (
    <div className="flex flex-col p-0 m-0 min-h-screen md:max-w-full mx-auto overflow-hidden max-w-md">
      <nav className="bg-ink md:px-6 fixed w-full z-20 mb-20">
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
          <Link
            href="/submitMemorial"
            className="btn-primary bg-brass text-parchment border border-parchment hover:bg-ink-light"
          >
            Submit a Memorial
          </Link>
        </div>
      </nav>
 
      {/* hero */}
      <div className="bg-ink flex flex-col md:px-10 px-2 pb-14 pt-8 justify-between font-mono mt-48 mx-auto w-full mb-6">
        <h5 className="text-brass uppercase m-2.5 font-mono text-xs">
          Burial & Memorial Records
        </h5>
        <h2 className="font-serif text-4xl text-parchment m-2.5">
          Search the Registry
        </h2>
        <p className="max-w-115 text-slate text-sm font-sans m-2.5">
          Find a verified memorial record by name, state, or year of passing.
          Burial location details are protected and available only to approved
          family.
        </p>
      </div>
 
      {/* search */}
      <div className="flex -mt-6 mx-auto mb-0 py-6 px-0 relative z-10 min-w-275">
        <div className="flex flex-wrap rounded-card px-6 py-5 shadow-lg gap-3 bg-[#ffffff] border border-line">
          <div className="flex flex-col flex-2 gap-3 min-w-45">
            <label htmlFor="search" className="text-xs color-">
              Full Name
            </label>
            <div className="relative flex flex-row gap-2">
              <SearchIcon className="absolute text-line flex w-4 h-4 top-1/2 left-3 -translate-y-1/2 cursor-none" />
              <input
                type="search"
                placeholder="search by name"
                className="w-full border border-line flex p-3 pl-9 rounded-md"
                id="search"
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSearch();
                }}
              />
            </div>
          </div>
 
          <div className="flex flex-col gap-3 min-w-36 flex-1">
            <label htmlFor="state" className="text-xs color-">
              State
            </label>
            <select
              id="state"
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
 
          <div className="flex flex-col flex-2 gap-3 min-w-45">
            <label htmlFor="year-from" className="text-xs color-">
              Year of passing
            </label>
            <div className="flex flex-row gap-2">
              <input
                type="text"
                inputMode="numeric"
                maxLength={4}
                placeholder="from"
                className="w-1/2 border border-line flex p-3 pl-9 rounded-md"
                id="year-from"
                value={yearFrom}
                onChange={(e) => setYearFrom(e.target.value.replace(/\D/g, ""))}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSearch();
                }}
              />
              <input
                type="text"
                inputMode="numeric"
                maxLength={4}
                placeholder="to"
                className="w-1/2 border border-line flex p-3 pl-9 rounded-md"
                id="year-to"
                aria-label="Year of passing to"
                value={yearTo}
                onChange={(e) => setYearTo(e.target.value.replace(/\D/g, ""))}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSearch();
                }}
              />
            </div>
          </div>
          <div className="">
            <button
              type="button"
              onClick={handleSearch}
              className=" bg-ink rounded-md text-[#ffffff] py-2.5 px-6 font-normal text-sm border-box pointer mt-8 whitespace-nowrap mx-auto md:mx-0"
            >
              Search
            </button>
          </div>
        </div>
      </div>
 
      {/* search result */}
 
      <div className="max-w-[1100px]; my-0 mx-auto; px-10 pt-6 pb-15">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="flex items-center; gap-2 flex-wrap">
            <span
              id="result-count"
              className="font-mono text-xs uppercase text-slate mr-1"
            >
              {totalRecords} {totalRecords === 1 ? "record" : "records"} found
            </span>
            <button
              type="button"
              className={`filter-chip ${quickFilter === "all" ? "active" : ""}`}
              onClick={() => {
                setQuickFilter("all");
                setPage(1);
              }}
            >
              All
            </button>
            <button
              type="button"
              className={`filter-chip ${quickFilter === "verified" ? "active" : ""}`}
              onClick={() => {
                setQuickFilter("verified");
                setPage(1);
              }}
            >
              Verified only
            </button>
            <button
              type="button"
              className={`filter-chip ${quickFilter === "recent" ? "active" : ""}`}
              onClick={() => {
                setQuickFilter("recent");
                setPage(1);
              }}
            >
              Recent — 2020+
            </button>
          </div>
          <div className="display:flex; align-items:center; gap:8px;">
            <span className="font-family:'IBM Plex Mono',monospace; font-size:0.6rem; text-transform:uppercase; letter-spacing:0.08em; color:#97A1AC;">
              Sort by
            </span>
            <select
              className="w-auto px-1.5 py-3 text-sm"
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value as SortOption);
                setPage(1);
              }}
            >
              <option value="name">Name A–Z</option>
              <option value="recent">Most recent</option>
              <option value="oldest">Oldest first</option>
            </select>
          </div>
        </div>
 
        {totalRecords === 0 ? (
          <div className="border border-line rounded-card bg-[#ffffff] py-16 px-6 text-center">
            <p className="font-serif text-xl mb-2">No records found</p>
            <p className="text-slate text-sm font-sans">
              Try a different name, state or year range.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
            {pageRecords.map((d) => (
              <div
                key={d.id}
                className="flex flex-col bg-[#ffffff] border border-line rounded-card shadow-lg cursor-pointer"
              >
                <div className="flex w-full bg-line items-center justify-center aspect-square">
                  <span className="font-serif text-4xl text-ink-light">
                    {initials(d.full_name)}
                  </span>
                </div>
 
                <div className="p-4">
                  <div className="flex items-start justify-between gap:2 mb-1.5">
                    <h3 className="font-serif text-lg font-normal">
                      {d.full_name}
                    </h3>
                    <span className="bg-moss/20 border border-[#7FAF78] font-mono items-center uppercase py-1 px-2 rounded-badge text-[10px] inline">
                      {d.status}
                    </span>
                  </div>
                  <p className="font-mono text-[10px] text-slate mb-1">
                    {d.date_of_birth} {" - "} {d.date_of_death}
                  </p>
                  <p className="font-mono mb-3.5 text-ink-light text-sm">
                    {d.state} . {d.lga}
                  </p>
                  <p className="text-slate text-xs mb-3.5 line-clamp-2 overflow-hidden">
                    {d.short_bio}
                  </p>
                  <Link
                    href={`/search/view/${d.id}`}
                    className="btn-outline w-full hover:bg-ink-light"
                  >
                    View Memorial
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
 
        {totalRecords > 0 && (
          <div className="flex flex-wrap justify-between mt-10 gap-3 items-center">
            <p className="font-mono text-xs uppercase text-slate m-0">
              showing {startIndex + 1}–{startIndex + pageRecords.length} of{" "}
              {totalRecords}
            </p>
            <div className="flex gap-1.5">
              <button
                type="button"
                className="page-btn"
                disabled={currentPage === 1}
                onClick={() => goToPage(currentPage - 1)}
              >
                ‹ Prev
              </button>
 
              {getPageItems(currentPage, totalPages).map((item, i) =>
                item === "…" ? (
                  <span
                    key={`gap-${i}`}
                    className="px-1.5 py-2; text-slate font-mono text-xs"
                  >
                    …
                  </span>
                ) : (
                  <button
                    key={item}
                    type="button"
                    className={`page-btn ${item === currentPage ? "page-btn-active" : ""}`}
                    onClick={() => goToPage(item)}
                    aria-current={item === currentPage ? "page" : undefined}
                  >
                    {item}
                  </button>
                ),
              )}
 
              <button
                type="button"
                className="page-btn"
                disabled={currentPage === totalPages}
                onClick={() => goToPage(currentPage + 1)}
              >
                Next ›
              </button>
            </div>
          </div>
        )}
      </div>

      <footer className="flex flex-col bg-ink pt-12 pb-6 px-10 md:px-25 font-sans w-full">
          <div className="flex flex-wrap justify-between">
              <div className="flex text-slate md:justify-start">
            <p className="text-xs font-normal font-mono">
              &copy; 2026 . Ìrántí Registry.
            </p>
          </div>
          <div className="flex text-slate md:justify-end gap-4 uppercase">
<Link href="/#" className="text-slate text-xs font-mono hover:bg-slate hover:px-2.5 hover:py-1.5 hover:text-ink hover:rounded-md">
                Privacy
              </Link>
              <Link href="/#" className="text-slate text-xs font-mono hover:bg-slate hover:px-2.5 hover:py-1.5 hover:text-ink hover:rounded-md">
                Terms
              </Link>
              <Link href="/#" className="text-slate text-xs font-mono hover:bg-slate hover:px-2.5 hover:py-1.5 hover:text-ink hover:rounded-md">
                Data protection
              </Link>
          </div>
              
          </div>
      </footer>
    </div>
  );
}
