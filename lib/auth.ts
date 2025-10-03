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
