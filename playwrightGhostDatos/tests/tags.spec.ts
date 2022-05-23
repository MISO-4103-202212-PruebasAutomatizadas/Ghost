import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";

import { config } from "../properties.js";
import { tagsDataPool } from "../datapools/tags.datapool";

import { emailInput, passwInput, signInButton } from "../pages_objects/login.page";
import { tagsMenu } from "../pages_objects/dashboard.page";
import { newTagButton } from "../pages_objects/tags.page";
import {
  nameInput,
  descriptionInput,
  metadataButton,
  twitterCardButton,
  saveButton,
  errorMessage,
  metadataTitleInput,
  metadataDescriptionInput,
  metadataCanonicalUrlInput,
  twitterTitleInput,
  twitterDescriptionInput,
  metadataTitleError,
  metadataDescriptionError,
  metadataCanonicalUrlError,
  twitterError,
} from "../pages_objects/tags_new.page";

var Mockaroo = require("mockaroo");
const userAdmin = config.userAdmin;
const adminPass = config.adminPass;
let tagsDataPoolPsAl = [];

test.beforeAll(() => {
  var client = new Mockaroo.Client({ apiKey: config.mockarooPostApiKey, });
  client.generate({ count: config.mockarooPostCount, schema: config.mockarooPostSchema, })
    .then(function (records) {
      tagsDataPoolPsAl = records;
    });
});

test.beforeEach(async ({ page }) => {
  faker.seed(config.fakerSeed);

  await page.goto(config.urlAdmin);
  await page.type(emailInput, userAdmin);
  await page.type(passwInput, adminPass);
  await page.click(signInButton);
  await new Promise(r => setTimeout(r, 4000));
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

    test(`Scenario: 5.0. Editar tag con nombre y descripcion vacio`, async ({ page }) => {
      console.log("Given I login on Ghost page with <userAdmin> and <adminPass>".padEnd(100, "_"));
      await page.click(tagsMenu);
      await page.click(newTagButton);

      var tagSlug = "";
      var tagDescription = "";

      console.log(`When I create a new tag with ${tagSlug} name and ${tagDescription} description`.padEnd(100, "_"));
      await page.type(nameInput, tagSlug);
      await page.type(descriptionInput, tagDescription);
      await page.click(saveButton);

      console.log("Then I wait for 1 seconds".padEnd(100, "_"));
      await new Promise(r => setTimeout(r, 1000));

      console.log(`And I update a tag with "${tagSlug}" name and "${tagDescription}" description`);
      await page.type(nameInput, tagSlug);
      await page.type(descriptionInput, tagDescription);

      await page.click(saveButton);

      await expect(page.locator(errorMessage)).toHaveText(['You must specify a name for the tag.']);

      console.log("Then I wait for 1 seconds".padEnd(100, "_"))
      await new Promise(r => setTimeout(r, 1000));
    });

    test(`Scenario: 5.1. Editar tag con nombre aleatorio no válido`, async ({ page }) => {
      console.log("Given I login on Ghost page with <userAdmin> and <adminPass>".padEnd(100, "_"));
      await page.click(tagsMenu);
      await page.click(newTagButton);

      var tagSlug = faker.datatype.string(192);
      var tagDescription = faker.datatype.string(192);

      console.log(`When I create a new tag with ${tagSlug} name and ${tagDescription} description`.padEnd(100, "_"));
      await page.type(nameInput, tagSlug);
      await page.type(descriptionInput, tagDescription);
      await page.click(saveButton);

      console.log("Then I wait for 1 seconds".padEnd(100, "_"));
      await new Promise(r => setTimeout(r, 1000));

      console.log(`And I update a tag with ${tagSlug} slug and ${tagDescription} description`);
      await page.type(nameInput, tagSlug);
      await page.type(descriptionInput, tagDescription);

      await page.click(saveButton);

      await expect(page.locator(errorMessage)).toHaveText(['Tag names cannot be longer than 191 characters.']);
      console.log("Then I wait for 1 seconds".padEnd(100, "_"))
      await new Promise(r => setTimeout(r, 1000));
    });

    test("Scenario: 6.0. Creación exitosa de un tag con metadata-title", async ({ page, }) => {
      console.log("Given I login on Ghost page with <userAdmin> and <adminPass>".padEnd(100, "_"));
      await page.click(tagsMenu);
      await page.click(newTagButton);

      console.log(`When I create a new tag with tag_1 name and "description_tag_1" description`.padEnd(100, "_"));
      await page.type(nameInput, "tag_1");
      await page.type(descriptionInput, "description_tag_1");

      await page.click(metadataButton);
      await page.type(metadataTitleInput, tagsDataPoolPsAl[0]['metaDataTitleValid']);
      await page.screenshot({ path: config.pathReports + "./create_tag_metadata-title_success.png", });

      await page.click(saveButton);

      console.log("Then I wait for 1 seconds".padEnd(100, "_"));
      await new Promise(r => setTimeout(r, 1000));
    });

    test("Scenario: 6.1. Creación exitosa de un tag con metadata-description", async ({ page, }) => {
      console.log("Given I login on Ghost page with <userAdmin> and <adminPass>".padEnd(100, "_"));
      await page.click(tagsMenu);
      await page.click(newTagButton);

      console.log(`When I create a new tag with tag_1 name and "description_tag_1" description`.padEnd(100, "_"));
      await page.type(nameInput, "tag_1");
      await page.type(descriptionInput, "description_tag_1");

      await page.click(metadataButton);
      await page.type(metadataDescriptionInput, tagsDataPoolPsAl[0]['metaDataDescValid']);
      await page.screenshot({ path: config.pathReports + "./create_tag_metadata-description_success.png", });

      await page.click(saveButton);

      console.log("Then I wait for 1 seconds".padEnd(100, "_"));
      await new Promise(r => setTimeout(r, 1000));
    });

    test("Scenario: 6.2. Creación exitosa de un tag con metadata-url", async ({ page, }) => {
      console.log("Given I login on Ghost page with <userAdmin> and <adminPass>".padEnd(100, "_"));
      await page.click(tagsMenu);
      await page.click(newTagButton);

      console.log(`When I create a new tag with tag_1 name and "description_tag_1" description`.padEnd(100, "_"));
      await page.type(nameInput, "tag_1");
      await page.type(descriptionInput, "description_tag_1");

      await page.click(metadataButton);
      await page.type(metadataCanonicalUrlInput, "https://www.google.com");
      await page.screenshot({ path: config.pathReports + "./create_tag_metadata-url_success.png", });

      await page.click(saveButton);

      console.log("Then I wait for 1 seconds".padEnd(100, "_"));
      await new Promise(r => setTimeout(r, 1000));
    });

    tagsDataPool.metadataTitle.valid.forEach((title, index) => {
      test(`Scenario: 7.${index}. Creación exitosa de un tag con metadata-title`, async ({ page, }) => {
        console.log("Given I login on Ghost page with <userAdmin> and <adminPass>".padEnd(100, "_"));
        await page.click(tagsMenu);
        await page.click(newTagButton);

        console.log(`When I create a new tag with tag_1 name and "description_tag_1" description`.padEnd(100, "_"));
        await page.type(nameInput, "tag_1");
        await page.type(descriptionInput, "description_tag_1");

        await page.click(metadataButton);
        await page.type(metadataTitleInput, title);
        await page.screenshot({ path: config.pathReports + `./create_tag_metadata-title_${index}_success.png`, });

        await page.click(saveButton);

        console.log("Then I wait for 1 seconds".padEnd(100, "_"));
        await new Promise(r => setTimeout(r, 1000));
      });
    });

    tagsDataPool.metadataTitle.invalid.forEach((title, index) => {
      test(`Scenario: 8.${index}. Creación fallida de un tag con metadata-title`, async ({ page, }) => {
        console.log("Given I login on Ghost page with <userAdmin> and <adminPass>".padEnd(100, "_"));
        await page.click(tagsMenu);
        await page.click(newTagButton);

        console.log(`When I create a new tag with tag_1 name and "description_tag_1" description`.padEnd(100, "_"));
        await page.type(nameInput, "tag_1");
        await page.type(descriptionInput, "description_tag_1");

        await page.click(metadataButton);
        await page.type(metadataTitleInput, title);

        await page.click(saveButton);

        await page.screenshot({ path: config.pathReports + `./create_tag_metadata-title_${index}_fail.png`, });
        await expect(page.locator(metadataTitleError)).toHaveText(['Meta Title cannot be longer than 300 characters.']);

        console.log("Then I wait for 1 seconds".padEnd(100, "_"));
        await new Promise(r => setTimeout(r, 1000));
      });
    });

    tagsDataPool.metadataDescription.valid.forEach((description, index) => {
      test(`Scenario: 9.${index}. Creación exitosa de un tag con metadata-description`, async ({ page, }) => {
        console.log("Given I login on Ghost page with <userAdmin> and <adminPass>".padEnd(100, "_"));
        await page.click(tagsMenu);
        await page.click(newTagButton);

        console.log(`When I create a new tag with tag_1 name and "description_tag_1" description`.padEnd(100, "_"));
        await page.type(nameInput, "tag_1");
        await page.type(descriptionInput, "description_tag_1");

        await page.click(metadataButton);
        await page.type(metadataTitleInput, "title");
        await page.type(metadataDescriptionInput, description);
        await page.screenshot({ path: config.pathReports + `./create_tag_metadata-description_${index}_success.png`, });

        await page.click(saveButton);

        console.log("Then I wait for 1 seconds".padEnd(100, "_"));
        await new Promise(r => setTimeout(r, 1000));
      });
    });

    tagsDataPool.metadataDescription.invalid.forEach((description, index) => {
      test(`Scenario: 10.${index}. Creación fallida de un tag con metadata-description`, async ({ page, }) => {
        console.log("Given I login on Ghost page with <userAdmin> and <adminPass>".padEnd(100, "_"));
        await page.click(tagsMenu);
        await page.click(newTagButton);

        console.log(`When I create a new tag with tag_1 name and "description_tag_1" description`.padEnd(100, "_"));
        await page.type(nameInput, "tag_1");
        await page.type(descriptionInput, "description_tag_1");

        await page.click(metadataButton);
        await page.type(metadataTitleInput, "title");
        await page.type(metadataDescriptionInput, description);

        await page.click(saveButton);

        await page.screenshot({ path: config.pathReports + `./create_tag_metadata-title_${index}_fail.png`, });
        await expect(page.locator(metadataDescriptionError)).toHaveText(['Meta Description cannot be longer than 500 characters.']);

        console.log("Then I wait for 1 seconds".padEnd(100, "_"));
        await new Promise(r => setTimeout(r, 1000));
      });
    });

    test(`Scenario: 11.${0}. Creación exitosa de un tag con metadata-canonical-url`, async ({ page, }) => {
      console.log("Given I login on Ghost page with <userAdmin> and <adminPass>".padEnd(100, "_"));
      await page.click(tagsMenu);
      await page.click(newTagButton);

      console.log(`When I create a new tag with tag_1 name and "description_tag_1" description`.padEnd(100, "_"));
      await page.type(nameInput, "tag_1");
      await page.type(descriptionInput, "description_tag_1");

      await page.click(metadataButton);
      await page.type(metadataTitleInput, "title");
      await page.type(metadataDescriptionInput, "description");
      await page.type(metadataCanonicalUrlInput, "https://www.google.com");

      await page.screenshot({ path: config.pathReports + `./create_tag_metadata-canonical-url_${0}_success.png`, });

      await page.click(saveButton);

      console.log("Then I wait for 1 seconds".padEnd(100, "_"));
      await new Promise(r => setTimeout(r, 1000));
    });


    test(`Scenario: 12. Creación fallida de un tag con metadata-canonical-url`, async ({ page, }) => {
      console.log("Given I login on Ghost page with <userAdmin> and <adminPass>".padEnd(100, "_"));
      await page.click(tagsMenu);
      await page.click(newTagButton);

      console.log(`When I create a new tag with tag_1 name and "description_tag_1" description`.padEnd(100, "_"));
      await page.type(nameInput, "tag_1");
      await page.type(descriptionInput, "description_tag_1");

      await page.click(metadataButton);
      await page.type(metadataTitleInput, "title");
      await page.type(metadataDescriptionInput, "description");

      await page.type(metadataCanonicalUrlInput, "test_url");

      await page.click(saveButton);

      await page.screenshot({ path: config.pathReports + `./create_tag_metadata-canonical-url_12_fail.png`, });
      await expect(page.locator(metadataCanonicalUrlError)).toHaveText(['The url should be a valid url']);

      console.log("Then I wait for 1 seconds".padEnd(100, "_"));
      await new Promise(r => setTimeout(r, 1000));
    });

    tagsDataPool.twitterTitle.valid.forEach((title, index) => {
      test(`Scenario: 13.${index}. Creación exitosa de un tag con twitter-title`, async ({ page, }) => {
        console.log("Given I login on Ghost page with <userAdmin> and <adminPass>".padEnd(100, "_"));
        await page.click(tagsMenu);
        await page.click(newTagButton);

        console.log(`When I create a new tag with tag_1 name and "description_tag_1" description`.padEnd(100, "_"));
        await page.type(nameInput, "tag_1");
        await page.type(descriptionInput, "description_tag_1");

        await page.click(twitterCardButton);
        await page.type(twitterTitleInput, title);
        await page.screenshot({ path: config.pathReports + `./create_tag_twiiter_title_${index}_success.png`, });

        await page.click(saveButton);

        console.log("Then I wait for 1 seconds".padEnd(100, "_"));
        await new Promise(r => setTimeout(r, 1000));
      });
    });

    tagsDataPool.twitterDescription.valid.forEach((description, index) => {
      test(`Scenario: 14.${index}. Creación exitosa de un tag con twitter-description valido`, async ({ page, }) => {
        console.log("Given I login on Ghost page with <userAdmin> and <adminPass>".padEnd(100, "_"));
        await page.click(tagsMenu);
        await page.click(newTagButton);

        console.log(`When I create a new tag with tag_1 name and "description_tag_1" description`.padEnd(100, "_"));
        await page.type(nameInput, "tag_1");
        await page.type(descriptionInput, "description_tag_1");

        await page.click(twitterCardButton);
        await page.type(twitterTitleInput, "title");
        await page.type(twitterDescriptionInput, description);
        await page.click(saveButton);

        await page.screenshot({ path: config.pathReports + `./create_tag_twitter-description-url_14.${index}.png`, });

        console.log("Then I wait for 1 seconds".padEnd(100, "_"));
        await new Promise(r => setTimeout(r, 1000));
      });
    });
  }
);

faker;
