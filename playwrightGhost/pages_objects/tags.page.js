const Page = require('./page');

class TagsPage extends Page {

  static tagTest;

  get newTagButton() { return "a[href*='tags/new']" }
  get tagsList() { return "ol.tags-list" }
  get tagListItem() { return 'h3.gh-tag-list-name:has-text("' + this.tagTest + '")' }

 /*  async open() {
    await super.open('http://localhost:2368/ghost/#/tags')
  } */
}

module.exports = new TagsPage()