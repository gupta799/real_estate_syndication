import { ListingFilters } from "@/lib/types";

export function FilterBar({ filters }: { filters: ListingFilters }) {
  return (
    <form className="filter-bar" action="/listings">
      <label className="field-label">
        Sponsor
        <input defaultValue={filters.sponsor ?? ""} name="sponsor" placeholder="Ridge" />
      </label>
      <label className="field-label">
        Market
        <input defaultValue={filters.state ?? ""} name="state" placeholder="AZ" />
      </label>
      <label className="field-label">
        Strategy
        <select defaultValue={filters.strategy ?? ""} name="strategy">
          <option value="">All</option>
          <option value="Core">Core</option>
          <option value="Core-plus">Core-plus</option>
          <option value="Value-add">Value-add</option>
          <option value="Opportunistic">Opportunistic</option>
          <option value="Workforce housing">Workforce housing</option>
          <option value="Build-to-rent">Build-to-rent</option>
          <option value="Distressed turnaround">Distressed turnaround</option>
          <option value="Debt strategy">Debt strategy</option>
          <option value="Development">Development</option>
          <option value="Income-focused">Income-focused</option>
        </select>
      </label>
      <label className="field-label">
        Min IRR
        <input
          defaultValue={filters.minIrr ?? ""}
          min="0"
          name="minIrr"
          placeholder="16"
          type="number"
        />
      </label>
      <label className="field-label">
        Max check size
        <input
          defaultValue={filters.maxMinimumInvestment ?? ""}
          min="0"
          name="maxMinimumInvestment"
          placeholder="75000"
          type="number"
        />
      </label>
      <div className="filter-actions">
        <button className="primary-button filter-submit" type="submit">
          Apply
        </button>
      </div>
    </form>
  );
}
