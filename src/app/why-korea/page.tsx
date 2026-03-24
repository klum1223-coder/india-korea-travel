import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import StatCounter from "@/components/ui/StatCounter";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Why Korea? | Discover Korea",
  description:
    "Discover why South Korea is the ideal educational destination for Indian students. World-class universities, technology innovation, cultural depth, and unique geopolitical learning.",
};

export default function WhyKoreaPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Section 1: India-Korea Connection */}
      <section className="py-16 md:py-24">
        <Container>
          <SectionHeading
            title="India & Korea: Growing Partners"
            subtitle="Discover why Korea is the ideal destination for Indian students seeking educational excellence and cultural immersion."
          />
          <div className="max-w-4xl mx-auto">
            <ul className="space-y-4 text-text-secondary">
              <li className="flex items-start gap-3">
                <span className="text-secondary font-bold mt-1">•</span>
                <span>
                  <strong>Bilateral Relations:</strong> India and Korea share strong economic ties with major Korean companies like Samsung, Hyundai, and LG having significant presence in India
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-secondary font-bold mt-1">•</span>
                <span>
                  <strong>K-Wave Phenomenon:</strong> Korean pop culture, music, and entertainment have become immensely popular across India, making Korea more relatable and exciting for Indian youth
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-secondary font-bold mt-1">•</span>
                <span>
                  <strong>Educational Excellence:</strong> Korean universities consistently rank among Asia's top institutions, attracting students worldwide for STEM and innovative research programs
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-secondary font-bold mt-1">•</span>
                <span>
                  <strong>Future Career Opportunities:</strong> Experience with Korean technology, education, and business practices gives Indian students a competitive edge in the global job market
                </span>
              </li>
            </ul>
          </div>
        </Container>
      </section>

      {/* Section 2: 6 Pillars */}
      <section className="py-16 md:py-24 bg-white">
        <Container>
          <SectionHeading title="6 Pillars of Korea's Appeal" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="bg-surface rounded-xl p-6 border border-surface">
              <div className="text-4xl mb-3">🎓</div>
              <h3 className="text-lg font-bold text-primary mb-3">
                Global Education Powerhouse
              </h3>
              <ul className="space-y-2 text-sm text-text-secondary">
                <li>• World-class universities ranking in QS top 100</li>
                <li>• Strong STEM culture with cutting-edge research</li>
                <li>• Affordable quality education compared to Western countries</li>
              </ul>
            </div>

            {/* Card 2 */}
            <div className="bg-surface rounded-xl p-6 border border-surface">
              <div className="text-4xl mb-3">💡</div>
              <h3 className="text-lg font-bold text-primary mb-3">
                Technology & Innovation Leader
              </h3>
              <ul className="space-y-2 text-sm text-text-secondary">
                <li>• Home to Samsung, Hyundai, and tech innovators</li>
                <li>• #1 global internet speed with 5G infrastructure</li>
                <li>• Visit cutting-edge R&D facilities and tech parks</li>
              </ul>
            </div>

            {/* Card 3 */}
            <div className="bg-surface rounded-xl p-6 border border-surface">
              <div className="text-4xl mb-3">🏛️</div>
              <h3 className="text-lg font-bold text-primary mb-3">
                5,000 Years of Living History
              </h3>
              <ul className="space-y-2 text-sm text-text-secondary">
                <li>• UNESCO World Heritage sites and ancient palaces</li>
                <li>• Traditional hanok villages immersed in nature</li>
                <li>• Bridge between ancient tradition and modern innovation</li>
              </ul>
            </div>

            {/* Card 4 */}
            <div className="bg-surface rounded-xl p-6 border border-surface">
              <div className="text-4xl mb-3">☮️</div>
              <h3 className="text-lg font-bold text-primary mb-3">
                Real-World Geopolitics (DMZ)
              </h3>
              <ul className="space-y-2 text-sm text-text-secondary">
                <li>• World's only divided border — unique learning experience</li>
                <li>• Understand global peace and international relations</li>
                <li>• Peace education unavailable at any other destination</li>
              </ul>
            </div>

            {/* Card 5 */}
            <div className="bg-surface rounded-xl p-6 border border-surface">
              <div className="text-4xl mb-3">🎵</div>
              <h3 className="text-lg font-bold text-primary mb-3">
                K-Culture Global Influence
              </h3>
              <ul className="space-y-2 text-sm text-text-secondary">
                <li>• Experience K-pop, K-beauty, and K-food firsthand</li>
                <li>• Connect with a global cultural phenomenon</li>
                <li>• Visit entertainment venues and cultural districts</li>
              </ul>
            </div>

            {/* Card 6 */}
            <div className="bg-surface rounded-xl p-6 border border-surface">
              <div className="text-4xl mb-3">🛡️</div>
              <h3 className="text-lg font-bold text-primary mb-3">
                Safe & Student-Friendly
              </h3>
              <ul className="space-y-2 text-sm text-text-secondary">
                <li>• One of the world's safest countries (low crime rates)</li>
                <li>• Excellent healthcare and emergency services</li>
                <li>• WiFi everywhere and excellent mobile connectivity</li>
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* Section 3: Comparison Table */}
      <section className="py-16 md:py-24">
        <Container>
          <SectionHeading
            title="Korea vs. Other Asian Destinations"
            subtitle="See why Korea stands out for educational travel"
          />
          <div className="overflow-x-auto rounded-xl border border-surface">
            <table className="w-full text-sm">
              <thead className="bg-surface border-b border-surface">
                <tr>
                  <th className="px-4 py-3 text-left font-bold text-primary">
                    Category
                  </th>
                  <th className="px-4 py-3 text-left font-bold text-primary">
                    Korea
                  </th>
                  <th className="px-4 py-3 text-left font-bold text-primary">
                    Singapore
                  </th>
                  <th className="px-4 py-3 text-left font-bold text-primary">
                    Thailand
                  </th>
                  <th className="px-4 py-3 text-left font-bold text-primary">
                    Japan
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface">
                <tr className="bg-white hover:bg-surface/50">
                  <td className="px-4 py-3 font-semibold text-primary">
                    Education Quality
                  </td>
                  <td className="px-4 py-3 text-text-secondary">
                    Top tier (QS 100)
                  </td>
                  <td className="px-4 py-3 text-text-secondary">
                    Excellent (NUS, NTU)
                  </td>
                  <td className="px-4 py-3 text-text-secondary">
                    Good (not top tier)
                  </td>
                  <td className="px-4 py-3 text-text-secondary">
                    Excellent (Tokyo)
                  </td>
                </tr>
                <tr className="bg-white hover:bg-surface/50">
                  <td className="px-4 py-3 font-semibold text-primary">
                    Technology Innovation
                  </td>
                  <td className="px-4 py-3 text-text-secondary">
                    Samsung, LG, Hyundai
                  </td>
                  <td className="px-4 py-3 text-text-secondary">
                    Good tech hub
                  </td>
                  <td className="px-4 py-3 text-text-secondary">
                    Limited
                  </td>
                  <td className="px-4 py-3 text-text-secondary">
                    Toyota, Sony, Honda
                  </td>
                </tr>
                <tr className="bg-white hover:bg-surface/50">
                  <td className="px-4 py-3 font-semibold text-primary">
                    Geopolitics Learning
                  </td>
                  <td className="px-4 py-3 text-text-secondary">
                    Unique (DMZ)
                  </td>
                  <td className="px-4 py-3 text-text-secondary">
                    None
                  </td>
                  <td className="px-4 py-3 text-text-secondary">
                    None
                  </td>
                  <td className="px-4 py-3 text-text-secondary">
                    None
                  </td>
                </tr>
                <tr className="bg-white hover:bg-surface/50">
                  <td className="px-4 py-3 font-semibold text-primary">
                    Cultural Depth
                  </td>
                  <td className="px-4 py-3 text-text-secondary">
                    5,000 years + modern
                  </td>
                  <td className="px-4 py-3 text-text-secondary">
                    Limited history
                  </td>
                  <td className="px-4 py-3 text-text-secondary">
                    Rich heritage
                  </td>
                  <td className="px-4 py-3 text-text-secondary">
                    Rich heritage
                  </td>
                </tr>
                <tr className="bg-white hover:bg-surface/50">
                  <td className="px-4 py-3 font-semibold text-primary">
                    K-Culture/Pop Culture
                  </td>
                  <td className="px-4 py-3 text-text-secondary">
                    K-pop, K-beauty, K-food
                  </td>
                  <td className="px-4 py-3 text-text-secondary">
                    Not primary
                  </td>
                  <td className="px-4 py-3 text-text-secondary">
                    Not primary
                  </td>
                  <td className="px-4 py-3 text-text-secondary">
                    Anime, gaming
                  </td>
                </tr>
                <tr className="bg-white hover:bg-surface/50">
                  <td className="px-4 py-3 font-semibold text-primary">
                    Indian Food Options
                  </td>
                  <td className="px-4 py-3 text-text-secondary">
                    Good availability
                  </td>
                  <td className="px-4 py-3 text-text-secondary">
                    Excellent
                  </td>
                  <td className="px-4 py-3 text-text-secondary">
                    Good
                  </td>
                  <td className="px-4 py-3 text-text-secondary">
                    Limited
                  </td>
                </tr>
                <tr className="bg-white hover:bg-surface/50">
                  <td className="px-4 py-3 font-semibold text-primary">
                    Cost (6 days)
                  </td>
                  <td className="px-4 py-3 text-text-secondary">
                    $1,200-1,600
                  </td>
                  <td className="px-4 py-3 text-text-secondary">
                    $1,400-1,800
                  </td>
                  <td className="px-4 py-3 text-text-secondary">
                    $800-1,200
                  </td>
                  <td className="px-4 py-3 text-text-secondary">
                    $1,800-2,200
                  </td>
                </tr>
                <tr className="bg-white hover:bg-surface/50">
                  <td className="px-4 py-3 font-semibold text-primary">
                    Best For
                  </td>
                  <td className="px-4 py-3 text-text-secondary">
                    Tech + Culture + Learning
                  </td>
                  <td className="px-4 py-3 text-text-secondary">
                    Business education
                  </td>
                  <td className="px-4 py-3 text-text-secondary">
                    Budget travel
                  </td>
                  <td className="px-4 py-3 text-text-secondary">
                    Heritage + Tech
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Container>
      </section>

      {/* Section 4: By the Numbers */}
      <section className="py-16 md:py-24 bg-white">
        <Container>
          <SectionHeading title="Korea by the Numbers" />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <StatCounter value="6" label="Universities in QS Top 100" />
            <StatCounter value="#1" label="Internet Speed Globally" />
            <StatCounter value="13th" label="GDP Worldwide" />
            <StatCounter value="Top 5" label="Global Peace Index (Asia)" />
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Ready to explore?
            </h2>
            <p className="text-text-secondary text-lg mb-8">
              Discover our curated packages designed for Indian students seeking the ultimate Korea experience.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/packages">
                <Button variant="primary" size="lg">
                  Explore Packages
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="lg">
                  Get in Touch
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
