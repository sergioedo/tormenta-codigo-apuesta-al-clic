// FROM: https://vercel.com/guides/session-store-nextjs-redis-vercel-kv
import "server-only";
import { cookies } from "next/headers";
import { kv } from "@vercel/kv";

export function getSessionId() {
    const cookieStore = cookies();
    return cookieStore.get("session-id")?.value;
}

function setSessionId(sessionId) {
    const cookieStore = cookies();
    cookieStore.set("session-id", sessionId);
}

export function getSessionIdAndCreateIfMissing() {
    const sessionId = getSessionId();
    if (!sessionId) {
        const newSessionId =
            Math.random().toString(36).substring(2, 15) +
            Math.random().toString(36).substring(2, 15);
        setSessionId(newSessionId);

        return newSessionId;
    }

    return sessionId;
}

export function get(key, namespace = "") {
    const sessionId = getSessionId();
    if (!sessionId) {
        return null;
    }
    return kv.hget(`session-${namespace}-${sessionId}`, key);
}

export function getAll(namespace = "") {
    const sessionId = getSessionId();
    if (!sessionId) {
        return null;
    }
    return kv.hgetall(`session-${namespace}-${sessionId}`);
}

export function set(key, value, namespace = "") {
    const sessionId = getSessionIdAndCreateIfMissing();
    return kv.hset(`session-${namespace}-${sessionId}`, { [key]: value });
}