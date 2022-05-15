const Page = require('./page');

class TagEditPage extends Page {

  get nameInput() { return "input#tag-name" }
  get saveButton() { return "section.view-actions button" }
 
  // async open(urlAdmin) {
  //   await super.open(`${urlAdmin}ghost/#/tags/new`)
  // }
}

module.exports = new TagEditPage()