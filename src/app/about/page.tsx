import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us | Discover Korea",
  description:
    "Learn about Discover Korea's mission to provide structured educational travel experiences for Indian students. Founded by education experts with partnerships in Korean universities and tech companies.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="py-16 md:py-24">
        <Container>
          <SectionHeading
            title="About Discover Korea"
            subtitle="Bridging Indian students with Korea's excellence in education, innovation, and culture"
          />
        </Container>
      </section>

      {/* Our Story */}
      <section className="py-16 md:py-24 bg-white">
        <Container>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6">
              Our Story
            </h2>
            <div className="space-y-4 text-text-secondary leading-relaxed">
              <p>
                Discover Korea was founded with a simple yet powerful mission:
                to create meaningful educational experiences that transform how
                Indian students see the world. We recognized that Korea — a
                nation that has achieved remarkable economic and technological
                success while preserving deep cultural heritage — offers a unique
                learning destination rarely explored by Indian educational groups.
              </p>
              <p>
                Our founders spent years building relationships with Korean
                universities, technology companies, cultural institutions, and
                educational partners. We understood that the future of Indian
                education lies in exposing students to global perspectives,
                fostering cross-cultural understanding, and inspiring them with
                real-world examples of innovation and excellence. Korea embodies
                all of this and more.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Our Mission */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="max-w-4xl mx-auto bg-surface rounded-xl p-8 md:p-12">
            <h2 className="text-2xl md:text-3xl font-bold text-primary mb-6 text-center">
              Our Mission
            </h2>
            <p className="text-lg text-text-secondary text-center leading-relaxed">
              To provide structured international educational experiences that
              build <strong>global mindset, academic motivation, and future
              career vision</strong> for Indian students through immersive exposure
              to Korea's achievements in education, technology, culture, and
              geopolitics.
            </p>
          </div>
        </Container>
      </section>

      {/* What We Offer */}
      <section className="py-16 md:py-24 bg-white">
        <Container>
          <SectionHeading title="What We Offer" />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1 */}
            <div className="bg-surface rounded-xl p-6 border border-surface hover:shadow-lg transition-shadow">
              <div className="text-3xl mb-3">📚</div>
              <h3 className="text-lg font-bold text-primary mb-3">
                Educational Tours
              </h3>
              <p className="text-sm text-text-secondary">
                Visit world-class universities, research labs, and educational
                institutions to understand Korea's academic excellence and STEM
                culture.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-surface rounded-xl p-6 border border-surface hover:shadow-lg transition-shadow">
              <div className="text-3xl mb-3">🏭</div>
              <h3 className="text-lg font-bold text-primary mb-3">
                Industrial Visits
              </h3>
              <p className="text-sm text-text-secondary">
                Explore Samsung, Hyundai, and innovative Korean tech companies
                to see cutting-edge innovation and future industry trends.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-surface rounded-xl p-6 border border-surface hover:shadow-lg transition-shadow">
              <div className="text-3xl mb-3">🎭</div>
              <h3 className="text-lg font-bold text-primary mb-3">
                Cultural Experiences
              </h3>
              <p className="text-sm text-text-secondary">
                Immerse in K-pop, traditional hanok villages, UNESCO heritage
                sites, and authentic Korean cuisine experiences.
              </p>
            </div>

            {/* Card 4 */}
            <div className="bg-surface rounded-xl p-6 border border-surface hover:shadow-lg transition-shadow">
              <div className="text-3xl mb-3">⚙️</div>
              <h3 className="text-lg font-bold text-primary mb-3">
                Custom Programs
              </h3>
              <p className="text-sm text-text-secondary">
                Tailor-made itineraries for schools, colleges, and groups based
                on your specific educational objectives and interests.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Partner Institutions */}
      <section className="py-16 md:py-24">
        <Container>
          <SectionHeading title="Our Partner Institutions" />
          <div className="max-w-4xl mx-auto">
            <p className="text-center text-text-secondary mb-8">
              We work with Korea's leading universities and global companies
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-semibold text-primary mb-4">Universities</h3>
                <div className="space-y-2 text-text-secondary">
                  <p>• Yonsei University</p>
                  <p>• Seoul National University (SNU)</p>
                  <p>• KAIST (Korea Advanced Institute of Science & Technology)</p>
                  <p>• Korea Maritime University (KMOU)</p>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-primary mb-4">
                  Companies & Institutions
                </h3>
                <div className="space-y-2 text-text-secondary">
                  <p>• Samsung Electronics</p>
                  <p>• Hyundai Motor Group</p>
                  <p>• LG Electronics</p>
                  <p>• Korean Cultural Centers</p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-white">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Start Planning Your Educational Journey
            </h2>
            <p className="text-text-secondary text-lg mb-8">
              Let us help you design the perfect Korea experience for your
              students.
            </p>
            <Link href="/contact">
              <Button variant="primary" size="lg">
                Get in Touch with Our Team
              </Button>
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
}
