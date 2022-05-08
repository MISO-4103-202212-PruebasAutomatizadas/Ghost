const Page = require('./page');

class PostPage extends Page {

  static tagTest;
  static titleTest;

  get newPostButton() { return "a[href*='editor/post']" }
  get postTitleHeader() { return "article.article header h1.article-title" }
  get postDescriptionSection() { return "article.article section p" }
  get postCodeErrorSection() { return "section.error-message h1.error-code" }
  get tagTestLink() { return "section.article-tag a[href$='"+this.tagTest+"/']" }
  get postsList() { return "ol.posts-list" }
  get postSelectedItemList() { return 'h3.gh-content-entry-title:has-text("'+this.titleTest+'")' }

  /* async open() {
    await super.open('http://localhost:2368/ghost/#/posts')
  }

  async open(path) {
    await super.open("http://localhost:2368/" + path)
  } */
}

module.exports = new PostPage()