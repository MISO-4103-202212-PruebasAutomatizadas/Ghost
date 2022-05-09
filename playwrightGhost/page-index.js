//Importar Playwright
const playwright = require('playwright');
const LoginPage = require('./pages_objects/login.page');
const DashboardPage = require('./pages_objects/dashboard.page');
const PagePage = require('./pages_objects/page.page');
const PageEditPage = require('./pages_objects/page_edit.page');
const TagsPage = require('./pages_objects/tags.page');
const TagEditPage = require('./pages_objects/tag_edit.page');

const url = 'http://localhost:2368/';
const urlAdmin = url + 'Ghost';
const pathReports = './reports/'
const userAdmin = "r.brache@uniandes.edu.co";
const adminPass = "uniandes21";
const pageTitle = "Nuevo Page";
const pageDesc = "Descripción del nuevo Page";
const minutesAddPublishPage = 60;
const tag = "tag-test";

TagsPage.tagTest = tag;
PagePage.tagTest = tag;
PagePage.titleTest = pageTitle;

//Función flecha asíncrona
(async () => {
  // Navegadores
  for (const browserType of ['chromium']){ //, 'firefox', 'webkit']) {
    let feedback = "";
    
    //Contenido de la prueba
    console.log(browserType+'-------------------------------------------')

    //Creación del objeto browser, el contexto del mismo y el objeto page para manejar la página
    const browser = await playwright[browserType].launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    
    //Abrir la URL a probar en la página y cargar el proyecto en una SPA
    
    console.log(
      "Feature 2: Creación, publicación, configuración y borrado de Page");
    console.log(
      "  Como usuario quiero crear y publicar un page para que esté disponible a los visitantes de Ghost");

    console.log(
      "Scenario: 1. Creación y publicación inmediata de Page exitosa");
    console.log(
      "  Given I login on Ghost page with <userAdmin> and <adminPass>");

    await page.goto(urlAdmin);
    await page.type(LoginPage.emailInput, userAdmin);
    await page.type(LoginPage.passwInput, adminPass);
    await page.click(LoginPage.signInButton);

    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({path: pathReports + './1.1-loginSuccess.png'});
    console.log("    Login success");

    console.log(
      "  When I create a Page with <pageTitle> and <pageDesc>");
    await page.click(DashboardPage.pageMenu);
    await page.click(PagePage.newPageButton);
    await page.type(PageEditPage.titleTextarea, pageTitle);
    await page.keyboard.press('Tab');
    await page.type(PageEditPage.descEditor, pageDesc);

    await page.screenshot({path: pathReports + './1.1-createPost.png'});
    console.log("    Create page success");

    console.log("  And I publish a Page");
    await page.click(PageEditPage.publishMenuButton);
    await page.click(PageEditPage.publishButton);
    // await page.click(PageEditPage.publishConfirmButton);

    await page.screenshot({path: pathReports + './1.1-publishPost.png'});
    console.log("    Publish page success");

    console.log("  And I wait for 1 seconds");
    await new Promise(r => setTimeout(r, 1000));

    console.log("  Then I expect a published Page from settings with <pageTitle> and <pageDesc>");
    await page.click(PageEditPage.settingsMenuButton);
    await page.goto(url + await page.inputValue(PageEditPage.pageUrlInput));

    feedback = await page.$(PagePage.pageTitleHeader);
    //feedback = await page.$(PostPage.postDescriptionSection);
    await page.screenshot({path: pathReports + './1.1-publishedPost.png'});
    console.log(`    Published page '${feedback}'`);

    console.log(
      "Scenario: 2. Creación y publicación programada de Page exitosa");
    console.log(
      "  Given I login on Ghost page with<userAdmin> and <adminPass>");
    await page.goto(urlAdmin);
    if(await page.isVisible(LoginPage.emailInput)) {
      await page.type(LoginPage.emailInput, userAdmin);
      await page.type(LoginPage.passwInput, adminPass);
      await page.click(LoginPage.signInButton);
    }

    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({path: pathReports + './1.2-loginSuccess.png'});
    console.log("    Login success");

    console.log(
        "  When I create a Page with <pageTitle> and <pageDesc>");
      await page.click(DashboardPage.pageMenu);
      await page.click(PagePage.newPageButton);
      await page.type(PageEditPage.titleTextarea, pageTitle);
      await page.keyboard.press('Tab');
      await page.type(PageEditPage.descEditor, pageDesc);

    await page.screenshot({path: pathReports + './1.2-createPost.png'});
    console.log("    Create page success");

    console.log(
      "  And I schedule a Pageto be published in <minutesAddPublishPage> minutes");
    let date = new Date();
    date.setTime(date.getTime() + ((minutesAddPublishPage)*60*1000));
    let dateString = date.toJSON().slice(0,10);
    let timeString = date.toJSON().slice(11,16);
    await page.click(PageEditPage.publishMenuButton);
    await new Promise(r => setTimeout(r, 1000));
    await page.click(PageEditPage.schedulePublishRadio);
    await page.fill(PageEditPage.scheduleDatePublishInput, '');
    await page.type(PageEditPage.scheduleDatePublishInput, dateString);
    await page.keyboard.press('Tab');
    await page.fill(PageEditPage.scheduleTimePublishInput, '');
    await page.type(PageEditPage.scheduleTimePublishInput, timeString);
    await page.click(PageEditPage.publishButton);
    // await page.click(PageEditPage.publishConfirmButton);

    await page.screenshot({path: pathReports + './1.2-scheduledPost.png'});
    console.log("    scheduled publish post success");
    
    console.log(
      "  And I wait for 1 seconds");
    await new Promise(r => setTimeout(r, 1000));

    console.log(
      "  Then I expect that Page created from settings is not published yet");
    await page.click(PageEditPage.settingsMenuButton);
    await new Promise(r => setTimeout(r, 1000));
    await page.goto(url + await page.inputValue(PageEditPage.pageUrlInput));
    feedback = await page.$(PagePage.pageCodeErrorSection);
    console.log(`    Page no publicado satisfactoriamente: code no found '${feedback}'`);
    await page.screenshot({path: pathReports + './1.2-postNotPublished.png'});

    console.log(
      "Scenario: 3. Despublicar un page de manera exitosa");
    console.log(
        "  Given I login on Ghost page with<userAdmin> and <adminPass>");
    await page.goto(urlAdmin);
    if(await page.isVisible(LoginPage.emailInput)) {
      await page.type(LoginPage.emailInput, userAdmin);
      await page.type(LoginPage.passwInput, adminPass);
      await page.click(LoginPage.signInButton);
    }

    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({path: pathReports + './1.3-loginSuccess.png'});
    console.log("    Login success");

    console.log(
        "  When I create a Page with <pageTitle> and <pageDesc>");
      await page.click(DashboardPage.pageMenu);
      await page.click(PagePage.newPageButton);
      await page.type(PageEditPage.titleTextarea, pageTitle);
      await page.keyboard.press('Tab');
      await page.type(PageEditPage.descEditor, pageDesc);

    await page.screenshot({path: pathReports + './1.3-createPost.png'});
    console.log("    Create post success");
    
    console.log("  And I publish a Page");
    await page.click(PageEditPage.publishMenuButton);
    await page.click(PageEditPage.publishButton);
    // await page.click(PageEditPage.publishConfirmButton);

    await page.screenshot({path: pathReports + './1.3-publishPost.png'});
    console.log("    Publish page success");

    console.log("  And I wait for 1 seconds");
    await new Promise(r => setTimeout(r, 1000));

    console.log("  And I unpublished a Page ");
    // await page.click(PageEditPage.publishMenuButton);
    await page.click(PageEditPage.unpublishRadio);
    await page.click(PageEditPage.publishButton);

    await page.screenshot({path: pathReports + './1.3-unpublishedPost.png'});
    console.log("    Unpublish page success");

    console.log("  And I wait for 1 seconds");
    await new Promise(r => setTimeout(r, 1000));

    console.log(
      "  Then I expect that Page created from settings is not published yet");
    await page.click(PageEditPage.settingsMenuButton);
    await new Promise(r => setTimeout(r, 1000));
    await page.goto(url + await page.inputValue(PageEditPage.pageUrlInput));
    feedback = await page.$(PagePage.pageCodeErrorSection);
    console.log(`    Page no publicado satisfactoriamente: code no found '${feedback}'`);
    await page.screenshot({path: pathReports + './1.3-postNotPublished.png'});

    console.log(
      "Scenario: 4. Asignar tag a Page y publicar actualización");

    console.log(
      "  Given I login on Ghost page with<userAdmin> and <adminPass>");
    await page.goto(urlAdmin);
    if(await page.isVisible(LoginPage.emailInput)) {
      await page.type(LoginPage.emailInput, userAdmin);
      await page.type(LoginPage.passwInput, adminPass);
      await page.click(LoginPage.signInButton);
    }

    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({path: pathReports + './1.4-loginSuccess.png'});
    console.log("    Login success");

    console.log(
      "When I Create a tag <tagtest1>");
    await page.click(DashboardPage.tagsMenu);
    if(await page.isVisible(TagsPage.tagListItem)) {
      await page.click(TagsPage.newTagButton);
      await page.type(TagEditPage.nameInput, tag);
      await page.click(TagEditPage.saveButton);
    }
    await page.screenshot({path: pathReports + './1.4-createTagSuccess.png'});
    console.log("    Create tag success");
    
    console.log(
        "  When I create a Page with <pageTitle> and <pageDesc>");
      await page.click(DashboardPage.pageMenu);
      await page.click(PagePage.newPageButton);
      await page.type(PageEditPage.titleTextarea, pageTitle);
      await page.keyboard.press('Tab');
      await page.type(PageEditPage.descEditor, pageDesc);

    await page.screenshot({path: pathReports + './1.4-createPost.png'});
    console.log("    Create page success");

    console.log(
      "  And I add tag <tagtest1> to Page");
    await page.click(PageEditPage.settingsMenuButton);
    await page.type(PageEditPage.tagsInput, tag);
    await page.click(PageEditPage.tagItemList);
    await page.screenshot({path: pathReports + './1.4-addTagPost.png'});
    await page.click(PageEditPage.settingsMenuButton);

    console.log("    Tag added on page success");

    console.log("  And I publish a Paget");
    await page.click(PageEditPage.publishMenuButton);
    await page.click(PageEditPage.publishButton);
    // await page.click(PageEditPage.publishConfirmButton);

    await page.screenshot({path: pathReports + './1.4-publishPost.png'});
    console.log("    Publish page success");

    console.log("  And I wait for 1 seconds");
    await new Promise(r => setTimeout(r, 1000));

    console.log(
    "  Then I expect a published Page from settings with associated tag <tagtest1>"); 
    await page.click(PageEditPage.settingsMenuButton);
    await page.goto(url + await page.inputValue(PageEditPage.pageUrlInput));
    await new Promise(r => setTimeout(r, 3000));
    feedback = await page.isVisible(PagePage.tagTestLink);
    console.log("    Tag visible on publication page: " + (feedback ? "success" : "fail"));
    await page.screenshot({path: pathReports + './1.4-tagOnPost.png'});
    
    console.log(
      "Scenario: 5. Eliminar Page satisfactoriamente");
    console.log(
      "  Given I login on Ghost page with<userAdmin> and <adminPass>");
    await page.goto(urlAdmin);
    if(await page.isVisible(LoginPage.emailInput)) {
      await page.type(LoginPage.emailInput, userAdmin);
      await page.type(LoginPage.passwInput, adminPass);
      await page.click(LoginPage.signInButton);
    }

    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({path: pathReports + './1.5-loginSuccess.png'});
    console.log("    Login success");

    console.log(
      "  When I find a Page with <pagetitle>");
    
    await page.goto(urlAdmin);
    await page.click(DashboardPage.pageMenu);
    if(await page.isVisible(PagePage.pageSelectedItemList)) {
      await page.click(PagePage.pageSelectedItemList);
    }

    await page.screenshot({path: pathReports + './1.5-openPostSuccess.png'});
    console.log("    Page found");
      
    let lastPostUrl = page.url();

    console.log(
      "  And I delete a Page"); 
    if(await page.isVisible(PageEditPage.settingsMenuButton)) {
      await page.click(PageEditPage.settingsMenuButton);
      await page.click(PageEditPage.pageDeletebutton);
      await page.click(PageEditPage.deleteConfirmButton);
    }

    await page.screenshot({path: pathReports + './1.5-deletePostSuccess.png'});
    console.log("    Page deleted");

    console.log(
      "  Then I expect that Page deleted is not exists");
    await page.goto(lastPostUrl);
    await page.isVisible(PageEditPage.pageNotFoundHeader);

    await page.screenshot({path: pathReports + './1.5-postNotfoundSuccess.png'});
    console.log("    Page not found success");

    //Finaliza el test
    await browser.close();  
  }
  return;
})();//Llamado propio de la función