"use client";

import { useState, useMemo } from "react";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Accordion from "@/components/ui/Accordion";
import Button from "@/components/ui/Button";
import Link from "next/link";
import faqData from "@/lib/data/faq.json";
import { FAQCategory } from "@/types/index";

export default function FaqPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const typedFaqData = faqData as FAQCategory[];

  // Get unique categories
  const categories = useMemo(() => {
    return typedFaqData.map((cat) => cat.category);
  }, []);

  // Filter FAQs based on search and category
  const filteredFaqs = useMemo(() => {
    return typedFaqData
      .map((category) => ({
        ...category,
        items: category.items.filter((item) => {
          const matchesSearch =
            searchQuery === "" ||
            item.question
              .toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            item.answer
              .toLowerCase()
              .includes(searchQuery.toLowerCase());

          const matchesCategory =
            selectedCategory === null ||
            category.category === selectedCategory;

          return matchesSearch && matchesCategory;
        }),
      }))
      .filter((category) => category.items.length > 0);
  }, [searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="py-16 md:py-24">
        <Container>
          <SectionHeading
            title="Frequently Asked Questions"
            subtitle="Find answers to common questions about our Korea educational travel programs"
          />

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 border border-surface rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary text-primary placeholder-text-secondary"
            />
          </div>

          {/* Category Buttons */}
          <div className="flex flex-wrap gap-3 justify-center mb-12">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedCategory === null
                  ? "bg-secondary text-white"
                  : "bg-surface text-primary hover:bg-surface/80"
              }`}
            >
              All Categories
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === category
                    ? "bg-secondary text-white"
                    : "bg-surface text-primary hover:bg-surface/80"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </Container>
      </section>

      {/* FAQ Accordions */}
      <section className="py-12 md:py-20 bg-white">
        <Container>
          {filteredFaqs.length > 0 ? (
            <div className="space-y-6">
              {filteredFaqs.map((categoryGroup) => (
                <div key={categoryGroup.category}>
                  <h3 className="text-xl font-bold text-primary mb-4">
                    {categoryGroup.category}
                  </h3>
                  <div className="space-y-3">
                    {categoryGroup.items.map((item, idx) => (
                      <Accordion
                        key={`${categoryGroup.category}-${idx}`}
                        title={item.question}
                      >
                        <p className="text-text-secondary">{item.answer}</p>
                      </Accordion>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-text-secondary text-lg mb-4">
                No questions found matching your search.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory(null);
                }}
                className="text-secondary font-semibold hover:underline"
              >
                Clear filters
              </button>
            </div>
          )}
        </Container>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="max-w-2xl mx-auto text-center bg-surface rounded-xl p-8">
            <h2 className="text-3xl font-bold text-primary mb-4">
              Still have questions?
            </h2>
            <p className="text-text-secondary text-lg mb-8">
              Our team is here to help! Reach out to us on WhatsApp or contact form.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/919999999999"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="primary" size="lg">
                  WhatsApp Us
                </Button>
              </a>
              <Link href="/contact">
                <Button variant="outline" size="lg">
                  Contact Form
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
