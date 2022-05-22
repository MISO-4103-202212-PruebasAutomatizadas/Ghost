import { test, expect, Page } from '@playwright/test'
import { config } from '../properties.js';
import { postDataPool } from '../datapools/post.datapool';
import Mockaroo from 'mockaroo'
//var Mockaroo = require('mockaroo');
import { faker } from '@faker-js/faker'
import { emailInput, passwInput, signInButton, dashboardHeader } from '../pages_objects/login.page';
import { postsMenu } from '../pages_objects/dashboard.page';
import { newPostButton } from '../pages_objects/post.page';
import { titleTextarea, descEditor, publishMenuButton, publishButton, publishConfirmButton, 
  publishConfirmMessage, publishErrorMessage, settingsMenuButton, postUrlInput, 
  schedulePublishRadio, scheduleDatePublishInput, scheduleTimePublishInput,
  showNotifications, showScheduleError, unpublishRadio, tagsInput, tagItemList,
  postAuthorInput, metaDataButton, metaDataTitleInput, metaDataRecomMessage, 
  metaDataDescInput, metaDataUrlInput, postExcerpt } 
  from '../pages_objects/post_edit.page';

const userAdmin = config.userAdmin;
const adminPass = config.adminPass;
let postDataPoolPsAl = [];

test.beforeAll(async () => {
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
})

test.beforeEach(async ({ page }) => {
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
      "  When I create a Post with <postTitle> empty");
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
        `  When I create a Post with <postTitle>`);
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
      "  When I create a Post with <postTitle> > 2000 characters");
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

  test(`Scenario: 4. Crear post titulo con caracteres especiales`, async ({ page }) => {
    console.log(
      `  When I create a Post with <postTitle>`);
    await page.click(postsMenu);
    await page.click(newPostButton);
    await page.fill(titleTextarea, postDataPoolPsAl[0]['postTitleSpecialChars']);
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Backspace');
    console.log(`    Create post success with title `);

    console.log("  And I publish a Post");
    await page.click(publishMenuButton);
    await page.click(publishButton);
    await page.click(publishConfirmButton);
    await expect(page.locator(publishConfirmMessage)).toHaveText(['Published']);
    await page.screenshot({path: `${config.pathReports}/1.4-postTitleSpecialChars.png`});
    
    console.log("    Publish post success");
  });

  test('Scenario: 5. Crear post con url válida', async ({ page }) => {
    console.log(
      "  When I create a Post with <postTitle> and <postUrl>");
    await page.click(postsMenu);
    await page.click(newPostButton);
    await page.fill(titleTextarea, postDataPoolPsAl[0]['postValidTitle']);
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Backspace');
    await page.click(settingsMenuButton);
    await page.type(postUrlInput,postDataPoolPsAl[0]['postValidUrl']);
    console.log("    Create post and set url success");

    console.log("  And I publish a Post");
    await page.click(publishMenuButton);
    await page.click(publishButton);
    await page.click(publishConfirmButton);
    await expect(page.locator(publishConfirmMessage)).toHaveText(['Published']);
    await page.screenshot({path: config.pathReports + './1.5-postUrlValida.png'});
    console.log("    Publish post success");
  });

  test('Scenario: 6. Crear post con url vacia', async ({ page }) => {
    console.log(
      "  When I create a Post with <postUrl> empty");
    await page.click(postsMenu);
    await page.click(newPostButton);
    await page.fill(titleTextarea, postDataPoolPsAl[0]['postValidTitle']);
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Backspace');
    await page.click(settingsMenuButton);
    await page.fill(postUrlInput,'');
    console.log("    Create post and set empty url success");

    console.log("  And I publish a Post");
    await page.click(publishMenuButton);
    await page.click(publishButton);
    await page.click(publishConfirmButton);
    await page.screenshot({path: config.pathReports + './1.6-postUrlVacia.png'});
    await expect(page.locator(publishErrorMessage)).toBeVisible();
    console.log("    success: not published");
  });

  postDataPool.url.invalid.forEach((urlName, index) => {
    test(`Scenario: 7. Crear post con url invalida por valor: ${urlName} (es invalida porque pertenece a un page)`, 
        async ({ page }) => {
      console.log(
        `  When I create a Post with <postTitle> and <urlName>`);
      await page.click(postsMenu);
      await page.click(newPostButton);
      await page.fill(titleTextarea, postDataPoolPsAl[0]['postValidTitle']);
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Backspace');
      await page.click(settingsMenuButton);
      await page.fill(postUrlInput,urlName);
      console.log("    Create post and set invalid url success");

      console.log("  And I publish a Post");
      await page.click(publishMenuButton);
      await page.click(publishButton);
      await page.click(publishConfirmButton);
      // se espera que automaticamente haya agregado un valor formato 'xxx-n'
      expect(page.inputValue(postUrlInput)).not.toEqual(urlName);
      await page.screenshot({path: `${config.pathReports}/1.7-postUrlInvalida-${index}.png`});
      
      console.log("    Publish post success");
    });
  });

  test(`Scenario: 8. Crear post con url invalida por longitud`, async ({ page }) => {
    console.log(
      "  When I create a Post with <postUrl> > 191 characters");
    await page.click(postsMenu);
    await page.click(newPostButton);
    await page.fill(titleTextarea, "valid");
    await page.keyboard.press('Tab');
    await page.keyboard.press('Shift+Tab');
    await page.fill(titleTextarea, postDataPoolPsAl[1]['postValidTitle']);
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Backspace');
    await page.click(settingsMenuButton);
    await page.fill(postUrlInput,faker.datatype.string(192));
    console.log("    Create post and set invalid url success");

    console.log("  And I publish a Post");
    await page.click(publishMenuButton);
    await page.click(publishButton);
    await page.click(publishConfirmButton);
    await page.screenshot({path: config.pathReports + './1.8-postUrlInvalida.png'});
    // se espera que arroje un error por exceder el límite de caracteres en bd
    await expect(page.locator(publishErrorMessage)).toBeVisible();
    console.log("    success: not published");
  });

  test('Scenario: 9. Programar publicación de post con fecha y hora valida', async ({ page }) => {
    console.log(
      "  When I create a Post with <postTitle>");
    await page.click(postsMenu);
    await page.click(newPostButton);
    await page.fill(titleTextarea, postDataPoolPsAl[2]['postValidTitle']);
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Backspace');
    console.log("    Create post success");

    console.log(
      "  And I schedule a Post to be published in <datetime> valid future");
    let date = new Date();
    date.setTime(date.getTime() + ((faker.datatype.number({min: 2, max: 1440}))*60*1000));
    let dateString = date.toJSON().slice(0,10);
    let timeString = date.toJSON().slice(11,16);
    await page.click(publishMenuButton);
    await new Promise(r => setTimeout(r, 1000));
    await page.click(schedulePublishRadio);
    await page.fill(scheduleDatePublishInput, '');
    await page.type(scheduleDatePublishInput, dateString);
    await page.keyboard.press('Tab');
    await page.fill(scheduleTimePublishInput, '');
    await page.type(scheduleTimePublishInput, timeString);
    await page.click(publishButton);
    await page.click(publishConfirmButton);

    await expect(page.locator(publishConfirmMessage)).toHaveText(['Scheduled']);
    await page.locator(showNotifications).screenshot({path: config.pathReports + './1.9-postScheduledPublish.png'});
    console.log("    Publish post success");
  });

  test(`Scenario: 10. Programar publicación de post con fecha y hora en el pasado: `, async ({ page }) => {
    console.log(
      "  When I create a Post with <postTitle>");
    await page.click(postsMenu);
    await page.click(newPostButton);
    await page.fill(titleTextarea, postDataPoolPsAl[3]['postValidTitle']);
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Backspace');
    console.log("    Create post success");

    console.log(
      "  And I schedule a Post to be published in <datetime> past");

    let date = faker.datatype.datetime({ 
      min: new Date().getTime() - (24*60*60*1000), 
      max: new Date().getTime()+(2*60*1000)}) // < 2 min en el futuro

    let dateString = date.toJSON().slice(0,10);
    let timeString = date.toJSON().slice(11,16);
    await page.click(publishMenuButton);
    await new Promise(r => setTimeout(r, 1000));
    await page.click(schedulePublishRadio);
    await page.fill(scheduleDatePublishInput, '');
    await page.type(scheduleDatePublishInput, dateString);
    await page.keyboard.press('Tab');
    await page.fill(scheduleTimePublishInput, '');
    await page.type(scheduleTimePublishInput, timeString);
    await page.click(publishButton);
    await expect(page.locator(showScheduleError)).toContainText(['Must be at least 2 mins in the future']);
    await page.screenshot({path: config.pathReports + `./1.10-postSchedulePublishInvalid.png`});
    console.log("    success: not published");
  });

  test(`Scenario: 11. Programar publicación de post con formato de fecha invalido: `, async ({ page }) => {
    console.log(
      "  When I create a Post with <postTitle>");
    await page.click(postsMenu);
    await page.click(newPostButton);
    await page.fill(titleTextarea, postDataPoolPsAl[3]['postValidTitle']);
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Backspace');
    console.log("    Create post success");

    console.log(
      "  And I schedule a Post to be published in <datetime> past");

    let date = faker.datatype.datetime({ 
      min: new Date().getTime() + (2*60*1000), 
      max: new Date().getTime() + (24*60*60*1000)}) 
    let dateString = postDataPoolPsAl[0]['postInvalidFormatDate'];
    let timeString = date.toJSON().slice(11,16);
    await page.click(publishMenuButton);
    await new Promise(r => setTimeout(r, 1000));
    await page.click(schedulePublishRadio);
    await page.fill(scheduleDatePublishInput, '');
    await page.type(scheduleDatePublishInput, dateString);
    await page.keyboard.press('Tab');
    await page.fill(scheduleTimePublishInput, '');
    await page.type(scheduleTimePublishInput, timeString);
    await page.click(publishButton);
    await expect(page.locator(showScheduleError)).toContainText(['Invalid date format, must be YYYY-MM-DD']);
    await page.screenshot({path: config.pathReports + `./1.11-postSchedulePublishInvalidDate.png`});
    console.log("    success: not published");
  });

  test('Scenario: 12. Programar/desprogramar/publicar post con fecha y hora invalida', async ({ page }) => {
    console.log(
      "  When I create a Post with <postTitle>");
    await page.click(postsMenu);
    await page.click(newPostButton);
    await page.fill(titleTextarea, postDataPoolPsAl[4]['postValidTitle']);
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Backspace');
    console.log("    Create post success");

    console.log(
      "  And I schedule a Post to be published in <datetime> valid future");
    let date = new Date();
    date.setTime(date.getTime() + ((faker.datatype.number({min: 2, max: 1440}))*60*1000));
    let dateString = date.toJSON().slice(0,10);
    let timeString = date.toJSON().slice(11,16);
    await page.click(publishMenuButton);
    await new Promise(r => setTimeout(r, 1000));
    await page.click(schedulePublishRadio);
    await page.fill(scheduleDatePublishInput, '');
    await page.type(scheduleDatePublishInput, dateString);
    await page.keyboard.press('Tab');
    await page.fill(scheduleTimePublishInput, '');
    await page.type(scheduleTimePublishInput, timeString);
    await page.click(publishButton);
    await page.click(publishConfirmButton);

    console.log(
      "  And I revert to draft");
    await page.click(publishMenuButton);
    await new Promise(r => setTimeout(r, 1000));
    date.setTime(date.getTime() + ((faker.datatype.number({min: 0, max: 2}))*60*1000));
    timeString = date.toJSON().slice(11,16);
    await page.click(unpublishRadio);
    await page.click(schedulePublishRadio);
    await page.fill(scheduleTimePublishInput, '');
    await page.type(scheduleTimePublishInput, timeString);
    await page.click(publishButton);
    await page.screenshot({path: config.pathReports + `./1.12-postSchedulePublishDraftInvalid.png`});
    await expect(page.locator(showScheduleError)).toContainText(['Must be at least 2 mins in the future']);
    console.log("    success: not published");
  });

  test(`Scenario: 13. Programar publicación de post con formato de hora invalido: `, async ({ page }) => {
    console.log(
      "  When I create a Post with <postTitle>");
    await page.click(postsMenu);
    await page.click(newPostButton);
    await page.fill(titleTextarea, postDataPoolPsAl[5]['postValidTitle']);
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Backspace');
    console.log("    Create post success");

    console.log(
      "  And I schedule a Post to be published in <datetime> past");

    let date = faker.datatype.datetime({ 
      min: new Date().getTime() + (2*60*1000), 
      max: new Date().getTime() + (24*60*60*1000)}) 
    let dateString = date.toJSON().slice(0,10);
    let timeString = postDataPoolPsAl[0]['postInvalidFormatTime'];
    await page.click(publishMenuButton);
    await new Promise(r => setTimeout(r, 1000));
    await page.click(schedulePublishRadio);
    await page.fill(scheduleDatePublishInput, '');
    await page.type(scheduleDatePublishInput, dateString);
    await page.keyboard.press('Tab');
    await page.fill(scheduleTimePublishInput, '');
    await page.type(scheduleTimePublishInput, timeString);
    await page.click(publishButton);
    await expect(page.locator(showScheduleError)).toContainText(['Must be in format']);
    await page.screenshot({path: config.pathReports + `./1.13-postSchedulePublishInvalidTime.png`});
    console.log("    success: not published");
  });

  test('Scenario: 14. Crear post con tag aleatorio válido', async ({ page }) => {
    console.log(
      "  When I create a Post with <postTitle>");
    await page.click(postsMenu);
    await page.click(newPostButton);
    await page.fill(titleTextarea, postDataPoolPsAl[6]['postValidTitle']);
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Backspace');

    console.log(
      "  And I add tag <validTag> to Post");
    await page.click(settingsMenuButton);
    await page.type(tagsInput, postDataPoolPsAl[6]['postValidTag']);

    console.log("  And I publish a Post");
    await page.click(publishMenuButton);
    await page.click(publishButton);
    await page.click(publishConfirmButton);
    await expect(page.locator(publishConfirmMessage)).toHaveText(['Published']);
    await page.screenshot({path: config.pathReports + './1.14-postTagValido.png'});
    console.log("    Publish post success");
  });

  test('Scenario: 15. Crear post con tag aleatorio inválido', async ({ page }) => {
    console.log(
      "  When I create a Post with <postTitle>");
    await page.click(postsMenu);
    await page.click(newPostButton);
    await page.fill(titleTextarea, postDataPoolPsAl[7]['postValidTitle']);
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Backspace');

    console.log(
      "  And I add tag <invalidTag> to Post");
    await page.click(settingsMenuButton);
    await page.type(tagsInput, faker.datatype.string(192));

    console.log("  And I publish a Post");
    await page.click(publishMenuButton);
    await page.click(publishButton);
    await page.click(publishConfirmButton);
    await page.screenshot({path: config.pathReports + './1.15-postTagInValido.png'});
    await expect(page.locator(publishErrorMessage)).toContainText(['Validation error, cannot edit post. Validation failed for name']);
    console.log("    success: not published");
  });

  test('Scenario: 16. Crear post con tag existente', async ({ page }) => {
    console.log(
      "  When I create a Post with <postTitle>");
    await page.click(postsMenu);
    await page.click(newPostButton);
    await page.fill(titleTextarea, postDataPoolPsAl[8]['postValidTitle']);
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Backspace');

    console.log(
      "  And I add tag <invalidTag> to Post");
    await page.click(settingsMenuButton);
    await page.click(tagsInput);
    await page.click(tagItemList);

    console.log("  And I publish a Post");
    await page.click(publishMenuButton);
    await page.click(publishButton);
    await page.click(publishConfirmButton);
    await page.screenshot({path: config.pathReports + './1.16-postTagSeleccionado.png'});
    await expect(page.locator(publishConfirmMessage)).toHaveText(['Published']);
    console.log("    Publish post success");
  });

  test('Scenario: 17. Publicar post sin author', async ({ page }) => {
    console.log(
      "  When I create a Post with <postTitle>");
    await page.click(postsMenu);
    await page.click(newPostButton);
    await page.fill(titleTextarea, postDataPoolPsAl[9]['postValidTitle']);
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Backspace');

    console.log(
      "  And I drop <author> to Post");
    await page.click(settingsMenuButton);
    await page.click(postAuthorInput);
    await page.keyboard.press('Backspace');

    console.log("  And I publish a Post");
    await page.click(publishMenuButton);
    await page.click(publishButton);
    await page.click(publishConfirmButton);
    await page.screenshot({path: config.pathReports + './1.17-postAuthorDrop.png'});
    await expect(page.locator(publishErrorMessage)).toContainText(['Saving failed: At least one author is required']);
    console.log("    success: not published");
  });

  test('Scenario: 18. Publicar post con author aleatorio', async ({ page }) => {
    console.log(
      "  When I create a Post with <postTitle>");
    await page.click(postsMenu);
    await page.click(newPostButton);
    await page.fill(titleTextarea, postDataPoolPsAl[9]['postValidTitle']);
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Backspace');

    console.log(
      "  And I drop <author> to Post");
    await page.click(settingsMenuButton);
    await page.click(postAuthorInput);
    await page.keyboard.press('Backspace');
    await page.type(postAuthorInput, postDataPoolPsAl[9]['authorName']);
    
    console.log("  And I publish a Post");
    await page.click(publishMenuButton);
    await page.click(publishButton);
    await page.click(publishConfirmButton);
    await page.screenshot({path: config.pathReports + './1.18-postAuthorAleatorio.png'});
    await expect(page.locator(publishErrorMessage)).toContainText(['Saving failed: At least one author is required']);
    console.log("    success: not published");
  });
  
  test('Scenario: 19. Crear post con metadata title vacio', async ({ page }) => {
    console.log(
      "  When I create a Post with <postTitle>");
    await page.click(postsMenu);
    await page.click(newPostButton);
    await page.fill(titleTextarea, postDataPoolPsAl[0]['postValidTitle']);
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Backspace');
    
    console.log(
      "  And I set metadata title empty to Post");
    await page.click(settingsMenuButton);
    await page.click(metaDataButton);
    await page.type(metaDataTitleInput, '');

    console.log("  And I publish a Post");
    await page.click(publishMenuButton);
    await page.click(publishButton);
    await page.click(publishConfirmButton);
    await page.screenshot({path: config.pathReports + './1.19-postMetaDataTitleEmpty.png'});
    await expect(page.locator(publishConfirmMessage)).toHaveText(['Published']);
    console.log("    Publish post success");
  });

  test('Scenario: 20. Crear post con metadata title válido', async ({ page }) => {
    console.log(
      "  When I create a Post with <postTitle>");
    await page.click(postsMenu);
    await page.click(newPostButton);
    await page.fill(titleTextarea, postDataPoolPsAl[1]['postValidTitle']);
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Backspace');
    
    console.log(
      "  And I set metadata title valid to Post");
    await page.click(settingsMenuButton);
    await page.click(metaDataButton);
    await page.type(metaDataTitleInput, postDataPoolPsAl[1]['metaDataTitleValid']);

    console.log("  And I publish a Post");
    await page.click(publishMenuButton);
    await page.click(publishButton);
    await page.click(publishConfirmButton);
    await page.screenshot({path: config.pathReports + './1.20-postMetaDataTitleValid.png'});
    await expect(page.locator(publishConfirmMessage)).toHaveText(['Published']);
    console.log("    Publish post success");
  });

  test('Scenario: 21. Crear post con metadata title válido mayor a 60 caracteres', async ({ page }) => {
    console.log(
      "  When I create a Post with <postTitle>");
    await page.click(postsMenu);
    await page.click(newPostButton);
    await page.fill(titleTextarea, postDataPoolPsAl[1]['postValidTitle']);
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Backspace');
    
    console.log(
      "  And I set metadata title valid to Post greater than 60 characteres");
    await page.click(settingsMenuButton);
    await page.click(metaDataButton);
    await page.type(metaDataTitleInput, faker.datatype.string(61));

    console.log("  And I publish a Post");
    await page.click(publishMenuButton);
    await page.click(publishButton);
    await page.click(publishConfirmButton);
    await page.screenshot({path: config.pathReports + './1.21-postMetaDataTitleMayor60.png'});
    
    await expect(page.locator(metaDataRecomMessage, { hasText: '60' })).toContainText(['61']);
    console.log("    Publish post success");
  });

  test('Scenario: 22. Crear post con metadata title válido mayor a 300 caracteres', async ({ page }) => {
    console.log(
      "  When I create a Post with <postTitle>");
    await page.click(postsMenu);
    await page.click(newPostButton);
    await page.fill(titleTextarea, postDataPoolPsAl[2]['postValidTitle']);
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Backspace');
    
    console.log(
      "  And I set metadata title valid to Post greater than 300 characteres");
    await page.click(settingsMenuButton);
    await page.click(metaDataButton);
    await page.type(metaDataTitleInput, faker.datatype.string(301));

    console.log("  And I publish a Post");
    await page.click(publishMenuButton);
    await page.click(publishButton);
    await page.click(publishConfirmButton);
    await page.screenshot({path: config.pathReports + './1.22-postMetaDataTitleMayor300.png'});
    
    await expect(page.locator(publishErrorMessage)).toContainText(['Meta Title cannot be longer than 300 characters']);
    console.log("    success: not published");
  });

  test('Scenario: 23. Crear post con metadata description vacio', async ({ page }) => {
    console.log(
      "  When I create a Post with <postTitle>");
    await page.click(postsMenu);
    await page.click(newPostButton);
    await page.fill(titleTextarea, postDataPoolPsAl[2]['postValidTitle']);
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Backspace');
    
    console.log(
      "  And I set metadata title empty to Post");
    await page.click(settingsMenuButton);
    await page.click(metaDataButton);
    await page.type(metaDataDescInput, '');

    console.log("  And I publish a Post");
    await page.click(publishMenuButton);
    await page.click(publishButton);
    await page.click(publishConfirmButton);
    await page.screenshot({path: config.pathReports + './1.23-postMetaDataDescEmpty.png'});
    await expect(page.locator(publishConfirmMessage)).toHaveText(['Published']);
    console.log("    Publish post success");
  });

  test('Scenario: 24. Crear post con metadata description válido ', async ({ page }) => {
    console.log(
      "  When I create a Post with <postTitle>");
    await page.click(postsMenu);
    await page.click(newPostButton);
    await page.fill(titleTextarea, postDataPoolPsAl[3]['postValidTitle']);
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Backspace');
    
    console.log(
      "  And I set metadata description valid to Post ");
    await page.click(settingsMenuButton);
    await page.click(metaDataButton);
    await page.type(metaDataDescInput, postDataPoolPsAl[1]['metaDataDescValid']);

    console.log("  And I publish a Post");
    await page.click(publishMenuButton);
    await page.click(publishButton);
    await page.click(publishConfirmButton);
    await page.screenshot({path: config.pathReports + './1.24-postMetaDataValid.png'});
    
    await expect(page.locator(publishConfirmMessage)).toHaveText(['Published']);
    console.log("    Publish post success");
  });

  test('Scenario: 25. Crear post con metadata description válido mayor a 145 caracteres', async ({ page }) => {
    console.log(
      "  When I create a Post with <postTitle>");
    await page.click(postsMenu);
    await page.click(newPostButton);
    await page.fill(titleTextarea, postDataPoolPsAl[4]['postValidTitle']);
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Backspace');
    
    console.log(
      "  And I set metadata description valid to Post greater than 145 characteres");
    await page.click(settingsMenuButton);
    await page.click(metaDataButton);
    await page.type(metaDataDescInput, faker.datatype.string(146));

    console.log("  And I publish a Post");
    await page.click(publishMenuButton);
    await page.click(publishButton);
    await page.click(publishConfirmButton);
    await page.screenshot({path: config.pathReports + './1.25-postMetaDataDescMayor145.png'});
    
    await expect(page.locator(metaDataRecomMessage, { hasText: '145' })).toContainText(['146']);
    console.log("    Publish post success");
  });

  test('Scenario: 26. Crear post con metadata description válido mayor a 500 caracteres', async ({ page }) => {
    console.log(
      "  When I create a Post with <postTitle>");
    await page.click(postsMenu);
    await page.click(newPostButton);
    await page.fill(titleTextarea, postDataPoolPsAl[5]['postValidTitle']);
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Backspace');
    
    console.log(
      "  And I set metadata description valid to Post greater than 500 characteres");
    await page.click(settingsMenuButton);
    await page.click(metaDataButton);
    await page.type(metaDataDescInput, faker.datatype.string(501));

    console.log("  And I publish a Post");
    await page.click(publishMenuButton);
    await page.click(publishButton);
    await page.click(publishConfirmButton);
    await page.screenshot({path: config.pathReports + './1.26-postMetaDataDescMayor500.png'});
    
    await expect(page.locator(publishErrorMessage)).toContainText(['Meta Description cannot be longer than 500 characters']);
    console.log("    success: not published");
  });

  test('Scenario: 27. Crear post con metadata url canónica vacia', async ({ page }) => {
    console.log(
      "  When I create a Post with <postTitle>");
    await page.click(postsMenu);
    await page.click(newPostButton);
    await page.fill(titleTextarea, postDataPoolPsAl[6]['postValidTitle']);
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Backspace');
    
    console.log(
      "  And I set metadata canonical url empty to Post");
    await page.click(settingsMenuButton);
    await page.click(metaDataButton);
    await page.type(metaDataUrlInput, '');

    console.log("  And I publish a Post");
    await page.click(publishMenuButton);
    await page.click(publishButton);
    await page.click(publishConfirmButton);
    await page.screenshot({path: config.pathReports + './1.27-postMetaDataUrlEmpty.png'});
    await expect(page.locator(publishConfirmMessage)).toHaveText(['Published']);
    console.log("    Publish post success");
  });

  postDataPool.canonicalUrl.valid.forEach((url, index) => {
    test(`Scenario: 28. Crear post con metadata url canónica válida: ${url}`, async ({ page }) => {
      console.log(
        `  When I create a Post with <postTitle>`);
      await page.click(postsMenu);
      await page.click(newPostButton);
      await page.fill(titleTextarea, postDataPoolPsAl[7]['postValidTitle']);
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Backspace');
      console.log(`    Create post success `);

      console.log(
        "  And I set metadata valid canonical url to Post");
      await page.click(settingsMenuButton);
      await page.click(metaDataButton);
      await page.type(metaDataUrlInput, url);
      await page.keyboard.press('Tab');

      console.log("  And I publish a Post");
      await page.click(publishMenuButton);
      await page.click(publishButton);
      await page.click(publishConfirmButton);
      await expect(page.locator(publishConfirmMessage)).toHaveText(['Published']);
      await page.screenshot({path: `${config.pathReports}/1.28-postMetaDataUrlValid-${index}.png`});
      
      console.log("    Publish post success");
    });
  });

  test(`Scenario: 29. Crear post con metadata url canónica inválida`, async ({ page }) => {
    console.log(
      `  When I create a Post with <postTitle>`);
    await page.click(postsMenu);
    await page.click(newPostButton);
    await page.fill(titleTextarea, postDataPoolPsAl[8]['postValidTitle']);
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Backspace');
    console.log(`    Create post success `);

    console.log(
      "  And I set metadata valid canonical url to Post");
    await page.click(settingsMenuButton);
    await page.click(metaDataButton);
    await page.type(metaDataUrlInput, postDataPoolPsAl[6]['metaDataUrlValid']);
    await page.keyboard.press('Tab');

    console.log("  And I publish a Post");
    await page.click(publishMenuButton);
    await page.click(publishButton);
    await page.click(publishConfirmButton);
    await page.screenshot({path: `${config.pathReports}/1.29-postMetaDataUrlInvalid.png`});
    await expect(page.locator(publishErrorMessage)).toContainText(['Please enter a valid URL']);
    console.log("    success: not published");
  });

  test('Scenario: 30. Crear post con excerpt aleatorio', async ({ page }) => {
    console.log(
      "  When I create a Post with <postTitle>");
    await page.click(postsMenu);
    await page.click(newPostButton);
    await page.fill(titleTextarea, postDataPoolPsAl[9]['postValidTitle']);
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Backspace');
    
    console.log(
      "  And I set excerpt to Post ");
    await page.click(settingsMenuButton);
    await page.type(postExcerpt, faker.lorem.paragraph(3));

    console.log("  And I publish a Post");
    await page.click(publishMenuButton);
    await page.click(publishButton);
    await page.click(publishConfirmButton);
    await expect(page.locator(publishConfirmMessage)).toHaveText(['Published']);
    await page.screenshot({path: `${config.pathReports}/1.30-postExcerpt.png`});
    console.log("    Publish post success");
  });
  
});

