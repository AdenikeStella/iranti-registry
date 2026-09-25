import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const reference = req.nextUrl.searchParams.get("reference");

  const response = await fetch(
    `https://api.paystack.co/transaction/verify/${reference}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      },
    }
  );

  const data = await response.json();

  if (data.data.status === "success") {
    // TODO: update your database, mark order as paid, etc.
    return NextResponse.json({ verified: true, data: data.data });
  }

  return NextResponse.json({ verified: false }, { status: 400 });
}