'use client'

import Container from '@/components/ui/Container'
import SectionHeading from '@/components/ui/SectionHeading'
import AILiveFeed from '@/components/blog/AILiveFeed'
import postsData from '@/lib/data/blog-posts.json'
import type { BlogPost } from '@/types'

const posts = postsData as BlogPost[]

export default function BlogPage() {
  return (
    <div className="min-h-screen pb-20">
      {/* Page hero */}
      <section className="bg-primary py-14 sm:py-20">
        <Container>
          <div className="max-w-2xl">
            <h1 className="font-poppins text-4xl sm:text-5xl font-bold text-white leading-tight mb-4">
              Korea Travel Blog
            </h1>
            <p className="text-white/75 text-lg sm:text-xl leading-relaxed">
              Fresh stories, practical guides, and cultural insights for Indian students and educators exploring South Korea.
            </p>
          </div>
        </Container>
      </section>

      {/* Stats bar */}
      <section className="bg-secondary">
        <Container>
          <div className="grid grid-cols-3 divide-x divide-white/20">
            <div className="px-4 py-4 text-center text-white">
              <p className="font-poppins font-bold text-xl">{posts.length}+</p>
              <p className="text-xs uppercase tracking-wider opacity-75">Stories</p>
            </div>
            <div className="px-4 py-4 text-center text-white">
              <p className="font-poppins font-bold text-xl">Daily</p>
              <p className="text-xs uppercase tracking-wider opacity-75">Updates</p>
            </div>
            <div className="px-4 py-4 text-center text-white">
              <p className="font-poppins font-bold text-xl">AI</p>
              <p className="text-xs uppercase tracking-wider opacity-75">Powered</p>
            </div>
          </div>
        </Container>
      </section>

      {/* Full feed with all posts */}
      <Container className="mt-10">
        <SectionHeading
          title="All Stories"
          subtitle="Browse by topic or scroll through all our Korea travel insights"
          align="left"
        />
      </Container>
      <AILiveFeed posts={posts} fullPage />
    </div>
  )
}
