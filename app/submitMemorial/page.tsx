"use client";
import { Check, Lock, MoveLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { nigerianStates, type NigerianState } from "../data/states";
import { useState } from "react";
import { FileUploadCard } from "../components/fileUpload";
import { Checkbox } from "../components/checkbox";
import { z } from "zod";
import {useForm} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
    fullName: z.string().min(1, "Full name is required"),
    applicantFullName: z.string().min(1, "Your full name is required"),
    careTakerName: z.string().min(1, "caretaker name is required"),
applicantEmail: z.string().email("invalid email address"),
applicantPhoneNumber: z.string().min(11, "enter a valid phone number"),
careTakerPhoneNumber: z.string().min(11, "enter a valid phone number"),
dateOfBirth: z.string().min(1, "Date of Birth is required").refine((date) => new Date(date) <= new Date(), { message: "Date of birth cannot be in the future",}),
dateOfDeath: z.string().min(1, "Date of Death is required").refine((date) => new Date(date) <= new Date(), { message: "Date of death cannot be in the future",}),
  })

  type FormValues = z.infer<typeof formSchema>


export default function SubmitPage() {
  const [naijaStates, setNaijaStates] = useState<NigerianState | "">("");
  const [yourRelationship, setYourRelationship] = useState("");
  const [deathCert, setDeathCert] = useState<File | null>(null);
  const [validId, setValidId] = useState<File | null>(null);
  const [burialPermit, setBurialPermit] = useState<File | null>(null);
  const [agreed, setAgreed] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [applicationData, setapplicationData] = useState({});

  const {
    register, 
    handleSubmit,
    formState: { errors},
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  })

  const onSubmit = (data: FormValues) => {
    const fullPayload = { 
      ...data, 
      stateOfDeath: naijaStates,
    relationship: yourRelationship,
    deathCert,
    validId,
    burialPermit,};
    setSuccessModal(true);
    setapplicationData(fullPayload);
    console.log(fullPayload);
  }
  

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
          <Link
            href="/"
            className="flex flex-row justify-between gap-3 md:py-3 py-1 text-slate font-mono text-xs uppercase"
          >
            <MoveLeft className="flex w-4 h-4" />
            Return to home
          </Link>
        </div>
      </nav>

      <section className="flex flex-col md:px-10 px-2 justify-between bg-parchment font-mono mt-60 mx-auto md:max-w-190 min-h-screen w-full mb-6">
        <div className="flex uppercase text-brass font-mono mb-5 text-xs px-3 md:text-sm text-center">
          Submit a memorial
        </div>
        <div className="flex font-serif text-ink text-2xl md:text-3xl px-3 text-left font-bold mb-2.5">
          Preserve a life remembered
        </div>

        <div className="flex text-ink-light text-sm md:text-base text-left px-3 font-normal font-sans mb-4 max-w-520px">
          <p>
            Fill in what you know. Approximate dates are fine. Our team reviews
            every submission before it goes live — usually within 2–3 days.{" "}
          </p>
        </div>

        <div className="flex flex-row gap-2 text-slate px-3 text-sm font-sans">
          <Lock className="w-4 h-4" /> Fields marked
          <span className="text-clay">*</span>
          are required
        </div>

        <div className="flex flex-col gap-3 px-7 rounded-card py-8 border border-line shadow-2xl bg-[#ffffff] mt-8">
          <div className="flex border-b border-line mb-5 pb-3 mt-3 font-serif font-semibold text-ink text-lg">
            About the deceased
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <span className="flex flex-col mb-5">
              <label
                htmlFor="fullName"
                className="text-slate uppercase font-mono text-xs mb-1.5 flex"
              >
                full name <span className="text-clay">*</span>
              </label>
              <input
                id="fullName"
                placeholder="full name"
                required
                type="text"
                {...register("fullName")}
                className="flex placeholder:text-slate h-10 rounded-md w-full border border-line ring-offset-ink px-3 py-2 file:text-sm file:font-medium disabled:cursor-not-allowed disabled:opacity-50 md:text-sm file:border-0"
              />
              {errors.fullName && (
    <p className="text-clay text-xs mt-1">{errors.fullName.message}</p>
  )}
            </span>

            <span className="flex flex-col mb-5">
              <label
                htmlFor="nee"
                className="text-slate uppercase font-mono text-xs mb-1.5 flex"
              >
                Nee
              </label>
              <input
                id="nee"
                placeholder="nee"
                type="text"
                className="flex placeholder:text-slate h-10 rounded-md w-full border border-line ring-offset-ink px-3 py-2 file:text-sm file:font-medium disabled:cursor-not-allowed disabled:opacity-50 md:text-sm file:border-0"
              />
            </span>

            <div className="flex flex-col md:flex-row w-full justify-between gap-3">
              <span className="flex flex-col mb-5 w-full">
                <label
                  htmlFor="dateOfBirth"
                  className="text-slate uppercase font-mono text-xs mb-1.5"
                >
                  date of birth <span className="text-clay">*</span>
                </label>
                <input
                  id="dateOfBirth"
                  placeholder="dd/mm/yyyy"
                  required
                  {...register("dateOfBirth")}
                  type="date"
                  className=" placeholder:text-slate h-10 rounded-md w-full border border-line ring-offset-ink px-3 py-2 file:text-sm file:font-medium disabled:cursor-not-allowed disabled:opacity-50 md:text-sm file:border-0"
                />
                {errors.dateOfBirth && (
    <p className="text-clay text-xs mt-1">{errors.dateOfBirth.message}</p>
  )}
              </span>

              <span className="flex flex-col mb-5 w-full">
                <label
                  htmlFor="dateOfDeath"
                  className="text-slate uppercase font-mono text-xs mb-1.5"
                >
                  date of death <span className="text-clay">*</span>
                </label>
                <input
                  id="dateOfDeath"
                  placeholder="dd/mm/yyyy"
                  required
                                    {...register("dateOfDeath")}
                  type="date"
                  className=" placeholder:text-slate h-10 rounded-md w-full border border-line ring-offset-ink px-3 py-2 file:text-sm file:font-medium disabled:cursor-not-allowed disabled:opacity-50 md:text-sm file:border-0"
                />
                {errors.dateOfDeath && (
    <p className="text-clay text-xs mt-1">{errors.dateOfDeath.message}</p>
  )}
              </span>
            </div>

            {/* states and lga */}
            <div className="flex flex-col md:flex-row w-full justify-between gap-3">
              <span className="flex flex-col mb-5 w-full">
                <label
                  htmlFor="stateofdeath"
                  className="text-slate uppercase font-mono text-xs mb-1.5"
                >
                  state of death <span className="text-clay">*</span>
                </label>

                <select
                  id="stateofdeath"
                  value={naijaStates}
                  onChange={(e) =>
                    setNaijaStates(e.target.value as NigerianState | "")
                  }
                  className=" placeholder:text-slate h-10 rounded-md w-full border border-line ring-offset-ink px-3 py-2 file:text-sm file:font-medium disabled:cursor-not-allowed disabled:opacity-50 md:text-sm file:border-0"
                >
                  <option value=""> Select state</option>
                  {nigerianStates.map((n) => (
                    <option value={n} key={n}>
                      {n}
                    </option>
                  ))}
                </select>
              </span>

              <span className="flex flex-col mb-5 w-full">
                <label
                  htmlFor="lga"
                  className="text-slate uppercase font-mono text-xs mb-1.5"
                >
                  lga <span className="text-clay">*</span>
                </label>
                <input
                  id="lga"
                  placeholder="eg.ikeja"
                  required
                  type="text"
                  className=" placeholder:text-slate h-10 rounded-md w-full border border-line ring-offset-ink px-3 py-2 file:text-sm file:font-medium disabled:cursor-not-allowed disabled:opacity-50 md:text-sm file:border-0"
                />
              </span>
            </div>

            <span className="flex flex-col mb-5">
              <label
                htmlFor="burialSite"
                className="text-slate uppercase font-mono text-xs mb-1.5 flex"
              >
                cementry/burial site <span className="text-clay">*</span>
              </label>
              <input
                id="burialSite"
                placeholder="e.g. Vaults & Gardens Cemetery, Lagos"
                required
                type="text"
                className="flex placeholder:text-slate h-10 rounded-md w-full border border-line ring-offset-ink px-3 py-2 file:text-sm file:font-medium disabled:cursor-not-allowed disabled:opacity-50 md:text-sm file:border-0"
              />
            </span>

            <span className="flex flex-col mb-5">
              <label
                htmlFor="biography"
                className="text-slate uppercase font-mono text-xs mb-1.5 flex"
              >
                short biography <span className="text-clay">*</span>
              </label>

              <textarea
                id="biography"
                placeholder="A brief tribute — who they were, what they meant to people who loved them."
                required
                rows={6}
                className="flex placeholder:text-slate h-40 rounded-md w-full border border-line ring-offset-ink px-3 py-2 file:text-sm file:font-medium disabled:cursor-not-allowed disabled:opacity-50 md:text-sm file:border-0"
              />
              <p className="text-slate font-sans text-xs mt-1.5 flex">
                Optional but meaningful. This appears on the public memorial
                page.
              </p>
            </span>

            <span className="flex flex-start gap-2.5 mb-5 px-3 py-4 bg-parchment border border-line rounded-lg">
              <Lock className="flex text-brass w-6 h-6 mt-0.5" />
              <p className="flex text-ink-light text-sm m-0 font-sans">
                The fields below are sealed and only visible to people you
                approve. They never appear in public search results.
              </p>
            </span>

            <span className="flex flex-col mb-5 border-b border-line pb-10">
              <label
                htmlFor="caretakerName"
                className="text-slate uppercase font-mono text-xs mb-1.5 flex"
              >
                caretaker Name{" "}
                <span className="border border-brass bg-parchment rounded-md text-xs text-clay ml-3 py-0.5 px-2 flex">
                  sealed
                </span>
              </label>
              <input
                id="caretakerName"
                placeholder="Name of the cemetery caretaker"
                required
                {...register("careTakerName")}
                type="text"
                className="flex placeholder:text-slate h-10 rounded-md w-full border border-line ring-offset-ink px-3 py-2 file:text-sm file:font-medium disabled:cursor-not-allowed disabled:opacity-50 md:text-sm file:border-0"
              />
              {errors.careTakerName && (
    <p className="text-clay text-xs mt-1">{errors.careTakerName.message}</p>
  )}
            </span>

            <span className="flex flex-col mb-5 border-b border-line pb-10">
              <label
                htmlFor="caretakerPhoneNumber"
                className="text-slate uppercase font-mono text-xs mb-1.5 flex"
              >
                caretaker phone Number{" "}
                <span className="border border-brass bg-parchment rounded-md text-xs text-clay ml-3 py-0.5 px-2 flex">
                  sealed
                </span>
              </label>
              <input
                id="caretakerPhoneNumber"
                placeholder="phone number of the cemetery caretaker"
                required
                {...register("careTakerPhoneNumber")}
                type="text"
                className="flex placeholder:text-slate h-10 rounded-md w-full border border-line ring-offset-ink px-3 py-2 file:text-sm file:font-medium disabled:cursor-not-allowed disabled:opacity-50 md:text-sm file:border-0"
              />
              {errors.careTakerPhoneNumber && (
    <p className="text-clay text-xs mt-1">{errors.careTakerPhoneNumber.message}</p>
  )}
            </span>

            <div className="flex border-b border-line mb-5 pb-3 mt-3 font-serif font-semibold text-ink text-lg">
              Your details
            </div>

            <div className="flex flex-col md:flex-row w-full justify-between gap-3">
              <span className="flex flex-col mb-5 w-full">
                <label
                  htmlFor="applicantFullName"
                  className="text-slate uppercase font-mono text-xs mb-1.5"
                >
                  applicant Full name <span className="text-clay">*</span>
                </label>
                <input
                  id="applicantFullName"
                  placeholder="applicant full name"
                  required
                  type="text"
                                    {...register("applicantFullName")}
                  className=" placeholder:text-slate h-10 rounded-md w-full border border-line ring-offset-ink px-3 py-2 file:text-sm file:font-medium disabled:cursor-not-allowed disabled:opacity-50 md:text-sm file:border-0"
                />
                {errors.applicantFullName && (
    <p className="text-clay text-xs mt-1">{errors.applicantFullName.message}</p>
  )}
              </span>

              <span className="flex flex-col mb-5 w-full">
                <label
                  htmlFor="relationship"
                  className="text-slate uppercase font-mono text-xs mb-1.5"
                >
                  Your relationship to the deceased{" "}
                  <span className="text-clay">*</span>
                </label>

                <select
                  value={yourRelationship}
                  onChange={(e) => setYourRelationship(e.target.value)}
                  className=" placeholder:text-slate h-10 rounded-md w-full border border-line ring-offset-ink px-3 py-2 file:text-sm file:font-medium disabled:cursor-not-allowed disabled:opacity-50 md:text-sm file:border-0"
                >
                  <option value=""> Select your relationship</option>
                  <option value="child">Child</option>
                  <option value="spouse/partner">Spouse/Partner</option>
                  <option value="sibling">Sibling</option>
                  <option value="parent">Parent</option>
                  <option value="">other relative</option>
                </select>
              </span>
            </div>

            <div className="flex flex-col md:flex-row w-full justify-between gap-3 border-b border-line pb-5">
              <span className="flex flex-col mb-5 w-full">
                <label
                  htmlFor="applicantEmail"
                  className="text-slate uppercase font-mono text-xs mb-1.5"
                >
                  Apllicant email address <span className="text-clay">*</span>
                </label>
                <input
                  id="applicantEmail"
                  placeholder="abd@hello.com"
                  required
                  type="email"
                  {...register("applicantEmail")}
                  className=" placeholder:text-slate h-10 rounded-md w-full border border-line ring-offset-ink px-3 py-2 file:text-sm file:font-medium disabled:cursor-not-allowed disabled:opacity-50 md:text-sm file:border-0"
                />
                {errors.applicantEmail && (
    <p className="text-clay text-xs mt-1">{errors.applicantEmail.message}</p>
  )}
              </span>

              <span className="flex flex-col mb-5 w-full">
                <label
                  htmlFor="applicantPhoneNumber"
                  className="text-slate uppercase font-mono text-xs mb-1.5"
                >
                  phone number <span className="text-clay">*</span>
                </label>
                <input
                  id="applicantPhoneNumber"
                  placeholder="081234567890"
                  required
                  type="tel"
                  {...register("applicantPhoneNumber")}
                  className=" placeholder:text-slate h-10 rounded-md w-full border border-line ring-offset-ink px-3 py-2 file:text-sm file:font-medium disabled:cursor-not-allowed disabled:opacity-50 md:text-sm file:border-0"
                />
              </span>
              {errors.applicantPhoneNumber && (
    <p className="text-clay text-xs mt-1">{errors.applicantPhoneNumber.message}</p>
  )}
            </div>

            <div className="flex border-b border-line mb-5 pb-3 mt-3 font-serif font-semibold text-ink text-lg">
              Supporting documents
            </div>

            <span className="flex flex-col mb-5 w-full">
              <FileUploadCard
                id="deathCert"
                label="Death Certificate"
                onFileSelect={setDeathCert}
              />
            </span>

            <span className="flex flex-col mb-5 w-full">
              <FileUploadCard
                id="validId"
                label="Your Valid ID (National ID, passport, voter's card or driver's licence)"
                onFileSelect={setValidId}
              />
            </span>

            <span className="flex flex-col mb-5 w-full border-b border-line pb-5">
              <FileUploadCard
                id="burialPermit"
                label="Burial permit or cemetery letter"
                optional
                onFileSelect={setBurialPermit}
              />
            </span>

            <span className="flex flex-start text-xs md:text-base gap-2.5 mb-5  text-ink-light font-sans">
              <Checkbox
                id="agreeTerms"
                checked={agreed}
                onChange={setAgreed}
                required
                label={
                  <>
                    I confirm the information above is accurate and that I am a
                    legitimate family member of the deceased. I agree to{" "}
                    {"Ìrántí's"}{" "}
                    <a
                      href="/terms_privacy/terms"
                      className="underline text-brass hover:text-slate"
                    >
                      terms of service
                    </a>{" "}
                    and{" "}
                    <a
                      href="/terms_privacy/privacy"
                      className="underline text-brass hover:text-slate"
                    >
                      privacy policy
                    </a>
                  </>
                }
              />
            </span>
            <button
          type="submit"
            // onClick={() => setSuccessModal(true)}
            className="btn-primary w-full text-parchment px-11 md:px-20 py-5 font-sans font-semibold pointer mt-2 text-base rounded-md"
          >
            Submit Memorial for Review
          </button>
          </form>

          
          <p className="text-slate font-sans text-xs mt-1.5 flex">
            Your memorial will not appear publicly until our team verifies your
            documents — usually within 2–3 days.
          </p>
        </div>
      </section>

      <section>
        <pre className="text-xs whitespace-pre-wrap">
  {JSON.stringify(applicationData, null, 2)}
</pre>
      </section>

      {successModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm px-4">
          <div className="bg-white rounded-2xl shadow-lg w-full max-w-166.5 h-auto max-h-[min(99vh,625px)] overflow-y-auto flex flex-col py-5 px-2 md:py-14 md:px-6 items-center justify-center">
            <div className="flex w-18 h-18 rounded-full border-2 border-[#7FAF78] bg-[#EDF4EC] mx-auto p-6">
              <Check className="w-8 h-8 text-ink" />
            </div>
            <h2 className="my-3 font-serif text-ink text-2xl md:text-4xl font-bold mx-auto text-center">
              Memorial submitted
            </h2>
            <p className="flex text-ink-light max-w-110 text-sm md:text-base mx-auto mb-7 text-center">
              Thank you. Our team will review your submission and email you
              within 2–3 days.
            </p>
            <div className="flex flex-col border border-line bg-[#ffffff] rounded-card max-w-96 px-2 md:px-4.5 md:py-6 py-3 text-left mb-8">
              <p className="flex uppercase text-xs text-slate mb-2 font-mono">
                reference number
              </p>

              <p className="flex text-ink font-mono text-base font-medium m-0">
                REF-2026-08-00142
              </p>
            </div>

            <div className="flex flex-row w-full font-medium text-sm items-center justify-center mx-auto gap-3">
                <Link href="/paystack" className="flex btn-outline px-5.5 py-3"> My dashboard</Link>
                                <Link href="/search" className="flex btn-primary px-5.5 py-3"> Search Registry</Link>

              </div>
          </div>
        </div>
      )}
    </div>
  );
}
