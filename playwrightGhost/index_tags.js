const playwright = require("playwright");
const LoginPage = require("./pages_objects/login.page");

const url = "http://localhost:2368/";
const urlAdmin = url + "Ghost";
const pathReports = "./reports/";
const userAdmin = "moralejov@gmail.com";
const adminPass = "abcd1234*$";

(async () => {
  for (const browserType of ["chromium"]) {
    let feedback = "";
    const browser = await playwright[browserType].launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    /* SETTINGS -------------------------------------------------------------- */
    console.log(("Browser: " + browserType).padEnd(100, "_"));
    console.log("Feature: Gestion de tags de ghost".padEnd(100, "_"));
    console.log("Description: Como usuario quiero gestionar los tags en ghost para usarse en la creacion de post".padEnd(100, "_"));
    console.log("\r");

    /* ESCENARIO 1 -------------------------------------------------------------- */
    escenario_1(page);

    /* ESCENARIO 2 -------------------------------------------------------------- */
    escenario_2(page);

    /* ESCENARIO 3 -------------------------------------------------------------- */
    //escenario_3(page);

    /* ESCENARIO 4 -------------------------------------------------------------- */
    //escenario_4(page);

    /* ESCENARIO 5 -------------------------------------------------------------- */
    //escenario_5(page);
  }

  async function login(page) {
    await page.goto(urlAdmin);
    if (await page.isVisible(LoginPage.emailInput)) {
      await page.type(LoginPage.emailInput, userAdmin);
      await page.type(LoginPage.passwInput, adminPass);
      await page.click(LoginPage.signInButton);
      await new Promise((r) => setTimeout(r, 1000));
      await page.screenshot({ path: pathReports + "./1.1-loginSuccess.png" });
    }
    console.log("Login success".padEnd(100, "_"));
  }

  async function escenario_1(page) {
    console.log("Scenario: 1. Creación de un tag exitoso".padEnd(100, "_"));
    console.log("Given I login on Ghost page with <ADMIN1> and <PASSWORD1>".padEnd(100, "_"))
    await login(page);
  }

  async function escenario_2(page) {
    console.log("\n");
  }

  async function escenario_3(page) {
    await page.goto(urlAdmin);
    if (await page.isVisible(LoginPage.emailInput)) await login(page);
  }

  async function escenario_4(page) {
    await page.goto(urlAdmin);
    if (await page.isVisible(LoginPage.emailInput)) await login(page);
  }

  async function escenario_5(page) {
    await page.goto(urlAdmin);
    if (await page.isVisible(LoginPage.emailInput)) await login(page);
  }

  return;
})();
