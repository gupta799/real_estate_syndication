import Link from "next/link";

import { ListingCard } from "@/components/listing-card";
import { getFeaturedListings } from "@/lib/listings";

export default async function HomePage() {
  const featured = await getFeaturedListings();

  return (
    <div className="page-stack">
      <section className="hero-panel simple-hero">
        <div className="hero-copy">
          <p className="section-kicker">Documented sponsor research</p>
          <h1>Conviction starts with the operator.</h1>
          <p className="hero-summary">
            All Credex profiles follow one standard: sponsor-submitted materials in, independent Credex analysis and verification next, investor-ready comparisons out.
          </p>
          <div className="hero-actions">
            <Link className="primary-button" href="/listings">
              Browse syndicators
            </Link>
            <Link className="text-link" href="/signup/sponsor">
              Create sponsor profile
            </Link>
          </div>
          <div className="hero-highlights">
            <span>Source documents</span>
            <span>Credex analysis</span>
            <span>Verified profiles</span>
          </div>
        </div>
      </section>

      <section className="content-section">
        <div className="section-heading">
          <p className="section-kicker">How Credex works</p>
          <h2>Less noise. Better comparisons.</h2>
        </div>
        <div className="simple-grid">
          <article className="content-card">
            <h3>Submitted materials</h3>
            <p>Sponsors provide the documents, numbers, and supporting context behind their profile.</p>
          </article>
          <article className="content-card">
            <h3>Independent review</h3>
            <p>Credex analyzes the materials behind the scenes to organize, validate, and sharpen what investors see.</p>
          </article>
          <article className="content-card">
            <h3>Investor-ready view</h3>
            <p>The result is a cleaner profile built for comparison, not sponsor marketing copy alone.</p>
          </article>
        </div>
      </section>

      <section className="content-section">
        <div className="section-heading">
          <p className="section-kicker">Featured sponsors</p>
          <h2>Start with a few strong profiles</h2>
        </div>
        <div className="card-grid">
          {featured.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      </section>

      <section className="content-section">
        <div className="section-heading">
          <p className="section-kicker">Inside the process</p>
          <h2>How we review syndicators</h2>
          <p className="section-summary">
            Read how Credex uses sponsor-submitted documents and internal analysis to build investor-ready profiles.
          </p>
        </div>
        <article className="content-card blog-cta">
          <h3>Methodology blog</h3>
          <p>
            We publish our review standards, verification approach, and profile publication criteria.
          </p>
          <Link className="primary-link" href="/blog">
            Visit blog
          </Link>
        </article>
      </section>
    </div>
  );
}
