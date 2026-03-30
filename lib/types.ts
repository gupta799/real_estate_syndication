export type Role = "admin" | "sponsor" | "investor";

export type SubmissionStatus =
  | "draft"
  | "submitted"
  | "approved"
  | "rejected"
  | "published";

export interface UserProfile {
  id: string;
  role: Role;
  fullName: string;
  email: string;
  status: "pending" | "active";
}

export interface SponsorProfile {
  userId: string;
  companyName: string;
  slug: string;
  bio: string;
  publicSummary: string;
  trackRecordSummary: string;
  assetFocus: string;
  markets: string[];
  investmentPhilosophy: string;
  city: string;
  state: string;
  yearsExperience: number;
  investorReportsPerYear: number;
  verificationStatus: "pending" | "verified";
  status: SubmissionStatus;
  publishedAt: string;
}

export interface InvestorProfile {
  userId: string;
  accreditationSelfReported: boolean;
  investmentPreferences: string[];
}

export interface HistoricalDeal {
  id: string;
  sponsorId: string;
  name: string;
  market: string;
  state: string;
  acquiredYear: number;
  exitedYear?: number;
  businessPlan: string;
  status: "realized" | "ongoing";
  projectedIrr: number;
  actualIrr?: number;
  projectedEquityMultiple: number;
  actualEquityMultiple?: number;
  projectedHoldYears: number;
  actualHoldYears?: number;
  equityRaised: number;
  documentationLevel: "high" | "medium" | "low";
  outcomeSummary: string;
  riskNotes: string;
}

export interface SyndicationProfile {
  id: string;
  sponsorId: string;
  sponsorName: string;
  title: string;
  slug: string;
  city: string;
  state: string;
  summary: string;
  assetFocus: string;
  markets: string[];
  investmentPhilosophy: string;
  trackRecordSummary: string;
  yearsExperience: number;
  investorReportsPerYear: number;
  totalDealsCompleted: number;
  realizedDealsCount: number;
  totalEquityRaised: number;
  averageProjectedIrr: number;
  averageActualIrr: number;
  averageProjectedHoldYears: number;
  averageActualHoldYears: number;
  percentMeetingProjection: number;
  capitalLossRate: number;
  bestRealizedIrr: number;
  worstRealizedIrr: number;
  documentationCoverage: "high" | "medium" | "low";
  dataSource: "self-reported" | "document-backed";
  verificationStatus: "pending" | "verified";
  status: SubmissionStatus;
  publishedAt: string;
  historicalDeals: HistoricalDeal[];
}

export interface ConnectionRequest {
  id: string;
  profileId: string;
  profileTitle: string;
  investorId: string;
  investorName: string;
  investorEmail: string;
  message: string;
  status: "new" | "contacted";
  createdAt: string;
}

export interface ProfileFilters {
  state?: string;
  focus?: string;
  minRealizedIrr?: number;
  sponsor?: string;
}

export interface AppMode {
  supabaseEnabled: boolean;
  label: "live" | "demo";
}
