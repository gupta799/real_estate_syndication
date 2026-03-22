import { createListingAction } from "@/app/actions";
import { getSponsorDashboardData } from "@/lib/listings";
import { formatCurrency, formatPercent } from "@/lib/utils";

interface SponsorDashboardPageProps {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}

export default async function SponsorDashboardPage({
  searchParams,
}: SponsorDashboardPageProps) {
  const { user, sponsor, listings, inquiries } = await getSponsorDashboardData();
  const query = searchParams ? await searchParams : {};

  return (
    <div className="page-stack">
      <section className="content-section">
        <div className="section-heading">
          <p className="section-kicker">Sponsor dashboard</p>
          <h1>{sponsor.companyName}</h1>
          <p className="section-summary">{sponsor.trackRecordSummary}</p>
        </div>

        <div className="dashboard-grid sponsor-grid">
          <div className="content-card">
            <h2>Submit a new listing</h2>
            {query.success ? <p className="success-text">Listing submitted for admin review.</p> : null}
            {query.error ? <p className="error-text">The listing form is missing required fields.</p> : null}
            <form action={createListingAction} className="stacked-form">
              <label>
                Deal name
                <input name="title" placeholder="Sunset Terrace" required />
              </label>
              <label>
                City
                <input name="city" placeholder="Austin" required />
              </label>
              <label>
                State
                <input maxLength={2} name="state" placeholder="TX" required />
              </label>
              <label>
                Summary
                <textarea
                  name="summary"
                  placeholder="176-unit value-add acquisition near major employment nodes."
                  required
                  rows={4}
                />
              </label>
              <label>
                Target IRR
                <input min="0" name="targetIrr" placeholder="17" required type="number" />
              </label>
              <label>
                Minimum investment
                <input
                  min="0"
                  name="minimumInvestment"
                  placeholder="50000"
                  required
                  type="number"
                />
              </label>
              <button className="primary-button" type="submit">
                Submit for review
              </button>
            </form>
          </div>

          <div className="content-card">
            <h2>Your pipeline</h2>
            <div className="stack-list">
              {listings.map((listing) => (
                <article className="list-row" key={listing.id}>
                  <div>
                    <strong>{listing.title}</strong>
                    <p>
                      {formatPercent(listing.targetIrr)} target IRR • {formatCurrency(listing.minimumInvestment)} minimum
                    </p>
                  </div>
                  <span className="status-badge">{listing.status}</span>
                </article>
              ))}
            </div>
          </div>

          <div className="content-card">
            <h2>Latest investor interest</h2>
            <div className="stack-list">
              {inquiries.map((inquiry) => (
                <article className="list-row" key={inquiry.id}>
                  <div>
                    <strong>{inquiry.investorName}</strong>
                    <p>{inquiry.listingTitle}</p>
                  </div>
                  <span>{inquiry.investorEmail}</span>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
