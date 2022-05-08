const Page = require('./page');

class DashboardPage extends Page {

  get postsMenu() { return "a[href*='posts']" }
  get tagsMenu() { return "a[href$='tags/']" }

  /* async open() {
    await super.open('http://localhost:2368/ghost/#/dashboard')
  } */
}

module.exports = new DashboardPage()