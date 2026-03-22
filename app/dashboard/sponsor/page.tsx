import { createListingAction } from "@/app/actions";
import { getSponsorDashboardData } from "@/lib/listings";
import { formatCurrency, formatPercent } from "@/lib/utils";

interface SponsorDashboardPageProps {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}

export default async function SponsorDashboardPage({
  searchParams,
}: SponsorDashboardPageProps) {
  const { sponsor, listings } = await getSponsorDashboardData();
  const query = searchParams ? await searchParams : {};

  return (
    <div className="page-stack">
      <section className="content-section">
        <div className="section-heading">
          <p className="section-kicker">Sponsor workspace</p>
          <h1>{sponsor.companyName}</h1>
          <p className="section-summary">Submit deals and track review status. The rest stays manual for now.</p>
        </div>

        <div className="dashboard-grid">
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
            <h2>Your submitted deals</h2>
            <p className="section-summary">
              This MVP keeps the sponsor side intentionally thin: submit deals and watch moderation status.
            </p>
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
        </div>
      </section>
    </div>
  );
}
