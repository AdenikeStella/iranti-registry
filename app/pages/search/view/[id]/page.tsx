"use client";
import Image from "next/image";
import Link from "next/link";
import deaceasedRecords from "../../../lib/data/deaceasedRecords.json";
import { ArrowLeft, CheckIcon, LockIcon } from "lucide-react";
import { useState } from "react";
import { useParams } from "next/navigation";
import { relations, relationStatus } from "@/app/lib/data/relationship";

type AccessState = "none" | "pending" | "denied" | "approved";
const ACCESS_STATES: AccessState[] = ["none", "pending", "denied", "approved"];

// function MetaChip({
//   children,
//   icon,
//   tone = "text-slate",
// }: {
//   children: React.ReactNode;
//   icon?: React.ReactNode;
//   tone?: string;
// }) {
//   return (
//     <div className="bg-white border border-line rounded-lg px-4 py-2.5 flex items-center gap-2">
//       {icon}
//       <span className={`font-mono text-[0.65rem] uppercase tracking-[0.06em] ${tone}`}>
//         {children}
//       </span>
//     </div>
//   );
// }

function LockedRow({
  label,
  value,
  unlocked,
}: {
  label: string;
  value: string;
  unlocked: boolean;
}) {
  return (
    <div
      className={`flex justify-between items-center gap-4 px-5 py-3.5 border-b border-line last:border-b-0 ${
        unlocked
          ? "bg-white"
          : `bg-parchmentbg-[repeating-linear-gradient(135deg,rgba(151,161,172,0.1)_0px,rgba(151,161,172,0.1)_2px,transparent_2px,transparent_9px)]`
      }`}
    >
      <span className="text-ink-light text-[0.9rem]">{label}</span>
      {unlocked ? (
        <span className="font-medium text-[0.9rem] text-ink text-right">
          {value}
        </span>
      ) : (
        <span className="flex items-center gap-1.5 text-slate font-mono text-[0.68rem] uppercase tracking-[0.08em]">
          <LockIcon />
          Sealed
        </span>
      )}
    </div>
  );
}

const LOCKED = {
  plot: "Section C, Plot 142",
  gps: "6.4531° N, 3.3958° E",
  caretaker: "Mr. Tunde Akinola — +234 802 100 4521",
};

function PublicRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center gap-4 px-5 py-3.5 bg-white border-b border-line last:border-b-0">
      <span className="text-ink-light text-[0.9rem]">{label}</span>
      <span className="font-medium text-[0.9rem] text-right">{value}</span>
    </div>
  );
}

export default function ViewMemorialPage() {
  const params = useParams();
  const id = params.id;
  const [access, setAccess] = useState<AccessState>("none");
  const [modalOpen, setModalOpen] = useState(false);

  const unlocked = access === "approved";

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const initials = (name: string) => {
    return name
      .trim()
      .split(/\s+/)
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  const deceased = deaceasedRecords.find((record) => String(record.id) === id);
  console.log("URL ID:", id);
  console.log("Found deceased:", deceased);

  if (!deceased) {
    return (
      <div className="p-8">
        <h1>Memorial Not Found</h1>
        <p>{`We couldn't find a memorial with that ID.`}</p>
      </div>
    );
  }
  return (
    <div className="flex flex-col p-0 m-0 min-h-screen md:max-w-full mx-auto overflow-hidden max-w-md">
      <nav className="bg-ink md:px-6 fixed w-full z-20 mb-20">
        <div className="p-2 flex flex-row justify-between items-center container">
          <div className="">
            <Image
              src="/iranti-logo-detailed.svg"
              alt="Iranti Logo"
              width={300}
              height={300}
              priority
            />
          </div>
          <Link
            href="/submitMemorial"
            className="btn-primary bg-brass text-parchment border border-parchment hover:bg-ink-light hidden md:flex"
          >
            Submit a Memorial
          </Link>
        </div>
        
      </nav>
      <div className="bg-white border border-line px-4 py-3 flex items-center gap-2.5 flex-wrap mb-8 mt-30 w-full">
          {ACCESS_STATES.map((state) => (
            <button
              key={state}
              type="button"
              onClick={() => setAccess(state)}
              className={`font-mono text-[0.6rem] uppercase tracking-[0.08em] px-3 my-2 rounded-full border cursor-pointer transition-all ${
                access === state
                  ? "bg-ink border-ink text-parchment"
                  : "bg-white border-line text-ink-light"
              }`}
            >
              {state}
            </button>
          ))}
        </div>

      {/* main */}

      <section className="flex flex-col px-15 justify-between bg-parchment font-mono mx-auto md:max-w-250 min-h-screen w-full mb-6">
        
        <div>
          <Link
            href="/search"
            className="inline-flex items-center gap-1.5 mb-7 font-mono text-[0.65rem] uppercase tracking-widest text-slate hover:text-ink transition-colors"
          >
            <ArrowLeft />
            Back to search
          </Link>

          <div className="flex flex-wrap gap-7 items-start mt-2">
            {/* Photo / avatar */}
            <div className="w-40 h-40 bg-line rounded-card flex items-center justify-center shrink-0">
              <span className="font-display text-5xl text-ink-light">
                {initials(deceased.full_name)}
              </span>
            </div>
            <div className="flex-1 min-w-55">
              <div className="flex justify-between items-start gap-4">
                <div>
                  <h1 className="font-display text-[2rem] font-bold mb-1 leading-tight">
                    {deceased.full_name}
                  </h1>
                  <p className="font-mono text-xs text-slate mb-1">
                    {" "}
                    {deceased.date_of_birth} {" - "} {deceased.date_of_death}
                  </p>
                  <p className="text-[0.9rem] text-ink-light mb-4">
                    {" "}
                    {deceased.state} . {deceased.lga}
                  </p>
                </div>
              </div>
              <p className="text-ink-light leading-[1.8] text-[0.95rem] font-sans">
                {deceased.short_bio}
              </p>
            </div>
          </div>

          {/* burial deceased */}
          <div className="mt-12">
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.12em] text-slate mb-3.5">
              Burial Information
            </p>

            <div className="border border-line rounded-card overflow-hidden">
              <PublicRow label="Cemetery" value={deceased.cemetery} />
              <PublicRow label="City" value={deceased.city} />
              <PublicRow label="State" value={deceased.state} />

              <LockedRow
                label="Exact Plot / Section"
                value={LOCKED.plot}
                unlocked={unlocked}
              />
              <LockedRow
                label="GPS Coordinates"
                value={LOCKED.gps}
                unlocked={unlocked}
              />
              <LockedRow
                label="Caretaker Contact"
                value={LOCKED.caretaker}
                unlocked={unlocked}
              />
            </div>

            {/* ── ACCESS BANNERS ── */}
            {access === "none" && (
              <div className="mt-5">
                <button
                  type="button"
                  onClick={openModal}
                  className="bg-ink text-parchment rounded-md text-[0.9rem] font-sans font-medium cursor-pointer transition-opacity hover:opacity-85 px-7 py-3.5"
                >
                  Request Access to Full deceased
                </button>
              </div>
            )}

            {access === "pending" && (
              <div className="mt-5 flex items-start gap-3 bg-[#FDF6E9] border border-[#E8C97A] rounded-lg px-4.5 py-3.5">
                <svg
                  viewBox="0 0 20 20"
                  fill="#B8923F"
                  width="20"
                  height="20"
                  className="shrink-0 mt-px"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                    clipRule="evenodd"
                  />
                </svg>
                <div>
                  <p className="font-semibold mb-1 text-[0.9rem]">
                    Access request pending review
                  </p>
                  <p className="font-mono text-[0.68rem] text-slate">
                    Submitted 3 days ago · Usually decided within 2–3 days
                  </p>
                </div>
              </div>
            )}

            {access === "denied" && (
              <div className="mt-5">
                <div className="bg-[#FDF0ED] border border-[#D9896B] rounded-lg px-4.5 py-3.5">
                  <p className="font-semibold mb-1.5 text-[0.9rem]">
                    Your previous request was not approved
                  </p>
                  <p className="text-[0.82rem] text-ink-light leading-[1.7]">
                    {`We couldn't confirm your relationship from the documents provided. Please include a death certificate or letter of administration showing the same surname.`}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={openModal}
                  className={`bg-ink text-parchment rounded-md text-[0.9rem] font-sans font-medium cursor-pointer transition-opacity hover:opacity-85 mt-4 px-7 py-3`}
                >
                  Request Access Again
                </button>
              </div>
            )}

            {access === "approved" && (
              <div className="mt-5 flex items-center gap-3 bg-[#EDF4EC] border border-[#7FAF78] rounded-lg px-4.5 py-3.5">
                <CheckIcon size={20} fill="#55694C" className="shrink-0" />
                <p className="font-semibold text-[0.9rem]">
                  You have full access to this record&apos;s burial deceased
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      <footer className="flex flex-col bg-ink pt-12 pb-6 px-10 md:px-25 font-sans w-full">
        <div className="flex flex-wrap justify-between">
          <div className="flex text-slate md:justify-start">
            <p className="text-xs font-normal font-mono">
              &copy; 2026 . Ìrántí Registry.
            </p>
          </div>
          <div className="flex text-slate md:justify-end gap-4 uppercase">
            <Link
              href="/#"
              className="text-slate text-xs font-mono hover:bg-slate hover:px-2.5 hover:py-1.5 hover:text-ink hover:rounded-md"
            >
              Privacy
            </Link>
            <Link
              href="/#"
              className="text-slate text-xs font-mono hover:bg-slate hover:px-2.5 hover:py-1.5 hover:text-ink hover:rounded-md"
            >
              Terms
            </Link>
            <Link
              href="/#"
              className="text-slate text-xs font-mono hover:bg-slate hover:px-2.5 hover:py-1.5 hover:text-ink hover:rounded-md"
            >
              Data protection
            </Link>
          </div>
        </div>
      </footer>

            {/* ── REQUEST ACCESS MODAL ── */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-[rgba(30,42,68,0.55)]"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="request-access-title"
            className="bg-parchment border border-line rounded-xl max-w-120 w-full p-7 shadow-modal"
          >
            <div className="flex justify-between items-start gap-3 mb-4">
              <div>
                <h2
                  id="request-access-title"
                  className="font-display text-[1.6rem] font-bold mb-1"
                >
                  Request Access
                </h2>
                <p className="font-mono text-[0.65rem] text-slate">
                  Burial details · {deceased.full_name}
                </p>
              </div>
              <button
                type="button"
                onClick={closeModal}
                aria-label="Close"
                className="p-1 text-slate hover:text-ink transition-colors cursor-pointer"
              >
                <svg viewBox="0 0 20 20" fill="currentColor" width="20" height="20" aria-hidden="true">
                  <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                </svg>
              </button>
            </div>
 
            <p className="text-[0.85rem] text-ink-light leading-[1.75] mb-5.5">
              Burial details are shared only with verified next of kin. A family administrator
              reviews each request — usually within 2–3 days.
            </p>
 
            <div className="mb-4">
              <label
                htmlFor="relationship"
                className="block font-mono text-[0.6rem] uppercase tracking-widest text-slate mb-1.5"
              >
                Your relationship to the deceased
              </label>
              <select
                id="relationship"
                defaultValue=""
                className="w-full border border-line rounded-md px-3.5 py-2.5 bg-white font-sans text-[0.9rem] text-ink outline-none focus:border-ink-light"
              >
                <option value="">Select relationship</option>
                {relations.map((r) => (
                  <option key={r}>{r}</option>
                ))}
              </select>
            </div>
 
            <div className="mb-6">
              <label
                htmlFor="reason"
                className="block font-mono text-[0.6rem] uppercase tracking-widest text-slate mb-1.5"
              >
                Reason for your request
              </label>
              <textarea
                id="reason"
                rows={3}
                placeholder="Briefly explain why you're requesting access..."
                className="w-full border border-line rounded-md px-3.5 py-2.5 bg-white font-sans text-[0.9rem] text-ink outline-none resize-y focus:border-ink-light"
              />
            </div>
 
            <div className="flex justify-end gap-2.5">
              <button
                type="button"
                onClick={closeModal}
                className="px-5 py-2.5 rounded-md bg-transparent text-ink-light font-sans text-[0.9rem] font-medium cursor-pointer hover:bg-line transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={closeModal}
                className={`bg-ink text-parchment rounded-md text-[0.9rem] font-sans font-medium cursor-pointer transition-opacity hover:opacity-85 px-6 py-2.5`}
              >
                Submit Request
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
