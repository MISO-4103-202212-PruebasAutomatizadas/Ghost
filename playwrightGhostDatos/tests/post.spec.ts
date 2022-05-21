import { test, expect, Page } from '@playwright/test'
import { config } from '../properties.js';
import { postDataPool } from '../datapools/post.datapool';
var Mockaroo = require('mockaroo');
import { faker } from '@faker-js/faker'
import { emailInput, passwInput, signInButton, dashboardHeader } from '../pages_objects/login.page';
import { postsMenu } from '../pages_objects/dashboard.page';
import { newPostButton } from '../pages_objects/post.page';
import { titleTextarea, descEditor, publishMenuButton, publishButton, publishConfirmButton, 
  publishConfirmMessage, publishErrorMessage, settingsMenuButton, postUrlInput } 
  from '../pages_objects/post_edit.page';

const userAdmin = config.userAdmin;
const adminPass = config.adminPass;
let postDataPoolPsAl = [];

test.beforeEach(async ({ page }) => {

  /** DataPool Pseudo aleatorio: schema Mockaroo */
  var client = new Mockaroo.Client({
    apiKey: config.mockarooPostApiKey
  })
 
  client.generate({
    count: config.mockarooPostCount,
    schema: config.mockarooPostSchema
  }).then(function(records) {
    postDataPoolPsAl = records;
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

test.describe('Feature 1: Validación de datos al crear y publicar Posts', () => {
  test('Scenario: 1. Crear post con titulo y descripcion vacios', async ({ page }) => {
    console.log(
      "  When I create a Post with <postTitle> and <postDesc> empty");
    await page.click(postsMenu);
    await page.click(newPostButton);
    await page.fill(titleTextarea, "");
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Backspace');
    console.log("    Create post success");

    console.log("  And I publish a Post");
    await page.click(publishMenuButton);
    await page.click(publishButton);
    await page.click(publishConfirmButton);
    await expect(page.locator(publishConfirmMessage)).toHaveText(['Published']);
    await page.screenshot({path: config.pathReports + './1.1-postTitleVacio.png'});
    console.log("    Publish post success");
  });

  postDataPool.title.valid.forEach((title, index) => {
    test(`Scenario: 2. Crear post con titulo válido: ${title}`, async ({ page }) => {
      console.log(
        "  When I create a Post with <postTitle> and <postDesc> empty");
      await page.click(postsMenu);
      await page.click(newPostButton);
      await page.fill(titleTextarea, title);
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Backspace');
      console.log(`    Create post success with title = ${title} `);

      console.log("  And I publish a Post");
      await page.click(publishMenuButton);
      await page.click(publishButton);
      await page.click(publishConfirmButton);
      await expect(page.locator(publishConfirmMessage)).toHaveText(['Published']);
      await page.screenshot({path: `${config.pathReports}/1.2-postTitleValido-${index}.png`});
      
      console.log("    Publish post success");
    });
  });

  test(`Scenario: 3. Crear post con titulo inválido`, async ({ page }) => {
    console.log(
      "  When I create a Post with <postTitle> and <postDesc> empty");
    await page.click(postsMenu);
    await page.click(newPostButton);
    await page.fill(titleTextarea, "valid");
    await page.keyboard.press('Tab');
    await page.keyboard.press('Shift+Tab');
    await page.fill(titleTextarea, faker.datatype.string(2010));
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Backspace');
    console.log(`    Create post success with invalid title `);

    console.log("  And I publish a Post");
    await page.click(publishMenuButton);
    await page.click(publishButton);
    await page.click(publishConfirmButton);
    await expect(page.locator(publishErrorMessage)).toContainText(['Title cannot be longer than 255 characters']);
    await page.screenshot({path: `${config.pathReports}/1.3-postTitleInvalido.png`});
    
    console.log("    success: not published");
  });

  test('Scenario 4.  Crear post con url válida', async ({ page }) => {
    console.log(
      "  When I create a Post with <postTitle> and <postDesc> empty");
    await page.click(postsMenu);
    await page.click(newPostButton);
    await page.fill(titleTextarea, postDataPoolPsAl[0]['postValidTitle']);
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Backspace');
    console.log("    Create post success");
    await page.click(settingsMenuButton);
    await page.type(postUrlInput,postDataPoolPsAl[0]['postValidUrl']);

    console.log("  And I publish a Post");
    await page.click(publishMenuButton);
    await page.click(publishButton);
    await page.click(publishConfirmButton);
    await expect(page.locator(publishConfirmMessage)).toHaveText(['Published']);
    await page.screenshot({path: config.pathReports + './1.4-postUrlValida.png'});
    console.log("    Publish post success");
  });

  test('Scenario 5.  Crear post con url vacia', async ({ page }) => {
    console.log(
      "  When I create a Post with <postUrl> empty");
    await page.click(postsMenu);
    await page.click(newPostButton);
    await page.fill(titleTextarea, postDataPoolPsAl[0]['postValidTitle']);
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Backspace');
    console.log("    Create post success");
    await page.click(settingsMenuButton);
    await page.fill(postUrlInput,'');

    console.log("  And I publish a Post");
    await page.click(publishMenuButton);
    await page.click(publishButton);
    await page.click(publishConfirmButton);
    await expect(page.locator(publishErrorMessage)).toBeVisible();
    await page.screenshot({path: config.pathReports + './1.5-postUrlVacia.png'});
    console.log("    Publish post success");
  });


/* 

  postDataPool.title.invalid.forEach((invalidTitle, index) => {
    test(`Scenario: 50. Crear post con url válida: ${invalidTitle}`, async ({ page }) => {
      console.log(
        "  When I create a Post with <postTitle> and <postDesc> vacios");
      await page.click(postsMenu);
      await page.click(newPostButton);
      await page.fill(titleTextarea, "valid");
      await page.keyboard.press('Tab');
      await page.keyboard.press('Shift+Tab');
      await page.fill(titleTextarea, invalidTitle);
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Backspace');
      console.log(`    Create post success with title = ${invalidTitle} `);

      console.log("  And I publish a Post");
      await page.click(publishMenuButton);
      await page.click(publishButton);
      await page.click(publishConfirmButton);
      await expect(page.locator(publishErrorMessage)).toContainText(['Title cannot be longer than 255 characters']);
      await page.screenshot({path: `${config.pathReports}/1.3-postTitleInvalido-${index}.png`});
      
      console.log("    success: not published");
    });
  });

  test('Scenario 51. Crear post con titulo inválido 2', async ({ request }) => {
    console.log(`test mockaroo... `);
    console.log(postDataPoolPsAl[0]['postInvalidTitle']);
  });

  test('Scenario 52. Crear post con titulo inválido 3', async ({ request }) => {
    console.log(`test faker ... `);
    console.log(faker.datatype.string(2010));
  }); */
});

faker