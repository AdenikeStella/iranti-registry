"use client";

import { useState } from "react";
import { usePaystackPayment } from "react-paystack";

export default function PaymentDemoPage() {
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "failed">("idle");

  const config = {
    reference: new Date().getTime().toString(),
    email,
    amount: Number(amount) * 100, // Paystack expects amount in kobo
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!,
  };

  const initializePayment = usePaystackPayment(config);

  const onSuccess = (reference: string) => {
    console.log("Payment successful:", reference);
    setStatus("success");
    // send reference.reference to your backend to verify
    verifyPayment(reference);
  };

  const onClose = () => {
    console.log("Payment closed");
  };

  const verifyPayment = async (reference: string) => {
    const res = await fetch(`/api/verify-payment?reference=${reference}`);
    const data = await res.json();
    console.log("Verification result:", data);
  };

  return (
    <div className="flex flex-col gap-4 max-w-md mx-auto mt-16 p-6 border border-line rounded-card">
      <h1 className="text-lg font-semibold">Paystack Demo</h1>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border border-line rounded-md h-10 px-3"
      />

      <input
        type="number"
        placeholder="Amount (NGN)"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="border border-line rounded-md h-10 px-3"
      />

      <button
        onClick={() => initializePayment({ onSuccess, onClose })}
        disabled={!email || !amount}
        className="bg-ink text-white rounded-md h-10 disabled:opacity-50"
      >
        Pay Now
      </button>

      {status === "success" && (
        <p className="text-sage text-sm">✓ Payment successful!</p>
      )}
    </div>
  );
}