const Page = require('./page');

class DashboardPage extends Page {

  get postsMenu() { return this._driver.$("a[href*='posts']") }
  get pageMenu() { return this._driver.$("a[href*='pages']") }
  get tagsMenu() { return this._driver.$("a[href$='tags/']") }

  async open(urlAdmin) {
    await super.open(`${urlAdmin}#/site`)
  }
}

module.exports = new DashboardPage()