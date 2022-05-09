const Page = require("./page");

class TagsPage extends Page {
  static tagTest;

  get newTagButton() {
    return this._driver.$("a[href*='tags/new']");
  }
  get tagsList() {
    return this._driver.$("ol.tags-list");
  }
  get tagListItem() {
    return this._driver.$("h3.gh-tag-list-name=" + this.tagTest);
  }

  async open() {
    await super.open("http://localhost:2368/ghost/#/tags");
  }
}

module.exports = new TagsPage();