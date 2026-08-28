import { expect, test, type Page } from "@playwright/test";

function collectRuntimeErrors(page: Page): string[] {
  const errors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  page.on("pageerror", (error) => errors.push(error.message));
  return errors;
}

test("keeps Ivo identity while switching compatible family and life stage", async ({ page }) => {
  test.setTimeout(30_000);
  await page.emulateMedia({ reducedMotion: "no-preference" });
  const runtimeErrors = collectRuntimeErrors(page);
  await page.goto("/modular-evolution-proof.html");

  const canvas = page.locator("canvas");
  await expect(page).toHaveTitle("Ivo | Modularer Evolutions-Proof");
  await expect(canvas).toBeVisible();
  await expect(page.getByRole("heading", { name: "Ivo bleibt Ivo." })).toBeVisible();
  await expect(page.locator(".modular-proof__module")).toHaveCount(7);
  await expect(page.locator("#modular-form")).toHaveText("Land · Jung");

  const landPixels = await canvas.screenshot();
  await page.getByRole("button", { name: /Wasser/ }).click();
  await expect(page.locator("#modular-form")).toHaveText("Wasser · Jung", { timeout: 5_000 });
  await expect(page.locator("#modular-module-list")).toContainText("Flossen");
  const waterPixels = await canvas.screenshot();
  expect(waterPixels.equals(landPixels)).toBe(false);

  await page.getByRole("button", { name: "Erwachsen" }).click();
  await expect(page.locator("#modular-form")).toHaveText("Wasser · Erwachsen", { timeout: 5_000 });
  expect(runtimeErrors).toEqual([]);
});

test("fits a small phone viewport without overflow", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  const runtimeErrors = collectRuntimeErrors(page);
  await page.goto("/modular-evolution-proof.html");

  await expect(page.locator("#modular-proof-state")).toHaveAttribute("data-status", "ready");
  await page.getByRole("button", { name: /Wasser/ }).click();
  await expect(page.locator("#modular-form")).toHaveText("Wasser · Jung");
  const overflow = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth
  }));
  expect(overflow.scrollWidth).toBeLessThanOrEqual(overflow.clientWidth);
  expect(runtimeErrors).toEqual([]);
});
