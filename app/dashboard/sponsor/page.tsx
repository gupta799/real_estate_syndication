import { createProfileAction } from "@/app/actions";
import { getSponsorDashboardData } from "@/lib/listings";

interface SponsorDashboardPageProps {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}

export default async function SponsorDashboardPage({
  searchParams,
}: SponsorDashboardPageProps) {
  const { sponsor, profiles, requests } = await getSponsorDashboardData();
  const query = searchParams ? await searchParams : {};

  return (
    <div className="page-stack">
      <section className="content-section">
        <div className="section-heading">
          <p className="section-kicker">Sponsor workspace</p>
          <h1>{sponsor.companyName}</h1>
          <p className="section-summary">Submit a public track record profile and track investor introductions. Live offerings stay off the public app.</p>
        </div>

        <div className="dashboard-grid">
          <div className="content-card">
            <h2>Submit a track record profile</h2>
            {query.success ? <p className="success-text">Profile submitted for admin review.</p> : null}
            {query.error ? <p className="error-text">The profile form is missing required fields.</p> : null}
            <form action={createProfileAction} className="stacked-form">
              <label>
                Company name
                <input name="companyName" placeholder="Summit Grove Capital" required />
              </label>
              <label>
                Headquarters city
                <input name="city" placeholder="Austin" required />
              </label>
              <label>
                Headquarters state
                <input maxLength={2} name="state" placeholder="TX" required />
              </label>
              <label>
                Asset focus
                <input name="focus" placeholder="Multifamily" required />
              </label>
              <label>
                Public summary
                <textarea
                  name="summary"
                  placeholder="Historical sponsor profile focused on realized outcomes, projection accuracy, and investor reporting habits."
                  required
                  rows={4}
                />
              </label>
              <label>
                Years operating
                <input min="0" name="yearsExperience" placeholder="8" required type="number" />
              </label>
              <button className="primary-button" type="submit">
                Submit for review
              </button>
            </form>
          </div>

          <div className="content-card">
            <h2>Your public profiles</h2>
            <p className="section-summary">
              This MVP keeps the sponsor side intentionally thin: publish historical track record data and monitor intro requests.
            </p>
            <div className="stack-list">
              {profiles.map((profile) => (
                <article className="list-row" key={profile.id}>
                  <div>
                    <strong>{profile.title}</strong>
                    <p>
                      {profile.totalDealsCompleted} deals • {profile.averageActualIrr.toFixed(1)}% avg realized IRR
                    </p>
                  </div>
                  <span className="status-badge">{profile.status}</span>
                </article>
              ))}
            </div>
            <h3>Recent intro requests</h3>
            <div className="stack-list">
              {requests.map((request) => (
                <article className="list-row" key={request.id}>
                  <div>
                    <strong>{request.investorName}</strong>
                    <p>{request.message}</p>
                  </div>
                  <span className="status-badge">{request.status}</span>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
