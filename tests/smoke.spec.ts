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

test("sponsor dashboard supports simplified listing submission", async ({ page }) => {
  await page.goto("/dashboard/sponsor");

  await page.getByLabel("Deal name").fill("Canal Point");
  await page.getByLabel("City").fill("Dallas");
  await page.getByLabel("State").fill("TX");
  await page
    .getByLabel("Summary")
    .fill("A lean test listing for the sponsor submission workflow.");
  await page.getByLabel("Target IRR").fill("17");
  await page.getByLabel("Minimum investment").fill("50000");
  await page.getByRole("button", { name: "Submit for review" }).click();

  await expect(page).toHaveURL(/success=listing-submitted/);
  await expect(page.getByText("Listing submitted for admin review.")).toBeVisible();
});

test("admin page shows manual moderation queues", async ({ page }) => {
  await page.goto("/admin");

  await expect(page.getByRole("heading", { name: /review supply and recent investor interest/i })).toBeVisible();
  await expect(page.getByText("Listings awaiting review")).toBeVisible();
  await expect(page.getByText("Juniper Commons")).toBeVisible();
  await expect(page.getByText("Latest inquiries")).toBeVisible();
});
