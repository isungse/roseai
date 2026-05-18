import "server-only";

function required(name: string): string {
  const value = process.env[name];
  if (!value || value.trim() === "") {
    throw new Error(
      `[env.server] Missing required environment variable: ${name}. ` +
        `Set it in .env.local for development or in Vercel project settings.`,
    );
  }
  return value;
}

export const serverEnv = {
  get supabaseUrl() {
    return required("NEXT_PUBLIC_SUPABASE_URL");
  },
  get supabaseSecretKey() {
    return required("SUPABASE_SECRET_KEY");
  },
  // Optional — when unset, /api/contact records ip_hash = null instead of
  // failing. HMAC keeps IPv4 hashes resistant to rainbow-table brute force;
  // unsalted SHA-256 (the previous behavior) was reversible against a 4B
  // candidate space.
  get ipHashSecret(): string | null {
    const value = process.env.IP_HASH_SECRET;
    return value && value.trim() !== "" ? value : null;
  },
} as const;
