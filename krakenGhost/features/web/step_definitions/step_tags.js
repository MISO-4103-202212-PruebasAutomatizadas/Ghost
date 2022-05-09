const { Given, When, Then } = require('@cucumber/cucumber');
const TagsPage = require('../pages_objects/tags.page');
const TagsNewPage = require('../pages_objects/tags_new.page');
const TagsEditPage = require('../pages_objects/tags_edit.page');

Given("I create a new tag with {kraken-string} name and {kraken-string} description", async function(tagName, tagDescrition) {
  TagsNewPage.driver = this.driver;
  await TagsNewPage.open();
  await TagsNewPage.tagNameInput.setValue(tagName);
  await TagsNewPage.tagDescriptionTextarea.setValue(tagDescrition); 
  return await TagsNewPage.saveButton.click();  
});

When("I find a tag with {kraken-string} name", async function(tagName) {
  TagsPage.driver = this.driver;
  TagsPage.tagTest = tagName;

  await TagsPage.open();
  await TagsPage.tagsList.waitForDisplayed({ timeout: 5000 });
  if(await TagsPage.tagListItem.isDisplayed()){
    await TagsPage.tagListItem.click();
  }
})

When("I update a tag with {kraken-string} slug and {kraken-string} description", async function(tagSlug, tagDescription) {
  TagsEditPage.driver = this.driver;
  TagsEditPage.tagSlug = tagSlug;

  await TagsEditPage.open();
  await TagsEditPage.tagDescriptionTextarea.setValue(tagDescription);
  return await TagsEditPage.saveButton.click();  
})

Then("I deleted a tag with {kraken-string} slug", async function(tagSlug) {
  TagsEditPage.driver = this.driver;
  TagsEditPage.tagSlug = tagSlug;

  await TagsEditPage.open();
  await TagsEditPage.deleteButton.click();
  return await TagsEditPage.deleteConfirmButton.click();  
})