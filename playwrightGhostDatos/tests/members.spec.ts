import { test, expect, Page } from '@playwright/test'
import { config } from '../properties.js';
import { memberDataPool } from '../datapools/member.datapool';
import { membersButtom, membersNewButtom, memberListItem } from '../pages_objects/member.page';
import { 
  nameInput, 
  emailMInput, 
  descriptionInput, 
  saveButton, 
  saveButtonUpdate, 
  deleteButtom,
  deleteFinalButtom,
  searchInput,
  publishErrorMessage,
  settingsMenuButton,
  memberUrlInput,
  showNotifications
} from '../pages_objects/members-new.page';
import Mockaroo from 'mockaroo'
import { faker } from '@faker-js/faker'

import { emailInput, passwInput, signInButton } from '../pages_objects/login.page';

const userAdmin = config.userAdmin;
const adminPass = config.adminPass;
let membersDataPoolPsAl = [];

test.beforeAll(async () => {
    /** DataPool Pseudo aleatorio: schema Mockaroo */
  var client = new Mockaroo.Client({
    apiKey: config.mockarooMemberApiKey
  });

  client.generate({
    count: config.mockarooMemberCount,
    schema: config.mockarooMemberSchema
  }).then(function(records) {
    membersDataPoolPsAl = records;
  });

  /** Datos aleatorios: Faker */
  faker.seed(config.fakerSeed);

});

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

test.describe('Feature 1: Validación de datos al crear y editar miembros', () => {
  
  test('Scenario: 1. crear miembro con nombre, email, labels y note vacios', async ({ page }) => {
    console.log("\n When I create a Member with <memberNotes> empty");
    await page.click(membersNewButtom);
    await page.fill(nameInput, "");
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Backspace');
    console.log(" \n   Create member success");

    console.log(" \n And I member  Member");
    await page.click(membersButtom);
    await page.click(membersButtom);
    await page.click(saveButtonUpdate);
    await expect(page.locator(deleteFinalButtom)).toHaveText(['Published']);
    await page.screenshot({path: config.pathReports + './1.1-memberTitleVacio.png'});
    console.log(" \n   Member success");
  });

  memberDataPool.title.valid.forEach((title, index) => {
    test(`Scenario: 2. Crear member con titulo válido: ${title}`, async ({ page }) => {
      console.log(
        `  When I create a Member with <memberTitle>`);
      await page.click(membersNewButtom);
      await page.click(membersNewButtom);
      await page.fill(nameInput, title);
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Backspace');
      console.log(`Create member success with title = ${title} `);

      console.log(" \n And I member  Member");
      await page.click(membersButtom);
      await page.click(membersButtom);
      await page.click(saveButtonUpdate);
      await expect(page.locator(deleteFinalButtom)).toHaveText(['Published']);
      await page.screenshot({path: `${config.pathReports}/1.2-memberTitleValido-${index}.png`});
      
      console.log(" \n   Member success");
    });
  });

  test(`Scenario: 3. Crear member con titulo inválido`, async ({ page }) => {
    console.log(
      "  When I create a Member with <memberTitle> > 2000 characters");
    await page.click(membersNewButtom);
    await page.click(membersNewButtom);
    await page.fill(nameInput, "valid");
    await page.keyboard.press('Tab');
    await page.keyboard.press('Shift+Tab');
    await page.fill(nameInput, faker.datatype.string(2010));
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Backspace');
    console.log(`Create member success with invalid title `);

    console.log(" \n And I member");
    await page.click(membersButtom);
    await page.click(membersButtom);
    await page.click(saveButtonUpdate);
    await expect(page.locator(showNotifications)).toContainText(['Title cannot be longer than 255 characters']);
    await page.screenshot({path: `${config.pathReports}/1.3-memberTitleInvalido.png`});
    
    console.log(" \n   success: not save member");
  });

  test(`Scenario: 4. Crear member titulo con caracteres especiales`, async ({ page }) => {
    console.log(
      `  When I create a Member with <memberTitle>`);
    await page.click(membersNewButtom);
    await page.click(membersNewButtom);
    await page.fill(nameInput, membersDataPoolPsAl[0]['memberTitleSpecialChars']);
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Backspace');
    console.log(`Create member success with title `);

    console.log(" \n And I member  Member");
    await page.click(membersButtom);
    await page.click(membersButtom);
    await page.click(saveButtonUpdate);
    await expect(page.locator(deleteFinalButtom)).toHaveText(['Published']);
    await page.screenshot({path: `${config.pathReports}/1.4-memberTitleSpecialChars.png`});
    
    console.log(" \n   Member success");
  });

  test('Scenario: 5. Crear member con url válida', async ({ page }) => {
    console.log(
      "  When I create a Member with <memberTitle> and <memberUrl>");
    await page.click(membersNewButtom);
    await page.click(membersNewButtom);
    await page.fill(nameInput, membersDataPoolPsAl[0]['memberValidTitle']);
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Backspace');
    await page.click(settingsMenuButton);
    await page.type(memberUrlInput,membersDataPoolPsAl[0]['memberValidUrl']);
    console.log(" \n   Create member and set url success");

    console.log(" \n And I member  Member");
    await page.click(membersButtom);
    await page.click(membersButtom);
    await page.click(saveButtonUpdate);
    await expect(page.locator(deleteFinalButtom)).toHaveText(['Published']);
    await page.screenshot({path: config.pathReports + './1.5-memberUrlValida.png'});
    console.log(" \n   Member success");
  });

  test('Scenario: 6. Crear member con url vacia', async ({ page }) => {
    console.log(
      "  When I create a Member with <memberUrl> empty");
    await page.click(membersNewButtom);
    await page.click(membersNewButtom);
    await page.fill(nameInput, membersDataPoolPsAl[0]['memberValidTitle']);
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Backspace');
    await page.click(settingsMenuButton);
    await page.fill(memberUrlInput,'');
    console.log(" \n   Create member and set empty url success");

    console.log(" \n And I member  Member");
    await page.click(membersButtom);
    await page.click(membersButtom);
    await page.click(saveButtonUpdate);
    await page.screenshot({path: config.pathReports + './1.6-memberUrlVacia.png'});
    await expect(page.locator(publishErrorMessage)).toBeVisible();
    console.log(" \n   success: notsave member");
  });

  memberDataPool.url.invalid.forEach((urlName, index) => {
    test(`Scenario: 7. Crear member con url invalida por valor: ${urlName} (es invalida porque pertenece a un page)`, 
        async ({ page }) => {
      console.log(
        `  When I create a Member with <memberTitle> and <urlName>`);
      await page.click(membersNewButtom);
      await page.click(membersNewButtom);
      await page.fill(nameInput, membersDataPoolPsAl[0]['memberValidTitle']);
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Backspace');
      await page.click(settingsMenuButton);
      await page.fill(memberUrlInput,urlName);
      console.log(" \n   Create member and set invalid url success");

      console.log(" \n And I member  Member");
      await page.click(membersButtom);
      await page.click(membersButtom);
      await page.click(saveButtonUpdate);
      // se espera que automaticamente haya agregado un valor formato 'xxx-n'
      expect(page.inputValue(memberUrlInput)).not.toEqual(urlName);
      await page.screenshot({path: `${config.pathReports}/1.7-memberUrlInvalida-${index}.png`});
      
      console.log(" \n   Member success");
    });
  });

  test(`Scenario: 8. Crear member con url invalida por longitud`, async ({ page }) => {
    console.log(
      "  When I create a Member with <memberUrl> > 191 characters");
    await page.click(membersNewButtom);
    await page.click(membersNewButtom);
    await page.fill(nameInput, "valid");
    await page.keyboard.press('Tab');
    await page.keyboard.press('Shift+Tab');
    await page.fill(nameInput, membersDataPoolPsAl[1]['memberValidTitle']);
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Backspace');
    await page.click(settingsMenuButton);
    await page.fill(memberUrlInput,faker.datatype.string(192));
    console.log(" \n   Create member and set invalid url success");

    console.log(" \n And I member  Member");
    await page.click(membersButtom);
    await page.click(membersButtom);
    await page.click(saveButtonUpdate);
    await page.screenshot({path: config.pathReports + './1.8-memberUrlInvalida.png'});
    // se espera que arroje un error por exceder el límite de caracteres en bd
    await expect(page.locator(publishErrorMessage)).toBeVisible();
    console.log(" \n   success: notsave member");
  });

  test('Scenario: 9. Programar publicación de member con fecha y hora valida', async ({ page }) => {
    console.log(
      "  When I create a Member with <memberTitle>");
    await page.click(membersNewButtom);
    await page.click(membersNewButtom);
    await page.fill(nameInput, membersDataPoolPsAl[2]['memberValidTitle']);
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Backspace');
    console.log(" \n   Create member success");

    console.log(
      "  And I member  a Member to besave member in <datetime> valid future");
    let date = new Date();
    date.setTime(date.getTime() + ((faker.datatype.number({min: 2, max: 1440}))*60*1000));
    let dateString = date.toJSON().slice(0,10);
    let timeString = date.toJSON().slice(11,16);
    await page.click(membersButtom);
    await new Promise(r => setTimeout(r, 1000));
    await page.keyboard.press('Tab');
    await page.click(membersButtom);
    await page.click(saveButtonUpdate);
    await expect(page.locator(deleteFinalButtom)).toHaveText(['Scheduled']);
    console.log(" \n   Member success");
  });

  test(`Scenario: 10. Programar publicación de member con fecha y hora en el pasado: `, async ({ page }) => {
    console.log(
      "  When I create a Member with <memberTitle>");
    await page.click(membersNewButtom);
    await page.click(membersNewButtom);
    await page.fill(nameInput, membersDataPoolPsAl[3]['memberValidTitle']);
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Backspace');
    console.log(" \n   Create member success");

    console.log(
      "  And I member  a Member to besave member in <datetime> past");

    let date = faker.datatype.datetime({ 
      min: new Date().getTime() - (24*60*60*1000), 
      max: new Date().getTime()+(2*60*1000)}) // < 2 min en el futuro

    let dateString = date.toJSON().slice(0,10);
    let timeString = date.toJSON().slice(11,16);
    await page.click(membersButtom);
    await new Promise(r => setTimeout(r, 1000));
    await page.click(emailInput);
    await page.fill(descriptionInput, '');
    await page.keyboard.press('Tab');
    await page.fill(descriptionInput, '');
    await page.click(membersButtom);
    await page.screenshot({path: config.pathReports + `./1.10-memberMemberInvalid.png`});
    console.log(" \n   success: not memmber save");
  });

  test(`Scenario: 11. Desactivar  member: `, async ({ page }) => {
    console.log(
      "  When I create a Member with <memberTitle>");
    await page.click(membersNewButtom);
    await page.fill(nameInput, membersDataPoolPsAl[3]['memberValidTitle']);
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Backspace');
    console.log(" \n   Create member success");

    console.log(
      "  And I member  a Member to besave member in <datetime> past");

    await page.click(membersButtom);
    await new Promise(r => setTimeout(r, 1000));
    await page.keyboard.press('Tab');
    await page.click(membersButtom);
    await page.screenshot({path: config.pathReports + `./1.11-memberMemberInvalidInvalidDate.png`});
    console.log(" \n   success: notsave member");
  });

  test('Scenario: 12. Crear/activar/editar member con fecha y hora invalida', async ({ page }) => {
    console.log(
      "  When I create a Member with <memberTitle>");
    await page.click(membersNewButtom);
    await page.click(membersNewButtom);
    await page.fill(nameInput, membersDataPoolPsAl[4]['memberValidTitle']);
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Backspace');
    console.log(" \n   Create member success");

    console.log(
      "  And I member  a Member to besave member in <datetime> valid future");
    let date = new Date();
    date.setTime(date.getTime() + ((faker.datatype.number({min: 2, max: 1440}))*60*1000));
    await page.click(membersButtom);
    await new Promise(r => setTimeout(r, 1000));
    await page.keyboard.press('Tab');
    await page.click(membersButtom);
    await page.click(saveButtonUpdate);

    console.log(
      "  And I revert to draft");
    await page.click(membersButtom);
    await new Promise(r => setTimeout(r, 1000));
    await page.click(membersButtom);
    await page.screenshot({path: config.pathReports + `./1.12-memberMemberInvalidDraftInvalid.png`});
    await expect(page.locator(showNotifications)).toContainText(['Must be at least 2 mins in the future']);
    console.log(" \n   success: notsave member");
  });

  test(`Scenario: 13. Programar publicación de member con formato de hora invalido: `, async ({ page }) => {
    console.log(
      "  When I create a Member with <memberTitle>");
    await page.click(membersNewButtom);
    await page.click(membersNewButtom);
    await page.fill(nameInput, membersDataPoolPsAl[5]['memberValidTitle']);
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Backspace');
    console.log(" \n   Create member success");

    console.log(
      "  And I member  a Member to besave member in <datetime> past");

    await page.click(membersButtom);
    await new Promise(r => setTimeout(r, 1000));
    await page.keyboard.press('Tab');
    await page.click(membersButtom);
    await expect(page.locator(showNotifications)).toContainText(['Must be in format']);
    await page.screenshot({path: config.pathReports + `./1.13-memberMemberInvalidInvalidTime.png`});
    console.log(" \n   success: not save member");
  });

  test('Scenario: 14. Crear member con tag aleatorio válido', async ({ page }) => {
    console.log(
      "  When I create a Member with <memberTitle>");
    await page.click(membersNewButtom);
    await page.click(membersNewButtom);
    await page.fill(nameInput, membersDataPoolPsAl[6]['memberValidTitle']);
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Backspace');

    console.log(
      "  And I add tag <validTag> to Member");
    await page.click(settingsMenuButton);
    await page.type(searchInput, membersDataPoolPsAl[6]['memberValidTag']);

    console.log(" \n And I member  Member");
    await page.click(membersButtom);
    await page.click(membersButtom);
    await page.click(saveButtonUpdate);
    await expect(page.locator(deleteFinalButtom)).toHaveText(['Published']);
    await page.screenshot({path: config.pathReports + './1.14-memberTagValido.png'});
    console.log(" \n   Member success");
  });

  test('Scenario: 15. Crear member con tag aleatorio inválido', async ({ page }) => {
    console.log(
      "  When I create a Member with <memberTitle>");
    await page.click(membersNewButtom);
    await page.click(membersNewButtom);
    await page.fill(nameInput, membersDataPoolPsAl[7]['memberValidTitle']);
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Backspace');

    console.log(
      "  And I add tag <invalidTag> to Member");
    await page.click(settingsMenuButton);
    await page.type(nameInput, faker.datatype.string(192));

    console.log(" \n And I Member");
    await page.click(membersButtom);
    await page.click(membersButtom);
    await page.click(saveButtonUpdate);
    await page.screenshot({path: config.pathReports + './1.15-memberTagInValido.png'});
    await expect(page.locator(publishErrorMessage)).toContainText(['Validation error, cannot edit member. Validation failed for name']);
    console.log(" \n   success: notsave member");
  });

  test('Scenario: 16. Crear member con tag existente', async ({ page }) => {
    console.log(
      "  When I create a Member with <memberTitle>");
    await page.click(membersNewButtom);
    await page.click(membersNewButtom);
    await page.fill(nameInput, membersDataPoolPsAl[8]['memberValidTitle']);
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Backspace');

    console.log(
      "  And I add tag <invalidTag> to Member");
    await page.click(settingsMenuButton);
    await page.click(searchInput);
    await page.click(memberListItem);

    console.log(" \n And I member  Member");
    await page.click(membersButtom);
    await page.click(membersButtom);
    await page.click(saveButtonUpdate);
    await page.screenshot({path: config.pathReports + './1.16-memberTagSeleccionado.png'});
    await expect(page.locator(deleteFinalButtom)).toHaveText(['Published']);
    console.log(" \n   Member success");
  });

  test('Scenario: 17. Publicar member sin author', async ({ page }) => {
    console.log(
      "  When I create a Member with <memberTitle>");
    await page.click(membersNewButtom);
    await page.click(membersNewButtom);
    await page.fill(nameInput, membersDataPoolPsAl[9]['memberValidTitle']);
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Backspace');

    console.log(
      "  And I drop <author> to Member");
    await page.click(settingsMenuButton);
    await page.click(nameInput);
    await page.keyboard.press('Backspace');

    console.log(" \n And I member  Member");
    await page.click(membersButtom);
    await page.click(membersButtom);
    await page.click(saveButtonUpdate);
    await page.screenshot({path: config.pathReports + './1.17-memberAuthorDrop.png'});
    await expect(page.locator(publishErrorMessage)).toContainText(['Saving failed: At least one author is required']);
    console.log(" \n   success: notsave member");
  });

  test('Scenario: 18. Publicar member con author aleatorio', async ({ page }) => {
    console.log(
      "  When I create a Member with <memberTitle>");
    await page.click(membersNewButtom);
    await page.click(membersNewButtom);
    await page.fill(nameInput, membersDataPoolPsAl[9]['memberValidTitle']);
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Backspace');

    console.log(
      "  And I drop <author> to Member");
    await page.click(settingsMenuButton);
    await page.click(emailInput);
    await page.keyboard.press('Backspace');
    await page.type(descriptionInput, membersDataPoolPsAl[9]['authorName']);
    
    console.log(" \n And I member");
    await page.click(membersButtom);
    await page.click(saveButtonUpdate);
    await page.screenshot({path: config.pathReports + './1.18-memberAuthorAleatorio.png'});
    await expect(page.locator(publishErrorMessage)).toContainText(['Saving failed: At least one author is required']);
    console.log(" \n   success: notsave member");
  });
  
  test('Scenario: 19. Crear member con metadata title vacio', async ({ page }) => {
    console.log(
      "  When I create a Member with <memberTitle>");
    await page.click(membersNewButtom);
    await page.click(membersNewButtom);
    await page.fill(nameInput, membersDataPoolPsAl[0]['memberValidTitle']);
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Backspace');
    
    console.log(
      "  And I set metadata title empty to Member");
    await page.click(settingsMenuButton);
    await page.click(saveButton);
    await page.type(searchInput, '');

    console.log(" \n And I member  Member");
    await page.click(membersButtom);
    await page.click(membersButtom);
    await page.click(saveButtonUpdate);
    await page.screenshot({path: config.pathReports + './1.19-memberMetaDataTitleEmpty.png'});
    await expect(page.locator(deleteFinalButtom)).toHaveText(['Published']);
    console.log(" \n   Member success");
  });

  test('Scenario: 20. Crear member con metadata title válido', async ({ page }) => {
    console.log(
      "  When I create a Member with <memberTitle>");
    await page.click(membersNewButtom);
    await page.click(membersNewButtom);
    await page.fill(nameInput, membersDataPoolPsAl[1]['memberValidTitle']);
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Backspace');
    
    console.log(
      "  And I set metadata title valid to Member");
    await page.click(settingsMenuButton);
    await page.click(saveButton);
    await page.type(nameInput, membersDataPoolPsAl[1]['metaDataTitleValid']);

    console.log(" \n And I member  Member");
    await page.click(membersButtom);
    await page.click(membersButtom);
    await page.click(saveButtonUpdate);
    await page.screenshot({path: config.pathReports + './1.20-memberMetaDataTitleValid.png'});
    await expect(page.locator(deleteFinalButtom)).toHaveText(['Published']);
    console.log(" \n   Member success");
  });

  test('Scenario: 21. Crear member con metadata title válido mayor a 60 caracteres', async ({ page }) => {
    console.log(
      "  When I create a Member with <memberTitle>");
    await page.click(membersNewButtom);
    await page.click(membersNewButtom);
    await page.fill(nameInput, membersDataPoolPsAl[1]['memberValidTitle']);
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Backspace');
    
    console.log(
      "  And I set metadata title valid to Member greater than 60 characteres");
    await page.click(settingsMenuButton);
    await page.click(saveButton);
    await page.type(nameInput, faker.datatype.string(61));

    console.log(" \n And I member  Member");
    await page.click(membersButtom);
    await page.click(membersButtom);
    await page.click(saveButtonUpdate);
    await page.screenshot({path: config.pathReports + './1.21-memberMetaDataTitleMayor60.png'});
    
    await expect(page.locator(showNotifications, { hasText: '20' })).toContainText(['21']);
    console.log(" \n   Member success");
  });

  test('Scenario: 22. Crear member con metadata title válido mayor a 300 caracteres', async ({ page }) => {
    console.log(
      "  When I create a Member with <memberTitle>");
    await page.click(membersNewButtom);
    await page.click(membersNewButtom);
    await page.fill(nameInput, membersDataPoolPsAl[2]['memberValidTitle']);
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Backspace');
    
    console.log(
      "  And I set metadata title valid to Member greater than 300 characteres");
    await page.click(settingsMenuButton);
    await page.click(saveButton);
    await page.type(descriptionInput, faker.datatype.string(301));

    console.log(" \n And I member  Member");
    await page.click(membersButtom);
    await page.click(membersButtom);
    await page.click(saveButtonUpdate);
    await page.screenshot({path: config.pathReports + './1.22-memberMetaDataTitleMayor300.png'});
    
    await expect(page.locator(publishErrorMessage)).toContainText(['Meta Title cannot be longer than 300 characters']);
    console.log(" \n   success: notsave member");
  });

  test('Scenario: 23. Crear member con metadata description vacio', async ({ page }) => {
    console.log(
      "  When I create a Member with <memberTitle>");
    await page.click(membersNewButtom);
    await page.click(membersNewButtom);
    await page.fill(nameInput, membersDataPoolPsAl[2]['memberValidTitle']);
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Backspace');
    
    console.log(
      "  And I set metadata title empty to Member");
    await page.click(settingsMenuButton);
    await page.click(saveButton);
    await page.type(descriptionInput, '');

    console.log(" \n And I member  Member");
    await page.click(membersButtom);
    await page.click(membersButtom);
    await page.click(saveButtonUpdate);
    await page.screenshot({path: config.pathReports + './1.23-memberMetaDataDescEmpty.png'});
    await expect(page.locator(deleteFinalButtom)).toHaveText(['Published']);
    console.log(" \n   Member success");
  });

  test('Scenario: 24. Crear member con metadata description válido ', async ({ page }) => {
    console.log(
      "  When I create a Member with <memberTitle>");
    await page.click(membersNewButtom);
    await page.click(membersNewButtom);
    await page.fill(nameInput, membersDataPoolPsAl[3]['memberValidTitle']);
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Backspace');
    
    console.log(
      "  And I set metadata description valid to Member ");
    await page.click(settingsMenuButton);
    await page.click(descriptionInput);
    await page.type(nameInput, membersDataPoolPsAl[1]['metaDataDescValid']);

    console.log(" \n And I member  Member");
    await page.click(membersButtom);
    await page.click(membersButtom);
    await page.click(saveButtonUpdate);
    await page.screenshot({path: config.pathReports + './1.24-memberMetaDataValid.png'});
    
    await expect(page.locator(deleteFinalButtom)).toHaveText(['Published']);
    console.log(" \n   Member success");
  });

  test('Scenario: 25. Crear member con metadata description válido mayor a 145 caracteres', async ({ page }) => {
    console.log(
      "  When I create a Member with <memberTitle>");
    await page.click(membersNewButtom);
    await page.click(membersNewButtom);
    await page.fill(nameInput, membersDataPoolPsAl[4]['memberValidTitle']);
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Backspace');
    
    console.log(
      "  And I set metadata description valid to Member greater than 145 characteres");
    await page.click(settingsMenuButton);

    console.log(" \n And I member  Member");
    await page.click(membersButtom);
    await page.click(membersButtom);
    await page.click(saveButtonUpdate);
    await page.screenshot({path: config.pathReports + './1.25-memberMetaDataDescMayor145.png'});
    
    await expect(page.locator(showNotifications, { hasText: '145' })).toContainText(['146']);
    console.log(" \n   Member success");
  });

  test('Scenario: 26. Crear member con metadata description válido mayor a 500 caracteres', async ({ page }) => {
    console.log(
      "  When I create a Member with <memberTitle>");
    await page.click(membersNewButtom);
    await page.click(membersNewButtom);
    await page.fill(nameInput, membersDataPoolPsAl[5]['memberValidTitle']);
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Backspace');
    
    console.log(
      "  And I set metadata description valid to Member greater than 500 characteres");
    await page.click(settingsMenuButton);
    await page.click(saveButton);
    await page.type(searchInput, faker.datatype.string(501));

    console.log(" \n And I member  Member");
    await page.click(membersButtom);
    await page.click(membersButtom);
    await page.click(saveButtonUpdate);
    await page.screenshot({path: config.pathReports + './1.26-memberMetaDataDescMayor500.png'});
    
    await expect(page.locator(publishErrorMessage)).toContainText(['Meta Description cannot be longer than 500 characters']);
    console.log(" \n   success: notsave member");
  });

  test('Scenario: 27. Crear member con metadata url canónica vacia', async ({ page }) => {
    console.log(
      "  When I create a Member with <memberTitle>");
    await page.click(membersNewButtom);
    await page.click(membersNewButtom);
    await page.fill(nameInput, membersDataPoolPsAl[6]['memberValidTitle']);
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Backspace');
    
    console.log(
      "  And I set metadata canonical url empty to Member");
    await page.click(settingsMenuButton);

    console.log(" \n And I member  Member");
    await page.click(membersButtom);
    await page.click(membersButtom);
    await page.click(saveButtonUpdate);
    await page.screenshot({path: config.pathReports + './1.27-memberMetaDataUrlEmpty.png'});
    await expect(page.locator(deleteFinalButtom)).toHaveText(['Published']);
    console.log(" \n   Member success");
  });

  memberDataPool.canonicalUrl.valid.forEach((url, index) => {
    test(`Scenario: 28. Crear member con metadata url canónica válida: ${url}`, async ({ page }) => {
      console.log(
        `  When I create a Member with <memberTitle>`);
      await page.click(membersNewButtom);
      await page.click(membersNewButtom);
      await page.fill(nameInput, membersDataPoolPsAl[7]['memberValidTitle']);
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      await page.keyboard.press('Backspace');
      console.log(`Create member success `);

      console.log(
        "  And I set metadata name in member valid canonical url to Member");
      await page.click(settingsMenuButton);
      await page.keyboard.press('Tab');

      console.log(" \n And I member  Member");
      await page.click(membersButtom);
      await page.click(membersButtom);
      await page.click(saveButtonUpdate);
      await expect(page.locator(deleteFinalButtom)).toHaveText(['Published']);
      await page.screenshot({path: `${config.pathReports}/1.28-memberMetaDataUrlValid-${index}.png`});
      
      console.log(" \n   Member success");
    });
  });

  test(`Scenario: 29. Crear member con metadata url canónica inválida`, async ({ page }) => {
    console.log(
      `  When I create a Member with <memberTitle>`);
    await page.click(membersNewButtom);
    await page.click(membersNewButtom);
    await page.fill(nameInput, membersDataPoolPsAl[8]['memberValidTitle']);
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Backspace');
    console.log(`Create member success `);

    console.log(
      "  And I set metadata valid canonical url to Member");
    await page.click(settingsMenuButton);
    await page.click(deleteButtom);
    await page.type(nameInput, membersDataPoolPsAl[6]['metaDataUrlValid']);
    await page.keyboard.press('Tab');

    console.log(" \n And I member  Member");
    await page.click(membersButtom);
    await page.click(membersButtom);
    await page.click(saveButtonUpdate);
    await page.screenshot({path: `${config.pathReports}/1.29-memberMetaDataUrlInvalid.png`});
    await expect(page.locator(publishErrorMessage)).toContainText(['Please enter a valid URL']);
    console.log(" \n   success: notsave member");
  });

  test('Scenario: 30. Crear member con excerpt aleatorio', async ({ page }) => {
    console.log(
      "  When I create a Member with <memberTitle>");
    await page.click(membersNewButtom);
    await page.click(membersNewButtom);
    await page.fill(nameInput, membersDataPoolPsAl[9]['memberValidTitle']);
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Backspace');
    
    console.log(
      "  And I set excerpt to Member ");
    await page.click(settingsMenuButton);
    await page.type(emailMInput  , faker.lorem.paragraph(3));

    console.log(" \n And I member  Member");
    await page.click(membersButtom);
    await page.click(saveButtonUpdate);
    await expect(page.locator(deleteFinalButtom)).toHaveText(['Member']);
    await page.screenshot({path: `${config.pathReports}/1.30-emailMInput  .png`});
    console.log(" \n   Member success");
  });
});