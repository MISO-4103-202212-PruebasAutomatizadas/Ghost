const Page = require('./page');

class LoginPage extends Page {

  get emailInput() { return this._driver.$('input[type="email"]') }
  get passwInput() { return this._driver.$('input[type="password"]') }
  get signInButton() { return this._driver.$('button.js-login-button[type=submit]') }
  get dashboardHeader() { return this._driver.$('header>h2') }

  async open() {
    await super.open('http://localhost:2368/ghost/#/signin')
  }
}

module.exports = new LoginPage()