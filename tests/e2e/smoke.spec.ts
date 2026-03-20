import { test, expect } from "@playwright/test";

test("loads /portfolio", async ({ page }) => {
  await page.goto("/portfolio");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
});

test("submits contact form", async ({ page }) => {
  await page.route("**/api/contact", async (route) => {
    await route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ ok: true }) });
  });

  await page.goto("/portfolio/contact");
  await page.getByLabel("Email").fill("hello@example.com");
  await page.getByLabel("Message").fill("Hello there this is a test message");
  await page.getByRole("button", { name: "Send message" }).click();

  await expect(page.getByText("Sent. I'll reply soon.")).toBeVisible();
});
