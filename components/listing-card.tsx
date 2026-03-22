import Link from "next/link";

import { Listing } from "@/lib/types";
import { formatCurrency, formatPercent } from "@/lib/utils";

const coverClasses: Record<string, string> = {
  sunrise: "cover-sunrise",
  marine: "cover-marine",
  terracotta: "cover-terracotta",
  cobalt: "cover-cobalt",
};

export function ListingCard({ listing }: { listing: Listing }) {
  return (
    <article className="listing-card">
      <div className={`listing-cover ${coverClasses[listing.coverTone] ?? "cover-marine"}`}>
        <span>{listing.city}, {listing.state}</span>
        <strong>{listing.units} units</strong>
      </div>
      <div className="listing-card-body">
        <div className="eyebrow-row">
          <span>{listing.sponsorName}</span>
          <span>{listing.propertyType}</span>
        </div>
        <h3>{listing.title}</h3>
        <p>{listing.summary}</p>
        <dl className="metric-grid">
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
        <Link className="primary-link" href={`/listings/${listing.slug}`}>
          View listing
        </Link>
      </div>
    </article>
  );
}

