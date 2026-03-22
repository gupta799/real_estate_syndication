import { ListingFilters } from "@/lib/types";

export function FilterBar({ filters }: { filters: ListingFilters }) {
  return (
    <form className="filter-bar" action="/listings">
      <label>
        State
        <input defaultValue={filters.state ?? ""} name="state" placeholder="AZ" />
      </label>
      <label>
        Minimum IRR
        <input
          defaultValue={filters.minIrr ?? ""}
          min="0"
          name="minIrr"
          placeholder="16"
          type="number"
        />
      </label>
      <label>
        Max minimum
        <input
          defaultValue={filters.maxMinimumInvestment ?? ""}
          min="0"
          name="maxMinimumInvestment"
          placeholder="75000"
          type="number"
        />
      </label>
      <button className="primary-button" type="submit">
        Filter
      </button>
    </form>
  );
}
