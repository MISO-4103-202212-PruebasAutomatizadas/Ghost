const Page = require('./page');

class DashboardPage extends Page {

  get postsMenu() { return "a[href*='posts']" }
  get tagsMenu() { return "a[href$='tags/']" }
  get pageMenu() { return "a[href*='pages']" }

  /* async open() {
    await super.open('http://localhost:2368/ghost/#/dashboard')
  } */
}

module.exports = new DashboardPage()