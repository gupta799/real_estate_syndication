import { mockConnectionRequests, mockProfiles, mockSponsors, mockUsers } from "@/lib/mock-data";
import { createClient } from "@/lib/supabase/server";
import {
  ConnectionRequest,
  ProfileFilters,
  SponsorProfile,
  SyndicationProfile,
  UserProfile,
} from "@/lib/types";

function toTitleCase(value: string) {
  return value
    .split(/[\s-_]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(" ");
}

export function mockParseSponsorPdf(input: {
  companyName: string;
  contactEmail: string;
  fileName: string;
}) {
  const rawTitle = input.fileName.replace(/\.pdf$/i, "") || "Submitted Sponsor Profile";
  const title = toTitleCase(rawTitle);

  return {
    companyName: input.companyName,
    contactEmail: input.contactEmail,
    fileName: input.fileName,
    parsedTitle: title || input.companyName,
    parsedFocus: "Multifamily sponsor profile",
    parsedTrackRecordCount: "3 historical deals identified",
    parsedDocumentation: "Distribution summary, exit memo, investor snapshot",
    parsedSummary:
      "Mock parse result: sponsor positioning, historical track record fields, and supporting document references were extracted for review.",
    parseStatus: "Mock profile parsed successfully",
  };
}

function applyFilters(profiles: SyndicationProfile[], filters: ProfileFilters) {
  return profiles.filter((profile) => {
    if (filters.state && profile.state !== filters.state.toUpperCase()) {
      return false;
    }
    if (
      filters.focus &&
      !profile.assetFocus.toLowerCase().includes(filters.focus.toLowerCase())
    ) {
      return false;
    }
    if (
      filters.minRealizedIrr &&
      profile.averageActualIrr < filters.minRealizedIrr
    ) {
      return false;
    }
    if (
      filters.sponsor &&
      !profile.sponsorName.toLowerCase().includes(filters.sponsor.toLowerCase())
    ) {
      return false;
    }
    return true;
  });
}

export async function getPublicProfiles(filters: ProfileFilters = {}) {
  return applyFilters(
    mockProfiles.filter((profile) => profile.status === "published"),
    filters,
  );
}

export async function getFeaturedProfiles() {
  const profiles = await getPublicProfiles();
  return profiles.slice(0, 3);
}

export async function getProfileBySlug(slug: string) {
  return mockProfiles.find((profile) => profile.slug === slug) ?? null;
}

export async function getSponsorByName(name: string) {
  const sponsor = mockSponsors.find((item) => item.companyName === name);
  return sponsor ?? null;
}

export async function getInvestorDashboardData() {
  const user = mockUsers.find((item) => item.role === "investor") as UserProfile;
  const requests = mockConnectionRequests;
  return { user, requests };
}

export async function getSponsorDashboardData() {
  const user = mockUsers.find((item) => item.id === "sponsor-1") as UserProfile;
  const sponsor = mockSponsors.find(
    (item) => item.userId === user.id,
  ) as SponsorProfile;
  const profiles = mockProfiles.filter((profile) => profile.sponsorId === user.id);
  const requests = mockConnectionRequests.filter((request) =>
    profiles.some((profile) => profile.id === request.profileId),
  );

  return { user, sponsor, profiles, requests };
}

export async function getAdminDashboardData() {
  const pendingProfiles = mockProfiles.filter(
    (profile) => profile.status === "submitted",
  );
  const sponsors = mockSponsors;
  const requests = mockConnectionRequests;

  return { pendingProfiles, sponsors, requests };
}

export async function saveConnectionRequest(input: {
  profileId: string;
  profileTitle: string;
  investorName: string;
  investorEmail: string;
  message: string;
}) {
  const supabase = await createClient();
  if (!supabase) {
    return {
      ok: true,
      mode: "demo" as const,
      request: {
        id: `demo-${Date.now()}`,
        profileId: input.profileId,
        profileTitle: input.profileTitle,
        investorId: "demo-investor",
        investorName: input.investorName,
        investorEmail: input.investorEmail,
        message: input.message,
        status: "new",
        createdAt: new Date().toISOString(),
      } satisfies ConnectionRequest,
    };
  }

  const { data, error } = await supabase
    .from("listing_inquiries")
    .insert({
      listing_id: input.profileId,
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

export async function saveSponsorProfile(input: {
  companyName: string;
  city: string;
  state: string;
  focus: string;
  summary: string;
  yearsExperience: number;
}) {
  const supabase = await createClient();
  if (!supabase) {
    return { ok: true, mode: "demo" as const };
  }

  const slug = input.companyName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  const { error } = await supabase.from("listings").insert({
    sponsor_id: "replace-with-auth-user-id",
    sponsor_name: input.companyName,
    title: input.companyName,
    slug,
    city: input.city,
    state: input.state.toUpperCase(),
    summary: `${input.focus}: ${input.summary}`,
    market_story: input.summary,
    property_type: "multifamily",
    units: 0,
    target_irr: 0,
    equity_multiple: 0,
    cash_on_cash: 0,
    hold_period_years: Math.max(input.yearsExperience, 1),
    minimum_investment: 0,
    year_built: 2000,
    status: "submitted",
    cover_tone: "marine",
  });

  if (error) {
    return { ok: false, error: error.message };
  }

  return { ok: true, mode: "live" as const };
}
