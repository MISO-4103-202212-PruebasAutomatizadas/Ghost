const Page = require('./page');

class PostPage extends Page {

  static tagTest;
  static titleTest;

  get newPostButton() { return this._driver.$("a[href*='editor/post']") }
  get postTitleHeader() { return this._driver.$("article.article header h1.article-title") }
  get postDescriptionSection() { return this._driver.$("article.article section p") }
  get postCodeErrorSection() { return this._driver.$("section.error-message h1.error-code") }
  get tagTestLink() { return this._driver.$("section.article-tag a[href$='"+this.tagTest+"/']") }
  get postsList() { return this._driver.$("ol.posts-list") }
  get postSelectedItemList() { return this._driver.$("h3.gh-content-entry-title="+this.titleTest) }

  async open() {
    await super.open('http://localhost:2368/ghost/#/posts')
  }

  async open(path) {
    await super.open("http://localhost:2368/" + path)
  }
}

module.exports = new PostPage()