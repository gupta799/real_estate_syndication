import { mockInquiries, mockListings, mockSponsors, mockUsers } from "@/lib/mock-data";
import { createClient } from "@/lib/supabase/server";
import { Listing, ListingFilters, ListingInquiry, SponsorProfile, UserProfile } from "@/lib/types";

function applyFilters(listings: Listing[], filters: ListingFilters) {
  return listings.filter((listing) => {
    if (filters.state && listing.state !== filters.state.toUpperCase()) {
      return false;
    }
    if (filters.minIrr && listing.targetIrr < filters.minIrr) {
      return false;
    }
    if (
      filters.maxMinimumInvestment &&
      listing.minimumInvestment > filters.maxMinimumInvestment
    ) {
      return false;
    }
    if (
      filters.sponsor &&
      !listing.sponsorName.toLowerCase().includes(filters.sponsor.toLowerCase())
    ) {
      return false;
    }
    return true;
  });
}

export async function getPublicListings(filters: ListingFilters = {}) {
  const supabase = await createClient();
  if (!supabase) {
    return applyFilters(
      mockListings.filter((listing) => listing.status === "published"),
      filters,
    );
  }

  let query = supabase
    .from("listings")
    .select("*")
    .eq("status", "published")
    .order("published_at", { ascending: false });

  if (filters.state) {
    query = query.eq("state", filters.state.toUpperCase());
  }
  if (filters.minIrr) {
    query = query.gte("target_irr", filters.minIrr);
  }
  if (filters.maxMinimumInvestment) {
    query = query.lte("minimum_investment", filters.maxMinimumInvestment);
  }

  const { data, error } = await query;
  if (error || !data) {
    return applyFilters(
      mockListings.filter((listing) => listing.status === "published"),
      filters,
    );
  }

  return data.map((item: any) => ({
    id: item.id,
    sponsorId: item.sponsor_id,
    sponsorName: item.sponsor_name,
    title: item.title,
    slug: item.slug,
    city: item.city,
    state: item.state,
    summary: item.summary,
    marketStory: item.market_story,
    propertyType: item.property_type,
    units: item.units,
    targetIrr: item.target_irr,
    equityMultiple: item.equity_multiple,
    cashOnCash: item.cash_on_cash,
    holdPeriodYears: item.hold_period_years,
    minimumInvestment: item.minimum_investment,
    yearBuilt: item.year_built,
    status: item.status,
    coverTone: item.cover_tone ?? "marine",
    publishedAt: item.published_at,
  })) as Listing[];
}

export async function getFeaturedListings() {
  const listings = await getPublicListings();
  return listings.slice(0, 3);
}

export async function getListingBySlug(slug: string) {
  const supabase = await createClient();
  if (!supabase) {
    return mockListings.find((listing) => listing.slug === slug) ?? null;
  }

  const { data, error } = await supabase
    .from("listings")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();

  if (error || !data) {
    return mockListings.find((listing) => listing.slug === slug) ?? null;
  }

  return {
    id: data.id,
    sponsorId: data.sponsor_id,
    sponsorName: data.sponsor_name,
    title: data.title,
    slug: data.slug,
    city: data.city,
    state: data.state,
    summary: data.summary,
    marketStory: data.market_story,
    propertyType: data.property_type,
    units: data.units,
    targetIrr: data.target_irr,
    equityMultiple: data.equity_multiple,
    cashOnCash: data.cash_on_cash,
    holdPeriodYears: data.hold_period_years,
    minimumInvestment: data.minimum_investment,
    yearBuilt: data.year_built,
    status: data.status,
    coverTone: data.cover_tone ?? "marine",
    publishedAt: data.published_at,
  } as Listing;
}

export async function getSponsorByName(name: string) {
  const sponsor = mockSponsors.find((item) => item.companyName === name);
  return sponsor ?? null;
}

export async function getInvestorDashboardData() {
  const user = mockUsers.find((item) => item.role === "investor") as UserProfile;
  const inquiries = mockInquiries;
  return { user, inquiries };
}

export async function getSponsorDashboardData() {
  const user = mockUsers.find((item) => item.id === "sponsor-1") as UserProfile;
  const sponsor = mockSponsors.find(
    (item) => item.userId === user.id,
  ) as SponsorProfile;
  const listings = mockListings.filter((listing) => listing.sponsorId === user.id);
  const inquiries = mockInquiries.filter((inquiry) =>
    listings.some((listing) => listing.id === inquiry.listingId),
  );

  return { user, sponsor, listings, inquiries };
}

export async function getAdminDashboardData() {
  const pendingListings = mockListings.filter(
    (listing) => listing.status === "submitted",
  );
  const sponsors = mockSponsors;
  const inquiries = mockInquiries;

  return { pendingListings, sponsors, inquiries };
}

export async function saveInquiry(input: {
  listingId: string;
  listingTitle: string;
  investorName: string;
  investorEmail: string;
  message: string;
}) {
  const supabase = await createClient();
  if (!supabase) {
    return {
      ok: true,
      mode: "demo" as const,
      inquiry: {
        id: `demo-${Date.now()}`,
        listingId: input.listingId,
        listingTitle: input.listingTitle,
        investorId: "demo-investor",
        investorName: input.investorName,
        investorEmail: input.investorEmail,
        message: input.message,
        status: "new",
        createdAt: new Date().toISOString(),
      } satisfies ListingInquiry,
    };
  }

  const { data, error } = await supabase
    .from("listing_inquiries")
    .insert({
      listing_id: input.listingId,
      investor_name: input.investorName,
      investor_email: input.investorEmail,
      message: input.message,
    })
    .select()
    .single();

  if (error) {
    return { ok: false, error: error.message };
  }

  return { ok: true, mode: "live" as const, inquiry: data };
}

export async function saveSponsorListing(input: {
  title: string;
  city: string;
  state: string;
  summary: string;
  targetIrr: number;
  minimumInvestment: number;
}) {
  const supabase = await createClient();
  if (!supabase) {
    return { ok: true, mode: "demo" as const };
  }

  const slug = input.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  const { error } = await supabase.from("listings").insert({
    sponsor_id: "replace-with-auth-user-id",
    sponsor_name: "Pending Sponsor",
    title: input.title,
    slug,
    city: input.city,
    state: input.state.toUpperCase(),
    summary: input.summary,
    market_story: input.summary,
    property_type: "multifamily",
    units: 0,
    target_irr: input.targetIrr,
    equity_multiple: 0,
    cash_on_cash: 0,
    hold_period_years: 5,
    minimum_investment: input.minimumInvestment,
    year_built: 2000,
    status: "submitted",
    cover_tone: "marine",
  });

  if (error) {
    return { ok: false, error: error.message };
  }

  return { ok: true, mode: "live" as const };
}

