import { ProfileFilters } from "@/lib/types";

export function FilterBar({ filters }: { filters: ProfileFilters }) {
  return (
    <form className="filter-bar" action="/syndications">
      <label>
        Headquarters state
        <input defaultValue={filters.state ?? ""} name="state" placeholder="AZ" />
      </label>
      <label>
        Asset focus
        <input defaultValue={filters.focus ?? ""} name="focus" placeholder="Multifamily" />
      </label>
      <label>
        Minimum realized IRR
        <input
          defaultValue={filters.minRealizedIrr ?? ""}
          min="0"
          name="minRealizedIrr"
          placeholder="12"
          step="0.1"
          type="number"
        />
      </label>
      <label>
        Sponsor
        <input defaultValue={filters.sponsor ?? ""} name="sponsor" placeholder="Ridge" />
      </label>
      <button className="primary-button" type="submit">
        Filter
      </button>
    </form>
  );
}
