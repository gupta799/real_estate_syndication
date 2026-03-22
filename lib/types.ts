export type Role = "admin" | "sponsor" | "investor";

export type ListingStatus =
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
  bio: string;
  trackRecordSummary: string;
  verificationStatus: "pending" | "verified";
}

export interface InvestorProfile {
  userId: string;
  accreditationSelfReported: boolean;
  investmentPreferences: string[];
}

export interface Listing {
  id: string;
  sponsorId: string;
  sponsorName: string;
  title: string;
  slug: string;
  city: string;
  state: string;
  summary: string;
  marketStory: string;
  propertyType: "multifamily";
  units: number;
  targetIrr: number;
  equityMultiple: number;
  cashOnCash: number;
  holdPeriodYears: number;
  minimumInvestment: number;
  yearBuilt: number;
  status: ListingStatus;
  coverTone: string;
  publishedAt: string;
}

export interface ListingInquiry {
  id: string;
  listingId: string;
  listingTitle: string;
  investorId: string;
  investorName: string;
  investorEmail: string;
  message: string;
  status: "new" | "contacted";
  createdAt: string;
}

export interface ListingFilters {
  state?: string;
  minIrr?: number;
  maxMinimumInvestment?: number;
  sponsor?: string;
}

export interface AppMode {
  supabaseEnabled: boolean;
  label: "live" | "demo";
}

