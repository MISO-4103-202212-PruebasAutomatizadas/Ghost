const Page = require("./page");

class TagNewPage extends Page {
  get nameInput() {
    return "input#tag-name";
  }
  get descriptionInput() {
    return "textarea#tag-description";
  }
  get saveButton() {
    return "section.view-actions button";
  }
}

module.exports = new TagNewPage();