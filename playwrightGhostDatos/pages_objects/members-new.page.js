const Page = require("./page");

class MemberNewPage extends Page {
  get nameInput() {
    return "input#member-name";
  }
  get emailMInput() {
    return "input#member-email";
  }
  get descriptionInput() {
    return "textarea#member-note";
  }
  get saveButton() {
    return "section.view-actions button";
  }

  get settingsMenuButton() { return "button.settings-menu-toggle" }

  get saveButtonUpdate() {
    return "button.gh-btn-primary";
  }

  get deleteButtom() {
    return "button.mr2 span.red";
  }

  get deleteFinalButtom() {
    return "button.gh-btn-red";
  }

  get memberUrlInput() { return "input.gh-members-list-searchfield"}

  get searchInput() {
    return "input.gh-members-list-searchfield";
  }
  get descEditor() { return "div.koenig-editor__editor p" }
  get publishMenuButton() { return ".gh-publishmenu-trigger[role='button']" }
  get publishButton() { return "button.gh-publishmenu-button" }
  get unpublishRadio() { return ".gh-publishmenu-radio-button:nth-of-type(1)" }
  get publishConfirmButton() { return "div.modal-content .modal-footer button:nth-of-type(2)" }
  get publishConfirmMessage() { return ".gh-notification-title" }
  get publishErrorMessage() { return "div.gh-alert-content" }
  get showNotifications() { return "aside.gh-notifications" }
}

module.exports = new MemberNewPage();