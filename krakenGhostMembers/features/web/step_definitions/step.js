const { Given, When, Then, By } = require('@cucumber/cucumber');
const LoginPage = require('../pages_objects/login.page');

Given("I login on Ghost page with {kraken-string} and {kraken-string}", async function(user, password) {
  LoginPage.driver = this.driver;
  await LoginPage.open();
  await LoginPage.emailInput.setValue(user);
  await LoginPage.passwInput.setValue(password);
  return await LoginPage.signInButton.click();
});

When('I click members', async function() {
  let element = await this.driver.$("[href='#/members/']");
  return await element.click();
})

Then('I click on the button new member', async function () {

  let element = await this.driver.$("[href='#/members/new/']");
  return await element.click();
});

When('I enter nombre {kraken-string}', async function (nombre) {
  let element = await this.driver.$('#member-name');
  return await element.setValue(nombre);
});

When('I enter apellido {kraken-string}', async function (apellido) {
  let element = await this.driver.$('#member-email');
  return await element.setValue(apellido);
});

When('I enter label {kraken-string}', async function (label) {
  let element = await this.driver.$("input[type='search']");
  return await element.setValue(label);
});

When('I enter note {kraken-string}', async function (note) {
  let element = await this.driver.$("#member-note");
  return await element.setValue(note);
});

When('I click Save', async function() {
  let element = await this.driver.$("section.view-actions button");
  return await element.click();
});

// When('I delete member {kraken-string}', async function (email) {
//   let element = await this.driver.$("p.gh-members-list-email="+email)

//   return await element.click();
// });