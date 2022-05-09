module.exports = class Page {
  constructor() {
  }

  set driver(driver) { this._driver = driver }

  async open (path) {
      await this._driver.url(path)
  }
}
