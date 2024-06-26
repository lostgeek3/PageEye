// app/api/hello/route.tsx

import {NextResponse} from "next/server";

export async function GET() {
  return NextResponse.json({ message: 'Hello' });
}