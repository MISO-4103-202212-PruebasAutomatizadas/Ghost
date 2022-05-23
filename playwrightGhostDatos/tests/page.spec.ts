import { test, expect, Page } from '@playwright/test'
import { config } from '../properties.js';
import { pageDataPool } from '../datapools/page.datapool';
import { postDataPool } from '../datapools/post.datapool';
var Mockaroo = require('mockaroo');
import { faker } from '@faker-js/faker'
import { emailInput, passwInput, signInButton, dashboardHeader } from '../pages_objects/login.page';
import { postsMenu, pageMenu} from '../pages_objects/dashboard.page';
import { newPageButton } from '../pages_objects/page.page.js';
import { newPostButton } from '../pages_objects/post.page';
import { titleTextarea, publishMenuButton, publishButton, publishConfirmButton, publishConfirmMessage, publishErrorMessage, settingsMenuButton, pageUrlInput } from '../pages_objects/page_edit.page.js';
// import { titleTextarea, descEditor, publishMenuButton, publishButton, publishConfirmButton, 
//   publishConfirmMessage, publishErrorMessage, settingsMenuButton, postUrlInput } 
//   from '../pages_objects/post_edit.page';

const userAdmin = config.userAdmin;
const adminPass = config.adminPass;
let pageDataPoolPsAl = [];

test.beforeEach(async ({ page }) => {

  /** DataPool Pseudo aleatorio: schema Mockaroo */
  var client = new Mockaroo.Client({
    apiKey: config.mockarooPageApiKey
  })
 
  client.generate({
    count: config.mockarooPageCount,
    schema: config.mockarooPageSchema
  }).then(function(records) {
    pageDataPoolPsAl = records;
  });

  /** Datos aleatorios: Faker */
  faker.seed(config.fakerSeed);

  console.log(
    "  Given I go to Ghost Admin");
  await page.goto(config.urlAdmin);
  console.log(
    "  Given I login on Ghost page with <userAdmin> and <adminPass>");
  await page.type(emailInput, userAdmin);
  await page.type(passwInput, adminPass);
  await page.click(signInButton);
  await expect(page.locator('ul.gh-nav-main li a[title="Dashboard"]')).toHaveText(['Dashboard']);
});

test.describe('Feature 2: Validación de datos al crear y publicar Page', () => {
  test('Scenario: 1. Crear page con titulo y descripcion vacios', async ({ page }) => {
    console.log(
      "  When I create a page with <pageTitle> and <pageDesc> empty");
    await page.click(pageMenu);
    await page.click(newPageButton);
    await page.fill(titleTextarea, "");
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Backspace');
    console.log("    Create page success");

    console.log("  And I publish a page");
    await page.click(publishMenuButton);
    await page.click(publishButton);
    // await page.click(publishConfirmButton);
    await expect(page.locator(publishConfirmMessage)).toHaveText(['Published']);
    await page.screenshot({path: config.pathReports + './1.1-pageTitleVacio.png'});
    console.log("    Publish page success");
  });

  pageDataPool.title.valid.forEach((title, index) => {
    test(`Scenario: 2. Crear page con titulo válido: ${title}`, async ({ page }) => {
      console.log(
        "  When I create a page with <pageTitle> and <pageDesc> empty");
      await page.click(pageMenu);
      await page.click(newPageButton);
      await page.fill(titleTextarea, title);
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Backspace');
      console.log(`    Create page success with title = ${title} `);

      console.log("  And I publish a page");
      await page.click(publishMenuButton);
      await page.click(publishButton);
      // await page.click(publishConfirmButton);
      await expect(page.locator(publishConfirmMessage)).toHaveText(['Published']);
      await page.screenshot({path: `${config.pathReports}/1.2-pageTitleValido-${index}.png`});
      
      console.log("    Publish page success");
    });
  });

  test(`Scenario: 3. Crear page con titulo inválido`, async ({ page }) => {
    console.log(
      "  When I create a page with <pageTitle> and <pageDesc> empty");
    await page.click(pageMenu);
    await page.click(newPageButton);
    await page.fill(titleTextarea, "valid");
    await page.keyboard.press('Tab');
    await page.keyboard.press('Shift+Tab');
    await page.fill(titleTextarea, faker.datatype.string(2010));
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Backspace');
    console.log(`    Create page success with invalid title `);

    console.log("  And I publish a page");
    await page.click(publishMenuButton);
    await page.click(publishButton);
    // await page.click(publishConfirmButton);
    await expect(page.locator(publishErrorMessage)).toContainText(['Title cannot be longer than 255 characters']);
    await page.screenshot({path: `${config.pathReports}/1.3-pageTitleInvalido.png`});
    
    console.log("    success: not published");
  });

  test('Scenario 4.  Crear page con url válida', async ({ page }) => {
    console.log(
      "  When I create a page with <pageTitle> and <pageDesc> empty");
    await page.click(pageMenu);
    await page.click(newPageButton);
    await page.fill(titleTextarea, pageDataPoolPsAl[0]['pageValidTitle']);
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Backspace');
    console.log("    Create page success");
    await page.click(settingsMenuButton);
    await page.type(pageUrlInput,pageDataPoolPsAl[0]['pageValidUrl']);

    console.log("  And I publish a page");
    await page.click(publishMenuButton);
    await page.click(publishButton);
    // await page.click(publishConfirmButton);
    await expect(page.locator(publishConfirmMessage)).toHaveText(['Published']);
    await page.screenshot({path: config.pathReports + './1.4-pageUrlValida.png'});
    console.log("    Publish page success");
  });

  test('Scenario 5.  Crear page con url vacia', async ({ page }) => {
    console.log(
      "  When I create a page with <pageUrl> empty");
    await page.click(pageMenu);
    await page.click(newPageButton);
    await page.fill(titleTextarea, pageDataPoolPsAl[0]['pageValidTitle']);
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Backspace');
    console.log("    Create page success"); 
    await page.click(settingsMenuButton);
    await page.fill(pageUrlInput,'');

    console.log("  And I publish a page");
    await page.click(publishMenuButton);
    await page.click(publishButton);
    // await page.click(publishConfirmButton);
    await expect(page.locator(publishConfirmMessage)).toHaveText(['Published']);
    await page.screenshot({path: config.pathReports + './1.5-pageUrlVacia.png'});
    console.log("    Publish page success");
  });
});

