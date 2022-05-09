const { Given, When, Then } = require('@cucumber/cucumber');
const DashboardPage = require('../pages_objects/dashboard.page');
const TagsPage = require('../pages_objects/tags.page');
const TagEditPage = require('../pages_objects/tag_edit.page');
const PagePage = require('../pages_objects/page.page');
const PageEditPage = require('../pages_objects/page_edit.page');

When("I create a Page with {kraken-string} and {kraken-string}", async function(title, desc) {
    DashboardPage.driver = this.driver;
    PagePage.driver = this.driver;
    PageEditPage.driver = this.driver;
  
    await DashboardPage.open();
    await DashboardPage.pageMenu.waitForDisplayed({ timeout: 10000 });
    await DashboardPage.pageMenu.click();
    await PagePage.newPageButton.waitForDisplayed({ timeout: 10000 });
    await PagePage.newPageButton.click();
    await PageEditPage.titleTextarea.setValue(title);
    await PageEditPage.titleTextarea.addValue(['Tab']);
    await PageEditPage.descEditor.setValue(desc);
  });

  When("I publish a Page", async function() {
    PageEditPage.driver = this.driver;
    await PageEditPage.publishMenuButton.click();
    await PageEditPage.publishButton.click();
  });

  When("I unpublished a Page", async function() {
    PageEditPage.driver = this.driver;
    await PageEditPage.unpublishRadio.click();
    await PageEditPage.publishButton.click();
  });

  When("I Create a pagetag {kraken-string}", async function(tag) {
    DashboardPage.driver = this.driver;
    TagsPage.driver = this.driver;
    TagEditPage.driver = this.driver;
    TagsPage.tagTest = tag;
  
    await DashboardPage.open();
    await DashboardPage.tagsMenu.waitForDisplayed({ timeout: 10000 });
    await DashboardPage.tagsMenu.click();
    await TagsPage.tagsList.waitForDisplayed({ timeout: 10000 });
    if(!await TagsPage.tagListItem.isDisplayed()) {
      await TagsPage.newTagButton.waitForDisplayed({ timeout: 10000 });
      await TagsPage.newTagButton.click();
      await TagEditPage.nameInput.setValue(tag);
      await TagEditPage.saveButton.click();
    }
  });

  When("I add tag {kraken-string} to Page", async function(tag) {
    PageEditPage.driver = this.driver;
    await PageEditPage.settingsMenuButton.click();
    await PageEditPage.tagsInput.setValue(tag);
    await PageEditPage.tagItemList.click();
    await PageEditPage.settingsMenuButton.click();
  });

  When("I find a Page with {kraken-string}", async function(title) {
    DashboardPage.driver = this.driver;
    PagePage.driver = this.driver;
    PagePage.titleTest = title;
    await DashboardPage.open();
    await DashboardPage.pageMenu.waitForDisplayed({ timeout: 5000 });
    await DashboardPage.pageMenu.click();
    await PagePage.pagesList.waitForDisplayed({ timeout: 5000 });
    if( await PagePage.pageSelectedItemList.isDisplayed ) {
      await PagePage.pageSelectedItemList.click();
    }  
  });

  When("I delete a Page", async function() {
    PageEditPage.driver = this.driver;
    lastPostUrl = await this.driver.getUrl();
    
    if( await PageEditPage.settingsMenuButton.isDisplayed() ) {
      await PageEditPage.settingsMenuButton.click();
      await PageEditPage.pageDeletebutton.click();
      await PageEditPage.deleteConfirmButton.click();
    }
  });

  When("I schedule a Page to be published in {kraken-string} minutes", async function(minutesAddPublishPost) {
    PageEditPage.driver = this.driver;
    let date = new Date();
    date.setTime(date.getTime() + ((minutesAddPublishPost)*60*1000));
    let dateString = date.toJSON().slice(0,10);
    let timeString = date.toJSON().slice(11,16);
    await PageEditPage.publishMenuButton.click();
    await PageEditPage.schedulePublishRadio.waitForDisplayed({ timeout: 5000 });
    await PageEditPage.schedulePublishRadio.click();
    await PageEditPage.scheduleDatePublishInput.setValue(dateString);
    await PageEditPage.scheduleDatePublishInput.addValue(['Tab']);
    await PageEditPage.scheduleTimePublishInput.setValue(timeString);
    await PageEditPage.publishButton.click();
  });