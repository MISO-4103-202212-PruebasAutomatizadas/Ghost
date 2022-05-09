const Page = require('./page');

class PagePage extends Page {

  static tagTest;
  static titleTest;

  get newPageButton() { return "a[href*='editor/page']" }
  get pageTitleHeader() { return "article.article header h1.article-title" }
  get pageDescriptionSection() { return "article.article section p" }
  get pageCodeErrorSection() { return "section.error-message h1.error-code" }
  get tagTestLink() { return "section.article-tag a[href$='"+this.tagTest+"/']" }
  get pagesList() { return "ol.gh-list" }
  get pageSelectedItemList() { return 'h3.gh-content-entry-title:has-text("'+this.titleTest+'")' }

  async open() {
    await super.open('http://localhost:2368/ghost/#/pages')
  }

  async open(path) {
    await super.open("http://localhost:2368/" + path)
  }
}

module.exports = new PagePage()