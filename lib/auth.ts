import jwt from "jsonwebtoken";

export interface JwtPayload {
  userId: number;
  email: string;
  iat?: number;
  exp?: number;
}

export function parseTokenFromCookie(
  cookieHeader: string | undefined
): string | null {
  if (!cookieHeader) return null;
  const match = cookieHeader.match(/token=([^;]+)/);
  return match ? match[1] : null;
}

export async function isAuthenticated(
  cookieHeader: string | null | undefined
): Promise<JwtPayload | null> {
  try {
    if (!cookieHeader) return null;
    const token = parseTokenFromCookie(cookieHeader);
    if (!token) return null;

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

    return decoded;
  } catch (error) {
    console.error("Authentication error:", error);
    return null;
  }
}
