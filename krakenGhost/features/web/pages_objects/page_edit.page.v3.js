const Page = require('./page');

class PageEditPage extends Page {

  get titleTextarea() { return this._driver.$("textarea.gh-editor-title") }
  get descEditor() { return this._driver.$("div.koenig-editor__editor p:first-of-type") }
  get publishMenuButton() { return this._driver.$(".gh-publishmenu-trigger[role='button']") }
  get publishButton() { return this._driver.$("button.gh-publishmenu-button") }
  get unpublishRadio() { return this._driver.$(".gh-publishmenu-radio-button") }
  get publishConfirmButton() { return this._driver.$("button.gh-publishmenu-button") }
  //get previewButton() { return this._driver.$("section.flex button:nth-of-type(1)") }
  get settingsMenuButton() { return this._driver.$("button.post-settings") }
  get settingsMenuOpenSpan() { return this._driver.$(".settings-menu-open") }
  get schedulePublishRadio() { return this._driver.$(".gh-publishmenu-radio:nth-of-type(2)") }
  get scheduleDatePublishInput() { return this._driver.$(".gh-date-time-picker-date input[type='text']") }
  get scheduleTimePublishInput() { return this._driver.$(".gh-date-time-picker-time input[type='text']") }
  //get postUrlLabel() { return this._driver.$("p.ghost-url-preview") }
  get postUrlInput() { return this._driver.$("#url") }
  get tagsInput() { return this._driver.$("input.ember-power-select-trigger-multiple-input") }
  get tagItemList() { return this._driver.$(".ember-power-select-options") } 
  get pageDeletebutton() { return this._driver.$("button.settings-menu-delete-button") }
  get deleteConfirmButton() { return this._driver.$("section.modal-content .modal-footer button:nth-of-type(2)") }
  get postNotFoundHeader() { return this._driver.$("h1.error-code-size=404") }

  async open() {
    await super.open('http://localhost:2368/ghost/#/editor/page')
  }

  async open(path) {
    await super.open(path)
  }
}

module.exports = new PageEditPage()