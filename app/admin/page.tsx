import { getAdminDashboardData } from "@/lib/listings";
import { formatDate } from "@/lib/utils";

export default async function AdminPage() {
  const { pendingProfiles, requests } = await getAdminDashboardData();

  return (
    <div className="page-stack">
      <section className="content-section">
        <div className="section-heading">
          <p className="section-kicker">Admin review</p>
          <h1>Review sponsor profiles and recent investor introductions.</h1>
          <p className="section-summary">
            Internal tooling stays intentionally small in this release.
          </p>
        </div>
        <div className="dashboard-grid">
          <div className="content-card">
            <h2>Profiles awaiting review</h2>
            <p className="section-summary">
              Approve or reject historical profile content manually before anything becomes visible in the directory.
            </p>
            <div className="stack-list">
              {pendingProfiles.map((profile) => (
                <article className="list-row" key={profile.id}>
                  <div>
                    <strong>{profile.title}</strong>
                    <p>
                      {profile.city}, {profile.state} • {profile.assetFocus}
                    </p>
                  </div>
                  <span className="status-badge">{profile.status}</span>
                </article>
              ))}
            </div>
          </div>
          <div className="content-card">
            <h2>Latest intro requests</h2>
            <p className="section-summary">
              Investor relationship signals are tracked at the request level instead of a full CRM workflow.
            </p>
            <div className="stack-list">
              {requests.map((request) => (
                <article className="list-row" key={request.id}>
                  <div>
                    <strong>{request.investorName}</strong>
                    <p>{request.profileTitle}</p>
                  </div>
                  <span>{formatDate(request.createdAt)}</span>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
