const { Given, When, Then } = require('@cucumber/cucumber');
const properties = require('../../../properties.json');

const LoginPage = (properties.VERSIONGHOST == 3) ? require('../pages_objects/login.page.v3') : require('../pages_objects/login.page');
const DashboardPage = (properties.VERSIONGHOST == 3) ? require('../pages_objects/dashboard.page.v3') : require('../pages_objects/dashboard.page');
const PostPage = (properties.VERSIONGHOST == 3) ? require('../pages_objects/post.page.v3') : require('../pages_objects/post.page');
const PostEditPage = (properties.VERSIONGHOST == 3) ? require('../pages_objects/post_edit.page.v3') : require('../pages_objects/post_edit.page');
const TagsPage = (properties.VERSIONGHOST == 3) ? require('../pages_objects/tags.page.v3') : require('../pages_objects/tags.page');
const TagEditPage = (properties.VERSIONGHOST == 3) ? require('../pages_objects/tag_edit.page.v3') : require('../pages_objects/tag_edit.page');
const { postUrlLabel } = require('../pages_objects/post_edit.page');

let lastPostUrl;

Given("I login on Ghost page with {kraken-string} and {kraken-string}", async function(user, password) {
  LoginPage.driver = this.driver;
  await LoginPage.open(properties.URLADMIN);
  await LoginPage.emailInput.setValue(user);
  await LoginPage.passwInput.setValue(password);
  await this.driver.saveScreenshot(`${properties.PATHEXPORTSCREENSHOT}${properties.VERSIONGHOST}/kraken_esc_${this.userId}_login.png`);
  return await LoginPage.signInButton.click();
});

When("I create a Post with {kraken-string} and {kraken-string}", async function(title, desc) {
  DashboardPage.driver = this.driver;
  PostPage.driver = this.driver;
  PostEditPage.driver = this.driver;

  await DashboardPage.open(properties.URLADMIN);
  await DashboardPage.postsMenu.waitForDisplayed({ timeout: 5000 });
  await DashboardPage.postsMenu.click();
  await PostPage.newPostButton.waitForDisplayed({ timeout: 5000 });
  await PostPage.newPostButton.click();
  await PostEditPage.titleTextarea.setValue(title);
  await PostEditPage.titleTextarea.addValue(['Tab']);
  await PostEditPage.descEditor.setValue(desc);
  await this.driver.saveScreenshot(`${properties.PATHEXPORTSCREENSHOT}${properties.VERSIONGHOST}/kraken_esc_${this.userId}_create_post.png`);
});

When("I publish a Post", async function() {
  PostEditPage.driver = this.driver;
  await PostEditPage.publishMenuButton.click();
  await PostEditPage.publishButton.click();
  await PostEditPage.publishConfirmButton.click();
  await this.driver.saveScreenshot(`${properties.PATHEXPORTSCREENSHOT}${properties.VERSIONGHOST}/kraken_esc_${this.userId}_publish_post.png`);
});

When("I unpublished a Post", async function() {
  PostEditPage.driver = this.driver;
  if(!await PostEditPage.unpublishRadio.isDisplayed()) {
    await PostEditPage.publishMenuButton.click();
    await PostEditPage.unpublishRadio.waitForDisplayed({ timeout: 5000 });
  }
  await PostEditPage.unpublishRadio.click();
  await PostEditPage.publishButton.click();
  await this.driver.saveScreenshot(`${properties.PATHEXPORTSCREENSHOT}${properties.VERSIONGHOST}/kraken_esc_${this.userId}_publish_post.png`);
});

When("I schedule a Post to be published in {kraken-string} minutes", async function(minutesAddPublishPost) {
  PostEditPage.driver = this.driver;
  let date = new Date();
  date.setTime(date.getTime() + ((minutesAddPublishPost)*60*1000));
  let dateString = date.toJSON().slice(0,10);
  let timeString = date.toJSON().slice(11,16);
  await PostEditPage.publishMenuButton.click();
  await PostEditPage.schedulePublishRadio.waitForDisplayed({ timeout: 5000 });
  await PostEditPage.schedulePublishRadio.click();
  await PostEditPage.scheduleDatePublishInput.setValue(dateString);
  await PostEditPage.scheduleDatePublishInput.addValue(['Tab']);
  await PostEditPage.scheduleTimePublishInput.setValue(timeString);
  await PostEditPage.publishButton.click();
  await PostEditPage.publishConfirmButton.click();
  await this.driver.saveScreenshot(`${properties.PATHEXPORTSCREENSHOT}${properties.VERSIONGHOST}/kraken_esc_${this.userId}_schedule_post.png`);
});

When("I Create a tag {kraken-string}", async function(tag) {
  DashboardPage.driver = this.driver;
  TagsPage.driver = this.driver;
  TagEditPage.driver = this.driver;
  TagsPage.tagTest = tag;

  await DashboardPage.open(properties.URLADMIN);
  await DashboardPage.tagsMenu.waitForDisplayed({ timeout: 5000 });
  await DashboardPage.tagsMenu.click();
  await TagsPage.tagsList.waitForDisplayed({ timeout: 5000 });
  if(!await TagsPage.tagListItem.isDisplayed()) {
    await TagsPage.newTagButton.waitForDisplayed({ timeout: 5000 });
    await TagsPage.newTagButton.click();
    await TagEditPage.nameInput.setValue(tag);
    await TagEditPage.saveButton.click();
  }
  await this.driver.saveScreenshot(`${properties.PATHEXPORTSCREENSHOT}${properties.VERSIONGHOST}/kraken_esc_${this.userId}_create_tag.png`);
});

When("I add tag {kraken-string} to Post", async function(tag) {
  PostEditPage.driver = this.driver;
  await PostEditPage.settingsMenuButton.click();
  await PostEditPage.tagsInput.setValue(tag);
  await PostEditPage.tagItemList.click();
  await this.driver.saveScreenshot(`${properties.PATHEXPORTSCREENSHOT}${properties.VERSIONGHOST}/kraken_esc_${this.userId}_add_tag_post.png`);
  await PostEditPage.settingsMenuButton.click();
});

When("I find a Post with {kraken-string}", async function(title) {
  DashboardPage.driver = this.driver;
  PostPage.driver = this.driver;
  PostPage.titleTest = title;
  await DashboardPage.open(properties.URLADMIN);
  await DashboardPage.postsMenu.waitForDisplayed({ timeout: 5000 });
  await DashboardPage.postsMenu.click();
  await PostPage.postsList.waitForDisplayed({ timeout: 5000 });
  if( await PostPage.postSelectedItemList.isDisplayed ) {
    await this.driver.saveScreenshot(`${properties.PATHEXPORTSCREENSHOT}${properties.VERSIONGHOST}/kraken_esc_${this.userId}_find_post.png`);
    await PostPage.postSelectedItemList.click();
  }  
});

When("I delete a Post", async function() {
  PostEditPage.driver = this.driver;
  lastPostUrl = await this.driver.getUrl();
  
  if( await PostEditPage.settingsMenuButton.isDisplayed() ) {
    await PostEditPage.settingsMenuButton.click();
    await PostEditPage.postDeletebutton.click();
    await PostEditPage.deleteConfirmButton.waitForDisplayed({ timeout: 5000 });
    await PostEditPage.deleteConfirmButton.click();
    await this.driver.saveScreenshot(`${properties.PATHEXPORTSCREENSHOT}${properties.VERSIONGHOST}/kraken_esc_${this.userId}_delete_post.png`);
  }
});

Then("I expect a published Post from settings with {kraken-string} and {kraken-string}", async function(title, desc) {
  PostEditPage.driver = this.driver;
  PostPage.driver = this.driver;
  //await PostEditPage.settingsMenuButton.waitForDisplayed({ timeout: 5000 });
  await PostEditPage.settingsMenuButton.click();
  await PostEditPage.postUrlInput.waitForDisplayed({ timeout: 5000 });
  await PostPage.open(properties.URL, await PostEditPage.postUrlInput.getValue()); 
  await PostPage.postTitleHeader.isDisplayed();
  await PostPage.postDescriptionSection.isDisplayed();
  await this.driver.saveScreenshot(`${properties.PATHEXPORTSCREENSHOT}${properties.VERSIONGHOST}/kraken_esc_${this.userId}_published_post.png`);
  /* await expect(PostPage.postTitleHeader).toBeExisting();
  await expect(PostPage.postTitleHeader).toHaveTextContaining(title);
  await expect(PostPage.postDescriptionSection).toBeExisting();
  await expect(PostPage.postDescriptionSection).toHaveTextContaining(desc); */
});

Then("I expect that Post created from settings is not published yet", async function() {
  PostEditPage.driver = this.driver;
  PostPage.driver = this.driver;
  //await PostEditPage.settingsMenuButton.waitForDisplayed({ timeout: 5000 });
  await PostEditPage.settingsMenuButton.click();
  await PostEditPage.postUrlInput.waitForDisplayed({ timeout: 5000 });
  await PostPage.open(properties.URL, await PostEditPage.postUrlInput.getValue()); 
  await PostPage.postCodeErrorSection.isDisplayed();
  await this.driver.saveScreenshot(`${properties.PATHEXPORTSCREENSHOT}${properties.VERSIONGHOST}/kraken_esc_${this.userId}_not_published_post.png`);
});

Then("I expect a published Post from settings with associated tag {kraken-string}", async function(tag) {
  PostEditPage.driver = this.driver;
  PostPage.driver = this.driver;
  PostPage.tagTest = tag;
  await PostEditPage.settingsMenuButton.click();
  await PostEditPage.postUrlInput.waitForDisplayed({ timeout: 5000 });
  await PostPage.open(properties.URL, await PostEditPage.postUrlInput.getValue()); 
  await PostPage.tagTestLink.waitForDisplayed({ timeout:10000 });
  await PostPage.tagTestLink.isDisplayed();
  await this.driver.saveScreenshot(`${properties.PATHEXPORTSCREENSHOT}${properties.VERSIONGHOST}/kraken_esc_${this.userId}_tag_associated_post.png`);
});

Then("I expect that Post deleted is not exists", async function() {
  await PostEditPage.openPath(lastPostUrl);
  await PostEditPage.postNotFoundHeader.waitForDisplayed({ timeout: 5000 });
  await PostEditPage.postNotFoundHeader.isDisplayed();
  await this.driver.saveScreenshot(`${properties.PATHEXPORTSCREENSHOT}${properties.VERSIONGHOST}/kraken_esc_${this.userId}_post_not_exists.png`);
});

/* Given("I login on Ghost page with {kraken-string} and {kraken-string}", 
      async function(user, password) {
  
  await this.driver.url('http://localhost:2368/ghost/#/signin');
  
  let userInput = await this.driver.$('input[type="email"]');
  await userInput.setValue(user);
  let passwInput = await this.driver.$('input[type="password"]');
  await passwInput.setValue(password);
  let signInButton = await this.driver.$('button.js-login-button[type=submit]');
  await signInButton.click();
  return true;
}); */
