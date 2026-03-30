"use server";

import { redirect } from "next/navigation";

import { saveConnectionRequest, saveSponsorProfile } from "@/lib/listings";

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

export async function requestIntroductionAction(formData: FormData) {
  const profileId = readText(formData, "profileId");
  const profileTitle = readText(formData, "profileTitle");
  const investorName = readText(formData, "investorName");
  const investorEmail = readText(formData, "investorEmail");
  const message = readText(formData, "message");
  const slug = readText(formData, "slug");

  if (!profileId || !investorName || !investorEmail) {
    redirect(`/syndications/${slug}?error=missing-fields`);
  }

  const result = await saveConnectionRequest({
    profileId,
    profileTitle,
    investorName,
    investorEmail,
    message,
  });

  if (!result.ok) {
    redirect(`/syndications/${slug}?error=request-failed`);
  }

  redirect(`/syndications/${slug}?success=intro-requested`);
}

export async function createProfileAction(formData: FormData) {
  const companyName = readText(formData, "companyName");
  const city = readText(formData, "city");
  const state = readText(formData, "state");
  const focus = readText(formData, "focus");
  const summary = readText(formData, "summary");
  const yearsExperience = Number(readText(formData, "yearsExperience"));

  if (!companyName || !city || !state || !focus || !summary) {
    redirect("/dashboard/sponsor?error=missing-fields");
  }

  const result = await saveSponsorProfile({
    companyName,
    city,
    state,
    focus,
    summary,
    yearsExperience,
  });

  if (!result.ok) {
    redirect("/dashboard/sponsor?error=save-failed");
  }

  redirect("/dashboard/sponsor?success=profile-submitted");
}
