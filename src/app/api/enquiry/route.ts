import type { NextRequest } from 'next/server';
import type { EnquiryForm } from '@/types';
import { checkRateLimit, getClientIp } from '@/lib/security/rate-limiter';
import { sanitizeInput, sanitizeEmail, isValidEmail } from '@/lib/security/sanitize';

// ─── Allowed origins for CSRF protection ─────────────────────────────────────
const ALLOWED_ORIGINS = [
  process.env.NEXT_PUBLIC_SITE_URL,
  'http://localhost:3000',
  'http://localhost:3001',
].filter(Boolean) as string[]

function isAllowedOrigin(origin: string | null): boolean {
  if (!origin) return false
  return ALLOWED_ORIGINS.some((allowed) => origin.startsWith(allowed))
}

export async function POST(request: NextRequest) {
  // ── CSRF: check Origin header ─────────────────────────────────────────────
  const origin = request.headers.get('origin')
  if (!isAllowedOrigin(origin)) {
    return Response.json(
      { success: false, message: 'Forbidden.' },
      { status: 403 }
    );
  }

  // ── Rate limiting: 5 requests per minute per IP ───────────────────────────
  const ip = getClientIp(request)
  const rateLimit = checkRateLimit(`enquiry:${ip}`, 5, 60_000)
  if (!rateLimit.allowed) {
    return Response.json(
      { success: false, message: 'Too many requests. Please wait a moment and try again.' },
      {
        status: 429,
        headers: { 'Retry-After': String(Math.ceil((rateLimit.resetAt - Date.now()) / 1000)) },
      }
    );
  }

  // ── Parse body ────────────────────────────────────────────────────────────
  let body: Partial<EnquiryForm>;
  try {
    body = await request.json();
  } catch {
    return Response.json(
      { success: false, message: 'Invalid JSON body.' },
      { status: 400 }
    );
  }

  // ── Honeypot check (bot detection) ────────────────────────────────────────
  // The client sends a hidden `_hp` field that must remain empty.
  const raw = body as Record<string, unknown>
  if (raw._hp && String(raw._hp).trim() !== '') {
    // Silently accept to not reveal the check to bots
    return Response.json({ success: true, message: "Thank you! We'll respond within 24 hours." });
  }

  const { name, email, whatsapp } = body;

  // ── Required field validation ─────────────────────────────────────────────
  const missing: string[] = [];
  if (!name?.trim()) missing.push('name');
  if (!email?.trim()) missing.push('email');
  if (!whatsapp?.trim()) missing.push('whatsapp');

  if (missing.length > 0) {
    return Response.json(
      { success: false, message: `Missing required fields: ${missing.join(', ')}.` },
      { status: 400 }
    );
  }

  // ── Email validation ──────────────────────────────────────────────────────
  const sanitizedEmail = sanitizeEmail(email!);
  if (!isValidEmail(sanitizedEmail)) {
    return Response.json(
      { success: false, message: 'Invalid email address format.' },
      { status: 400 }
    );
  }

  // ── Sanitize string inputs ────────────────────────────────────────────────
  const sanitizedName = sanitizeInput(name!);
  const sanitizedWhatsapp = sanitizeInput(whatsapp!);
  const sanitizedSchoolName = body.schoolName ? sanitizeInput(body.schoolName) : undefined;
  const sanitizedMessage = body.message ? sanitizeInput(body.message) : undefined;

  // ── Log enquiry ───────────────────────────────────────────────────────────
  console.log('[Enquiry Received]', {
    timestamp: new Date().toISOString(),
    role: body.role,
    name: sanitizedName,
    schoolName: sanitizedSchoolName,
    email: sanitizedEmail,
    whatsapp: sanitizedWhatsapp,
    preferredPackage: body.preferredPackage,
    groupSize: body.groupSize,
    travelMonth: body.travelMonth,
    dietaryPreference: body.dietaryPreference,
    message: sanitizedMessage,
  });

  return Response.json(
    { success: true, message: "Thank you! We'll respond within 24 hours." },
    { status: 200 }
  );
}
