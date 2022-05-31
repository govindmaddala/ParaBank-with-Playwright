const { test, expect } = require('@playwright/test');
const { PageObjManager } = require('../PageObjects/PageObjManager');
const credentials = JSON.parse(JSON.stringify(require('../Credentials.json')));

test.beforeEach(async ({ browser }) => {
    const context = await browser.newContext();
    this.page = await context.newPage();
    this.po = new PageObjManager(this.page);

    //Opening Index-Page
    await this.po.GetWebApp();
});

test('Validation of Facilities', async ({ }) => {

    //Login from Index Page
    const home = (await this.po.GetIndexPage()).validLogin(credentials.username, credentials.password);

    //Validating New Account Page is opening
    const NewAccountTitle = await (await home).NewAccount();
    await expect.soft(await NewAccountTitle).toBeVisible();

    //Validating AccountOverview title
    const AccountOverviewTitle = await (await home).AccountOverview();
    expect.soft(AccountOverviewTitle).toEqual("Accounts Overview");

    //Validating Transcation
    const TransferFundTitle = await (await home).TransFund();
    expect.soft(TransferFundTitle).toBeVisible();

    //validating Bill Payment Service
    const BillPayTitle = await (await home).PayBill();
    expect.soft(BillPayTitle).toBeVisible();

    //Validating Find Transactions
    const FindTranscTitle = await (await home).FindTranscaction();
    expect.soft(FindTranscTitle).toBeVisible();

    //validating Updata Profile
    const ProfileTitle = await (await home).UpdateProfileInfo();
    expect.soft(ProfileTitle).toBeVisible();

    //Validating  Apply for a Loan
    const LoanTitle = await (await home).NewLoan();
    expect.soft(LoanTitle).toBeVisible();

    //logout button is clicked and returns to home page
    await (await home).LogOut();
    await expect(this.page).toHaveTitle("ParaBank | Welcome | Online Banking");
});