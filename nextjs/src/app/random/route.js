import { NextResponse } from "next/server";
import { getUserRandomValue } from '../session';

// Set Random Value for the current session
export async function GET(request) {
    const randomValue = await getUserRandomValue();
    return NextResponse.json({ randomValue });
}