import { expect, test } from "@playwright/test";

test("homepage shows simplified MVP messaging", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", {
      name: "A simpler place to browse live deals.",
    }),
  ).toBeVisible();
  await expect(page.getByText("Three simple jobs")).toBeVisible();
  await expect(page.getByRole("link", { name: "View listings" })).toBeVisible();
});

test("listings page shows published deals", async ({ page }) => {
  await page.goto("/listings");

  await expect(
    page.getByRole("heading", { name: "Live multifamily listings" }),
  ).toBeVisible();
  await expect(page.getByRole("link", { name: "Open listing" }).first()).toBeVisible();
  await expect(page.getByText("Oakline Residences")).toBeVisible();
});

test("listing detail form can submit an access request in demo mode", async ({
  page,
}) => {
  await page.goto("/listings/oakline-residences");

  await page.getByLabel("Full name").fill("Test Investor");
  await page.getByLabel("Email").fill("test@example.com");
  await page
    .getByLabel("Message")
    .fill("Interested in the sponsor track record and debt structure.");
  await page.getByRole("button", { name: "Request access" }).click();

  await expect(page).toHaveURL(/success=access-requested/);
  await expect(page.getByText("Request received.")).toBeVisible();
});

test("public sponsor PDF submission shows mocked parsed results", async ({ page }) => {
  await page.goto("/signup/sponsor");

  await page.getByLabel("Company name").fill("Atlas Equity");
  await page.getByLabel("Contact email").fill("team@atlas.example");
  await page.getByLabel("PDF teaser or OM").setInputFiles({
    name: "charlotte-garden-deal.pdf",
    mimeType: "application/pdf",
    buffer: Buffer.from("%PDF-1.4 mock sponsor pdf"),
  });
  await page.getByRole("button", { name: "Upload PDF" }).click();

  await expect(page).toHaveURL(/success=pdf-uploaded/);
  await expect(page.getByText("Mock parsed result")).toBeVisible();
  await expect(page.getByText("Charlotte Garden Deal")).toBeVisible();
  await expect(page.getByText("Mock parsed successfully")).not.toHaveCount(0);
});

test("admin page shows manual moderation queues", async ({ page }) => {
  await page.goto("/admin");

  await expect(page.getByRole("heading", { name: /review supply and recent investor interest/i })).toBeVisible();
  await expect(page.getByText("Listings awaiting review")).toBeVisible();
  await expect(page.getByText("Juniper Commons")).toBeVisible();
  await expect(page.getByText("Latest inquiries")).toBeVisible();
});
