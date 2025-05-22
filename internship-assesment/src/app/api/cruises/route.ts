// src/app/api/cruises/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  const apiUrl = process.env.CRUISE_API_URL;
  const res = await fetch(apiUrl!, { next: { revalidate: 60 } }); // Optional: add headers, etc.
  const data = await res.json();
  return NextResponse.json(data);
}