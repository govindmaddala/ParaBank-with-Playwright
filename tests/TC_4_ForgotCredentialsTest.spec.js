const { test, expect } = require('@playwright/test');
const { PageObjManager } = require('../PageObjects/PageObjManager');
const dataset = JSON.parse(JSON.stringify(require('../Details.json')));

test.use({ viewport: { height: 728, width: 1366 } })
test.beforeEach(async ({ browser }) => {
    const context = await browser.newContext();
    this.page = await context.newPage();
    this.po = new PageObjManager(this.page);

    //Opening WebPage
    await this.po.GetWebApp();
})

test('@Web Retrieving Credentials', async ({ }) => {
    //to click forget ID button
    await (await this.po.GetIndexPage()).GetForgetPage();

    const fp = await this.po.GetForgotPage();

    await fp.FindCredentials(dataset.firstname, dataset.lastname, dataset.address, dataset.city, dataset.state, dataset.zipcode, dataset.ssn);

    await expect.soft(await fp.logoutBtn).toBeVisible();
});