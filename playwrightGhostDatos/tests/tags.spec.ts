import { test, expect, Page } from "@playwright/test";
import { faker } from "@faker-js/faker";

import { config } from "../properties.js";
import { tagsDataPool } from "../datapools/tags.datapool";

import { emailInput, passwInput, signInButton } from "../pages_objects/login.page";
import { tagsMenu } from "../pages_objects/dashboard.page";
import { newTagButton } from "../pages_objects/tags.page";
import { nameInput, descriptionInput, saveButton, errorMessage } from "../pages_objects/tags_new.page";

var Mockaroo = require("mockaroo");

import {
  titleTextarea,
  descEditor,
  publishMenuButton,
  publishButton,
  publishConfirmButton,
  publishConfirmMessage,
  publishErrorMessage,
  settingsMenuButton,
  postUrlInput,
} from "../pages_objects/post_edit.page";



const userAdmin = config.userAdmin;
const adminPass = config.adminPass;
let postDataPoolPsAl = [];

test.beforeEach(async ({ page }) => {
  faker.seed(config.fakerSeed);

  // var client = new Mockaroo.Client({ apiKey: config.mockarooPostApiKey, });
  // client.generate({ count: config.mockarooPostCount, schema: config.mockarooPostSchema, })
  //   .then(function (records) { postDataPoolPsAl = records; });  

  await page.goto(config.urlAdmin);
  await page.type(emailInput, userAdmin);
  await page.type(passwInput, adminPass);
  await page.click(signInButton);
  await new Promise(r => setTimeout(r, 2000));
  await expect(page.locator('ul.gh-nav-main li a[title="Dashboard"]')).toHaveText(["Dashboard"]);
});

test.describe(
  "Feature: Gestion de tags en ghost", () => {
    test("Scenario: 1. Creación de un tag exitoso", async ({ page, }) => {
      console.log("Given I login on Ghost page with <userAdmin> and <adminPass>".padEnd(100, "_"));
      await page.click(tagsMenu);
      await page.click(newTagButton);

      console.log(`When I create a new tag with tag_1 name and "description_tag_1" description`.padEnd(100, "_"));
      await page.type(nameInput, "tag_1");
      await page.type(descriptionInput, "description_tag_1");
      await page.click(saveButton);

      console.log("Then I wait for 1 seconds".padEnd(100, "_"));
      await new Promise(r => setTimeout(r, 1000));
      await page.screenshot({ path: config.pathReports + "./create_tag_success.png", });
    });

    test("Scenario: 2. Creación de un tag con nombre y descripcion vacio", async ({ page, }) => {
      console.log("Given I login on Ghost page with <userAdmin> and <adminPass>".padEnd(100, "_"));

      await page.click(tagsMenu);
      await page.click(newTagButton);

      console.log(`When I create a new tag with "" name and "" description`.padEnd(100, "_"));
      await page.type(nameInput, "");
      await page.type(descriptionInput, "");
      await page.click(saveButton);

      console.log("Then I wait for 1 seconds".padEnd(100, "_"));
      await new Promise(r => setTimeout(r, 1000));
      await page.screenshot({ path: config.pathReports + "./create_tag_error.png", });
      await expect(page.locator(errorMessage)).toHaveText(['You must specify a name for the tag.']);
    });

    tagsDataPool.name.valid.forEach((name, index) => {
      test(`Scenario: 3.${index}. Crear tag con nombre válido: ${name}`, async ({ page }) => {
        console.log("Given I login on Ghost page with <userAdmin> and <adminPass>".padEnd(100, "_"));

        await page.click(tagsMenu);
        await page.click(newTagButton);

        console.log(`When I create a new tag with "${name}" name and "description_tag_3.${index}" description`.padEnd(100, "_"));
        await page.type(nameInput, name);
        await page.type(descriptionInput, `description_tag_3.${index}`);
        await page.click(saveButton);

        console.log("Then I wait for 1 seconds".padEnd(100, "_"));
        await new Promise(r => setTimeout(r, 1000));

        await page.screenshot({ path: config.pathReports + `./create_tag_success_3.${index}.png`, });
      });
    });

    tagsDataPool.name.invalid.forEach((name, index) => {
      test(`Scenario: 4.${index}. Crear tag con nombre no válido: ${name}`, async ({ page }) => {
        console.log("Given I login on Ghost page with <userAdmin> and <adminPass>".padEnd(100, "_"));

        await page.click(tagsMenu);
        await page.click(newTagButton);

        console.log(`When I create a new tag with "${name}" name and "description_tag_4.${index}" description`.padEnd(100, "_"));
        await page.type(nameInput, name);
        await page.type(descriptionInput, `description_tag_4.${index}`);
        await page.click(saveButton);

        console.log("Then I wait for 1 seconds".padEnd(100, "_"));
        await new Promise(r => setTimeout(r, 1000));

        await page.screenshot({ path: config.pathReports + `./create_tag_success_4.${index}.png`, });
        await expect(page.locator(errorMessage)).toHaveText(['Tag names cannot be longer than 191 characters.']);
      });
    });

    test(`Scenario: 5.0. Crear tag con nombre no válido: ${name}`, async ({ page }) => {
      console.log("Given I login on Ghost page with <userAdmin> and <adminPass>".padEnd(100, "_"));

    });


    // test("Scenario 4.  Crear post con url válida", async ({ page }) => {
    //   console.log(
    //     "  When I create a Post with <postTitle> and <postDesc> empty"
    //   );
    //   await page.click(postsMenu);
    //   await page.click(newPostButton);
    //   await page.fill(titleTextarea, postDataPoolPsAl[0]["postValidTitle"]);
    //   await page.keyboard.press("Tab");
    //   await page.keyboard.press("Tab");
    //   await page.keyboard.press("Backspace");
    //   console.log("    Create post success");
    //   await page.click(settingsMenuButton);
    //   await page.type(postUrlInput, postDataPoolPsAl[0]["postValidUrl"]);

    //   console.log("  And I publish a Post");
    //   await page.click(publishMenuButton);
    //   await page.click(publishButton);
    //   await page.click(publishConfirmButton);
    //   await expect(page.locator(publishConfirmMessage)).toHaveText([
    //     "Published",
    //   ]);
    //   await page.screenshot({
    //     path: config.pathReports + "./1.4-postUrlValida.png",
    //   });
    //   console.log("    Publish post success");
    // });

    // test("Scenario 5.  Crear post con url vacia", async ({ page }) => {
    //   console.log("  When I create a Post with <postUrl> empty");
    //   await page.click(postsMenu);
    //   await page.click(newPostButton);
    //   await page.fill(titleTextarea, postDataPoolPsAl[0]["postValidTitle"]);
    //   await page.keyboard.press("Tab");
    //   await page.keyboard.press("Tab");
    //   await page.keyboard.press("Backspace");
    //   console.log("    Create post success");
    //   await page.click(settingsMenuButton);
    //   await page.fill(postUrlInput, "");

    //   console.log("  And I publish a Post");
    //   await page.click(publishMenuButton);
    //   await page.click(publishButton);
    //   await page.click(publishConfirmButton);
    //   await expect(page.locator(publishErrorMessage)).toBeVisible();
    //   await page.screenshot({
    //     path: config.pathReports + "./1.5-postUrlVacia.png",
    //   });
    //   console.log("    Publish post success");
    // });
  }
);

faker;
