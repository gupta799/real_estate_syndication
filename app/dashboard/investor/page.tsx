import Link from "next/link";

import { getInvestorDashboardData } from "@/lib/listings";
import { formatDate } from "@/lib/utils";

export default async function InvestorDashboardPage() {
  const { user, inquiries } = await getInvestorDashboardData();

  return (
    <div className="page-stack">
      <section className="content-section">
        <div className="section-heading">
          <p className="section-kicker">Investor dashboard</p>
          <h1>{user.fullName}</h1>
          <p className="section-summary">
            A thin MVP dashboard is enough here: recent access requests and a route back to live deals.
          </p>
        </div>
        <div className="dashboard-grid">
          <div className="content-card">
            <h2>Your recent requests</h2>
            <div className="stack-list">
              {inquiries.map((inquiry) => (
                <article className="list-row" key={inquiry.id}>
                  <div>
                    <strong>{inquiry.listingTitle}</strong>
                    <p>{inquiry.message}</p>
                  </div>
                  <span>{formatDate(inquiry.createdAt)}</span>
                </article>
              ))}
            </div>
          </div>
          <div className="content-card">
            <h2>Next best action</h2>
            <p>Keep the loop simple: browse deals, request access, and wait for sponsor follow-up.</p>
            <Link className="primary-button" href="/listings">
              Browse listings
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

