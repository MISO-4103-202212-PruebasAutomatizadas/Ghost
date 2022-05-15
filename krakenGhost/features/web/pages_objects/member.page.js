const Page = require("./page");

class MemberPage extends Page {
  static memberEmailTest;

  get memberListItem() {
    return this._driver.$("p.gh-members-list-email=" + this.memberEmailTest);
  }

  get emailSearchInput() {
    return this._driver.$("input.gh-members-list-searchfield");
  }

  async open() {
    await super.open("http://localhost:2368/ghost/#/members");
  }
}

module.exports = new MemberPage();