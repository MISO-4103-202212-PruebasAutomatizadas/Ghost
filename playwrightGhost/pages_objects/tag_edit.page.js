const Page = require('./page');

class TagEditPage extends Page {

  get nameInput() { return "input#tag-name" }
  get saveButton() { return "section.view-actions button" }
 
  /* async open() {
    await super.open('http://localhost:2368/ghost/#/editor/post')
  } */
}

module.exports = new TagEditPage()