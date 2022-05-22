const Page = require('./page');

class PostEditPage extends Page {

  get titleTextarea() { return "textarea.gh-editor-title" }
  //get descEditor() { return "div.koenig-editor__editor p:first-of-type" }
  get descEditor() { return "div.koenig-editor__editor p" }
  get publishMenuButton() { return ".gh-publishmenu-trigger[role='button']" }
  get publishButton() { return "button.gh-publishmenu-button" }
  get unpublishRadio() { return ".gh-publishmenu-radio-button:nth-of-type(1)" }
  get publishConfirmButton() { return "div.modal-content .modal-footer button:nth-of-type(2)" }
  get publishConfirmMessage() { return ".gh-notification-title" }
  get publishErrorMessage() { return "div.gh-alert-content" }
  get showNotifications() { return "aside.gh-notifications" }
  //get previewButton() { return "section.flex button:nth-of-type(1)" }
  get settingsMenuButton() { return "button.settings-menu-toggle" }
  get settingsMenuOpenSpan() { return ".settings-menu-open" }
  get schedulePublishRadio() { return ".gh-publishmenu-radio:nth-of-type(2)" }
  get scheduleDatePublishInput() { return ".gh-date-time-picker-date input[type='text']" }
  get scheduleTimePublishInput() { return ".gh-date-time-picker-time input[type='text']" }
  get showScheduleError() { return "div.gh-date-time-picker-error" }
  //get postUrlLabel() { return "p.ghost-url-preview" }
  get postUrlInput() { return "#url" }
  get tagsInput() { return "input.ember-power-select-trigger-multiple-input" }
  get tagItemList() { return ".ember-power-select-options" } 
  get postDeletebutton() { return "button.settings-menu-delete-button" }
  get deleteConfirmButton() { return "div.modal-content .modal-footer button:nth-of-type(2)" }
  get postNotFoundHeader() { return 'h1.error-code-size:has-text("404")' }
  get postAuthorInput() { return 'div#author-list input.ember-power-select-trigger-multiple-input' }
  get authorDropButton() { return "div#author-list .ember-power-select-multiple-remove-btn" }
  get metaDataButton() { return "ul.nav-list-block > li.nav-list-item:nth-of-type(1) > button" }
  get metaDataTitleInput() { return "input[name=post-setting-meta-title]" }
  get metaDataDescInput() { return "textarea[name=post-setting-meta-description]" }
  get metaDataUrlInput() { return "input[name=post-setting-canonicalUrl]" }
  //get metaDataTitleRecomMessage() { return "div.settings-menu-pane-wide b:first" }
  get metaDataRecomMessage() { return "div.settings-menu-pane-wide .form-group p" }
  get postAddElementMenu() { return "div[data-kg=plus-menu]" }
  get postAddElement() { return "button.koenig-plus-menu-button" }
  //get postMarkdownElementItem() { return "div.koenig-cardmenu div[title='Markdown']" }
  get postMarkdownElementItem() { return 'div.koenig-cardmenu div.kg-cardmenu-card-hover:nth-of-type(3)' }
  get postMarkdownInput() { return "div.CodeMirror-code pre.CodeMirror-line" }
  get postExcerpt() { return "textarea[name=post-setting-custom-excerpt]" }
  
  
  /*  async open() {
    await super.open('http://localhost:2368/ghost/#/editor/post')
  }

  async open(path) {
    await super.open(path)
  } */
}

module.exports = new PostEditPage()