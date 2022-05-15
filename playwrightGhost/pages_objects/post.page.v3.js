const Page = require('./page');

class PostPage extends Page {

  static tagTest;
  static titleTest;

  get newPostButton() { return "a[href*='editor/post']" }
  get postTitleHeader() { return "article.post header h1.post-full-title" }
  get postDescriptionSection() { return "article.post section.post-full-content p" }
  get postCodeErrorSection() { return "section.error-message h1.error-code" }
  get tagTestLink() { return "section.post-full-tags a[href$='"+this.tagTest+"/']" }
  get postsList() { return "ol.posts-list"}
  get postSelectedItemList() { return 'h3.gh-content-entry-title:has-text("'+this.titleTest+'")' }

  // async open(urlAdmin) {
  //   await super.open(`${urlAdmin}ghost/#/posts`)
  // }

  // async open(url, path) {
  //   await super.open(`${url}${path}`)
  // }
}

module.exports = new PostPage()