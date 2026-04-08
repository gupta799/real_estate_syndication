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
            {listing.sponsorName} • {listing.city}, {listing.state}
          </p>
          <h1>{listing.sponsorName}</h1>
          <p className="section-summary">{sponsor?.bio ?? listing.summary}</p>
          <div className="listing-tags detail-tags" aria-label="Syndicator categories">
            <span>{listing.strategy}</span>
            <span>{listing.marketFocus}</span>
            <span>{formatCurrency(listing.minimumInvestment)} typical check</span>
            <span>{listing.holdPeriodYears}-year hold</span>
          </div>
          <div className="detail-stat-grid">
            <div>
              <span>Realized IRR</span>
              <strong>{formatPercent(listing.targetIrr)}</strong>
            </div>
            <div>
              <span>Avg. multiple</span>
              <strong>{listing.equityMultiple.toFixed(1)}x</strong>
            </div>
            <div>
              <span>Avg. cash yield</span>
              <strong>{formatPercent(listing.cashOnCash)}</strong>
            </div>
            <div>
              <span>Typical check</span>
              <strong>{formatCurrency(listing.minimumInvestment)}</strong>
            </div>
          </div>
          <div className="content-card">
            <h2>How they operate</h2>
            <p>{listing.marketStory}</p>
          </div>
          <div className="content-card">
            <h2>Track record</h2>
            <p>{sponsor?.trackRecordSummary ?? "Track record pending."}</p>
            <p>Representative profile: {listing.title}</p>
            <p className="mode-note">Profile published {formatDate(listing.publishedAt)}.</p>
          </div>
          <div className="content-card">
            <h2>How this profile is built</h2>
            <p>
              This profile starts with documents and information submitted by the sponsor.
            </p>
            <p>
              Credex then analyzes those materials behind the scenes to verify key details and present a cleaner investor view.
            </p>
          </div>
        </div>

        <aside className="sidebar-stack">
          <div className="content-card accent-card">
            <h2>Request intro</h2>
            <p>
              Reach out if you want to learn more about this sponsor.
            </p>
            {success ? <p className="success-text">Request received. The sponsor can follow up directly.</p> : null}
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
                  placeholder="Interested in your track record, communication style, and future offerings."
                  rows={4}
                />
              </label>
              <button className="primary-button" type="submit">
                Request intro
              </button>
            </form>
          </div>

          <div className="content-card">
            <h3>Profile snapshot</h3>
            <dl className="sidebar-metrics">
              <div>
                <dt>Focus</dt>
                <dd>{listing.propertyType}</dd>
              </div>
              <div>
                <dt>Strategy</dt>
                <dd>{listing.strategy}</dd>
              </div>
              <div>
                <dt>Market focus</dt>
                <dd>{listing.marketFocus}</dd>
              </div>
              <div>
                <dt>Operating profile</dt>
                <dd>{listing.title}</dd>
              </div>
              <div>
                <dt>Source</dt>
                <dd>Submitted documents</dd>
              </div>
              <div>
                <dt>Review</dt>
                <dd>Credex analyzed</dd>
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
