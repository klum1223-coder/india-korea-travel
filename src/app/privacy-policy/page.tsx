import type { Metadata } from 'next'
import Container from '@/components/ui/Container'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for Discover Korea Educational Travel — how we collect, use, and protect your personal information.',
}

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="py-16 md:py-24 bg-primary text-white">
        <Container>
          <h1 className="font-poppins font-bold text-3xl md:text-5xl mb-4">
            Privacy Policy
          </h1>
          <p className="text-white/75 text-lg max-w-2xl">
            Last updated: March 2026
          </p>
        </Container>
      </section>

      {/* Content */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="max-w-3xl mx-auto prose prose-lg text-text-primary">

            <p className="text-text-secondary text-lg leading-relaxed mb-8">
              Discover Korea Educational Travel (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;) is committed to protecting your privacy.
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information
              when you visit our website or enquire about our educational travel programs.
            </p>

            <h2 className="font-poppins font-semibold text-2xl text-primary mt-10 mb-4">
              1. Information We Collect
            </h2>
            <p className="text-text-secondary leading-relaxed mb-4">
              We may collect the following types of personal information:
            </p>
            <ul className="list-disc list-inside space-y-2 text-text-secondary mb-6">
              <li><strong>Contact Information</strong> — name, email address, phone number</li>
              <li><strong>Institutional Information</strong> — school or organisation name, your role (principal, teacher, parent)</li>
              <li><strong>Travel Preferences</strong> — number of students, preferred travel dates, package interest</li>
              <li><strong>Usage Data</strong> — pages visited, time on site, browser type (collected automatically via cookies)</li>
            </ul>

            <h2 className="font-poppins font-semibold text-2xl text-primary mt-10 mb-4">
              2. How We Use Your Information
            </h2>
            <p className="text-text-secondary leading-relaxed mb-4">
              We use the information we collect to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-text-secondary mb-6">
              <li>Respond to your enquiries and provide quotations for our travel programs</li>
              <li>Send you relevant updates about Korea educational travel, scholarship news, and exclusive offers (only if you have subscribed)</li>
              <li>Improve our website and services based on usage patterns</li>
              <li>Comply with legal obligations and resolve disputes</li>
            </ul>

            <h2 className="font-poppins font-semibold text-2xl text-primary mt-10 mb-4">
              3. Information Sharing
            </h2>
            <p className="text-text-secondary leading-relaxed mb-6">
              We do not sell, trade, or otherwise transfer your personal information to third parties without your consent,
              except to trusted service providers who assist us in operating our website and conducting our business —
              provided they agree to keep your information confidential. We may also disclose information when required by law.
            </p>

            <h2 className="font-poppins font-semibold text-2xl text-primary mt-10 mb-4">
              4. Cookies
            </h2>
            <p className="text-text-secondary leading-relaxed mb-6">
              Our website uses cookies to enhance your browsing experience. Cookies are small files stored on your device
              that help us understand how visitors use our site. You can choose to disable cookies through your browser settings,
              though this may affect some website functionality.
            </p>

            <h2 className="font-poppins font-semibold text-2xl text-primary mt-10 mb-4">
              5. Data Security
            </h2>
            <p className="text-text-secondary leading-relaxed mb-6">
              We implement appropriate technical and organisational measures to protect your personal information against
              unauthorised access, alteration, disclosure, or destruction. However, no internet transmission is completely
              secure, and we cannot guarantee absolute security.
            </p>

            <h2 className="font-poppins font-semibold text-2xl text-primary mt-10 mb-4">
              6. Data Retention
            </h2>
            <p className="text-text-secondary leading-relaxed mb-6">
              We retain your personal information only for as long as necessary to fulfil the purposes outlined in this policy,
              or as required by applicable law. Enquiry data is typically retained for up to 3 years unless you request deletion.
            </p>

            <h2 className="font-poppins font-semibold text-2xl text-primary mt-10 mb-4">
              7. Your Rights
            </h2>
            <p className="text-text-secondary leading-relaxed mb-4">
              Depending on your jurisdiction, you may have the right to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-text-secondary mb-6">
              <li>Access the personal information we hold about you</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your personal data</li>
              <li>Opt out of marketing communications at any time</li>
            </ul>
            <p className="text-text-secondary leading-relaxed mb-6">
              To exercise any of these rights, please contact us at{' '}
              <a href="mailto:info@discoverkorea.edu" className="text-secondary hover:underline">
                info@discoverkorea.edu
              </a>.
            </p>

            <h2 className="font-poppins font-semibold text-2xl text-primary mt-10 mb-4">
              8. Third-Party Links
            </h2>
            <p className="text-text-secondary leading-relaxed mb-6">
              Our website may contain links to third-party websites. We are not responsible for the privacy practices
              of those sites and encourage you to review their respective privacy policies.
            </p>

            <h2 className="font-poppins font-semibold text-2xl text-primary mt-10 mb-4">
              9. Changes to This Policy
            </h2>
            <p className="text-text-secondary leading-relaxed mb-6">
              We may update this Privacy Policy from time to time. We will notify you of significant changes
              by posting the new policy on this page with an updated &ldquo;Last updated&rdquo; date.
              We encourage you to review this policy periodically.
            </p>

            <h2 className="font-poppins font-semibold text-2xl text-primary mt-10 mb-4">
              10. Contact Us
            </h2>
            <p className="text-text-secondary leading-relaxed mb-2">
              If you have any questions about this Privacy Policy, please contact us:
            </p>
            <ul className="list-none space-y-2 text-text-secondary">
              <li>
                Email:{' '}
                <a href="mailto:info@discoverkorea.edu" className="text-secondary hover:underline">
                  info@discoverkorea.edu
                </a>
              </li>
              <li>Website: <a href="/contact" className="text-secondary hover:underline">Contact Form</a></li>
            </ul>

          </div>
        </Container>
      </section>
    </div>
  )
}
