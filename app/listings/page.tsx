import { FilterBar } from "@/components/filter-bar";
import { ListingCard } from "@/components/listing-card";
import { getPublicListings } from "@/lib/listings";

interface ListingsPageProps {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}

export default async function ListingsPage({ searchParams }: ListingsPageProps) {
  const resolvedParams = searchParams ? await searchParams : {};
  const filters = {
    state: typeof resolvedParams.state === "string" ? resolvedParams.state : undefined,
    minIrr:
      typeof resolvedParams.minIrr === "string" && resolvedParams.minIrr
        ? Number(resolvedParams.minIrr)
        : undefined,
    maxMinimumInvestment:
      typeof resolvedParams.maxMinimumInvestment === "string" &&
      resolvedParams.maxMinimumInvestment
        ? Number(resolvedParams.maxMinimumInvestment)
        : undefined,
    sponsor:
      typeof resolvedParams.sponsor === "string"
        ? resolvedParams.sponsor
        : undefined,
  };

  const listings = await getPublicListings(filters);

  return (
    <div className="page-stack">
      <section className="content-section">
        <div className="section-heading">
          <p className="section-kicker">Marketplace</p>
          <h1>Live multifamily listings</h1>
          <p className="section-summary">
            A smaller filter set, a lighter layout, and one clear next step on every listing.
          </p>
        </div>
        <FilterBar filters={filters} />
        <div className="card-grid">
          {listings.length ? (
            listings.map((listing) => <ListingCard key={listing.id} listing={listing} />)
          ) : (
            <div className="empty-panel">
              <h3>No listings match this filter set.</h3>
              <p>Relax the filters or add more sponsor inventory.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
