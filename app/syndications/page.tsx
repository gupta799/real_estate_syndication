import { FilterBar } from "@/components/filter-bar";
import { ProfileCard } from "@/components/profile-card";
import { getPublicProfiles } from "@/lib/listings";

interface SyndicationsPageProps {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}

export default async function SyndicationsPage({
  searchParams,
}: SyndicationsPageProps) {
  const resolvedParams = searchParams ? await searchParams : {};
  const filters = {
    state: typeof resolvedParams.state === "string" ? resolvedParams.state : undefined,
    focus: typeof resolvedParams.focus === "string" ? resolvedParams.focus : undefined,
    minRealizedIrr:
      typeof resolvedParams.minRealizedIrr === "string" && resolvedParams.minRealizedIrr
        ? Number(resolvedParams.minRealizedIrr)
        : undefined,
    sponsor:
      typeof resolvedParams.sponsor === "string"
        ? resolvedParams.sponsor
        : undefined,
  };

  const profiles = await getPublicProfiles(filters);

  return (
    <div className="page-stack">
      <section className="content-section">
        <div className="section-heading">
          <p className="section-kicker">Directory</p>
          <h1>Historical sponsor profiles</h1>
          <p className="section-summary">
            Compare sponsors through realized track records, expectation-versus-reality gaps, and supporting documentation levels. No live offerings are shown.
          </p>
        </div>
        <FilterBar filters={filters} />
        <div className="card-grid">
          {profiles.length ? (
            profiles.map((profile) => <ProfileCard key={profile.id} profile={profile} />)
          ) : (
            <div className="empty-panel">
              <h3>No profiles match this filter set.</h3>
              <p>Relax the filters or onboard more sponsor track records.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
