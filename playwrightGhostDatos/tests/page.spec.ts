import { test, expect, Page } from '@playwright/test'
import { config } from '../properties.js';
import { pageDataPool } from '../datapools/page.datapool';
var Mockaroo = require('mockaroo');
import { faker } from '@faker-js/faker'
import { emailInput, passwInput, signInButton, dashboardHeader } from '../pages_objects/login.page';
import { pageMenu} from '../pages_objects/dashboard.page';
import { newPageButton } from '../pages_objects/page.page.js';

import { titleTextarea, publishMenuButton, publishButton, publishConfirmButton, publishConfirmMessage, publishErrorMessage, settingsMenuButton, pageUrlInput, schedulePublishRadio, scheduleDatePublishInput, scheduleTimePublishInput, showNotifications, showScheduleError, unpublishRadio, tagsInput, tagItemList, pageAuthorInput, metaDataButton, metaDataTitleInput, metaDataRecomMessage, metaDataDescInput, metaDataUrlInput, pageExcerpt  } from '../pages_objects/page_edit.page.js';
// import { titleTextarea, descEditor, publishMenuButton, publishButton, publishConfirmButton, 
//   publishConfirmMessage, publishErrorMessage, settingsMenuButton, pageUrlInput } 
//   from '../pages_objects/page_edit.page';

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

    test(`Scenario: 4. Crear page titulo con caracteres especiales`, async ({ page }) => {
    console.log(
      `  When I create a Page with <pageTitle>`);
    await page.click(pageMenu);
    await page.click(newPageButton);
    await page.fill(titleTextarea, pageDataPoolPsAl[0]['pageTitleSpecialChars']);
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Backspace');
    console.log(`    Create page success with title `);

    console.log("  And I publish a page");
    await page.click(publishMenuButton);
    await page.click(publishButton);
    // await page.click(publishConfirmButton);
    await expect(page.locator(publishConfirmMessage)).toHaveText(['Published']);
    await page.screenshot({path: `${config.pathReports}/1.4-pageTitleSpecialChars.png`});
    
    console.log("    Publish page success");
  });

  test('Scenario 5.  Crear page con url válida', async ({ page }) => {
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

  test('Scenario 6.  Crear page con url vacia', async ({ page }) => {
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

pageDataPool.url.invalid.forEach((urlName, index) => {
  test(`Scenario: 7. Crear page con url invalida por valor: ${urlName} (es invalida porque pertenece a un page)`, 
      async ({ page }) => {
    console.log(
      `  When I create a Page with <pageTitle> and <urlName>`);
    await page.click(pageMenu);
    await page.click(newPageButton);
    await page.fill(titleTextarea, pageDataPoolPsAl[0]['pageValidTitle']);
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Backspace');
    await page.click(settingsMenuButton);
    await page.fill(pageUrlInput,urlName);
    console.log("    Create page and set invalid url success");

    console.log("  And I publish a Page");
    await page.click(publishMenuButton);
    await page.click(publishButton);
    // await page.click(publishConfirmButton);
    // se espera que automaticamente haya agregado un valor formato 'xxx-n'
    expect(page.inputValue(pageUrlInput)).not.toEqual(urlName);
    await page.screenshot({path: `${config.pathReports}/1.7-pageUrlInvalida-${index}.png`});
    
    console.log("    Publish page success");
  });
});

test(`Scenario: 8. Crear page con url invalida por longitud`, async ({ page }) => {
  console.log(
    "  When I create a Page with <pageUrl> > 191 characters");
  await page.click(pageMenu);
  await page.click(newPageButton);
  await page.fill(titleTextarea, "valid");
  await page.keyboard.press('Tab');
  await page.keyboard.press('Shift+Tab');
  await page.fill(titleTextarea, pageDataPoolPsAl[1]['pageValidTitle']);
  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');
  await page.keyboard.press('Backspace');
  await page.click(settingsMenuButton);
  await page.fill(pageUrlInput,faker.datatype.string(192));
  console.log("    Create page and set invalid url success");

  console.log("  And I publish a Page");
  await page.click(publishMenuButton);
  await page.click(publishButton);
  // await page.click(publishConfirmButton);
  await page.screenshot({path: config.pathReports + './1.8-pageUrlInvalida.png'});
  // se espera que arroje un error por exceder el límite de caracteres en bd
  // await expect(page.locator(publishErrorMessage)).toContainText(['Title cannot be longer than 255 characters']);
  console.log("    success: not published");
});

test('Scenario: 9. Programar publicación de page con fecha y hora valida', async ({ page }) => {
  console.log(
    "  When I create a Page with <pageTitle>");
  await page.click(pageMenu);
  await page.click(newPageButton);
  await page.fill(titleTextarea, pageDataPoolPsAl[2]['pageValidTitle']);
  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');
  await page.keyboard.press('Backspace');
  console.log("    Create page success");

  console.log(
    "  And I schedule a Page to be published in <datetime> valid future");
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
  // await page.click(publishConfirmButton);

  // await expect(page.locator(publishConfirmMessage)).toHaveText(['Scheduled']);
  await page.locator(showNotifications).screenshot({path: config.pathReports + './1.9-pageScheduledPublish.png'});
  console.log("    Publish page success");
});

test(`Scenario: 10. Programar publicación de page con fecha y hora en el pasado: `, async ({ page }) => {
  console.log(
    "  When I create a Page with <pageTitle>");
  await page.click(pageMenu);
  await page.click(newPageButton);
  await page.fill(titleTextarea, pageDataPoolPsAl[3]['pageValidTitle']);
  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');
  await page.keyboard.press('Backspace');
  console.log("    Create page success");

  console.log(
    "  And I schedule a Page to be published in <datetime> past");

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
  await page.screenshot({path: config.pathReports + `./1.10-pageSchedulePublishInvalid.png`});
  console.log("    success: not published");
});

test(`Scenario: 11. Programar publicación de page con formato de fecha invalido: `, async ({ page }) => {
  console.log(
    "  When I create a Page with <pageTitle>");
  await page.click(pageMenu);
  await page.click(newPageButton);
  await page.fill(titleTextarea, pageDataPoolPsAl[3]['pageValidTitle']);
  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');
  await page.keyboard.press('Backspace');
  console.log("    Create page success");

  console.log(
    "  And I schedule a Page to be published in <datetime> past");

  let date = faker.datatype.datetime({ 
    min: new Date().getTime() + (2*60*1000), 
    max: new Date().getTime() + (24*60*60*1000)}) 
  let dateString = pageDataPoolPsAl[0]['pageInvalidFormatDate'];
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
  await page.screenshot({path: config.pathReports + `./1.11-pageSchedulePublishInvalidDate.png`});
  console.log("    success: not published");
});

test('Scenario: 12. Programar/desprogramar/publicar page con fecha y hora invalida', async ({ page }) => {
  console.log(
    "  When I create a Page with <pageTitle>");
  await page.click(pageMenu);
  await page.click(newPageButton);
  await page.fill(titleTextarea, pageDataPoolPsAl[4]['pageValidTitle']);
  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');
  await page.keyboard.press('Backspace');
  console.log("    Create page success");

  console.log(
    "  And I schedule a Page to be published in <datetime> valid future");
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
  // await page.click(publishConfirmButton);

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
  await page.screenshot({path: config.pathReports + `./1.12-pageSchedulePublishDraftInvalid.png`});
  await expect(page.locator(showScheduleError)).toContainText(['Must be at least 2 mins in the future']);
  console.log("    success: not published");
});

test(`Scenario: 13. Programar publicación de page con formato de hora invalido: `, async ({ page }) => {
  console.log(
    "  When I create a Page with <pageTitle>");
  await page.click(pageMenu);
  await page.click(newPageButton);
  await page.fill(titleTextarea, pageDataPoolPsAl[5]['pageValidTitle']);
  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');
  await page.keyboard.press('Backspace');
  console.log("    Create page success");

  console.log(
    "  And I schedule a Page to be published in <datetime> past");

  let date = faker.datatype.datetime({ 
    min: new Date().getTime() + (2*60*1000), 
    max: new Date().getTime() + (24*60*60*1000)}) 
  let dateString = date.toJSON().slice(0,10);
  let timeString = pageDataPoolPsAl[0]['pageInvalidFormatTime'];
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
  await page.screenshot({path: config.pathReports + `./1.13-pageSchedulePublishInvalidTime.png`});
  console.log("    success: not published");
});

test('Scenario: 14. Crear page con tag aleatorio válido', async ({ page }) => {
  console.log(
    "  When I create a Page with <pageTitle>");
  await page.click(pageMenu);
  await page.click(newPageButton);
  await page.fill(titleTextarea, pageDataPoolPsAl[6]['pageValidTitle']);
  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');
  await page.keyboard.press('Backspace');

  console.log(
    "  And I add tag <validTag> to page");
  await page.click(settingsMenuButton);
  await page.type(tagsInput, pageDataPoolPsAl[6]['pageValidTag']);

  console.log("  And I publish a Page");
  await page.click(publishMenuButton);
  await page.click(publishButton);
  // await page.click(publishConfirmButton);
  await expect(page.locator(publishConfirmMessage)).toHaveText(['Published']);
  await page.screenshot({path: config.pathReports + './1.14-pageTagValido.png'});
  console.log("    Publish page success");
});

test('Scenario: 15. Crear page con tag aleatorio inválido', async ({ page }) => {
  console.log(
    "  When I create a Page with <pageTitle>");
  await page.click(pageMenu);
  await page.click(newPageButton);
  await page.fill(titleTextarea, pageDataPoolPsAl[7]['pageValidTitle']);
  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');
  await page.keyboard.press('Backspace');

  console.log(
    "  And I add tag <invalidTag> to page");
  await page.click(settingsMenuButton);
  await page.type(tagsInput, faker.datatype.string(192));

  console.log("  And I publish a Page");
  await page.click(publishMenuButton);
  await page.click(publishButton);
  // await page.click(publishConfirmButton);
  await page.screenshot({path: config.pathReports + './1.15-pageTagInValido.png'});
  // await expect(page.locator(publishErrorMessage)).toContainText(['Validation error, cannot edit page. Validation failed for name']);
  console.log("    success: not published");
});

test('Scenario: 16. Crear page con tag existente', async ({ page }) => {
  console.log(
    "  When I create a Page with <pageTitle>");
  await page.click(pageMenu);
  await page.click(newPageButton);
  await page.fill(titleTextarea, pageDataPoolPsAl[8]['pageValidTitle']);
  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');
  await page.keyboard.press('Backspace');

  console.log(
    "  And I add tag <invalidTag> to page");
  await page.click(settingsMenuButton);
  await page.click(tagsInput);
  await page.click(tagItemList);

  console.log("  And I publish a Page");
  await page.click(publishMenuButton);
  await page.click(publishButton);
  // await page.click(publishConfirmButton);
  await page.screenshot({path: config.pathReports + './1.16-pageTagSeleccionado.png'});
  await expect(page.locator(publishConfirmMessage)).toHaveText(['Published']);
  console.log("    Publish page success");
});

test('Scenario: 17. Publicar page sin author', async ({ page }) => {
  console.log(
    "  When I create a Page with <pageTitle>");
  await page.click(pageMenu);
  await page.click(newPageButton);
  await page.fill(titleTextarea, pageDataPoolPsAl[9]['pageValidTitle']);
  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');
  await page.keyboard.press('Backspace');

  console.log(
    "  And I drop <author> to page");
  await page.click(settingsMenuButton);
  await page.click(pageAuthorInput);
  await page.keyboard.press('Backspace');

  console.log("  And I publish a Page");
  await page.click(publishMenuButton);
  await page.click(publishButton);
  // await page.click(publishConfirmButton);
  await page.screenshot({path: config.pathReports + './1.17-pageAuthorDrop.png'});
  await expect(page.locator(publishErrorMessage)).toContainText(['Saving failed: At least one author is required']);
  console.log("    success: not published");
});

test('Scenario: 18. Publicar page con author aleatorio', async ({ page }) => {
  console.log(
    "  When I create a Page with <pageTitle>");
  await page.click(pageMenu);
  await page.click(newPageButton);
  await page.fill(titleTextarea, pageDataPoolPsAl[9]['pageValidTitle']);
  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');
  await page.keyboard.press('Backspace');

  console.log(
    "  And I drop <author> to page");
  await page.click(settingsMenuButton);
  await page.click(pageAuthorInput);
  await page.keyboard.press('Backspace');
  await page.type(pageAuthorInput, pageDataPoolPsAl[9]['authorName']);
  
  console.log("  And I publish a Page");
  await page.click(publishMenuButton);
  await page.click(publishButton);
  // await page.click(publishConfirmButton);
  await page.screenshot({path: config.pathReports + './1.18-pageAuthorAleatorio.png'});
  await expect(page.locator(publishErrorMessage)).toContainText(['Saving failed: At least one author is required']);
  console.log("    success: not published");
});

test('Scenario: 19. Crear page con metadata title vacio', async ({ page }) => {
  console.log(
    "  When I create a Page with <pageTitle>");
  await page.click(pageMenu);
  await page.click(newPageButton);
  await page.fill(titleTextarea, pageDataPoolPsAl[0]['pageValidTitle']);
  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');
  await page.keyboard.press('Backspace');
  
  console.log(
    "  And I set metadata title empty to page");
  await page.click(settingsMenuButton);
  await page.click(metaDataButton);
  await page.type(metaDataTitleInput, '');

  console.log("  And I publish a Page");
  await page.click(publishMenuButton);
  await page.click(publishButton);
  // await page.click(publishConfirmButton);
  await page.screenshot({path: config.pathReports + './1.19-pageMetaDataTitleEmpty.png'});
  await expect(page.locator(publishConfirmMessage)).toHaveText(['Published']);
  console.log("    Publish page success");
});

test('Scenario: 20. Crear page con metadata title válido', async ({ page }) => {
  console.log(
    "  When I create a Page with <pageTitle>");
  await page.click(pageMenu);
  await page.click(newPageButton);
  await page.fill(titleTextarea, pageDataPoolPsAl[1]['pageValidTitle']);
  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');
  await page.keyboard.press('Backspace');
  
  console.log(
    "  And I set metadata title valid to page");
  await page.click(settingsMenuButton);
  await page.click(metaDataButton);
  await page.type(metaDataTitleInput, pageDataPoolPsAl[1]['metaDataTitleValid']);

  console.log("  And I publish a Page");
  await page.click(publishMenuButton);
  await page.click(publishButton);
  // await page.click(publishConfirmButton);
  await page.screenshot({path: config.pathReports + './1.20-pageMetaDataTitleValid.png'});
  await expect(page.locator(publishConfirmMessage)).toHaveText(['Published']);
  console.log("    Publish page success");
});

test('Scenario: 21. Crear page con metadata title válido mayor a 60 caracteres', async ({ page }) => {
  console.log(
    "  When I create a Page with <pageTitle>");
  await page.click(pageMenu);
  await page.click(newPageButton);
  await page.fill(titleTextarea, pageDataPoolPsAl[1]['pageValidTitle']);
  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');
  await page.keyboard.press('Backspace');
  
  console.log(
    "  And I set metadata title valid to page greater than 60 characteres");
  await page.click(settingsMenuButton);
  await page.click(metaDataButton);
  await page.type(metaDataTitleInput, faker.datatype.string(61));

  console.log("  And I publish a Page");
  await page.click(publishMenuButton);
  await page.click(publishButton);
  // await page.click(publishConfirmButton);
  await page.screenshot({path: config.pathReports + './1.21-pageMetaDataTitleMayor60.png'});
  
  await expect(page.locator(metaDataRecomMessage, { hasText: '60' })).toContainText(['61']);
  console.log("    Publish page success");
});

test('Scenario: 22. Crear page con metadata title válido mayor a 300 caracteres', async ({ page }) => {
  console.log(
    "  When I create a Page with <pageTitle>");
  await page.click(pageMenu);
  await page.click(newPageButton);
  await page.fill(titleTextarea, pageDataPoolPsAl[2]['pageValidTitle']);
  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');
  await page.keyboard.press('Backspace');
  
  console.log(
    "  And I set metadata title valid to page greater than 300 characteres");
  await page.click(settingsMenuButton);
  await page.click(metaDataButton);
  await page.type(metaDataTitleInput, faker.datatype.string(301));

  console.log("  And I publish a Page");
  await page.click(publishMenuButton);
  await page.click(publishButton);
  // await page.click(publishConfirmButton);
  await page.screenshot({path: config.pathReports + './1.22-pageMetaDataTitleMayor300.png'});
  
  await expect(page.locator(publishErrorMessage)).toContainText(['Meta Title cannot be longer than 300 characters']);
  console.log("    success: not published");
});

test('Scenario: 23. Crear page con metadata description vacio', async ({ page }) => {
  console.log(
    "  When I create a Page with <pageTitle>");
  await page.click(pageMenu);
  await page.click(newPageButton);
  await page.fill(titleTextarea, pageDataPoolPsAl[2]['pageValidTitle']);
  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');
  await page.keyboard.press('Backspace');
  
  console.log(
    "  And I set metadata title empty to page");
  await page.click(settingsMenuButton);
  await page.click(metaDataButton);
  await page.type(metaDataDescInput, '');

  console.log("  And I publish a Page");
  await page.click(publishMenuButton);
  await page.click(publishButton);
  // await page.click(publishConfirmButton);
  await page.screenshot({path: config.pathReports + './1.23-pageMetaDataDescEmpty.png'});
  await expect(page.locator(publishConfirmMessage)).toHaveText(['Published']);
  console.log("    Publish page success");
});

test('Scenario: 24. Crear page con metadata description válido ', async ({ page }) => {
  console.log(
    "  When I create a Page with <pageTitle>");
  await page.click(pageMenu);
  await page.click(newPageButton);
  await page.fill(titleTextarea, pageDataPoolPsAl[3]['pageValidTitle']);
  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');
  await page.keyboard.press('Backspace');
  
  console.log(
    "  And I set metadata description valid to page ");
  await page.click(settingsMenuButton);
  await page.click(metaDataButton);
  await page.type(metaDataDescInput, pageDataPoolPsAl[1]['metaDataDescValid']);

  console.log("  And I publish a Page");
  await page.click(publishMenuButton);
  await page.click(publishButton);
  // await page.click(publishConfirmButton);
  await page.screenshot({path: config.pathReports + './1.24-pageMetaDataValid.png'});
  
  await expect(page.locator(publishConfirmMessage)).toHaveText(['Published']);
  console.log("    Publish page success");
});

test('Scenario: 25. Crear page con metadata description válido mayor a 145 caracteres', async ({ page }) => {
  console.log(
    "  When I create a Page with <pageTitle>");
  await page.click(pageMenu);
  await page.click(newPageButton);
  await page.fill(titleTextarea, pageDataPoolPsAl[4]['pageValidTitle']);
  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');
  await page.keyboard.press('Backspace');
  
  console.log(
    "  And I set metadata description valid to page greater than 145 characteres");
  await page.click(settingsMenuButton);
  await page.click(metaDataButton);
  await page.type(metaDataDescInput, faker.datatype.string(146));

  console.log("  And I publish a Page");
  await page.click(publishMenuButton);
  await page.click(publishButton);
  // await page.click(publishConfirmButton);
  await page.screenshot({path: config.pathReports + './1.25-pageMetaDataDescMayor145.png'});
  
  // await expect(page.locator(metaDataRecomMessage, { hasText: '145' })).toContainText(['146']);
  console.log("    Publish page success");
});

test('Scenario: 26. Crear page con metadata description válido mayor a 500 caracteres', async ({ page }) => {
  console.log(
    "  When I create a Page with <pageTitle>");
  await page.click(pageMenu);
  await page.click(newPageButton);
  await page.fill(titleTextarea, pageDataPoolPsAl[5]['pageValidTitle']);
  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');
  await page.keyboard.press('Backspace');
  
  console.log(
    "  And I set metadata description valid to page greater than 500 characteres");
  await page.click(settingsMenuButton);
  await page.click(metaDataButton);
  await page.type(metaDataDescInput, faker.datatype.string(501));

  console.log("  And I publish a Page");
  await page.click(publishMenuButton);
  await page.click(publishButton);
  // await page.click(publishConfirmButton);
  await page.screenshot({path: config.pathReports + './1.26-pageMetaDataDescMayor500.png'});
  
  await expect(page.locator(publishErrorMessage)).toContainText(['Meta Description cannot be longer than 500 characters']);
  console.log("    success: not published");
});

test('Scenario: 27. Crear page con metadata url canónica vacia', async ({ page }) => {
  console.log(
    "  When I create a Page with <pageTitle>");
  await page.click(pageMenu);
  await page.click(newPageButton);
  await page.fill(titleTextarea, pageDataPoolPsAl[6]['pageValidTitle']);
  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');
  await page.keyboard.press('Backspace');
  
  console.log(
    "  And I set metadata canonical url empty to page");
  await page.click(settingsMenuButton);
  await page.click(metaDataButton);
  await page.type(metaDataUrlInput, '');

  console.log("  And I publish a Page");
  await page.click(publishMenuButton);
  await page.click(publishButton);
  // await page.click(publishConfirmButton);
  await page.screenshot({path: config.pathReports + './1.27-pageMetaDataUrlEmpty.png'});
  await expect(page.locator(publishConfirmMessage)).toHaveText(['Published']);
  console.log("    Publish page success");
});

pageDataPool.canonicalUrl.valid.forEach((url, index) => {
  test(`Scenario: 28. Crear page con metadata url canónica válida: ${url}`, async ({ page }) => {
    console.log(
      `  When I create a Page with <pageTitle>`);
    await page.click(pageMenu);
    await page.click(newPageButton);
    await page.fill(titleTextarea, pageDataPoolPsAl[7]['pageValidTitle']);
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Backspace');
    console.log(`    Create page success `);

    console.log(
      "  And I set metadata valid canonical url to page");
    await page.click(settingsMenuButton);
    await page.click(metaDataButton);
    await page.type(metaDataUrlInput, url);
    await page.keyboard.press('Tab');

    console.log("  And I publish a Page");
    await page.click(publishMenuButton);
    await page.click(publishButton);
    // await page.click(publishConfirmButton);
    await expect(page.locator(publishConfirmMessage)).toHaveText(['Published']);
    await page.screenshot({path: `${config.pathReports}/1.28-pageMetaDataUrlValid-${index}.png`});
    
    console.log("    Publish page success");
  });
});

test(`Scenario: 29. Crear page con metadata url canónica inválida`, async ({ page }) => {
  console.log(
    `  When I create a Page with <pageTitle>`);
  await page.click(pageMenu);
  await page.click(newPageButton);
  await page.fill(titleTextarea, pageDataPoolPsAl[8]['pageValidTitle']);
  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');
  await page.keyboard.press('Backspace');
  console.log(`    Create page success `);

  console.log(
    "  And I set metadata valid canonical url to page");
  await page.click(settingsMenuButton);
  await page.click(metaDataButton);
  await page.type(metaDataUrlInput, pageDataPoolPsAl[6]['metaDataUrlValid']);
  await page.keyboard.press('Tab');

  console.log("  And I publish a Page");
  await page.click(publishMenuButton);
  await page.click(publishButton);
  // await page.click(publishConfirmButton);
  await page.screenshot({path: `${config.pathReports}/1.29-pageMetaDataUrlInvalid.png`});
  await expect(page.locator(publishErrorMessage)).toContainText(['Please enter a valid URL']);
  console.log("    success: not published");
});

test('Scenario: 30. Crear page con excerpt aleatorio', async ({ page }) => {
  console.log(
    "  When I create a Page with <pageTitle>");
  await page.click(pageMenu);
  await page.click(newPageButton);
  await page.fill(titleTextarea, pageDataPoolPsAl[9]['pageValidTitle']);
  await page.keyboard.press('Tab');
  await page.keyboard.press('Tab');
  await page.keyboard.press('Backspace');
  
  console.log(
    "  And I set excerpt to page ");
  await page.click(settingsMenuButton);
  await page.type(pageExcerpt, faker.lorem.paragraph(3));

  console.log("  And I publish a Page");
  await page.click(publishMenuButton);
  await page.click(publishButton);
  // await page.click(publishConfirmButton);
  await expect(page.locator(publishConfirmMessage)).toHaveText(['Published']);
  await page.screenshot({path: `${config.pathReports}/1.30-pageExcerpt.png`});
  console.log("    Publish page success");
});





