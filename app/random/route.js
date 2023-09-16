import { NextResponse } from "next/server";
import { getUserRandomValue } from '../session';
import { revalidatePath } from 'next/cache';

// Set Random Value for the current session
export async function GET(request) {
    const randomValue = await getUserRandomValue();
    revalidatePath('/random');
    return NextResponse.json({ randomValue });
}