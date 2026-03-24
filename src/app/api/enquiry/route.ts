import type { NextRequest } from 'next/server';
import type { EnquiryForm } from '@/types';

export async function POST(request: NextRequest) {
  let body: Partial<EnquiryForm>;

  try {
    body = await request.json();
  } catch {
    return Response.json(
      { success: false, message: 'Invalid JSON body.' },
      { status: 400 }
    );
  }

  const { name, email, whatsapp } = body;

  // Validate required fields
  const missing: string[] = [];
  if (!name?.trim()) missing.push('name');
  if (!email?.trim()) missing.push('email');
  if (!whatsapp?.trim()) missing.push('whatsapp');

  if (missing.length > 0) {
    return Response.json(
      {
        success: false,
        message: `Missing required fields: ${missing.join(', ')}.`,
      },
      { status: 400 }
    );
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email!)) {
    return Response.json(
      { success: false, message: 'Invalid email address format.' },
      { status: 400 }
    );
  }

  // Log enquiry to console (replace with DB/email integration later)
  console.log('[Enquiry Received]', {
    timestamp: new Date().toISOString(),
    role: body.role,
    name: body.name,
    schoolName: body.schoolName,
    email: body.email,
    whatsapp: body.whatsapp,
    preferredPackage: body.preferredPackage,
    groupSize: body.groupSize,
    travelMonth: body.travelMonth,
    dietaryPreference: body.dietaryPreference,
    message: body.message,
  });

  return Response.json(
    {
      success: true,
      message: "Thank you! We'll respond within 24 hours.",
    },
    { status: 200 }
  );
}
