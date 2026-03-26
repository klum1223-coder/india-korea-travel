import type { Metadata } from 'next'
import Container from '@/components/ui/Container'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of Service for Discover Korea Educational Travel — the rules and conditions governing use of our website and travel programs.',
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="py-16 md:py-24 bg-primary text-white">
        <Container>
          <h1 className="font-poppins font-bold text-3xl md:text-5xl mb-4">
            Terms of Service
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
              Please read these Terms of Service (&ldquo;Terms&rdquo;) carefully before using the Discover Korea
              Educational Travel website or booking any of our programs. By accessing our website or submitting
              an enquiry, you agree to be bound by these Terms.
            </p>

            <h2 className="font-poppins font-semibold text-2xl text-primary mt-10 mb-4">
              1. Acceptance of Terms
            </h2>
            <p className="text-text-secondary leading-relaxed mb-6">
              By accessing or using this website, you confirm that you are at least 18 years of age (or are accessing
              on behalf of a school or institution as an authorised representative), and that you agree to comply with
              these Terms and all applicable laws and regulations.
            </p>

            <h2 className="font-poppins font-semibold text-2xl text-primary mt-10 mb-4">
              2. Our Services
            </h2>
            <p className="text-text-secondary leading-relaxed mb-6">
              Discover Korea Educational Travel provides structured educational travel programs in South Korea
              for Indian student groups. Our website provides information about available packages, itineraries,
              pricing, and allows you to submit enquiries. Final booking contracts are governed by separate
              agreements entered into between Discover Korea and the relevant school or institution.
            </p>

            <h2 className="font-poppins font-semibold text-2xl text-primary mt-10 mb-4">
              3. Booking and Payments
            </h2>
            <p className="text-text-secondary leading-relaxed mb-4">
              All bookings are subject to availability and a separate booking agreement. Key terms include:
            </p>
            <ul className="list-disc list-inside space-y-2 text-text-secondary mb-6">
              <li>A non-refundable deposit is required to confirm a booking</li>
              <li>Final payment is due no later than 60 days before the travel date</li>
              <li>Prices quoted on the website are indicative; final pricing is confirmed in writing at the time of booking</li>
              <li>All prices are quoted in USD unless otherwise specified</li>
            </ul>

            <h2 className="font-poppins font-semibold text-2xl text-primary mt-10 mb-4">
              4. Cancellation and Refund Policy
            </h2>
            <p className="text-text-secondary leading-relaxed mb-4">
              Cancellation fees apply as follows:
            </p>
            <ul className="list-disc list-inside space-y-2 text-text-secondary mb-6">
              <li>More than 90 days before departure: loss of deposit only</li>
              <li>60–90 days before departure: 25% of total booking cost</li>
              <li>30–60 days before departure: 50% of total booking cost</li>
              <li>Less than 30 days before departure: 100% of total booking cost</li>
            </ul>
            <p className="text-text-secondary leading-relaxed mb-6">
              We strongly recommend that all groups obtain comprehensive travel insurance covering cancellation,
              medical expenses, and trip interruption before confirming their booking.
            </p>

            <h2 className="font-poppins font-semibold text-2xl text-primary mt-10 mb-4">
              5. Travel Documents and Visas
            </h2>
            <p className="text-text-secondary leading-relaxed mb-6">
              It is the responsibility of each traveller (and their guardians or school administration)
              to obtain valid passports and any required visas for entry into the Republic of Korea.
              Discover Korea can provide guidance and support documentation but accepts no liability for
              travellers refused entry due to inadequate travel documents.
            </p>

            <h2 className="font-poppins font-semibold text-2xl text-primary mt-10 mb-4">
              6. Health, Safety, and Conduct
            </h2>
            <p className="text-text-secondary leading-relaxed mb-6">
              All participants are expected to behave respectfully toward Korean culture, local people,
              and fellow travellers throughout the program. Discover Korea reserves the right to remove
              any participant whose conduct endangers the safety or wellbeing of the group, without
              refund of remaining program costs. Schools are responsible for supervising their students
              and are required to provide adequate accompanying staff at a ratio specified in the booking agreement.
            </p>

            <h2 className="font-poppins font-semibold text-2xl text-primary mt-10 mb-4">
              7. Intellectual Property
            </h2>
            <p className="text-text-secondary leading-relaxed mb-6">
              All content on this website — including text, images, itineraries, and design — is the property
              of Discover Korea Educational Travel and is protected by applicable intellectual property laws.
              You may not reproduce, distribute, or create derivative works without our prior written consent.
            </p>

            <h2 className="font-poppins font-semibold text-2xl text-primary mt-10 mb-4">
              8. Limitation of Liability
            </h2>
            <p className="text-text-secondary leading-relaxed mb-6">
              To the maximum extent permitted by applicable law, Discover Korea Educational Travel shall not
              be liable for any indirect, incidental, special, or consequential damages arising from the use
              of our website or participation in our programs. Our total liability for any claim shall not
              exceed the amount paid by you for the specific program in question.
            </p>

            <h2 className="font-poppins font-semibold text-2xl text-primary mt-10 mb-4">
              9. Changes to Programs and Itineraries
            </h2>
            <p className="text-text-secondary leading-relaxed mb-6">
              While we endeavour to deliver all advertised program components, circumstances beyond our control
              (including weather, local events, or government advisories) may occasionally require adjustments
              to itineraries. We will make every effort to provide suitable alternatives of equivalent quality
              without additional cost.
            </p>

            <h2 className="font-poppins font-semibold text-2xl text-primary mt-10 mb-4">
              10. Governing Law
            </h2>
            <p className="text-text-secondary leading-relaxed mb-6">
              These Terms shall be governed by and construed in accordance with the laws of the Republic of Korea.
              Any disputes arising under these Terms shall be subject to the exclusive jurisdiction of the courts
              of Seoul, Korea.
            </p>

            <h2 className="font-poppins font-semibold text-2xl text-primary mt-10 mb-4">
              11. Changes to These Terms
            </h2>
            <p className="text-text-secondary leading-relaxed mb-6">
              We reserve the right to update these Terms at any time. Updated Terms will be posted on this page
              with a revised &ldquo;Last updated&rdquo; date. Continued use of the website following any changes
              constitutes your acceptance of the revised Terms.
            </p>

            <h2 className="font-poppins font-semibold text-2xl text-primary mt-10 mb-4">
              12. Contact Us
            </h2>
            <p className="text-text-secondary leading-relaxed mb-2">
              If you have any questions about these Terms, please contact us:
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
