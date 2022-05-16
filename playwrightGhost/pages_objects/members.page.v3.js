const Page = require('./page');

class MemberPage extends Page {

    static mermberEmailTest;

    get membersButtom() { return "a[href*='members/']" }
    get membersNewButtom() { return "a[href*='members/new']" }

    get memberListItem() { return 'p.gh-members-list-email:has-text("' + this.mermberEmailTest + '")' }
    
}

module.exports = new MemberPage()