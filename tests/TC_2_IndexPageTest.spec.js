const { test, expect } = require('@playwright/test');
const { PageObjManager } = require('../PageObjects/PageObjManager');
const { customtest } = require('../Utils/test-base');
const dataset = JSON.parse(JSON.stringify(require('../Credentials.json')));


test.beforeEach(async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    this.po = new PageObjManager(page);
    //Opening Index-Page and Validating its title
    const tit = await this.po.GetWebApp();
    expect(tit).toEqual("ParaBank | Welcome | Online Banking");

    this.indexpage = await this.po.GetIndexPage();
});

//custom test for providing data through fixture
customtest('Login with invalid cred from data fixture', async ({ testdata }) => {
    const Home = await (this.indexpage).validLogin(testdata.user, testdata.pass);

    //for random data login shouldn't be done
    await expect(await Home.GetLogoutBtn()).not.toBeVisible();
});


test("Login with valid Credentials", async ({ }) => {
    const Home = await (this.indexpage).validLogin(dataset.username, dataset.password);

    //if valid data,login should be done then logout option should be appeared 
    await expect(await Home.GetLogoutBtn()).toBeVisible();
    const logOutBtn = page.locator("[href*='logout']");
    await logOutBtn.click();

});


test('Validate Home Icon', async ({ }) => {
    const title = await this.indexpage.validHomeIcon();
    expect(title).toEqual("ParaBank | Welcome | Online Banking");
});


test('Validate About Icon', async ({ }) => {
    const about = await this.indexpage.validAboutIcon();
    expect(about).toEqual("ParaSoft Demo Website");
});

test('Validate Contact Icon', async ({ }) => {
    const contactTitle = await this.indexpage.validContactIcon();
    expect(contactTitle).toEqual("Customer Care");
});

test('Validate Forgot ID Option', async ({ }) => {
    const forgotTitle = await this.indexpage.validForgetLogin();
    expect(forgotTitle).toEqual("Customer Lookup");
});

test('Validate Register Option', async ({ }) => {
    const registerTitle = await this.indexpage.validRegister();
    expect(registerTitle).toEqual("Signing up is easy!");
});

test('Direct Login with no credentials', async ({ }) => {

    //clicks login button directly from IndexPage
    await this.indexpage.DirectLogin();

    //Login shouldn't happen and Logout options shouldn't be visibile 
    //await expect((await this.po.GetHomePage()).LogoutBtn()).not.toBeVisible();

    const home = await this.po.GetHomePage();
    await expect(await home.GetLogoutBtn()).not.toBeVisible();
});