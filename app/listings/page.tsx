import { FilterBar } from "@/components/filter-bar";
import { ListingCard } from "@/components/listing-card";
import { getPublicListings } from "@/lib/listings";

interface ListingsPageProps {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}

export default async function ListingsPage({ searchParams }: ListingsPageProps) {
  const resolvedParams = searchParams ? await searchParams : {};
  const filters = {
    sponsor:
      typeof resolvedParams.sponsor === "string"
        ? resolvedParams.sponsor
        : undefined,
    state: typeof resolvedParams.state === "string" ? resolvedParams.state : undefined,
    strategy:
      typeof resolvedParams.strategy === "string"
        ? resolvedParams.strategy
        : undefined,
    minIrr:
      typeof resolvedParams.minIrr === "string" && resolvedParams.minIrr
        ? Number(resolvedParams.minIrr)
        : undefined,
    maxMinimumInvestment:
      typeof resolvedParams.maxMinimumInvestment === "string" &&
      resolvedParams.maxMinimumInvestment
        ? Number(resolvedParams.maxMinimumInvestment)
        : undefined,
  };

  const listings = await getPublicListings(filters);

  return (
    <div className="page-stack">
      <section className="content-section">
        <div className="section-heading">
          <p className="section-kicker">Syndicator directory</p>
          <h1>Browse sponsor profiles</h1>
          <p className="section-summary">
            Each profile is based on sponsor-submitted materials and refined through Credex analysis so investors can compare operators on firmer ground.
          </p>
        </div>
        <FilterBar filters={filters} />
        <div className="card-grid">
          {listings.length ? (
            listings.map((listing) => <ListingCard key={listing.id} listing={listing} />)
          ) : (
            <div className="empty-panel">
              <h3>No sponsors match this filter set.</h3>
              <p>Try a wider search.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
