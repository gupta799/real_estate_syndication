import Link from "next/link";

import { getInvestorDashboardData } from "@/lib/listings";
import { formatDate } from "@/lib/utils";

export default async function InvestorDashboardPage() {
  const { user, requests } = await getInvestorDashboardData();

  return (
    <div className="page-stack">
      <section className="content-section">
        <div className="section-heading">
          <p className="section-kicker">Investor dashboard</p>
          <h1>{user.fullName}</h1>
          <p className="section-summary">
            This dashboard stays narrow: recent sponsor intro requests and a route back to historical profiles.
          </p>
        </div>
        <div className="dashboard-grid">
          <div className="content-card">
            <h2>Your recent intro requests</h2>
            <div className="stack-list">
              {requests.map((request) => (
                <article className="list-row" key={request.id}>
                  <div>
                    <strong>{request.profileTitle}</strong>
                    <p>{request.message}</p>
                  </div>
                  <span>{formatDate(request.createdAt)}</span>
                </article>
              ))}
            </div>
          </div>
          <div className="content-card">
            <h2>Next best action</h2>
            <p>Compare sponsor track records, review historical outcomes, and request introductions without browsing live offerings.</p>
            <Link className="primary-button" href="/syndications">
              Browse sponsors
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
