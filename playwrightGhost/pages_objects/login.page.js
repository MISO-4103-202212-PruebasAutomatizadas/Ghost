const Page = require('./page');

class LoginPage extends Page {

  get emailInput() { return 'input[type="email"]' }
  get passwInput() { return 'input[type="password"]' }
  get signInButton() { return 'button.js-login-button[type=submit]' }
  get dashboardHeader() { return 'header>h2' }

  /* async open() {
    await super.open('http://localhost:2368/ghost/#/signin')
  } */
}

module.exports = new LoginPage()