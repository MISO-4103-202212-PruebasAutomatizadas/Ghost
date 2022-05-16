const Page = require("./page");

class MemberNewPage extends Page {
  get nameInput() {
    return "input#member-name";
  }
  get emailInput() {
    return "input#member-email";
  }
  get descriptionInput() {
    return "textarea#member-note";
  }
  get saveButton() {
    return "section.view-actions button";
  }

  get saveButtonUpdate() {
    return "button.gh-btn-blue";
  }

  get deleteButtom() {
    return "button.gh-btn-red";
  }

  get deleteFinalButtom() {
    return "button.gh-btn-red";
  }

  get searchInput() {
    return "input.gh-members-list-searchfield";
  }
}

module.exports = new MemberNewPage();