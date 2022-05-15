const playwright = require("playwright");
const LoginPage = require("./pages_objects/login.page");
const MemberPage = require("./pages_objects/members.page");
const MemberNewPage = require("./pages_objects/members-new.page");

// configuracion variables de entorno
const config = require('./conf.json');

(async () => {
    console.log
    for (const browserType of ["chromium"]) {
        const browser = await playwright[browserType].launch();
        const context = await browser.newContext();

        var page = await context.newPage();

        console.log(("Browser: " + browserType).padEnd(100, "_"));
        console.log("Feature: Gestion de tags de ghost".padEnd(100, "_"));
        console.log(
        "Como usuario quiero gestionar los miembros en ghost para usarse en la creacion de de un miembro".padEnd(
            100,
            "_"
        )
        );
        console.log("\r");

        // RUN SCENARIOS 1
        runScenarios(page);
    }

    async function runScenarios(page) {
        console.log("_".padEnd(100, "_"));
        console.log("Scenario: 1. Creación de un miembro exitoso".padEnd(100, "_"));
        console.log("Given I login on Ghost member with '<ADMIN1>' and '<PASSWORD1>' ".padEnd(100,"_"));
        await page.goto(config.urlAdmin);
        await page.type(LoginPage.emailInput, config.userAdmin);
        await page.type(LoginPage.passwInput, config.adminPass);
        await page.click(LoginPage.signInButton);
          
        await page.screenshot({ path: config.pathReports + "./1.1-loginSuccess.png" });
        await new Promise(r => setTimeout(r, 1000));
        await page.click(MemberPage.membersButtom);
        await new Promise(r => setTimeout(r, 1000));
        await page.click(MemberPage.membersNewButtom);
        await page.screenshot({ path: config.pathReports + "./1.1-createMember.png" });
        await new Promise(r => setTimeout(r, 1000));
        console.log(`When I create a new member with "test1" name and "test1@gmail.com" email and "test dev" note`)
        await page.type(MemberNewPage.nameInput, "test1");
        await page.type(MemberNewPage.emailInput, "test1@gmail.com");
        await page.type(MemberNewPage.descriptionInput, "prueba descripcion test1");
        await page.click(MemberNewPage.saveButton);
        await page.screenshot({ path: config.pathReports + "./1.2-createMember.png" });
        console.log(`Then I wait for 2 seconds`)
        await new Promise(r => setTimeout(r, 2000));
        ////////////////////////////////////////////////////////////////////////////////////////
        console.log("\n");
        console.log("_".padEnd(100, "_"));
        console.log("Scenario 2: Encontrar el miembro creado".padEnd(100, "_"));

        console.log(`Given I login on Ghost member with "<ADMIN1>" and "<PASSWORD1>"`)
        await page.goto(config.urlAdmin);
        await new Promise(r => setTimeout(r, 1000));
        if(await page.isVisible(LoginPage.emailInput)) {      
            await page.type(LoginPage.emailInput, config.userAdmin);
            await page.type(LoginPage.passwInput, config.adminPass);
            await page.click(LoginPage.signInButton);   
            await new Promise(r => setTimeout(r, 1000));   
        }
        
        await page.click(MemberPage.membersButtom);
        console.log(`When I wait for 10 seconds`)
        await new Promise(r => setTimeout(r, 10000));   
        console.log(`Then I find a member with "test1@gmail.com" email`);
        MemberPage.mermberEmailTest = "test1@gmail.com";
        await page.isVisible(MemberPage.memberListItem); 
        await page.click(MemberPage.memberListItem);
        await new Promise(r => setTimeout(r, 1000));   
        await page.screenshot({ path: config.pathReports + "./2.1-findMember.png" });
        ////////////////////////////////////////////////////////////////////////////////////////
        console.log("\n");
        console.log("_".padEnd(100, "_"));
        console.log("Scenario 3: Actualizacion de un miembro exitosamente".padEnd(100, "_"));
        
        console.log(`Given I login on Ghost page with "<ADMIN1>" and "<PASSWORD1>"`);
        await page.goto(config.urlAdmin);
        await new Promise(r => setTimeout(r, 1000));
        if(await page.isVisible(LoginPage.emailInput)) {      
            await page.type(LoginPage.emailInput, config.userAdmin);
            await page.type(LoginPage.passwInput, config.adminPass);
            await page.click(LoginPage.signInButton);   
            await new Promise(r => setTimeout(r, 1000));   
        }
        
        await page.click(MemberPage.membersButtom);
        console.log(`And I wait for 10 seconds`)
        await new Promise(r => setTimeout(r, 10000));
        console.log(`When I create a new member with "test3" name and "test3@gmail.com" email and "test dev3" note`);
        await page.click(MemberPage.membersNewButtom);
        await page.type(MemberNewPage.nameInput, "test3");
        await page.type(MemberNewPage.emailInput, "test3@gmail.com");
        await page.type(MemberNewPage.descriptionInput, "test dev3");
        await page.click(MemberNewPage.saveButton);
        await new Promise(r => setTimeout(r, 1000));
        console.log(`And I find a member with "test3@gmail.com" email`);
        await page.click(MemberPage.membersButtom);
        MemberPage.mermberEmailTest = "test3@gmail.com";
        await page.isVisible(MemberPage.memberListItem); 
        await page.click(MemberPage.memberListItem);
        console.log(`Then I wait for 5 seconds`);
        await new Promise(r => setTimeout(r, 5000));
        console.log(`And I update a member with "update information dev 3" note`);
        await page.type(MemberNewPage.descriptionInput, "test actualizacion dev3");
        await page.click(MemberNewPage.saveButtonUpdate);
        await page.screenshot({ path: config.pathReports + "./3.1-updateMember.png" });
    }
    return;
})();