import { notFound } from "next/navigation";

import { requestAccessAction } from "@/app/actions";
import { getAppMode } from "@/lib/app-mode";
import { getListingBySlug, getSponsorByName } from "@/lib/listings";
import { formatCurrency, formatDate, formatPercent } from "@/lib/utils";

interface ListingDetailPageProps {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}

export default async function ListingDetailPage({
  params,
  searchParams,
}: ListingDetailPageProps) {
  const { slug } = await params;
  const listing = await getListingBySlug(slug);
  if (!listing) {
    notFound();
  }

  const sponsor = await getSponsorByName(listing.sponsorName);
  const query = searchParams ? await searchParams : {};
  const success = query.success === "access-requested";
  const error = query.error;
  const mode = getAppMode();

  return (
    <div className="page-stack">
      <section className="listing-detail-grid">
        <div className="content-section">
          <p className="section-kicker">
            {listing.city}, {listing.state} • Published {formatDate(listing.publishedAt)}
          </p>
          <h1>{listing.title}</h1>
          <p className="section-summary">{listing.summary}</p>
          <div className="detail-stat-grid">
            <div>
              <span>Target IRR</span>
              <strong>{formatPercent(listing.targetIrr)}</strong>
            </div>
            <div>
              <span>Equity multiple</span>
              <strong>{listing.equityMultiple.toFixed(1)}x</strong>
            </div>
            <div>
              <span>Cash-on-cash</span>
              <strong>{formatPercent(listing.cashOnCash)}</strong>
            </div>
            <div>
              <span>Minimum</span>
              <strong>{formatCurrency(listing.minimumInvestment)}</strong>
            </div>
          </div>
          <div className="content-card">
            <h2>Overview</h2>
            <p>{listing.marketStory}</p>
          </div>
          <div className="content-card">
            <h2>Sponsor</h2>
            <p>{sponsor?.trackRecordSummary ?? "Sponsor verification pending."}</p>
            <p>{sponsor?.bio ?? "Track record becomes richer once Supabase-backed profiles are connected."}</p>
          </div>
        </div>

        <aside className="sidebar-stack">
          <div className="content-card accent-card">
            <h2>Request access</h2>
            <p>
              Keep the next step simple. Share your details and the sponsor can follow up directly.
            </p>
            {success ? <p className="success-text">Request received. The sponsor can follow up from the dashboard.</p> : null}
            {error ? <p className="error-text">The form was incomplete. Try again.</p> : null}
            <form action={requestAccessAction} className="stacked-form">
              <input name="listingId" type="hidden" value={listing.id} />
              <input name="listingTitle" type="hidden" value={listing.title} />
              <input name="slug" type="hidden" value={listing.slug} />
              <label>
                Full name
                <input name="investorName" placeholder="Jordan Lee" required />
              </label>
              <label>
                Email
                <input name="investorEmail" placeholder="jordan@example.com" required type="email" />
              </label>
              <label>
                Message
                <textarea
                  name="message"
                  placeholder="Interested in debt terms, sponsor co-invest, and expected renovation timing."
                  rows={4}
                />
              </label>
              <button className="primary-button" type="submit">
                Request access
              </button>
            </form>
          </div>

          <div className="content-card">
            <h3>Deal facts</h3>
            <dl className="sidebar-metrics">
              <div>
                <dt>Property type</dt>
                <dd>{listing.propertyType}</dd>
              </div>
              <div>
                <dt>Units</dt>
                <dd>{listing.units}</dd>
              </div>
              <div>
                <dt>Year built</dt>
                <dd>{listing.yearBuilt}</dd>
              </div>
              <div>
                <dt>Hold period</dt>
                <dd>{listing.holdPeriodYears} years</dd>
              </div>
            </dl>
            <p className="mode-note">
              Running in <strong>{mode.label}</strong> mode.
            </p>
          </div>
        </aside>
      </section>
    </div>
  );
}
