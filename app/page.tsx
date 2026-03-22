import Link from "next/link";

import { ListingCard } from "@/components/listing-card";
import { getFeaturedListings } from "@/lib/listings";

export default async function HomePage() {
  const featured = await getFeaturedListings();

  return (
    <div className="page-stack">
      <section className="hero-panel">
        <div className="hero-copy">
          <p className="section-kicker">Multifamily syndication marketplace</p>
          <h1>Browse sponsor-backed apartment deals like a serious buyer, not a spreadsheet archaeologist.</h1>
          <p className="hero-summary">
            Public discovery for investors, self-serve deal submission for sponsors, and manual review before anything goes live.
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
            <strong>3</strong>
            <span>live deals</span>
          </div>
          <div>
            <strong>2</strong>
            <span>verified sponsors</span>
          </div>
          <div>
            <strong>1</strong>
            <span>single investor CTA</span>
          </div>
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

