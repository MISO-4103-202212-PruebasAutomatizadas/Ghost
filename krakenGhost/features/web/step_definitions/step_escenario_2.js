const { Given, When, Then } = require('@cucumber/cucumber');
const SignUpPage = require('../pages_objects/signup.page');

Given("I Create a account with {kraken-string} and {kraken-string} and {kraken-string} and {kraken-string}  ", async function(siteTitle, fullName, email, password) {
  SignUpPage.driver = this.driver;
  await SignUpPage.open();
  await SignUpPage.siteTitleInput.setValue(siteTitle);
  await SignUpPage.fullNameInput.setValue(fullName);
  await SignUpPage.emailInput.setValue(email);
  await SignUpPage.passwordInput.setValue(password)
  return await SignUpPage.signUpButton.click();  
});