import { NextResponse } from "next/server";

function readText(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const companyName = readText(formData, "companyName");
  const contactName = readText(formData, "contactName");
  const contactEmail = readText(formData, "contactEmail");
  const primaryMarket = readText(formData, "primaryMarket");
  const strategy = readText(formData, "strategy");
  const reportingCadence = readText(formData, "reportingCadence");
  const unitsOperated = readText(formData, "unitsOperated");
  const fullCycleExits = readText(formData, "fullCycleExits");
  const realizedIrr = readText(formData, "realizedIrr");
  const equityMultiple = readText(formData, "equityMultiple");
  const minimumCheckSize = readText(formData, "minimumCheckSize");
  const holdPeriodYears = readText(formData, "holdPeriodYears");
  const dataRoomUrl = readText(formData, "dataRoomUrl");
  const reviewNotes = readText(formData, "reviewNotes");
  const supportingPdf = formData.get("supportingPdf");

  const redirectUrl = new URL("/signup/sponsor", request.url);

  const hasRequiredText =
    companyName &&
    contactName &&
    contactEmail &&
    primaryMarket &&
    strategy &&
    reportingCadence &&
    unitsOperated &&
    fullCycleExits &&
    realizedIrr &&
    equityMultiple &&
    minimumCheckSize &&
    holdPeriodYears;

  const hasValidEmail = contactEmail.includes("@");
  const hasNumericValues =
    Number(unitsOperated) >= 0 &&
    Number(fullCycleExits) >= 0 &&
    Number(realizedIrr) >= 0 &&
    Number(equityMultiple) > 0 &&
    Number(minimumCheckSize) >= 0 &&
    Number(holdPeriodYears) > 0;

  const hasValidOptionalFile =
    !(supportingPdf instanceof File) || !supportingPdf.name || supportingPdf.type === "application/pdf";

  if (!hasRequiredText || !hasValidEmail || !hasNumericValues || !hasValidOptionalFile) {
    redirectUrl.searchParams.set("error", "missing-fields");
    return NextResponse.redirect(redirectUrl, 303);
  }

  redirectUrl.searchParams.set("success", "profile-submitted");
  redirectUrl.searchParams.set("company", companyName);
  redirectUrl.searchParams.set("contactName", contactName);
  redirectUrl.searchParams.set("email", contactEmail);
  redirectUrl.searchParams.set("strategy", strategy);
  redirectUrl.searchParams.set("market", primaryMarket);
  redirectUrl.searchParams.set("units", unitsOperated);
  redirectUrl.searchParams.set("exits", fullCycleExits);
  redirectUrl.searchParams.set("irr", realizedIrr);
  redirectUrl.searchParams.set("multiple", equityMultiple);
  redirectUrl.searchParams.set("checkSize", minimumCheckSize);
  redirectUrl.searchParams.set("holdYears", holdPeriodYears);
  redirectUrl.searchParams.set("reportingCadence", reportingCadence);
  if (dataRoomUrl) {
    redirectUrl.searchParams.set("dataRoomUrl", dataRoomUrl);
  }
  if (reviewNotes) {
    redirectUrl.searchParams.set("notes", reviewNotes);
  }

  return NextResponse.redirect(redirectUrl, 303);
}
