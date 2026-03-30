import { NextResponse } from "next/server";

function readText(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  const formData = await request.formData();
  const companyName = readText(formData, "companyName");
  const contactEmail = readText(formData, "contactEmail");
  const pdf = formData.get("profilePdf");

  const redirectUrl = new URL("/signup/sponsor", request.url);

  if (!companyName || !contactEmail || !(pdf instanceof File) || !pdf.name) {
    redirectUrl.searchParams.set("error", "missing-fields");
    return NextResponse.redirect(redirectUrl, 303);
  }

  redirectUrl.searchParams.set("success", "pdf-uploaded");
  redirectUrl.searchParams.set("company", companyName);
  redirectUrl.searchParams.set("email", contactEmail);
  redirectUrl.searchParams.set("file", pdf.name);

  return NextResponse.redirect(redirectUrl, 303);
}
