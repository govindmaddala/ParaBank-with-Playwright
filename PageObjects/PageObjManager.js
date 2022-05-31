const { ForgotCredentials } = require("./ForgotCredentials");
const { HomePage } = require("./HomePage");
const { IndexPage } = require("./IndexPage");
const { RegistrationPage } = require("./RegistrationPage");

class PageObjManager {

    constructor(page) {
        this.page = page;
        this.indexPage = new IndexPage(this.page);
        this.homePage = new HomePage(this.page);
        this.forgetPage = new ForgotCredentials(this.page);
        this.registrationPage = new RegistrationPage(this.page);
    }

    async GetWebApp() {
        await this.page.goto("https://parabank.parasoft.com/parabank/index.htm");
        return await this.page.title();
    }

    async GetIndexPage() {
        return this.indexPage;
    }

    async GetHomePage() {
        return this.homePage;
    }

    async GetForgotPage() {
        return this.forgetPage;
    }

    async GetRegisterPage() {
        return this.registrationPage;
    }
}

module.exports = { PageObjManager }