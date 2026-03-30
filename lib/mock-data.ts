import {
  ConnectionRequest,
  HistoricalDeal,
  SponsorProfile,
  SyndicationProfile,
  UserProfile,
} from "@/lib/types";

export const mockUsers: UserProfile[] = [
  {
    id: "admin-1",
    role: "admin",
    fullName: "Operations Lead",
    email: "ops@syndicatelane.com",
    status: "active",
  },
  {
    id: "sponsor-1",
    role: "sponsor",
    fullName: "Nina Alvarez",
    email: "nina@ridgecapital.com",
    status: "active",
  },
  {
    id: "sponsor-2",
    role: "sponsor",
    fullName: "Marcus Chen",
    email: "marcus@harborequity.com",
    status: "active",
  },
  {
    id: "investor-1",
    role: "investor",
    fullName: "Daniel Brooks",
    email: "daniel@example.com",
    status: "active",
  },
];

export const mockSponsors: SponsorProfile[] = [
  {
    userId: "sponsor-1",
    companyName: "Ridge Capital Partners",
    slug: "ridge-capital-partners",
    bio: "Ridge runs a conservative communications process and tends to explain deviations early instead of marketing around them.",
    publicSummary: "Sun Belt multifamily operator with a long realized track record and a reputation for clean investor communication.",
    trackRecordSummary: "Historical performance is self-reported with document support on recent exits and distribution histories.",
    assetFocus: "Multifamily",
    markets: ["Phoenix", "Dallas", "Tampa"],
    investmentPhilosophy: "Buy workforce housing in growth corridors, underwrite conservatively, and report monthly when operations change.",
    city: "Phoenix",
    state: "AZ",
    yearsExperience: 12,
    investorReportsPerYear: 12,
    verificationStatus: "verified",
    status: "published",
    publishedAt: "2026-03-10",
  },
  {
    userId: "sponsor-2",
    companyName: "Harbor Equity Group",
    slug: "harbor-equity-group",
    bio: "Harbor positions itself as measured rather than flashy and typically emphasizes operating updates over promotional materials.",
    publicSummary: "Regional apartment sponsor with repeat investors and a documented history of moderate projection variance.",
    trackRecordSummary: "Historical results are organized around realized deals and supporting exit summaries rather than live offerings.",
    assetFocus: "Multifamily",
    markets: ["Charlotte", "Raleigh", "Nashville"],
    investmentPhilosophy: "Stay in growth-market suburbs, keep leverage moderate, and preserve capital through slower cycles.",
    city: "Charlotte",
    state: "NC",
    yearsExperience: 9,
    investorReportsPerYear: 4,
    verificationStatus: "verified",
    status: "published",
    publishedAt: "2026-03-15",
  },
  {
    userId: "sponsor-3",
    companyName: "Summit Grove Capital",
    slug: "summit-grove-capital",
    bio: "Summit is structured and process-heavy, with a bias toward detailed onboarding and clean post-close reporting.",
    publicSummary: "Southeast sponsor profile with documented operating outcomes and a focus on expectation-setting.",
    trackRecordSummary: "The firm shares standardized historical deal data and selective supporting documents to improve comparability.",
    assetFocus: "Multifamily",
    markets: ["Tampa", "Orlando", "Atlanta"],
    investmentPhilosophy: "Target infill communities with durable demand and avoid underwriting rent growth that needs perfect execution.",
    city: "Tampa",
    state: "FL",
    yearsExperience: 11,
    investorReportsPerYear: 12,
    verificationStatus: "verified",
    status: "published",
    publishedAt: "2026-03-18",
  },
  {
    userId: "sponsor-4",
    companyName: "Juniper Capital Management",
    slug: "juniper-capital-management",
    bio: "Profile submission is waiting for verification before public publication.",
    publicSummary: "Pending sponsor profile submission.",
    trackRecordSummary: "Verification notes are incomplete and still under admin review.",
    assetFocus: "Workforce housing",
    markets: ["Nashville", "Memphis"],
    investmentPhilosophy: "Preserve basis and rely on measured operational improvements rather than aggressive upside assumptions.",
    city: "Nashville",
    state: "TN",
    yearsExperience: 7,
    investorReportsPerYear: 6,
    verificationStatus: "pending",
    status: "submitted",
    publishedAt: "2026-03-20",
  },
];

export const mockHistoricalDeals: HistoricalDeal[] = [
  {
    id: "deal-1",
    sponsorId: "sponsor-1",
    name: "Desert Park Apartments",
    market: "Phoenix",
    state: "AZ",
    acquiredYear: 2018,
    exitedYear: 2023,
    businessPlan: "Value-add repositioning with phased interior upgrades and tighter expense controls.",
    status: "realized",
    projectedIrr: 16.0,
    actualIrr: 14.1,
    projectedEquityMultiple: 1.9,
    actualEquityMultiple: 1.7,
    projectedHoldYears: 5,
    actualHoldYears: 5.6,
    equityRaised: 9200000,
    documentationLevel: "high",
    outcomeSummary: "Execution was steady, but insurance and capex costs reduced final upside.",
    riskNotes: "Renovation timing slipped during labor shortages, extending the hold slightly.",
  },
  {
    id: "deal-2",
    sponsorId: "sponsor-1",
    name: "Mesa Grove Homes",
    market: "Dallas",
    state: "TX",
    acquiredYear: 2019,
    exitedYear: 2024,
    businessPlan: "Operational cleanup and amenity refresh for a suburban workforce housing community.",
    status: "realized",
    projectedIrr: 15.0,
    actualIrr: 15.4,
    projectedEquityMultiple: 1.8,
    actualEquityMultiple: 1.9,
    projectedHoldYears: 5,
    actualHoldYears: 4.8,
    equityRaised: 10400000,
    documentationLevel: "high",
    outcomeSummary: "Outperformed modestly through rent growth and cleaner-than-expected collections.",
    riskNotes: "Debt costs tightened margins early, but operating gains offset them later.",
  },
  {
    id: "deal-3",
    sponsorId: "sponsor-1",
    name: "Canyon Line Residences",
    market: "Tampa",
    state: "FL",
    acquiredYear: 2021,
    businessPlan: "Operational lift with moderate renovation scope and tighter resident retention efforts.",
    status: "ongoing",
    projectedIrr: 15.5,
    projectedEquityMultiple: 1.8,
    projectedHoldYears: 5,
    equityRaised: 8800000,
    documentationLevel: "medium",
    outcomeSummary: "Current operating updates point to a slower lease-up than originally modeled.",
    riskNotes: "Insurance and payroll costs remain the main watch items.",
  },
  {
    id: "deal-4",
    sponsorId: "sponsor-2",
    name: "Harbor South Flats",
    market: "Charlotte",
    state: "NC",
    acquiredYear: 2017,
    exitedYear: 2022,
    businessPlan: "Exterior refresh and operational tightening in a high-growth suburb.",
    status: "realized",
    projectedIrr: 17.0,
    actualIrr: 12.8,
    projectedEquityMultiple: 2.0,
    actualEquityMultiple: 1.6,
    projectedHoldYears: 5,
    actualHoldYears: 6.1,
    equityRaised: 11100000,
    documentationLevel: "high",
    outcomeSummary: "The deal preserved capital and exited profitably, but missed timing and rent assumptions.",
    riskNotes: "Cap rate expansion and slower renovation traction widened the reality gap.",
  },
  {
    id: "deal-5",
    sponsorId: "sponsor-2",
    name: "Northline Commons",
    market: "Raleigh",
    state: "NC",
    acquiredYear: 2018,
    exitedYear: 2023,
    businessPlan: "Stabilize collections and improve amenity quality in a commuter submarket.",
    status: "realized",
    projectedIrr: 15.0,
    actualIrr: 13.2,
    projectedEquityMultiple: 1.8,
    actualEquityMultiple: 1.7,
    projectedHoldYears: 5,
    actualHoldYears: 5.4,
    equityRaised: 9700000,
    documentationLevel: "medium",
    outcomeSummary: "Finished close to plan after a delayed refinance and slower lease-up.",
    riskNotes: "Debt timing and tenant turnover pushed the hold beyond the original model.",
  },
  {
    id: "deal-6",
    sponsorId: "sponsor-2",
    name: "Creekside Quarters",
    market: "Nashville",
    state: "TN",
    acquiredYear: 2020,
    businessPlan: "Conservative basis with focus on collections, expense discipline, and selective unit turns.",
    status: "ongoing",
    projectedIrr: 14.5,
    projectedEquityMultiple: 1.7,
    projectedHoldYears: 5,
    equityRaised: 8400000,
    documentationLevel: "medium",
    outcomeSummary: "Current updates show stable occupancy and slower rent growth than the original plan.",
    riskNotes: "Expense pressure has narrowed projected upside.",
  },
  {
    id: "deal-7",
    sponsorId: "sponsor-3",
    name: "Summit Terrace",
    market: "Tampa",
    state: "FL",
    acquiredYear: 2016,
    exitedYear: 2021,
    businessPlan: "Improve operations, finish deferred maintenance, and manage to a cleaner resident mix.",
    status: "realized",
    projectedIrr: 15.0,
    actualIrr: 15.1,
    projectedEquityMultiple: 1.8,
    actualEquityMultiple: 1.8,
    projectedHoldYears: 5,
    actualHoldYears: 5.0,
    equityRaised: 7800000,
    documentationLevel: "high",
    outcomeSummary: "Landed almost exactly on plan with stable operations and a timely sale.",
    riskNotes: "No major negative variance beyond modest expense inflation.",
  },
  {
    id: "deal-8",
    sponsorId: "sponsor-3",
    name: "Orange Loop Apartments",
    market: "Orlando",
    state: "FL",
    acquiredYear: 2019,
    exitedYear: 2024,
    businessPlan: "Moderate renovation plan with rent growth driven by location and operating cleanup.",
    status: "realized",
    projectedIrr: 16.5,
    actualIrr: 14.8,
    projectedEquityMultiple: 1.9,
    actualEquityMultiple: 1.8,
    projectedHoldYears: 5,
    actualHoldYears: 5.3,
    equityRaised: 10200000,
    documentationLevel: "high",
    outcomeSummary: "Missed slightly on returns but stayed close to original timeline and preserved capital.",
    riskNotes: "Insurance and payroll inflation compressed margins late in the hold.",
  },
  {
    id: "deal-9",
    sponsorId: "sponsor-3",
    name: "Peachtree Yard",
    market: "Atlanta",
    state: "GA",
    acquiredYear: 2021,
    businessPlan: "Infill community repositioning with disciplined capex and resident retention focus.",
    status: "ongoing",
    projectedIrr: 15.8,
    projectedEquityMultiple: 1.8,
    projectedHoldYears: 5,
    equityRaised: 9300000,
    documentationLevel: "medium",
    outcomeSummary: "Current updates show the asset trending near plan with slower rent growth assumptions.",
    riskNotes: "Leasing velocity is solid, but expense pressure remains elevated.",
  },
  {
    id: "deal-10",
    sponsorId: "sponsor-4",
    name: "Juniper Station",
    market: "Nashville",
    state: "TN",
    acquiredYear: 2022,
    businessPlan: "Pending admin review before this profile becomes public.",
    status: "ongoing",
    projectedIrr: 15.0,
    projectedEquityMultiple: 1.8,
    projectedHoldYears: 5,
    equityRaised: 6900000,
    documentationLevel: "low",
    outcomeSummary: "Submission is incomplete and still being reviewed.",
    riskNotes: "Supporting documents have not been finalized.",
  },
];

function average(values: number[]) {
  if (!values.length) {
    return 0;
  }

  return values.reduce((total, value) => total + value, 0) / values.length;
}

function max(values: number[]) {
  return values.length ? Math.max(...values) : 0;
}

function min(values: number[]) {
  return values.length ? Math.min(...values) : 0;
}

function getDocumentationCoverage(levels: HistoricalDeal["documentationLevel"][]) {
  if (levels.every((level) => level === "high")) {
    return "high" as const;
  }
  if (levels.some((level) => level === "low")) {
    return "low" as const;
  }
  return "medium" as const;
}

export const mockProfiles: SyndicationProfile[] = mockSponsors.map((sponsor, index) => {
  const historicalDeals = mockHistoricalDeals.filter((deal) => deal.sponsorId === sponsor.userId);
  const realizedDeals = historicalDeals.filter((deal) => deal.status === "realized");
  const projectedIrrs = realizedDeals.map((deal) => deal.projectedIrr);
  const actualIrrs = realizedDeals
    .map((deal) => deal.actualIrr)
    .filter((value): value is number => typeof value === "number");
  const projectedHolds = realizedDeals.map((deal) => deal.projectedHoldYears);
  const actualHolds = realizedDeals
    .map((deal) => deal.actualHoldYears)
    .filter((value): value is number => typeof value === "number");
  const percentMeetingProjection = realizedDeals.length
    ? (realizedDeals.filter((deal) => (deal.actualIrr ?? 0) >= deal.projectedIrr).length /
        realizedDeals.length) *
      100
    : 0;

  return {
    id: `profile-${index + 1}`,
    sponsorId: sponsor.userId,
    sponsorName: sponsor.companyName,
    title: sponsor.companyName,
    slug: sponsor.slug,
    city: sponsor.city,
    state: sponsor.state,
    summary: sponsor.publicSummary,
    assetFocus: sponsor.assetFocus,
    markets: sponsor.markets,
    investmentPhilosophy: sponsor.investmentPhilosophy,
    trackRecordSummary: sponsor.trackRecordSummary,
    yearsExperience: sponsor.yearsExperience,
    investorReportsPerYear: sponsor.investorReportsPerYear,
    totalDealsCompleted: historicalDeals.length,
    realizedDealsCount: realizedDeals.length,
    totalEquityRaised: historicalDeals.reduce((total, deal) => total + deal.equityRaised, 0),
    averageProjectedIrr: average(projectedIrrs),
    averageActualIrr: average(actualIrrs),
    averageProjectedHoldYears: average(projectedHolds),
    averageActualHoldYears: average(actualHolds),
    percentMeetingProjection,
    capitalLossRate: 0,
    bestRealizedIrr: max(actualIrrs),
    worstRealizedIrr: min(actualIrrs),
    documentationCoverage: getDocumentationCoverage(
      historicalDeals.map((deal) => deal.documentationLevel),
    ),
    dataSource: historicalDeals.some((deal) => deal.documentationLevel === "high")
      ? "document-backed"
      : "self-reported",
    verificationStatus: sponsor.verificationStatus,
    status: sponsor.status,
    publishedAt: sponsor.publishedAt,
    historicalDeals,
  };
});

export const mockConnectionRequests: ConnectionRequest[] = [
  {
    id: "request-1",
    profileId: "profile-1",
    profileTitle: "Ridge Capital Partners",
    investorId: "investor-1",
    investorName: "Daniel Brooks",
    investorEmail: "daniel@example.com",
    message: "Would like an introduction and to join future investor updates.",
    status: "new",
    createdAt: "2026-03-20T17:20:00Z",
  },
  {
    id: "request-2",
    profileId: "profile-2",
    profileTitle: "Harbor Equity Group",
    investorId: "investor-1",
    investorName: "Daniel Brooks",
    investorEmail: "daniel@example.com",
    message: "Interested in learning more about their historical deal reporting process.",
    status: "contacted",
    createdAt: "2026-03-21T12:10:00Z",
  },
];
