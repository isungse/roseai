import { createHash } from "node:crypto";

import { NextResponse } from "next/server";

import { supabaseAdmin } from "@/lib/supabase/admin";

export const runtime = "nodejs";

const MAX_LENGTHS = {
  company: 200,
  email: 320,
  message: 5000,
} as const;

const EMAIL_RE =
  /^[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?\.)+[A-Za-z]{2,}$/;

function err(code: string, status = 400) {
  return NextResponse.json({ error: code }, { status });
}

function hashIp(ip: string): string {
  return createHash("sha256").update(ip).digest("hex");
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return err("invalid_json");
  }

  if (typeof body !== "object" || body === null) {
    return err("invalid_payload");
  }

  const { company, email, message, locale } = body as Record<string, unknown>;

  if (
    typeof company !== "string" ||
    typeof email !== "string" ||
    typeof message !== "string" ||
    typeof locale !== "string"
  ) {
    return err("invalid_fields");
  }

  const trimmedCompany = company.trim();
  const trimmedEmail = email.trim();
  const trimmedMessage = message.trim();

  if (!trimmedCompany || !trimmedEmail || !trimmedMessage) {
    return err("required");
  }
  if (
    trimmedCompany.length > MAX_LENGTHS.company ||
    trimmedEmail.length > MAX_LENGTHS.email ||
    trimmedMessage.length > MAX_LENGTHS.message
  ) {
    return err("too_long");
  }
  if (!EMAIL_RE.test(trimmedEmail)) {
    return err("invalid_email");
  }
  if (locale !== "ko" && locale !== "en") {
    return err("invalid_locale");
  }

  const userAgent = request.headers.get("user-agent")?.slice(0, 512) ?? null;
  const forwardedFor = request.headers.get("x-forwarded-for") ?? "";
  const ip = forwardedFor.split(",")[0]?.trim() ?? "";
  const ipHash = ip ? hashIp(ip) : null;

  const { error } = await supabaseAdmin()
    .from("contact_inquiries")
    .insert({
      company: trimmedCompany,
      email: trimmedEmail,
      message: trimmedMessage,
      locale,
      user_agent: userAgent,
      ip_hash: ipHash,
    });

  if (error) {
    console.error("[/api/contact] insert failed", error);
    return err("db_error", 500);
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
