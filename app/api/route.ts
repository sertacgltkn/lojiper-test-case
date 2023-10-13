import { NextRequest, NextResponse } from "next/server";
import { allUserData } from "./allUserData";

export async function GET(request: NextRequest) {
  return NextResponse.json(allUserData, { status: 200 });
}

export async function POST(request: NextRequest) {
  try {
    const requestBody = await request.json();
    const newUser = requestBody;
    allUserData.push(newUser);
    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Bir hata oluştu." }, { status: 500 });
  }
}
