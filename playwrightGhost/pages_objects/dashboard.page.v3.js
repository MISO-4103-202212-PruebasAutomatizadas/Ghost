const Page = require('./page');

class DashboardPage extends Page {

  get postsMenu() { return "a[href*='posts']" }
  get pageMenu() { return "a[href*='pages']" }
  get tagsMenu() { return "a[href$='tags/']" }

  // async open(urlAdmin) {
  //   await super.open(`${urlAdmin}#/site`)
  // }
}

module.exports = new DashboardPage()