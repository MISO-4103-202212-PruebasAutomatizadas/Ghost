const Page = require("./page");

class MemberNewPage extends Page {
  static memberTest;

  get memberNameInput() {
    return this._driver.$("input[id='member-name']");
  }

  get memberEmailInput() {
    return this._driver.$("input[id='member-email']");
  }

  get memberDescriptionTextarea() {
    return this._driver.$("textarea[id='member-note']");
  }

  get saveButton() { return this._driver.$('button[class="gh-btn gh-btn-primary gh-btn-icon ember-view"]') }  

  async open() {
    await super.open("http://localhost:2368/ghost/#/members/new");
  }
}

module.exports = new MemberNewPage();