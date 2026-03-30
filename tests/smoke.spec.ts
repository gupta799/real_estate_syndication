import { expect, test } from "@playwright/test";

test("homepage shows simplified MVP messaging", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", {
      name: "Compare syndicators by what they actually did before you talk to them.",
    }),
  ).toBeVisible();
  await expect(page.getByText("Three simple jobs")).toBeVisible();
  await expect(page.getByRole("link", { name: "Explore sponsors" })).toBeVisible();
});

test("syndications page shows published sponsor profiles", async ({ page }) => {
  await page.goto("/syndications");

  await expect(
    page.getByRole("heading", { name: "Historical sponsor profiles" }),
  ).toBeVisible();
  await expect(page.getByRole("link", { name: "View profile" }).first()).toBeVisible();
  await expect(page.getByText("Ridge Capital Partners")).toBeVisible();
});

test("profile detail form can submit an intro request in demo mode", async ({
  page,
}) => {
  await page.goto("/syndications/ridge-capital-partners");

  await page.getByLabel("Full name").fill("Test Investor");
  await page.getByLabel("Email").fill("test@example.com");
  await page
    .getByLabel("Message")
    .fill("Would like an introduction and more detail on historical reporting.");
  await page.getByRole("button", { name: "Request intro" }).click();

  await expect(page).toHaveURL(/success=intro-requested/);
  await expect(page.getByText("Request received.")).toBeVisible();
});

test("public sponsor PDF submission shows mocked parsed results", async ({ page }) => {
  await page.goto("/signup/sponsor");

  await page.getByLabel("Company name").fill("Atlas Equity");
  await page.getByLabel("Contact email").fill("team@atlas.example");
  await page.getByLabel("Sponsor track record PDF").setInputFiles({
    name: "atlas-sponsor-profile.pdf",
    mimeType: "application/pdf",
    buffer: Buffer.from("%PDF-1.4 mock sponsor pdf"),
  });
  await page.getByRole("button", { name: "Upload PDF" }).click();

  await expect(page).toHaveURL(/success=pdf-uploaded/);
  await expect(page.getByText("Mock parsed profile")).toBeVisible();
  await expect(page.getByText("Atlas Sponsor Profile")).toBeVisible();
  await expect(page.getByText("Mock profile parsed successfully")).not.toHaveCount(0);
});

test("admin page shows manual moderation queues", async ({ page }) => {
  await page.goto("/admin");

  await expect(page.getByRole("heading", { name: /review sponsor profiles and recent investor introductions/i })).toBeVisible();
  await expect(page.getByText("Profiles awaiting review")).toBeVisible();
  await expect(page.getByText("Juniper Capital Management")).toBeVisible();
  await expect(page.getByText("Latest intro requests")).toBeVisible();
});
