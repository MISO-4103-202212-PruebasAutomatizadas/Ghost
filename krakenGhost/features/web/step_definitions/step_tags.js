const { Given, When, Then } = require('@cucumber/cucumber');
const TagsNewPage = require('../pages_objects/tags_new.page');
const TagsPage = require('../pages_objects/tags.page');

Given("I Create a new tag with {kraken-string} and {kraken-string} and {kraken-string}", async function(tagName, tagSlug, tagDescrition) {
  TagsNewPage.driver = this.driver;
  await TagsNewPage.open();
  await TagsNewPage.tagNameInput.setValue(tagName);
  await TagsNewPage.tagSlugInput.setValue(tagSlug);
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