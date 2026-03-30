import { notFound } from "next/navigation";

import { requestIntroductionAction } from "@/app/actions";
import { getAppMode } from "@/lib/app-mode";
import { getProfileBySlug, getSponsorByName } from "@/lib/listings";
import { formatCurrency, formatDate, formatPercent } from "@/lib/utils";

interface SyndicationDetailPageProps {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}

export default async function SyndicationDetailPage({
  params,
  searchParams,
}: SyndicationDetailPageProps) {
  const { slug } = await params;
  const profile = await getProfileBySlug(slug);
  if (!profile || profile.status !== "published") {
    notFound();
  }

  const sponsor = await getSponsorByName(profile.sponsorName);
  const query = searchParams ? await searchParams : {};
  const success = query.success === "intro-requested";
  const error = query.error;
  const mode = getAppMode();

  return (
    <div className="page-stack">
      <section className="listing-detail-grid">
        <div className="content-section">
          <p className="section-kicker">
            {profile.city}, {profile.state} • Published {formatDate(profile.publishedAt)} • {profile.dataSource}
          </p>
          <h1>{profile.title}</h1>
          <p className="section-summary">{profile.summary}</p>
          <div className="detail-stat-grid">
            <div>
              <span>Total deals</span>
              <strong>{profile.totalDealsCompleted}</strong>
            </div>
            <div>
              <span>Avg realized IRR</span>
              <strong>{formatPercent(profile.averageActualIrr)}</strong>
            </div>
            <div>
              <span>Total equity raised</span>
              <strong>{formatCurrency(profile.totalEquityRaised)}</strong>
            </div>
            <div>
              <span>Met projections</span>
              <strong>{formatPercent(profile.percentMeetingProjection)}</strong>
            </div>
          </div>
          <div className="content-card">
            <h2>Expectation vs reality</h2>
            <dl className="metric-row">
              <div>
                <dt>Avg projected IRR</dt>
                <dd>{formatPercent(profile.averageProjectedIrr)}</dd>
              </div>
              <div>
                <dt>Avg actual IRR</dt>
                <dd>{formatPercent(profile.averageActualIrr)}</dd>
              </div>
              <div>
                <dt>Reality gap</dt>
                <dd>{formatPercent(profile.averageActualIrr - profile.averageProjectedIrr)}</dd>
              </div>
            </dl>
            <dl className="metric-row">
              <div>
                <dt>Avg projected hold</dt>
                <dd>{profile.averageProjectedHoldYears.toFixed(1)} yrs</dd>
              </div>
              <div>
                <dt>Avg actual hold</dt>
                <dd>{profile.averageActualHoldYears.toFixed(1)} yrs</dd>
              </div>
              <div>
                <dt>Capital loss rate</dt>
                <dd>{formatPercent(profile.capitalLossRate)}</dd>
              </div>
            </dl>
          </div>
          <div className="content-card">
            <h2>Consistency view</h2>
            <dl className="metric-row">
              <div>
                <dt>Best realized IRR</dt>
                <dd>{formatPercent(profile.bestRealizedIrr)}</dd>
              </div>
              <div>
                <dt>Worst realized IRR</dt>
                <dd>{formatPercent(profile.worstRealizedIrr)}</dd>
              </div>
              <div>
                <dt>Investor updates</dt>
                <dd>{profile.investorReportsPerYear}x / year</dd>
              </div>
            </dl>
          </div>
          <div className="content-card">
            <h2>Strategy</h2>
            <p>{profile.investmentPhilosophy}</p>
          </div>
          <div className="content-card">
            <h2>Track record and data integrity</h2>
            <p>{profile.trackRecordSummary}</p>
            <p>{sponsor?.bio ?? "Verification notes become richer once connected to a live sponsor profile system."}</p>
          </div>
          <div className="content-card">
            <h2>Historical deals</h2>
            <div className="stack-list">
              {profile.historicalDeals.map((deal) => (
                <article className="content-card" key={deal.id}>
                  <div className="listing-meta">
                    <span>
                      {deal.market}, {deal.state}
                    </span>
                    <span>{deal.status}</span>
                  </div>
                  <h3>{deal.name}</h3>
                  <p>{deal.businessPlan}</p>
                  <dl className="metric-row">
                    <div>
                      <dt>IRR</dt>
                      <dd>
                        {formatPercent(deal.projectedIrr)}
                        {deal.actualIrr ? ` -> ${formatPercent(deal.actualIrr)}` : " projected"}
                      </dd>
                    </div>
                    <div>
                      <dt>Hold</dt>
                      <dd>
                        {deal.projectedHoldYears} yrs
                        {deal.actualHoldYears ? ` -> ${deal.actualHoldYears.toFixed(1)} yrs` : ""}
                      </dd>
                    </div>
                    <div>
                      <dt>Docs</dt>
                      <dd>{deal.documentationLevel}</dd>
                    </div>
                  </dl>
                  <p>{deal.outcomeSummary}</p>
                  <p className="inline-note">
                    {deal.acquiredYear}
                    {deal.exitedYear ? ` to ${deal.exitedYear}` : " to ongoing"} • {deal.riskNotes}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>

        <aside className="sidebar-stack">
          <div className="content-card accent-card">
            <h2>Request an introduction</h2>
            <p>
              Join the sponsor’s investor list or request a direct introduction. This page is informational only and does not show live offerings.
            </p>
            {success ? <p className="success-text">Request received. The sponsor can follow up directly.</p> : null}
            {error ? <p className="error-text">The form was incomplete. Try again.</p> : null}
            <form action={requestIntroductionAction} className="stacked-form">
              <input name="profileId" type="hidden" value={profile.id} />
              <input name="profileTitle" type="hidden" value={profile.title} />
              <input name="slug" type="hidden" value={profile.slug} />
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
                  placeholder="Would like an introduction and more detail on how you report historical deal outcomes."
                  rows={4}
                />
              </label>
              <button className="primary-button" type="submit">
                Request intro
              </button>
            </form>
          </div>

          <div className="content-card">
            <h3>Profile signals</h3>
            <dl className="sidebar-metrics">
              <div>
                <dt>Asset focus</dt>
                <dd>{profile.assetFocus}</dd>
              </div>
              <div>
                <dt>Markets</dt>
                <dd>{profile.markets.join(", ")}</dd>
              </div>
              <div>
                <dt>Docs coverage</dt>
                <dd>{profile.documentationCoverage}</dd>
              </div>
              <div>
                <dt>Verification</dt>
                <dd>{profile.verificationStatus}</dd>
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
