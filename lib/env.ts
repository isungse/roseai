function required(name: string): string {
  const value = process.env[name];
  if (!value || value.trim() === "") {
    throw new Error(
      `[env] Missing required environment variable: ${name}. ` +
        `Set it in .env.local for development or in the Vercel project settings for production.`,
    );
  }
  return value;
}

export const env = {
  contactEmail: required("NEXT_PUBLIC_CONTACT_EMAIL"),
  siteUrl: required("NEXT_PUBLIC_SITE_URL"),
} as const;
