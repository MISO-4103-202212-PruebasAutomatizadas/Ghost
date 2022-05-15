const Page = require("./page");

class MemberEditPage extends Page {

  get memberDescriptionTextarea() {
    return this._driver.$("textarea[id='member-note']");
  }
  get saveButton() { return this._driver.$('button[class="gh-btn gh-btn-primary gh-btn-icon ember-view"]') }  
  
  async open() {
    await super.open("http://localhost:2368/ghost/#/members");
  }
}

module.exports = new MemberEditPage();