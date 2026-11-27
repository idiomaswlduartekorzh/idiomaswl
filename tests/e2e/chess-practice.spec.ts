import { expect, test, type Page } from '@playwright/test';

const route = '/kids/ingles-ajedrez/practica/index.html';

async function playLine(page: Page, moves: string[]) {
  for (const code of moves) {
    await page.waitForFunction(
      expected => [...document.querySelectorAll<HTMLOptionElement>('#moveSelect option')].some(option => option.value === expected),
      code,
    );
    await page.locator('#moveSelect').selectOption(code);
    await page.getByRole('button', { name: 'Play move' }).click();
  }
  await expect(page.locator('#feedback')).toContainText('You completed');
}

test('the menu teaches an Italian and a Caro-Kann response, then returns to puzzles', async ({ page }) => {
  await page.goto(route);
  await expect(page.locator('#routeList button').first()).toBeVisible();

  await page.locator('[data-mode="opening"]').click();
  await expect(page.locator('#openingList button')).toHaveCount(7);
  await page.locator('#openingPicker').selectOption('italian-two-knights-attack');
  await expect(page.locator('#puzzleTitle')).toHaveText('Two Knights: attack f7');
  await page.locator('[data-opening="italian-quiet"]').click();
  await playLine(page, ['e2e4', 'g1f3', 'f1c4', 'c2c3', 'd2d3', 'e1g1', 'f1e1']);

  await page.locator('[data-family="caro"]').click();
  await expect(page.locator('#openingList button')).toHaveCount(8);
  await page.locator('#openingPicker').selectOption('caro-advance');
  await playLine(page, ['c7c6', 'd7d5', 'c8f5', 'e7e6', 'c6c5', 'b8c6']);
  await expect(page.locator('#openingStatus')).toContainText('1 of 8');

  await page.locator('#openingPicker').selectOption('caro-exchange');
  for (const code of ['c7c6', 'd7d5']) {
    await page.waitForFunction(expected => [...document.querySelectorAll<HTMLOptionElement>('#moveSelect option')].some(option => option.value === expected), code);
    await page.locator('#moveSelect').selectOption(code);
    await page.locator('#playMoveBtn').click();
  }
  await page.waitForFunction(() => [...document.querySelectorAll<HTMLOptionElement>('#moveSelect option')].some(option => option.value === 'c6d5'));
  await page.locator('#board svg rect.square[data-square="c6"]').click();
  await expect(page.locator('#boardOverlay .selected-square')).toHaveCount(1);
  await expect(page.locator('#boardOverlay .move-guide.capture')).toHaveCount(1);

  await page.locator('[data-mode="tactic"]').click();
  await expect(page.locator('#routeList button')).toHaveCount(9);
  await expect(page.locator('#puzzleTitle')).toContainText('Fork');
  await page.setViewportSize({ width: 390, height: 844 });
  await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBe(0);
});

test('the mobile site page expands the trainer so all variants stay reachable', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/kids/ingles-ajedrez/practica');
  const trainer = page.frameLocator('iframe');
  await trainer.locator('[data-mode="opening"]').click();
  await trainer.locator('[data-family="caro"]').click();
  await trainer.locator('[data-opening="caro-advance"]').click();
  await expect(trainer.locator('#puzzleTitle')).toHaveText('Advance Variation');
  await expect.poll(() => page.locator('iframe').evaluate(element => {
    const frame = element as HTMLIFrameElement;
    return frame.getBoundingClientRect().height >= (frame.contentDocument?.querySelector('.app')?.getBoundingClientRect().height ?? Infinity);
  })).toBe(true);
  await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBe(0);
});

test('narrow phones keep the mode cards and move controls readable', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 568 });
  await page.goto('/kids/ingles-ajedrez/practica');
  const trainer = page.frameLocator('iframe');
  await expect(trainer.locator('#puzzleTitle')).not.toHaveText('Loading your first position');

  const cardOverflow = await trainer.locator('.mode').evaluateAll(cards =>
    cards.map(card => card.scrollWidth - card.clientWidth),
  );
  expect(cardOverflow.every(value => value <= 0)).toBe(true);

  const moveControls = await trainer.locator('.move-input').evaluate(container => {
    const select = container.querySelector('select')!.getBoundingClientRect();
    const button = container.querySelector('button')!.getBoundingClientRect();
    return { selectWidth: select.width, buttonWidth: button.width, buttonBelow: button.top >= select.bottom };
  });
  expect(moveControls.buttonBelow).toBe(true);
  expect(moveControls.selectWidth).toBeGreaterThan(200);
  expect(moveControls.buttonWidth).toBeGreaterThan(200);

  await expect.poll(() => page.locator('iframe').evaluate(element => {
    const frame = element as HTMLIFrameElement;
    return frame.getBoundingClientRect().height >= (frame.contentDocument?.querySelector('.app')?.getBoundingClientRect().height ?? Infinity);
  })).toBe(true);
  await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)).toBe(0);
});
