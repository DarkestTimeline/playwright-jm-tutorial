import { test, expect } from '@playwright/test';
import { resolve } from 'path';

test('test', async ({ page }) => {
  await page.goto('https://mercadolibre.com/');
  await page.getByRole('link', { name: 'Honduras' }).click();
  await page.getByPlaceholder('Buscar productos, marcas y má').click();
  await page.getByPlaceholder('Buscar productos, marcas y má').fill('iphone 15 Pro');
  await page.getByPlaceholder('Buscar productos, marcas y má').press('Enter');
  await page.getByRole('link', { name: 'Promo Del Mes Apple iPhone 13 Pro Max 256gb Unlocked.' }).click();
  await page.getByRole('button', { name: 'Comprar ahora' }).click();
});

test('test2', async ({ page }) => {
  await page.goto('https://mercadolibre.com/');
  await page.getByRole('link', { name: 'Honduras' }).click();
  //await page.getByRole('link', { name: 'Mis Compras' }).click();
  await page.getByRole('link', { name: 'Ingresa', exact:true }).click();
  await new Promise(resolve => setTimeout(resolve, 3000));
});