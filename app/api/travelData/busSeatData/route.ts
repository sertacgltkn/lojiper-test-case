import { NextRequest, NextResponse } from "next/server";
import { busSeatData } from "./busSeatData";

export async function GET(request: NextRequest) {
  return NextResponse.json(busSeatData, { status: 200 });
}
