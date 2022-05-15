const Page = require("./page");

class MemberDeletePage extends Page {
    get settingsButton() {
        return this._driver.$(
          'section.view-actions span button'
        );
    }

    get memberSettingsList() {
        return this._driver.$("ul.fade-in-scale open ember-view");
    }

    get deleteButton() {
        return this._driver.$('button span.red');
    }

    get deleteConfirmButton() {
        return this._driver.$(
          'button[class="gh-btn gh-btn-red gh-btn-icon ember-view"]'
        );
    }
}

module.exports = new MemberDeletePage();