import Link from "next/link";

import { ListingCard } from "@/components/listing-card";
import { getFeaturedListings } from "@/lib/listings";

export default async function HomePage() {
  const featured = await getFeaturedListings();

  return (
    <div className="page-stack">
      <section className="hero-panel simple-hero">
        <div className="hero-copy">
          <p className="section-kicker">Multifamily syndication marketplace</p>
          <h1>A simpler place to browse live deals.</h1>
          <p className="hero-summary">
            Public listings, one access request flow, sponsor submissions, and manual review. Everything else stays out of the way.
          </p>
          <div className="hero-actions">
            <Link className="primary-button" href="/listings">
              View listings
            </Link>
            <Link className="text-link" href="/signup/sponsor">
              Submit a deal
            </Link>
          </div>
        </div>
      </section>

      <section className="content-section">
        <div className="section-heading">
          <p className="section-kicker">Release focus</p>
          <h2>Three simple jobs</h2>
          <p className="section-summary">
            The product is intentionally narrow for the first release.
          </p>
        </div>
        <div className="simple-grid">
          <article className="content-card">
            <h3>Browse</h3>
            <p>Investors see only published multifamily listings with a small set of practical filters.</p>
          </article>
          <article className="content-card">
            <h3>Request access</h3>
            <p>Each listing has one clear call to action instead of multiple conversion paths.</p>
          </article>
          <article className="content-card">
            <h3>Review</h3>
            <p>Sponsors submit deals and admins review them manually before anything goes live.</p>
          </article>
        </div>
      </section>

      <section className="content-section">
        <div className="section-heading">
          <p className="section-kicker">Live listings</p>
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
