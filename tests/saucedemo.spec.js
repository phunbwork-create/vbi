const { test, expect } = require('@playwright/test');
const path = require('path');
const fs = require('fs');

const screenshotDir = 'C:/Users/Admin/.gemini/antigravity-ide/brain/e49cd61d-6eb5-4a02-b4b3-e3f5cfe78e44/screenshots';

if (!fs.existsSync(screenshotDir)) {
  fs.mkdirSync(screenshotDir, { recursive: true });
}

test('Saucedemo E2E Checkout Flow for T-Shirts under $30', async ({ page }) => {
  // 1. Access Saucedemo
  await page.goto('https://www.saucedemo.com/');
  await page.screenshot({ path: path.join(screenshotDir, '01_login_page.png') });

  // 2 & 3. Login
  await page.fill('#user-name', 'secret_sauce');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');

  const errorLocator = page.locator('[data-test="error"]');
  if (await errorLocator.isVisible({ timeout: 2000 }).catch(() => false)) {
    console.log('User "secret_sauce" failed. Switching to username "standard_user"...');
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'secret_sauce');
    await page.click('#login-button');
  }

  await expect(page).toHaveURL(/.*inventory.html/);
  await page.screenshot({ path: path.join(screenshotDir, '02_logged_in_inventory.png') });

  // 4. Find all products, filter T-shirt < $30 and add to cart
  const items = page.locator('.inventory_item');
  const count = await items.count();
  let addedCount = 0;

  for (let i = 0; i < count; i++) {
    const item = items.nth(i);
    const title = await item.locator('.inventory_item_name').innerText();
    const priceText = await item.locator('.inventory_item_price').innerText();
    const price = parseFloat(priceText.replace('$', ''));

    if (title.toLowerCase().includes('t-shirt') && price < 30) {
      console.log(`[ADD TO CART] ${title} - $${price}`);
      await item.locator('button:has-text("Add to cart")').click();
      addedCount++;
    }
  }

  await page.screenshot({ path: path.join(screenshotDir, '03_tshirts_added.png') });
  console.log(`Total T-Shirts (< $30) added: ${addedCount}`);
  expect(addedCount).toBeGreaterThan(0);

  // 5. Navigate to Shopping Cart
  await page.click('.shopping_cart_link');
  await expect(page).toHaveURL(/.*cart.html/);
  await page.screenshot({ path: path.join(screenshotDir, '04_shopping_cart.png') });

  // 6. Click Checkout & Fill Information
  await page.click('[data-test="checkout"]');
  await expect(page).toHaveURL(/.*checkout-step-one.html/);

  await page.fill('[data-test="firstName"]', 'Nguyen');
  await page.fill('[data-test="lastName"]', 'An');
  await page.fill('[data-test="postalCode"]', '100000');
  await page.screenshot({ path: path.join(screenshotDir, '05_checkout_info.png') });
  await page.click('[data-test="continue"]');

  // 7. Finish Checkout Overview
  await expect(page).toHaveURL(/.*checkout-step-two.html/);
  await page.screenshot({ path: path.join(screenshotDir, '06_checkout_overview.png') });
  await page.click('[data-test="finish"]');

  // 8. Assertion: Checkout Complete
  await expect(page).toHaveURL(/.*checkout-complete.html/);
  await page.screenshot({ path: path.join(screenshotDir, '07_checkout_complete.png') });

  const header = page.locator('.complete-header');
  await expect(header).toHaveText('Thank you for your order!');
  console.log('Checkout completed successfully!');
});
