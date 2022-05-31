const { ForgotCredentials } = require('./ForgotCredentials');
const { HomePage } = require('./HomePage');

class IndexPage {
    constructor(page) {
        this.page = page;
        this.userName = page.locator("[name='username']");
        this.password = page.locator("[name='password']");
        this.login = page.locator("[value='Log In']");
        this.forgotID = page.locator("[href*='lookup']");
        this.register = page.locator("[href*='register']");
        this.homeIcon = page.locator(".home");
        this.aboutIcon = page.locator(".aboutus");
        this.contactIcon = page.locator(".contact");

        this.iconMsg = page.locator(".title");


        //contact locators
        this.contactName = page.locator("#name");
        this.contactMail = page.locator("#email");
        this.contactPhn = page.locator("#phone");
        this.contactMsg = page.locator("#message");
        this.contactSubmit = page.locator("[value*='Customer Care']");
        this.contactSuccessMsg = page.locator("#rightPanel p:nth-child(3)");
        //A Customer Care Representative will be contacting you.

    }

    async validLogin(username, password) {
        await this.userName.type(username);
        await this.password.type(password);
        await this.login.click();
        return new HomePage(this.page);
    }

    async validHomeIcon() {
        await this.homeIcon.click();
        return await this.page.title();  //ParaBank | Welcome | Online Banking
    }

    async validAboutIcon() {
        await this.aboutIcon.click();
        return await this.iconMsg.textContent();  //ParaSoft Demo Website
    }

    async validContactIcon() {
        await this.contactIcon.click();
        return await this.iconMsg.textContent();  //Customer Care
    }

    async validForgetLogin() {
        await this.forgotID.click();
        return await this.iconMsg.textContent();    //Customer Lookup
    }

    async validRegister() {
        await this.register.click();
        return await this.iconMsg.textContent();    //Signing up is easy!
    }

    async DirectLogin() {
        await this.login.click();
    }

    async GetForgetPage() {
        await this.forgotID.click();
    }

}

module.exports = { IndexPage }