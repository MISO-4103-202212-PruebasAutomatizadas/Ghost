const Page = require("./page");

class TagEditPage extends Page {
  get nameInput() {
    return "input#tag-name";
  }
  get saveButton() {
    return "section.view-actions button";
  }
  get deleteButton() {
    return 'button[class="gh-btn gh-btn-red gh-btn-icon"]';
  }
  get confirmDeleteButton() {
    return 'button[class="gh-btn gh-btn-red gh-btn-icon ember-view"]';
  }
}

module.exports = new TagEditPage();
