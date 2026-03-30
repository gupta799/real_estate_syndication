import Link from "next/link";

import { SyndicationProfile } from "@/lib/types";
import { formatCurrency, formatPercent } from "@/lib/utils";

export function ProfileCard({ profile }: { profile: SyndicationProfile }) {
  return (
    <article className="listing-card">
      <div className="listing-card-body">
        <div className="listing-meta">
          <span>
            {profile.city}, {profile.state}
          </span>
          <span>
            {profile.verificationStatus === "verified" ? "Verified profile" : "Pending verification"}
          </span>
        </div>
        <h3>{profile.title}</h3>
        <p>{profile.summary}</p>
        <dl className="metric-row">
          <div>
            <dt>Deals completed</dt>
            <dd>{profile.totalDealsCompleted}</dd>
          </div>
          <div>
            <dt>Avg realized IRR</dt>
            <dd>{formatPercent(profile.averageActualIrr)}</dd>
          </div>
          <div>
            <dt>Met projections</dt>
            <dd>{formatPercent(profile.percentMeetingProjection)}</dd>
          </div>
        </dl>
        <div className="listing-footer">
          <span className="listing-sponsor">
            {profile.assetFocus} • {formatCurrency(profile.totalEquityRaised)} raised
          </span>
          <Link className="primary-link" href={`/syndications/${profile.slug}`}>
            View profile
          </Link>
        </div>
      </div>
    </article>
  );
}
