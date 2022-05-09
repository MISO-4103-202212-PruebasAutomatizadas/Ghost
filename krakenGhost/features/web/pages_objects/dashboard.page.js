const Page = require('./page');

class DashboardPage extends Page {

  get postsMenu() { return this._driver.$("a[href*='posts']") }
  get pageMenu() { return this._driver.$("a[href*='pages']") }
  get tagsMenu() { return this._driver.$("a[href$='tags/']") }

  async open() {
    await super.open('http://localhost:2368/ghost/#/dashboard')
  }
}

module.exports = new DashboardPage()