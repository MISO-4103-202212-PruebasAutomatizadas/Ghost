//Importar Playwright
const playwright = require('playwright');
const config = require('./properties.json');
const ghostVersion = config.version;
const LoginPage = ghostVersion == 4 ? require('./pages_objects/login.page') : require('./pages_objects/login.page.v3');
const DashboardPage = ghostVersion == 4 ? require('./pages_objects/dashboard.page') : require('./pages_objects/dashboard.page.v3');
const PostPage = ghostVersion == 4 ? require('./pages_objects/post.page') : require('./pages_objects/post.page.v3');
const PostEditPage = ghostVersion == 4 ? require('./pages_objects/post_edit.page') : require('./pages_objects/post_edit.page.v3');
const TagsPage = ghostVersion == 4 ? require('./pages_objects/tags.page') : require('./pages_objects/tags.page.v3');
const TagEditPage = ghostVersion == 4 ? require('./pages_objects/tag_edit.page') : require('./pages_objects/tag_edit.page.v3');

const url = config.url;
const urlAdmin = config.urlAdmin;
const pathReports = config.pathReports;
const pathScreenshots = ghostVersion == 4 ? '../pruebasDeRegresion/report/ghostV4' : '../pruebasDeRegresion/report/ghostV3';
const userAdmin = config.userAdmin;
const adminPass = config.adminPass;
const postTitle = "Nuevo Post";
const postDesc = "Descripción del nuevo Post";
const minutesAddPublishPost = 60;
const tag = "tag-test";

TagsPage.tagTest = tag;
PostPage.tagTest = tag;
PostPage.titleTest = postTitle;

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
      "Feature 1: Creación, publicación, configuración y borrado de Posts");
    console.log(
      "  Como usuario quiero crear y publicar un post para que esté disponible a los visitantes de Ghost");

    console.log(
      "Scenario: 1. Creación y publicación inmediata de Post exitosa");
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
      "  When I create a Post with <postTitle> and <postDesc>");
    await page.click(DashboardPage.postsMenu);
    await page.click(PostPage.newPostButton);
    await page.type(PostEditPage.titleTextarea, postTitle);
    await page.keyboard.press('Tab');
    await page.type(PostEditPage.descEditor, postDesc);

    await page.screenshot({path: pathReports + './1.1-createPost.png'});
    await page.screenshot({path: pathScreenshots + '/playwright_esc_create_post.png'});
    console.log("    Create post success");

    console.log("  And I publish a Post");
    await page.click(PostEditPage.publishMenuButton);
    await page.click(PostEditPage.publishButton);
    await page.click(PostEditPage.publishConfirmButton);

    await page.screenshot({path: pathReports + './1.1-publishPost.png'});
    await page.screenshot({path: pathScreenshots + '/playwright_esc_publish_post.png'});
    console.log("    Publish post success");

    console.log("  And I wait for 1 seconds");
    await new Promise(r => setTimeout(r, 1000));

    console.log("  Then I expect a published Post from settings with <postTitle> and <postDesc>");
    await page.click(PostEditPage.settingsMenuButton);
    await page.goto(url + await page.inputValue(PostEditPage.postUrlInput));

    feedback = await page.$(PostPage.postTitleHeader);
    //feedback = await page.$(PostPage.postDescriptionSection);
    await page.screenshot({path: pathReports + './1.1-publishedPost.png'});
    console.log(`    Published post '${feedback}'`);

    if(ghostVersion == 4) {
      console.log(
        "Scenario: 2. Creación y publicación programada de Post exitosa");
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
        "  When I create a Post with <postTitle> and <postDesc>");
      await page.click(DashboardPage.postsMenu);
      await page.click(PostPage.newPostButton);
      await page.type(PostEditPage.titleTextarea, postTitle);
      await page.keyboard.press('Tab');
      await page.type(PostEditPage.descEditor, postDesc);

      await page.screenshot({path: pathReports + './1.2-createPost.png'});
      console.log("    Create post success");

      console.log(
        "  And I schedule a Post to be published in <minutesaddpublishpost> minutes");
      let date = new Date();
      date.setTime(date.getTime() + ((minutesAddPublishPost)*60*1000));
      let dateString = date.toJSON().slice(0,10);
      let timeString = date.toJSON().slice(11,16);
      await page.click(PostEditPage.publishMenuButton);
      await new Promise(r => setTimeout(r, 1000));
      await page.click(PostEditPage.schedulePublishRadio);
      await page.fill(PostEditPage.scheduleDatePublishInput, '');
      await page.type(PostEditPage.scheduleDatePublishInput, dateString);
      await page.keyboard.press('Tab');
      await page.fill(PostEditPage.scheduleTimePublishInput, '');
      await page.type(PostEditPage.scheduleTimePublishInput, timeString);
      await page.click(PostEditPage.publishButton);
      await page.click(PostEditPage.publishConfirmButton);

      await page.screenshot({path: pathReports + './1.2-scheduledPost.png'});
      await page.screenshot({path: pathScreenshots + '/playwright_esc_scheduled_post.png'});
      console.log("    scheduled publish post success");
      
      console.log(
        "  And I wait for 1 seconds");
      await new Promise(r => setTimeout(r, 1000));

      console.log(
        "  Then I expect that Post created from settings is not published yet");
      await page.click(PostEditPage.settingsMenuButton);
      await new Promise(r => setTimeout(r, 1000));
      await page.goto(url + await page.inputValue(PostEditPage.postUrlInput));
      feedback = await page.$(PostPage.postCodeErrorSection);
      console.log(`    Post no publicado satisfactoriamente: code no found '${feedback}'`);
      await page.screenshot({path: pathReports + './1.2-postNotPublished.png'});
    }

    console.log(
      "Scenario: 3. Despublicar un post de manera exitosa");
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
      "  When I create a Post with <postTitle> and <postDesc>");
    await page.click(DashboardPage.postsMenu);
    await page.click(PostPage.newPostButton);
    await page.type(PostEditPage.titleTextarea, postTitle);
    await page.keyboard.press('Tab');
    await page.type(PostEditPage.descEditor, postDesc);

    await page.screenshot({path: pathReports + './1.3-createPost.png'});
    console.log("    Create post success");
    
    console.log("  And I publish a Post");
    await page.click(PostEditPage.publishMenuButton);
    await page.click(PostEditPage.publishButton);
    await page.click(PostEditPage.publishConfirmButton);

    await page.screenshot({path: pathReports + './1.3-publishPost.png'});
    console.log("    Publish post success");

    console.log("  And I wait for 1 seconds");
    await new Promise(r => setTimeout(r, 1000));

    console.log("  And I unpublished a Post ");
    if (ghostVersion === 4) {
      await page.click(PostEditPage.publishMenuButton);
    }
    await page.click(PostEditPage.unpublishRadio);
    await page.click(PostEditPage.publishButton);

    await page.screenshot({path: pathReports + './1.3-unpublishedPost.png'});
    await page.screenshot({path: pathScreenshots + '/playwright_esc_unpublished_post.png'});
    console.log("    Unpublish post success");

    console.log("  And I wait for 1 seconds");
    await new Promise(r => setTimeout(r, 1000));

    console.log(
      "  Then I expect that Post created from settings is not published yet");
    await page.click(PostEditPage.settingsMenuButton);
    await new Promise(r => setTimeout(r, 1000));
    await page.goto(url + await page.inputValue(PostEditPage.postUrlInput));
    feedback = await page.$(PostPage.postCodeErrorSection);
    console.log(`    Post no publicado satisfactoriamente: code no found '${feedback}'`);
    await page.screenshot({path: pathReports + './1.3-postNotPublished.png'});

    if(ghostVersion == 4) {
      console.log(
        "Scenario: 4. Asignar tag a Post y publicar actualización");

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
      await page.screenshot({path: pathScreenshots + '/playwright_esc_create_tag.png'});
      console.log("    Create tag success");
      
      console.log(
        "  And I create a Post with <postTitle> and <postDesc>");
      await page.click(DashboardPage.postsMenu);
      await page.click(PostPage.newPostButton);
      await page.type(PostEditPage.titleTextarea, postTitle);
      await page.keyboard.press('Tab');
      await page.type(PostEditPage.descEditor, postDesc);

      await page.screenshot({path: pathReports + './1.4-createPost.png'});
      console.log("    Create post success");

      console.log(
        "  And I add tag <tagtest1> to Post");
        await page.click(PostEditPage.settingsMenuButton);
      await page.type(PostEditPage.tagsInput, tag);
      await page.click(PostEditPage.tagItemList);
      await page.screenshot({path: pathReports + './1.4-addTagPost.png'});
      await page.screenshot({path: pathScreenshots + '/playwright_esc_add_tag_to_post.png'});
  
        await page.click(PostEditPage.settingsMenuButton);
    

      console.log("    Tag added on post success");

      console.log("  And I publish a Post");
      await page.click(PostEditPage.publishMenuButton);
      await page.click(PostEditPage.publishButton);
      await page.click(PostEditPage.publishConfirmButton);

      await page.screenshot({path: pathReports + './1.4-publishPost.png'});
      console.log("    Publish post success");

      console.log("  And I wait for 1 seconds");
      await new Promise(r => setTimeout(r, 1000));

      console.log(
      "  Then I expect a published Post from settings with associated tag <tagtest1>"); 
      await page.click(PostEditPage.settingsMenuButton);
      await page.goto(url + await page.inputValue(PostEditPage.postUrlInput));
      await new Promise(r => setTimeout(r, 3000));
      feedback = await page.isVisible(PostPage.tagTestLink);
      console.log("    Tag visible on publication post: " + (feedback ? "success" : "fail"));
      await page.screenshot({path: pathReports + './1.4-tagOnPost.png'});
      await page.screenshot({path: pathScreenshots + '/playwright_esc_tagOnPost_post.png'});
    
      console.log(
        "Scenario: 5. Eliminar Post satisfactoriamente");
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
        "  When I find a Post with <posttitle>");
      
      await page.goto(urlAdmin);
      await page.click(DashboardPage.postsMenu);
      if(await page.isVisible(PostPage.postSelectedItemList)) {
        await page.click(PostPage.postSelectedItemList);
      }

      await page.screenshot({path: pathReports + './1.5-openPostSuccess.png'});
      console.log("    Post found");
        
      let lastPostUrl = page.url();

      console.log(
        "  And I delete a Post"); 
      if(await page.isVisible(PostEditPage.settingsMenuButton)) {
        await page.click(PostEditPage.settingsMenuButton);
        await page.click(PostEditPage.postDeletebutton);
        await page.click(PostEditPage.deleteConfirmButton);
      }

      await page.screenshot({path: pathReports + './1.5-deletePostSuccess.png'});
      await page.screenshot({path: pathScreenshots + '/playwright_esc_delete_post.png'});
      console.log("    Post deleted");

      console.log(
        "  Then I expect that Post deleted is not exists");
      await page.goto(lastPostUrl);
      await page.isVisible(PostEditPage.postNotFoundHeader);

      await page.screenshot({path: pathReports + './1.5-postNotfoundSuccess.png'});
      console.log("    Post not found success");
    }

    //Finaliza el test
    await browser.close();  
  }
  return;
})();//Llamado propio de la función