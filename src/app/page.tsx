import HeroSection from '@/components/home/HeroSection'
import TrustBar from '@/components/home/TrustBar'
import ValueProps from '@/components/home/ValueProps'
import HowItWorks from '@/components/home/HowItWorks'
import PackageShowcase from '@/components/home/PackageShowcase'
import ExperienceHighlights from '@/components/home/ExperienceHighlights'
import StatsSection from '@/components/home/StatsSection'
import ForSchoolsCTA from '@/components/home/ForSchoolsCTA'
import BlogFeedPlaceholder from '@/components/home/BlogFeedPlaceholder'

export default function Home() {
  return (
    <main>
      <HeroSection />
      <TrustBar />
      <ValueProps />
      <HowItWorks />
      <PackageShowcase />
      <ExperienceHighlights />
      <StatsSection />
      <ForSchoolsCTA />
      <BlogFeedPlaceholder />
    </main>
  )
}
