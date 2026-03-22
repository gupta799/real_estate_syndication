import Link from "next/link";

import { Listing } from "@/lib/types";
import { formatCurrency, formatPercent } from "@/lib/utils";

export function ListingCard({ listing }: { listing: Listing }) {
  return (
    <article className="listing-card">
      <div className="listing-card-body">
        <div className="listing-meta">
          <span>
            {listing.city}, {listing.state}
          </span>
          <span>{listing.units} units</span>
        </div>
        <h3>{listing.title}</h3>
        <p>{listing.summary}</p>
        <dl className="metric-row">
          <div>
            <dt>Target IRR</dt>
            <dd>{formatPercent(listing.targetIrr)}</dd>
          </div>
          <div>
            <dt>Equity multiple</dt>
            <dd>{listing.equityMultiple.toFixed(1)}x</dd>
          </div>
          <div>
            <dt>Min. investment</dt>
            <dd>{formatCurrency(listing.minimumInvestment)}</dd>
          </div>
        </dl>
        <div className="listing-footer">
          <span className="listing-sponsor">{listing.sponsorName}</span>
          <Link className="primary-link" href={`/listings/${listing.slug}`}>
            Open listing
          </Link>
        </div>
      </div>
    </article>
  );
}
