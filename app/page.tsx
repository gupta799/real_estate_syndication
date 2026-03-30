import Link from "next/link";

import { ProfileCard } from "@/components/profile-card";
import { getFeaturedProfiles } from "@/lib/listings";

export default async function HomePage() {
  const featured = await getFeaturedProfiles();

  return (
    <div className="page-stack">
      <section className="hero-panel simple-hero">
        <div className="hero-copy">
          <p className="section-kicker">Sponsor intelligence layer</p>
          <h1>Compare syndicators by what they actually did before you talk to them.</h1>
          <p className="hero-summary">
            Historical deal performance, projected-versus-actual outcomes, and a clean intro path. No live offerings or current deal terms are shown publicly.
          </p>
          <div className="hero-actions">
            <Link className="primary-button" href="/syndications">
              Explore sponsors
            </Link>
            <Link className="text-link" href="/signup/sponsor">
              Submit track record
            </Link>
          </div>
        </div>
      </section>

      <section className="content-section">
        <div className="section-heading">
          <p className="section-kicker">Release focus</p>
          <h2>Three simple jobs</h2>
          <p className="section-summary">
            V0 stays on historical operator transparency, not securities marketing.
          </p>
        </div>
        <div className="simple-grid">
          <article className="content-card">
            <h3>Compare</h3>
            <p>Browse sponsor profiles by market, asset focus, and realized historical performance.</p>
          </article>
          <article className="content-card">
            <h3>Validate</h3>
            <p>See expectation-versus-reality metrics and documentation coverage instead of pitch-deck claims.</p>
          </article>
          <article className="content-card">
            <h3>Connect</h3>
            <p>Request an introduction or join an investor list without turning the product into a public offering marketplace.</p>
          </article>
        </div>
      </section>

      <section className="content-section">
        <div className="section-heading">
          <p className="section-kicker">Featured sponsors</p>
          <h2>Historical track records in one place</h2>
        </div>
        <div className="card-grid">
          {featured.map((profile) => (
            <ProfileCard key={profile.id} profile={profile} />
          ))}
        </div>
      </section>
    </div>
  );
}
