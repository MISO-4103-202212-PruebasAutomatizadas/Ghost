const playwright = require("playwright");
const properties  = require('./properties.json');

const LoginPage = properties.version == 4 ? require('./pages_objects/login.page') : require('./pages_objects/login.page.v3');
const DashboardPage = properties.version == 4 ? require('./pages_objects/dashboard.page') : require('./pages_objects/dashboard.page.v3');
const TagsPage = properties.version == 4 ? require('./pages_objects/tags.page') : require('./pages_objects/tags.page.v3');

const TagNewPage = properties.version == 4 ? require('./pages_objects/tags_new.page') :  require('./pages_objects/tags_new.page.v3');
const TagEditPage = require('./pages_objects/tag_edit.page');

const url = properties.url;
const urlAdmin = url + "Ghost";
const pathReports = "./reports/";
const pathScreenshots = properties.version == 4 ? '../pruebasDeRegresion/report/ghostV4' : '../pruebasDeRegresion/report/ghostV3';
const userAdmin = properties.userAdmin;
const adminPass = properties.adminPass;

(async () => {
  for (const browserType of ["chromium"]) {
    const browser = await playwright[browserType].launch();
    const context = await browser.newContext();
    var page = await context.newPage();

    // SETTINGS
    console.log(("Browser: " + browserType).padEnd(100, "_"));
    console.log("Feature: Gestion de tags de ghost".padEnd(100, "_"));
    console.log("Description: Como usuario quiero gestionar los tags en ghost para usarse en la creacion de post".padEnd(100,"_"));
    console.log("\r");

    // RUN SCENARIOS 1
    runScenarios(page);
  }

  async function runScenarios(page) {

    console.log(urlAdmin);
    console.log("_".padEnd(100, "_"));
    console.log("Scenario: 1. Creación de un tag exitoso".padEnd(100, "_"));
    console.log("Given I login on Ghost page with <ADMIN1> and <PASSWORD1>".padEnd(100,"_"));
    await page.goto(urlAdmin);
    await page.type(LoginPage.emailInput, userAdmin);
    await page.type(LoginPage.passwInput, adminPass);
    await page.click(LoginPage.signInButton);       
    await new Promise(r => setTimeout(r, 5000)); 
    
    await page.click(DashboardPage.tagsMenu);
    await page.click(TagsPage.newTagButton);   

    await page.screenshot({ path: pathReports + "./playwright_esc_create_tag.png" });    
    await page.screenshot({path: pathScreenshots + '/playwright_esc_create_post.png'});

    console.log(`When I create a new tag with tag_1 name and "description_tag_1" description`)
    TagsPage.tagTest = "tag_1";
    await page.type(TagNewPage.nameInput, "tag_1");
    await page.type(TagNewPage.descriptionInput, "description_tag_1");
    await page.click(TagNewPage.saveButton);
  
    console.log("Then I wait for 1 seconds".padEnd(100, "_"));
    await new Promise(r => setTimeout(r, 1000));
  
    ////////////////////////////////////////////////////////////////////////////////////////
    console.log("\n");
    console.log("_".padEnd(100, "_"));
    console.log("Scenario: 2. Encontrar de un tag creado".padEnd(100, "_"));
    
    console.log("Given I login on Ghost page with <ADMIN1> and <PASSWORD1>".padEnd(100,"_"));
    await page.goto(urlAdmin);
    if(await page.isVisible(LoginPage.emailInput)) {      
      await page.type(LoginPage.emailInput, userAdmin);
      await page.type(LoginPage.passwInput, adminPass);
      await page.click(LoginPage.signInButton);      
    }
    
    console.log(`When I create a new tag with tag_2 name and "description_tag_2" description`);
    await page.click(DashboardPage.tagsMenu);
    await page.click(TagsPage.newTagButton);
    await page.type(TagNewPage.nameInput, "tag_2");
    await page.type(TagNewPage.descriptionInput, "description_tag_2");
    await page.click(TagNewPage.saveButton);

    console.log("And I wait for 1 seconds".padEnd(100, "_"));
    await new Promise(r => setTimeout(r, 1000));

    console.log('And I find a tag with "tag_2" name'.padEnd(100, "_"));
    TagsPage.tagTest = "tag_2";
    await page.click(DashboardPage.tagsMenu);
    await page.isVisible(TagsPage.tagListItem);

    await page.screenshot({ path: pathReports + "./playwright_esc_find_tag.png" });
    await page.screenshot({path: pathScreenshots + '/playwright_esc_find_tag.png'});

    console.log("Then I wait for 1 seconds".padEnd(100, "_"))
    await new Promise(r => setTimeout(r, 1000));

    ////////////////////////////////////////////////////////////////////////////////////////
    console.log("\n");
    console.log("_".padEnd(100, "_"));
    console.log("Scenario: 3. Actualizacion de un tag exitosa".padEnd(100, "_"));
    console.log("Given I login on Ghost page with <ADMIN1> and <PASSWORD1>".padEnd(100,"_"));
    await page.goto(urlAdmin);
    if(await page.isVisible(LoginPage.emailInput)) {
      await page.type(LoginPage.emailInput, userAdmin);
      await page.type(LoginPage.passwInput, adminPass);
      await page.click(LoginPage.signInButton);
    }

    console.log(`When I create a new tag with tag_3 name and "description_tag_3" description`);
    await page.click(DashboardPage.tagsMenu);
    await page.click(TagsPage.newTagButton);
    await page.type(TagNewPage.nameInput, "tag_3");
    await page.type(TagNewPage.descriptionInput, "description_tag_3");
    await page.click(TagNewPage.saveButton);

    console.log("And I wait for 1 seconds".padEnd(100, "_"));
    await new Promise(r => setTimeout(r, 1000));

    console.log('And I find a tag with "tag_3" name');
    TagsPage.tagTest = "tag_3";
    await page.click(DashboardPage.tagsMenu);
    await page.click(TagsPage.tagListItem);
    
    console.log('And I update a tag with "tag_3" slug and "description_tag_3_update" description');
    await page.type(TagNewPage.descriptionInput, "description_tag_3_update");
    
    await page.screenshot({ path: pathReports + "./playwright_esc_update_tag.png" });    
    await page.screenshot({path: pathScreenshots + '/playwright_esc_update_tag.png'});

    await page.click(TagEditPage.saveButton);

    console.log("Then I wait for 1 seconds")
    await new Promise(r => setTimeout(r, 1000));

    ////////////////////////////////////////////////////////////////////////////////////////
    console.log("\n");
    console.log("_".padEnd(100, "_"));
    console.log("Scenario: 4. Eliminacion de un tag exitoso".padEnd(100, "_"));
    console.log("Given I login on Ghost page with <ADMIN1> and <PASSWORD1>".padEnd(100,"_"));
    await page.goto(urlAdmin);
    if(await page.isVisible(LoginPage.emailInput)) {
      await page.type(LoginPage.emailInput, userAdmin);
      await page.type(LoginPage.passwInput, adminPass);
      await page.click(LoginPage.signInButton);
    }

    console.log(`When I create a new tag with tag_4 name and "description_tag_4" description`);
    await page.click(DashboardPage.tagsMenu);
    await page.click(TagsPage.newTagButton);
    await page.type(TagNewPage.nameInput, "tag_4");
    await page.type(TagNewPage.descriptionInput, "description_tag_4");
    await page.click(TagNewPage.saveButton);

    console.log("And I wait for 1 seconds".padEnd(100, "_"));
    await new Promise(r => setTimeout(r, 1000));

    console.log('And I find a tag with "tag_4" name');
    TagsPage.tagTest = "tag_4";
    await page.click(DashboardPage.tagsMenu);
    await page.click(TagsPage.tagListItem);

    console.log("And I wait for 1 seconds".padEnd(100, "_"));
    await new Promise(r => setTimeout(r, 1000));

    console.log('And I deleted a tag with "tag_4" slug');
    await page.click(TagEditPage.deleteButton);

    await page.screenshot({ path: pathReports + "./playwright_esc_delete_tag.png" });
    await page.screenshot({path: pathScreenshots + '/playwright_esc_delete_tag.png'});

    await page.click(TagEditPage.confirmDeleteButton);

    console.log("Then I wait for 1 seconds".padEnd(100, "_"));
    await new Promise(r => setTimeout(r, 1000));  
  }

  return;
})();
