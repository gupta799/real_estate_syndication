import { getAdminDashboardData } from "@/lib/listings";
import { formatDate } from "@/lib/utils";

export default async function AdminPage() {
  const { pendingListings, inquiries } = await getAdminDashboardData();

  return (
    <div className="page-stack">
      <section className="content-section">
        <div className="section-heading">
          <p className="section-kicker">Admin moderation</p>
          <h1>Keep supply quality high with a thin review loop.</h1>
          <p className="section-summary">
            For the first release, admin tooling should cover review, approval, and basic oversight. Nothing more.
          </p>
        </div>
        <div className="dashboard-grid">
          <div className="content-card">
            <h2>Listings awaiting review</h2>
            <p className="section-summary">
              Approve or reject supply manually before anything becomes visible in the marketplace.
            </p>
            <div className="stack-list">
              {pendingListings.map((listing) => (
                <article className="list-row" key={listing.id}>
                  <div>
                    <strong>{listing.title}</strong>
                    <p>
                      {listing.city}, {listing.state} • {listing.sponsorName}
                    </p>
                  </div>
                  <span className="status-badge">{listing.status}</span>
                </article>
              ))}
            </div>
          </div>
          <div className="content-card">
            <h2>Latest inquiries</h2>
            <p className="section-summary">
              Investor interest is tracked at the inquiry level instead of a full CRM or allocation workflow.
            </p>
            <div className="stack-list">
              {inquiries.map((inquiry) => (
                <article className="list-row" key={inquiry.id}>
                  <div>
                    <strong>{inquiry.investorName}</strong>
                    <p>{inquiry.listingTitle}</p>
                  </div>
                  <span>{formatDate(inquiry.createdAt)}</span>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
