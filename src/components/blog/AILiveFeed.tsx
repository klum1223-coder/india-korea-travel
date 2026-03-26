'use client'

import { useState } from 'react'
import Link from 'next/link'
import Container from '@/components/ui/Container'
import SectionHeading from '@/components/ui/SectionHeading'
import Tag from '@/components/ui/Tag'
import FeaturedPostCard from '@/components/blog/FeaturedPostCard'
import PostCard from '@/components/blog/PostCard'
import type { BlogPost } from '@/types'

const FILTER_TAGS = ['All', 'Seoul', 'Busan', 'K-Culture', 'Food', 'STEM', 'Safety', 'Seasonal']

const naverPlaceholderPosts = [
  '봄 벚꽃 시즌 — 서울 여의도 한강공원 가이드 (Spring Cherry Blossoms at Yeouido)',
  '인도 학생 단체를 위한 부산 필수 방문지 (Busan Must-Visits for Indian Groups)',
  '한국 사찰 음식 — 채식주의자를 위한 완벽한 선택 (Temple Food for Vegetarians)',
]

interface AILiveFeedProps {
  posts: BlogPost[]
  /** When true, renders the full-page blog list layout (no outer section wrapper padding) */
  fullPage?: boolean
}

export default function AILiveFeed({ posts, fullPage = false }: AILiveFeedProps) {
  const [activeTag, setActiveTag] = useState('All')

  const filteredPosts =
    activeTag === 'All'
      ? posts
      : posts.filter(
          (p) =>
            p.tags.some((t) => t.toLowerCase() === activeTag.toLowerCase()) ||
            p.category.toLowerCase().includes(activeTag.toLowerCase())
        )

  const featuredPost = filteredPosts[0] ?? null
  const trendingPosts = filteredPosts.slice(1, 4)
  const remainingPosts = fullPage ? filteredPosts.slice(4) : []

  return (
    <section className={fullPage ? 'py-10' : 'py-20 bg-background'}>
      <Container>
        {!fullPage && (
          <SectionHeading
            title="Korea Travel Insights — Updated Daily"
            subtitle="Fresh stories about Korea, crafted for Indian students and educators"
            align="center"
          />
        )}

        {/* Tag filter bar */}
        <div className="flex flex-wrap gap-2 mb-8" role="group" aria-label="Filter posts by topic">
          {FILTER_TAGS.map((tag) => (
            <Tag
              key={tag}
              label={tag}
              active={activeTag === tag}
              onClick={() => setActiveTag(tag)}
            />
          ))}
        </div>

        {/* Featured post */}
        <div className="mb-10">
          <FeaturedPostCard post={featuredPost} />
        </div>

        {/* Trending stories */}
        {trendingPosts.length > 0 && (
          <div className="mb-10">
            <h3 className="font-poppins text-xl font-bold text-primary mb-5">
              Trending Stories
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {trendingPosts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          </div>
        )}

        {/* Additional posts on full-page view */}
        {fullPage && remainingPosts.length > 0 && (
          <div className="mb-10">
            <h3 className="font-poppins text-xl font-bold text-primary mb-5">
              More Stories
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {remainingPosts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          </div>
        )}

        {filteredPosts.length === 0 && (
          <div className="text-center py-16 text-text-secondary">
            <p className="font-poppins text-lg font-semibold mb-2">No stories found</p>
            <p className="text-sm">Try selecting a different topic filter above.</p>
          </div>
        )}

        {/* Naver Blog Connect box */}
        <div className="rounded-2xl bg-surface border border-surface/80 p-6 sm:p-8 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[#03C75A] text-white text-xs font-bold select-none">
                  N
                </span>
                <span className="font-poppins font-bold text-primary text-base">
                  Also on Naver Blog
                </span>
              </div>
              <p className="text-text-secondary text-sm mb-4">
                We also publish detailed Korea travel guides and school trip reports on Korea&apos;s leading blog platform.
              </p>
              <ul className="space-y-2">
                {naverPlaceholderPosts.map((title) => (
                  <li key={title} className="flex items-start gap-2 text-sm text-text-secondary">
                    <svg className="w-4 h-4 text-[#03C75A] shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                    </svg>
                    {title}
                  </li>
                ))}
              </ul>
            </div>
            <div className="shrink-0">
              <a
                href="https://blog.naver.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#03C75A] text-white text-sm font-semibold hover:bg-[#02a84a] transition-colors duration-200 whitespace-nowrap"
              >
                Visit Our Naver Blog
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* CTA buttons */}
        {!fullPage && (
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/blog"
              className="inline-flex items-center gap-1.5 px-6 py-3 rounded-xl bg-secondary text-white font-semibold text-base hover:bg-secondary/90 transition-colors duration-200 shadow-sm"
            >
              View All Stories →
            </Link>
            <button
              type="button"
              onClick={() => {
                const newsletterInput = document.querySelector<HTMLElement>('footer input[type="email"]')
                if (newsletterInput) {
                  newsletterInput.scrollIntoView({ behavior: 'smooth', block: 'center' })
                  newsletterInput.focus()
                }
              }}
              className="inline-flex items-center gap-1.5 px-6 py-3 rounded-xl border-2 border-secondary text-secondary font-semibold text-base hover:bg-secondary hover:text-white transition-colors duration-200"
            >
              Subscribe for Updates →
            </button>
          </div>
        )}
      </Container>
    </section>
  )
}
