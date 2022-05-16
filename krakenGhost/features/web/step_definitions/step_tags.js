const { Given, When, Then } = require('@cucumber/cucumber');
const properties = require('../../../properties.json');

const TagsPage = (properties.VERSIONGHOST == 3) ? require('../pages_objects/tags.page.v3') : require('../pages_objects/tags.page');
const TagsNewPage = (properties.VERSIONGHOST == 3) ? require('../pages_objects/tags_new.page.v3') : require('../pages_objects/tags_new.page');
const TagsEditPage = (properties.VERSIONGHOST == 3) ? require('../pages_objects/tags_edit.page.v3') : require('../pages_objects/tags_edit.page');

Given("I create a new tag with {kraken-string} name and {kraken-string} description", async function(tagName, tagDescrition) {
  TagsNewPage.driver = this.driver;
  await TagsNewPage.open(properties.URLADMIN);
  await TagsNewPage.tagNameInput.setValue(tagName);
  await TagsNewPage.tagDescriptionTextarea.setValue(tagDescrition);  
  await TagsNewPage.saveButton.click();
  await this.driver.saveScreenshot(`${properties.PATHEXPORTSCREENSHOT}${properties.VERSIONGHOST}/kraken_esc_${this.userId}_create_tag.png`);
});

When("I find a tag with {kraken-string} name", async function(tagName) {
  TagsPage.driver = this.driver;
  TagsPage.tagTest = tagName;
  await TagsPage.open(properties.URL);
  await TagsPage.tagsList.waitForDisplayed({ timeout: 5000 });
  if(await TagsPage.tagListItem.isDisplayed()){    
    await this.driver.saveScreenshot(`${properties.PATHEXPORTSCREENSHOT}${properties.VERSIONGHOST}/kraken_esc_${this.userId}_find_tag.png`);
    await TagsPage.tagListItem.click();
  }
});

When("I update a tag with {kraken-string} slug and {kraken-string} description", async function(tagSlug, tagDescription) {
  TagsEditPage.driver = this.driver;
  TagsEditPage.tagSlug = tagSlug;
  await TagsEditPage.open(properties.URLADMIN);
  await TagsEditPage.tagDescriptionTextarea.setValue(tagDescription);
  await this.driver.saveScreenshot(`${properties.PATHEXPORTSCREENSHOT}${properties.VERSIONGHOST}/kraken_esc_${this.userId}_update_tag.png`);
  return await TagsEditPage.saveButton.click();  
});

Then("I deleted a tag with {kraken-string} slug", async function(tagSlug) {
  TagsEditPage.driver = this.driver;
  TagsEditPage.tagSlug = tagSlug;
  await TagsEditPage.open(properties.URLADMIN);
  await TagsEditPage.deleteButton.click();
  await this.driver.saveScreenshot(`${properties.PATHEXPORTSCREENSHOT}${properties.VERSIONGHOST}/kraken_esc_${this.userId}_delete_tag.png`);
  return await TagsEditPage.deleteConfirmButton.click();  
});