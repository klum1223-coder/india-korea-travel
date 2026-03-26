'use client';

import { useState } from 'react';
import Link from 'next/link';
import Container from '@/components/ui/Container';
import SectionHeading from '@/components/ui/SectionHeading';
import Button from '@/components/ui/Button';
import type { EnquiryForm } from '@/types';

const PACKAGES = [
  { value: '5n6d-seoul-busan', label: '5N/6D – Seoul & Busan' },
  { value: '8d7n-stem-industry', label: '8D/7N – STEM & Industry' },
  { value: '9d8n-comprehensive', label: '9D/8N – Comprehensive Korea' },
  { value: '10d9n-korea-jeju', label: '10D/9N – Korea & Jeju' },
  { value: 'custom', label: 'Custom Package' },
];

const TRAVEL_MONTHS = [
  'January 2026', 'February 2026', 'March 2026', 'April 2026',
  'May 2026', 'June 2026', 'July 2026', 'August 2026',
  'September 2026', 'October 2026', 'November 2026', 'December 2026',
  'January 2027', 'February 2027', 'March 2027', 'April 2027',
  'May 2027', 'June 2027', 'July 2027', 'August 2027',
  'September 2027', 'October 2027', 'November 2027', 'December 2027',
];

const ROLES: { value: EnquiryForm['role']; label: string }[] = [
  { value: 'principal', label: 'Principal' },
  { value: 'teacher', label: 'Teacher' },
  { value: 'parent', label: 'Parent' },
  { value: 'student', label: 'Student' },
  { value: 'agent', label: 'Travel Agent' },
];

const DIETARY_OPTIONS: { value: EnquiryForm['dietaryPreference'][number]; label: string }[] = [
  { value: 'vegetarian', label: 'Vegetarian' },
  { value: 'halal', label: 'Halal' },
  { value: 'jain', label: 'Jain' },
  { value: 'any', label: 'Any / No Preference' },
];

const inputClass =
  'w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-text-primary placeholder:text-text-secondary/60 focus:outline-none focus:ring-2 focus:ring-secondary/40 focus:border-secondary transition';

const labelClass = 'block text-sm font-semibold text-text-primary mb-1';

type Toast = { type: 'success' | 'error'; message: string } | null;

export default function ContactPage() {
  const [form, setForm] = useState<Partial<EnquiryForm>>({
    role: 'teacher',
    dietaryPreference: [],
  });
  const [errors, setErrors] = useState<Partial<Record<keyof EnquiryForm, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState<Toast>(null);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof EnquiryForm]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  function handleDietaryChange(value: EnquiryForm['dietaryPreference'][number]) {
    setForm((prev) => {
      const current = prev.dietaryPreference ?? [];
      return {
        ...prev,
        dietaryPreference: current.includes(value)
          ? current.filter((v) => v !== value)
          : [...current, value],
      };
    });
  }

  function validate(): boolean {
    const newErrors: Partial<Record<keyof EnquiryForm, string>> = {};

    if (!form.name?.trim()) newErrors.name = 'Name is required.';
    if (!form.email?.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (!form.whatsapp?.trim()) {
      newErrors.whatsapp = 'WhatsApp number is required.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    setToast(null);

    try {
      const payload: EnquiryForm = {
        role: form.role ?? 'teacher',
        name: form.name ?? '',
        schoolName: form.schoolName,
        email: form.email ?? '',
        whatsapp: form.whatsapp ?? '',
        preferredPackage: form.preferredPackage ?? '',
        groupSize: Number(form.groupSize) || 0,
        travelMonth: form.travelMonth ?? '',
        dietaryPreference: form.dietaryPreference ?? [],
        message: form.message ?? '',
      };

      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        setToast({ type: 'success', message: data.message });
        setForm({ role: 'teacher', dietaryPreference: [] });
        setErrors({});
      } else {
        setToast({ type: 'error', message: data.message ?? 'Something went wrong. Please try again.' });
      }
    } catch {
      setToast({ type: 'error', message: 'Network error. Please check your connection and try again.' });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="py-16 lg:py-24">
      <Container>
        <SectionHeading
          title="Get in Touch"
          subtitle="Plan your Korea educational tour with our expert team. We respond within 24 hours."
        />

        <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Left column: Enquiry Form */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 lg:p-8">
            <h3 className="font-poppins text-xl font-bold text-primary mb-6">Enquiry Form</h3>

            {toast && (
              <div
                className={`mb-5 rounded-lg px-4 py-3 text-sm font-medium ${
                  toast.type === 'success'
                    ? 'bg-success/10 text-success border border-success/20'
                    : 'bg-red-50 text-red-600 border border-red-200'
                }`}
              >
                {toast.message}
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              {/* Role */}
              <fieldset>
                <legend className={labelClass}>I am a</legend>
                <div className="flex flex-wrap gap-3 mt-1">
                  {ROLES.map(({ value, label }) => (
                    <label key={value} className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="radio"
                        name="role"
                        value={value}
                        checked={form.role === value}
                        onChange={handleChange}
                        className="accent-secondary"
                      />
                      <span className="text-sm text-text-primary">{label}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              {/* Name */}
              <div>
                <label htmlFor="name" className={labelClass}>
                  Full Name <span className="text-secondary">*</span>
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="Your full name"
                  value={form.name ?? ''}
                  onChange={handleChange}
                  className={inputClass}
                />
                {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
              </div>

              {/* School Name */}
              <div>
                <label htmlFor="schoolName" className={labelClass}>
                  School / Institution Name <span className="text-text-secondary text-xs font-normal">(optional)</span>
                </label>
                <input
                  id="schoolName"
                  name="schoolName"
                  type="text"
                  placeholder="e.g. Delhi Public School"
                  value={form.schoolName ?? ''}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className={labelClass}>
                  Email Address <span className="text-secondary">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  value={form.email ?? ''}
                  onChange={handleChange}
                  className={inputClass}
                />
                {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
              </div>

              {/* WhatsApp */}
              <div>
                <label htmlFor="whatsapp" className={labelClass}>
                  WhatsApp Number <span className="text-secondary">*</span>
                </label>
                <input
                  id="whatsapp"
                  name="whatsapp"
                  type="tel"
                  required
                  placeholder="+91 98765 43210"
                  value={form.whatsapp ?? ''}
                  onChange={handleChange}
                  className={inputClass}
                />
                {errors.whatsapp && <p className="mt-1 text-xs text-red-500">{errors.whatsapp}</p>}
              </div>

              {/* Two-column row: Package + Group Size */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="preferredPackage" className={labelClass}>
                    Preferred Package
                  </label>
                  <select
                    id="preferredPackage"
                    name="preferredPackage"
                    value={form.preferredPackage ?? ''}
                    onChange={handleChange}
                    className={inputClass}
                  >
                    <option value="">Select a package</option>
                    {PACKAGES.map(({ value, label }) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="groupSize" className={labelClass}>
                    Estimated Group Size
                  </label>
                  <input
                    id="groupSize"
                    name="groupSize"
                    type="number"
                    min={1}
                    placeholder="e.g. 25"
                    value={form.groupSize ?? ''}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>
              </div>

              {/* Travel Month */}
              <div>
                <label htmlFor="travelMonth" className={labelClass}>
                  Preferred Travel Month
                </label>
                <select
                  id="travelMonth"
                  name="travelMonth"
                  value={form.travelMonth ?? ''}
                  onChange={handleChange}
                  className={inputClass}
                >
                  <option value="">Select a month</option>
                  {TRAVEL_MONTHS.map((month) => (
                    <option key={month} value={month}>
                      {month}
                    </option>
                  ))}
                </select>
              </div>

              {/* Dietary Preference */}
              <fieldset>
                <legend className={labelClass}>Dietary Preference</legend>
                <div className="flex flex-wrap gap-3 mt-1">
                  {DIETARY_OPTIONS.map(({ value, label }) => (
                    <label key={value} className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={form.dietaryPreference?.includes(value) ?? false}
                        onChange={() => handleDietaryChange(value)}
                        className="accent-secondary"
                      />
                      <span className="text-sm text-text-primary">{label}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              {/* Message */}
              <div>
                <label htmlFor="message" className={labelClass}>
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  placeholder="Tell us more about your requirements, dates, or any special requests..."
                  value={form.message ?? ''}
                  onChange={handleChange}
                  className={inputClass + ' resize-none'}
                />
              </div>

              {/* Submit */}
              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
                disabled={submitting}
              >
                {submitting ? 'Submitting…' : 'Submit Enquiry'}
              </Button>
            </form>
          </div>

          {/* Right column: Contact Info */}
          <div className="space-y-6">
            {/* For Schools & Teachers */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-poppins text-lg font-bold text-primary mb-1">
                For Schools &amp; Teachers
              </h3>
              <p className="text-sm text-text-secondary mb-4">
                Download our full school tour proposal or schedule a call with our education specialist.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button asChild variant="primary" size="sm">
                  <Link href="/for-schools">Download Proposal</Link>
                </Button>
                <Button asChild variant="outline" size="sm">
                  <Link href="/contact">Schedule Meeting</Link>
                </Button>
              </div>
            </div>

            {/* For Parents & Students */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-poppins text-lg font-bold text-primary mb-1">
                For Parents &amp; Students
              </h3>
              <p className="text-sm text-text-secondary mb-4">
                Reach us instantly via WhatsApp or drop us an email and we&apos;ll get back to you within 24 hours.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="https://wa.me/919999999999"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold text-sm px-4 py-2.5 rounded-lg transition-colors"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  WhatsApp Chat Now
                </a>
                <a
                  href="mailto:info@discoverkorea.edu"
                  className="inline-flex items-center justify-center gap-2 border-2 border-secondary text-secondary hover:bg-secondary hover:text-white font-semibold text-sm px-4 py-2.5 rounded-lg transition-colors"
                >
                  Send Email
                </a>
              </div>
            </div>

            {/* Office Addresses */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-poppins text-lg font-bold text-primary mb-4">Our Offices</h3>

              <div className="space-y-5">
                {/* Korea Office */}
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm">
                    🇰🇷
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-text-primary">Seoul Office, Korea</p>
                    <p className="text-sm text-text-secondary mt-0.5">
                      123 Gangnam-daero, Gangnam-gu<br />
                      Seoul 06000, South Korea
                    </p>
                    <a
                      href="tel:+8225551234"
                      className="text-sm text-secondary hover:underline mt-1 inline-block"
                    >
                      +82-2-555-1234
                    </a>
                  </div>
                </div>

                <div className="border-t border-gray-100" />

                {/* India Office */}
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm">
                    🇮🇳
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-text-primary">Delhi Office, India</p>
                    <p className="text-sm text-text-secondary mt-0.5">
                      456 Connaught Place, Block A<br />
                      New Delhi 110001, India
                    </p>
                    <a
                      href="tel:+911123456789"
                      className="text-sm text-secondary hover:underline mt-1 inline-block"
                    >
                      +91-11-2345-6789
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Business Hours */}
            <div className="bg-primary/5 rounded-2xl border border-primary/10 p-6">
              <h3 className="font-poppins text-base font-bold text-primary mb-3">Business Hours</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-text-secondary">Korea (KST)</span>
                  <span className="font-medium text-text-primary">Mon–Fri, 9:00 AM – 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-secondary">India (IST)</span>
                  <span className="font-medium text-text-primary">Mon–Sat, 10:00 AM – 7:00 PM</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
