const Page = require('./page');

class PostEditPage extends Page {

  get titleTextarea() { return "textarea.gh-editor-title" }
  get descEditor() { return "div.koenig-editor__editor p:first-of-type" }
  get publishMenuButton() { return ".gh-publishmenu-trigger[role='button']" }
  get publishButton() { return "button.gh-publishmenu-button" }
  get unpublishRadio() { return ".gh-publishmenu-radio-button" }
  get publishConfirmButton() { return "button.gh-publishmenu-button" }
  //get publishConfirmButton() { return "div.modal-content .modal-footer button:nth-of-type(2)") }
  //get previewButton() { return "section.flex button:nth-of-type(1)") }
  get settingsMenuButton() { return "button.post-settings" }
  get settingsMenuOpenSpan() { return ".settings-menu-open" }
  get schedulePublishRadio() { return ".gh-publishmenu-radio:nth-of-type(2)" }
  get scheduleDatePublishInput() { return ".gh-date-time-picker-date input[type='text']" }
  get scheduleTimePublishInput() { return ".gh-date-time-picker-time input[type='text']" }
  //get postUrlLabel() { return "p.ghost-url-preview") }
  get postUrlInput() { return "#url" }
  get tagsInput() { return "#tag-input input.ember-power-select-trigger-multiple-input" }
  get tagItemList() { return ".ember-power-select-options" } 
  get pageDeletebutton() { return "button.settings-menu-delete-button" }
  get deleteConfirmButton() { return "section.modal-content .modal-footer button:nth-of-type(2)" }
  get pageNotFoundHeader() { return 'h1.error-code-size:has-text("404")' }

  // async open(urlAdmin) {
  //   await super.open(`${urlAdmin}ghost/#/editor/post`)
  // }

  // async openPath(path) {
  //   await super.open(path)
  // }
}
 
module.exports = new PostEditPage()