const Page = require("./page");

class SignUpPage extends Page {
  get siteTitleInput() {
    return this._driver.$('input#blog-title"]');
  }
  get fullNameInput() {
    return this._driver.$('input#name"]');
  }
  get emailInput() {
    return this._driver.$('input[type="email"]');
  }
  get passwordInput() {
    return this._driver.$('input[type="password"]');
  }
  get signUpButton() {
    return this._driver.$("button[type=submit]");
  }

  async open() {
    await super.open("http://localhost:2368/ghost/#/setup");
  }
}

module.exports = new SignUpPage();
