import Link from "next/link";

import { Listing } from "@/lib/types";
import { formatCurrency, formatPercent } from "@/lib/utils";

export function ListingCard({ listing }: { listing: Listing }) {
  return (
    <article className="listing-card">
      <div className="listing-card-body">
        <div className="listing-meta">
          <span>{listing.sponsorName}</span>
          <span>
            {listing.city}, {listing.state}
          </span>
        </div>
        <h3>{listing.title}</h3>
        <p className="listing-summary">{listing.summary}</p>
        <div className="listing-tags" aria-label="Sponsor categories">
          <span>{listing.strategy}</span>
          <span>{listing.marketFocus}</span>
          <span>{formatCurrency(listing.minimumInvestment)} min</span>
          <span>{listing.holdPeriodYears}-year hold</span>
        </div>
        <dl className="metric-row">
          <div>
            <dt>Realized IRR</dt>
            <dd>{formatPercent(listing.targetIrr)}</dd>
          </div>
          <div>
            <dt>Avg. multiple</dt>
            <dd>{listing.equityMultiple.toFixed(1)}x</dd>
          </div>
          <div>
            <dt>Units operated</dt>
            <dd>{listing.units}</dd>
          </div>
        </dl>
        <div className="listing-footer">
          <span className="listing-sponsor">Reviewed by Credex</span>
          <Link className="primary-link" href={`/listings/${listing.slug}`}>
            View profile
          </Link>
        </div>
      </div>
    </article>
  );
}
