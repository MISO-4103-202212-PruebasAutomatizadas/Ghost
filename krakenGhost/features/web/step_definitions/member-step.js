const { Given, When, Then } = require('@cucumber/cucumber');
const properties = require('../../../properties.json');

const LoginPage = (properties.VERSIONGHOST == 3) ? require('../pages_objects/login.page.v3') : require('../pages_objects/login.page');
const MemberNewPage = (properties.VERSIONGHOST == 3) ? require('../pages_objects/member_create.page.v3') : require('../pages_objects/member_create.page');
const Member = require('../pages_objects/member.page');
const MemberEdit = require('../pages_objects/member_edit.page');
const MemberDelete = require('../pages_objects/member_delete.page');

const MemberGhost = {
    init() {
        this.loginMember();
        this.createMember();
        this.findMember();
        this.updateMember();
        this.deleteMember();
        this.search();
    },
    loginMember() {
        Given("I login on Ghost member with {kraken-string} and {kraken-string}", async function(user, password) {
            LoginPage.driver = this.driver;
            await LoginPage.open(properties.URLADMIN);
            await LoginPage.emailInput.setValue(user);
            await LoginPage.passwInput.setValue(password);
            await this.driver.saveScreenshot(`${properties.PATHEXPORTSCREENSHOT}${properties.VERSIONGHOST}/kraken_esc_${this.userId}_login_member.png`);
            return await LoginPage.signInButton.click();
        });
    },
    createMember() {
        When("I create a new member with {kraken-string} name and {kraken-string} email and {kraken-string} note", async function(memberName, emailMember, noteMember) {
            MemberNewPage.driver = this.driver;

            await MemberNewPage.open(properties.URLADMIN);
            await MemberNewPage.memberNameInput.setValue(memberName);
            await MemberNewPage.memberEmailInput.setValue(emailMember);
            await MemberNewPage.memberDescriptionTextarea.setValue(noteMember); 
            await this.driver.saveScreenshot(`${properties.PATHEXPORTSCREENSHOT}${properties.VERSIONGHOST}/kraken_esc_${this.userId}_create_member.png`);
            return await MemberNewPage.saveButton.click();  
        });
    },
    findMember() {
        When("I find a member with {kraken-string} email", async function(emailMember) {
            Member.driver = this.driver;
            Member.memberEmailTest = emailMember;

            await Member.open(properties.URLADMIN);
            if(await Member.memberListItem.isDisplayed()){
                await Member.memberListItem.click();
            }

            await this.driver.saveScreenshot(`${properties.PATHEXPORTSCREENSHOT}${properties.VERSIONGHOST}/kraken_esc_${this.userId}_find_member.png`);
        });
    },
    search() {
        Then("I search a member with {kraken-string} email", async function(emailMember) {
            Member.driver = this.driver;
            Member.memberEmailTest = emailMember;

            await Member.open(properties.URLADMIN);

            await Member.emailSearchInput.setValue(emailMember);
            if(await Member.memberListItem.isDisplayed()){
                await Member.memberListItem.waitForDisplayed({ timeout: 5000 });
                await this.driver.saveScreenshot(`${properties.PATHEXPORTSCREENSHOT}${properties.VERSIONGHOST}/kraken_esc_${this.userId}_search_member.png`);
                await Member.memberListItem.click();
            }
        });
    },
    updateMember() {
        Then("I update a member with {kraken-string} note", async function(noteMember) {
            MemberEdit.driver = this.driver;
            await MemberEdit.memberDescriptionTextarea.setValue(noteMember);
            await this.driver.saveScreenshot(`${properties.PATHEXPORTSCREENSHOT}${properties.VERSIONGHOST}/kraken_esc_${this.userId}_update_member.png`);
            return await MemberEdit.saveButton.click();  
        });
    },
    deleteMember() {
        Then("I deleted a member with {kraken-string} email", async function(emailMember) {
            MemberDelete.driver = this.driver;
            
            await MemberDelete.settingsButton.click();

            if (await MemberDelete.settingsButton.isDisplayed() ) {
                await MemberDelete.deleteButton.click();
            }
            await this.driver.saveScreenshot(`${properties.PATHEXPORTSCREENSHOT}${properties.VERSIONGHOST}/kraken_esc_${this.userId}_delete_member.png`);
            return await MemberDelete.deleteConfirmButton.click();  
        });
    },
}

module.exports = MemberGhost;