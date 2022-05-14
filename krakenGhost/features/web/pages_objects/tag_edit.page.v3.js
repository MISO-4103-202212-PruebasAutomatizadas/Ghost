const Page = require('./page');

class TagEditPage extends Page {

  get nameInput() { return this._driver.$("input#tag-name") }
  get saveButton() { return this._driver.$("section.view-actions button") }
 
  async open(urlAdmin) {
    await super.open(`${urlAdmin}ghost/#/tags/new`)
  }
}

module.exports = new TagEditPage()