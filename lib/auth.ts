import { cookies } from "next/headers";
import { NextRequest } from "next/server";

const ADMIN_SESSION_COOKIE = "admin_session";
const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours

/**
 * Simple authentication using environment variable password
 * For production, consider using NextAuth.js or similar
 */
export async function validateAdminPassword(
  password: string,
): Promise<boolean> {
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword) {
    console.error("ADMIN_PASSWORD not set in environment variables");
    return false;
  }

  // Simple comparison - in production, use bcrypt or similar
  return password === adminPassword;
}

/**
 * Create an admin session
 */
export async function createAdminSession(): Promise<string> {
  const sessionToken = generateSecureToken();
  const expiresAt = Date.now() + SESSION_DURATION;

  // Store session in cookie
  const cookieStore = await cookies();
  cookieStore.set(ADMIN_SESSION_COOKIE, sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: SESSION_DURATION / 1000,
    path: "/",
  });

  // In production, store session in database with expiry
  // For now, we'll use a simple token-based approach

  return sessionToken;
}

/**
 * Verify admin session
 */
export async function verifyAdminSession(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get(ADMIN_SESSION_COOKIE);

    if (!sessionToken || !sessionToken.value) {
      return false;
    }

    // In production, validate token against database
    // For now, just check if token exists and is valid format
    return sessionToken.value.length === 64; // Our tokens are 64 chars
  } catch (error) {
    console.error("Error verifying session:", error);
    return false;
  }
}

/**
 * Clear admin session
 */
export async function clearAdminSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_SESSION_COOKIE);
}

/**
 * Generate a secure random token
 */
function generateSecureToken(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, (byte) => byte.toString(16).padStart(2, "0")).join(
    "",
  );
}

/**
 * Middleware helper to check authentication
 */
export async function requireAuth(): Promise<{
  authenticated: boolean;
  error?: string;
}> {
  const isAuthenticated = await verifyAdminSession();

  if (!isAuthenticated) {
    return {
      authenticated: false,
      error: "Authentication required",
    };
  }

  return { authenticated: true };
}
