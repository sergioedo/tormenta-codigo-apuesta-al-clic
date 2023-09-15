import { NextResponse } from "next/server";
import { session } from '../session';

// Set Random Value for the current session
export async function GET(request) {
    // Read random value froms session
    const current = await session().get('random_value');

    // Set random value, if not defined yet in session
    if (current == undefined) {
        await session().set('random_value', Math.floor(Math.random() * 11));
    }
    const randomValue = await session().get('random_value');
    return NextResponse.json({ current, randomValue });
}