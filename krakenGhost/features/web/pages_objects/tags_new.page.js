const Page = require("./page");

class TagsNewPage extends Page {
  static tagTest;

  get tagNameInput() {
    return this._driver.$("input[id='tag-name']");
  }
  get tagSlugInput() {
    return this._driver.$("input[id='tag-slug']");
  }
  get tagDescriptionTextarea() {
    return this._driver.$("textarea[id='tag-description']");
  }

  get saveButton() { return this._driver.$('button[class="gh-btn gh-btn-primary gh-btn-icon ember-view"]') }  

  async open() {
    await super.open("http://localhost:2368/ghost/#/tags/new");
  }
}

module.exports = new TagsNewPage();