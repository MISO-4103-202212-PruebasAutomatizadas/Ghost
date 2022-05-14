const Page = require('./page');

class LoginPage extends Page {

  get emailInput() { return this._driver.$('input[type="email"]') }
  get passwInput() { return this._driver.$('input[type="password"]') }
  get signInButton() { return this._driver.$('button.login[type=submit]') }
  get dashboardHeader() { return this._driver.$('header>h2') }

  async open(urlAdmin) {
    await super.open(`${urlAdmin}#/signin`)
  }
}

module.exports = new LoginPage()