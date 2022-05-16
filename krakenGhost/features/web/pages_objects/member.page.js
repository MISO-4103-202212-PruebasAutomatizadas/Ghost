const Page = require("./page");

class MemberPage extends Page {
  static memberEmailTest;

  get memberListItem() {
    return this._driver.$("p.gh-members-list-email=" + this.memberEmailTest);
  }

  get emailSearchInput() {
    return this._driver.$("input.gh-members-list-searchfield");
  }

  async open( urlBase ) {
    await super.open(urlBase + "members");
  }
}

module.exports = new MemberPage();