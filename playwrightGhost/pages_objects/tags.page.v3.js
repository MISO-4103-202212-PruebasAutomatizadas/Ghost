const Page = require("./page");

class TagsPage extends Page {
  static tagTest;

  get newTagButton() {
    return "a[href*='tags/new']";
  }
  get tagsList() {
    return "ol.tags-list";
  }
  get tagListItem() {
    return  'h3.gh-tag-list-name:has-text("' + this.tagTest + '")' ;
  }

  // async open(urlAdmin) {
  //   await super.open(`${urlAdmin}ghost/#/tags`);
  // }
}

module.exports = new TagsPage();