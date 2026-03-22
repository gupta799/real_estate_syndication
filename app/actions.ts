"use server";

import { redirect } from "next/navigation";

import { saveInquiry, saveSponsorListing } from "@/lib/listings";

function readText(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

export async function signInAction(formData: FormData) {
  const role = readText(formData, "role") || "investor";
  redirect(`/dashboard/${role}?mode=demo`);
}

export async function signUpAction(formData: FormData) {
  const role = readText(formData, "role") || "investor";
  redirect(`/dashboard/${role}?mode=demo`);
}

export async function signOutAction() {
  redirect("/");
}

export async function requestAccessAction(formData: FormData) {
  const listingId = readText(formData, "listingId");
  const listingTitle = readText(formData, "listingTitle");
  const investorName = readText(formData, "investorName");
  const investorEmail = readText(formData, "investorEmail");
  const message = readText(formData, "message");

  if (!listingId || !investorName || !investorEmail) {
    redirect(`/listings/${readText(formData, "slug")}?error=missing-fields`);
  }

  const result = await saveInquiry({
    listingId,
    listingTitle,
    investorName,
    investorEmail,
    message,
  });

  if (!result.ok) {
    redirect(`/listings/${readText(formData, "slug")}?error=inquiry-failed`);
  }

  redirect(`/listings/${readText(formData, "slug")}?success=access-requested`);
}

export async function createListingAction(formData: FormData) {
  const title = readText(formData, "title");
  const city = readText(formData, "city");
  const state = readText(formData, "state");
  const summary = readText(formData, "summary");
  const targetIrr = Number(readText(formData, "targetIrr"));
  const minimumInvestment = Number(readText(formData, "minimumInvestment"));

  if (!title || !city || !state || !summary) {
    redirect("/dashboard/sponsor?error=missing-fields");
  }

  const result = await saveSponsorListing({
    title,
    city,
    state,
    summary,
    targetIrr,
    minimumInvestment,
  });

  if (!result.ok) {
    redirect("/dashboard/sponsor?error=save-failed");
  }

  redirect("/dashboard/sponsor?success=listing-submitted");
}

