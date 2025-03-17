import { test, expect } from "@playwright/test";

test.describe("DataGrid Component", () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the example page
    await page.goto("/example");
  });

  test("should render the data grid with data", async ({ page }) => {
    // Check if the grid is rendered
    await expect(page.locator("table")).toBeVisible();

    // Check if headers are rendered
    await expect(page.getByText("Name")).toBeVisible();
    await expect(page.getByText("Email")).toBeVisible();
    await expect(page.getByText("Role")).toBeVisible();

    // Check if some data is rendered
    await expect(page.getByText("User 1")).toBeVisible();
    await expect(page.getByText("user1@example.com")).toBeVisible();
  });

  test("should sort data when clicking on column header", async ({ page }) => {
    // Get the first row text before sorting
    const firstRowTextBefore = await page
      .locator("tbody tr")
      .first()
      .innerText();

    // Click on the Name header to sort
    await page.getByText("Name").click();

    // Wait for sorting to complete
    await page.waitForTimeout(300);

    // Get the first row text after sorting
    const firstRowTextAfter = await page
      .locator("tbody tr")
      .first()
      .innerText();

    // Texts should be different after sorting
    expect(firstRowTextBefore).not.toEqual(firstRowTextAfter);

    // Click again to reverse sort
    await page.getByText("Name").click();

    // Wait for sorting to complete
    await page.waitForTimeout(300);

    // Get the first row text after reverse sorting
    const firstRowTextAfterReverse = await page
      .locator("tbody tr")
      .first()
      .innerText();

    // Text should be different after reverse sorting
    expect(firstRowTextAfter).not.toEqual(firstRowTextAfterReverse);
  });

  test("should filter data when using filter", async ({ page }) => {
    // Count initial number of rows
    const initialRowCount = await page.locator("tbody tr").count();

    // Click on filter button for Name column
    await page
      .locator("th")
      .filter({ hasText: "Name" })
      .getByRole("button")
      .click();

    // Type filter value
    await page.getByPlaceholder("Filter value...").fill("User 1");

    // Click Apply
    await page.getByText("Apply").click();

    // Wait for filtering to complete
    await page.waitForTimeout(300);

    // Count rows after filtering
    const filteredRowCount = await page.locator("tbody tr").count();

    // Should have fewer rows after filtering
    expect(filteredRowCount).toBeLessThan(initialRowCount);

    // Should only show rows with "User 1" in the name
    await expect(page.locator("tbody tr").first()).toContainText("User 1");

    // Clear filter
    await page
      .locator("th")
      .filter({ hasText: "Name" })
      .getByRole("button")
      .click();
    await page.getByText("Clear").click();

    // Wait for filtering to reset
    await page.waitForTimeout(300);

    // Count rows after clearing filter
    const resetRowCount = await page.locator("tbody tr").count();

    // Should have the same number of rows as initially
    expect(resetRowCount).toEqual(initialRowCount);
  });

  test("should paginate data", async ({ page }) => {
    // Get text of first row
    const firstRowTextPage1 = await page
      .locator("tbody tr")
      .first()
      .innerText();

    // Click next page button
    await page.getByRole("button").filter({ hasText: ">" }).click();

    // Wait for page change
    await page.waitForTimeout(300);

    // Get text of first row on second page
    const firstRowTextPage2 = await page
      .locator("tbody tr")
      .first()
      .innerText();

    // Should be different rows
    expect(firstRowTextPage1).not.toEqual(firstRowTextPage2);

    // Change page size
    await page.locator("select").selectOption("20");

    // Wait for page size change
    await page.waitForTimeout(300);

    // Should have more rows visible
    const rowCountAfterPageSizeChange = await page.locator("tbody tr").count();
    expect(rowCountAfterPageSizeChange).toEqual(20);
  });

  test("should select rows when clicking", async ({ page }) => {
    // Click on first row
    await page.locator("tbody tr").first().click();

    // First row should have selected class
    await expect(page.locator("tbody tr").first()).toHaveClass(/bg-primary/);

    // Click on second row
    await page.locator("tbody tr").nth(1).click();

    // Second row should have selected class
    await expect(page.locator("tbody tr").nth(1)).toHaveClass(/bg-primary/);

    // First row should still be selected
    await expect(page.locator("tbody tr").first()).toHaveClass(/bg-primary/);
  });

  test("should toggle dark mode", async ({ page }) => {
    // Check initial light mode
    await expect(page.locator("body")).not.toHaveClass("dark");

    // Click toggle button
    await page.getByText("Toggle Dark Mode").click();

    // Should switch to dark mode
    await expect(page.locator("body")).toHaveClass("dark");

    // Click toggle button again
    await page.getByText("Toggle Light Mode").click();

    // Should switch back to light mode
    await expect(page.locator("body")).not.toHaveClass("dark");
  });
});
