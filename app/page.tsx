import Link from "next/link";

import { ListingCard } from "@/components/listing-card";
import { getFeaturedListings } from "@/lib/listings";

export default async function HomePage() {
  const featured = await getFeaturedListings();

  return (
    <div className="page-stack">
      <section className="hero-panel">
        <div className="hero-copy">
          <p className="section-kicker">Simple syndication marketplace</p>
          <h1>Browse deals. Request access. Let sponsors and admins handle the rest.</h1>
          <p className="hero-summary">
            This MVP stays narrow on purpose: a public listings feed, one investor CTA, sponsor deal submission, and manual admin review.
          </p>
          <div className="hero-actions">
            <Link className="primary-button" href="/listings">
              Explore listings
            </Link>
            <Link className="ghost-button" href="/signup/sponsor">
              Become a sponsor
            </Link>
          </div>
        </div>
        <div className="hero-stat-panel">
          <div>
            <strong>1</strong>
            <span>primary investor action</span>
          </div>
          <div>
            <strong>2</strong>
            <span>internal operator views</span>
          </div>
          <div>
            <strong>4</strong>
            <span>core MVP workflows</span>
          </div>
        </div>
      </section>

      <section className="content-section">
        <div className="section-heading">
          <p className="section-kicker">What this MVP includes</p>
          <h2>Only the essential flows</h2>
          <p className="section-summary">
            The release avoids extra investor tooling, complex analytics, and full transaction workflows.
          </p>
        </div>
        <div className="card-grid">
          <article className="content-card">
            <h3>Browse live listings</h3>
            <p>Investors can scan published multifamily deals and filter by basics like location, IRR, and minimum check size.</p>
          </article>
          <article className="content-card">
            <h3>Request access</h3>
            <p>Every listing pushes to one CTA so sponsor follow-up stays simple and easy to test.</p>
          </article>
          <article className="content-card">
            <h3>Sponsor submission</h3>
            <p>Sponsors submit deals through a short form instead of managing a heavy back office.</p>
          </article>
          <article className="content-card">
            <h3>Manual review</h3>
            <p>Admins review pending listings and investor inquiries without any automation or underwriting workflow.</p>
          </article>
        </div>
      </section>

      <section className="content-section">
        <div className="section-heading">
          <p className="section-kicker">Featured listings</p>
          <h2>Current opportunities</h2>
        </div>
        <div className="card-grid">
          {featured.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      </section>
    </div>
  );
}
