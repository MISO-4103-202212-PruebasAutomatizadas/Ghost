const Page = require('./page');

class LoginPage extends Page {

  get emailInput() { return'input[type="email"]' }
  get passwInput() { return'input[type="password"]' }
  get signInButton() { return'button.login[type=submit]' }
  get dashboardHeader() { return'header>h2' }

  // async open(urlAdmin) {
  //   await super.open(`${urlAdmin}#/signin`)
  // }
}

module.exports = new LoginPage()