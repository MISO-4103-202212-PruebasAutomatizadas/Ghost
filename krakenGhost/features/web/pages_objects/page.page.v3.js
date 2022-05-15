const Page = require('./page');

class PagePage extends Page {

  static tagTest;
  static titleTest;

  get newPageButton() { return this._driver.$("a[href*='editor/page']") }
  get pageTitleHeader() { return this._driver.$("article.article header h1.article-title") }
  get pageDescriptionSection() { return this._driver.$("article.article section p") }
  get pageCodeErrorSection() { return this._driver.$("section.error-message h1.error-code") }
  get tagTestLink() { return this._driver.$("section.article-tag a[href$='"+this.tagTest+"/']") }
  get pagesList() { return this._driver.$("ol.gh-list") }
  get pageSelectedItemList() { return this._driver.$("h3.gh-content-entry-title="+this.titleTest) }

  async open() {
    await super.open('http://localhost:2368/ghost/#/pages')
  }

  async open(path) {
    await super.open("http://localhost:2368/" + path)
  }
}

module.exports = new PagePage()