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

  get saveButton() { return this._driver.$('button[class="gh-btn gh-btn-blue gh-btn-icon ember-view"]') }  

  async open( urlBase ) {
    await super.open(urlBase + "members/new");
  }
}

module.exports = new MemberNewPage();