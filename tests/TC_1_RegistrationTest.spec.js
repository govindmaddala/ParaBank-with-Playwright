const { test, expect } = require('@playwright/test');
const { PageObjManager } = require('../PageObjects/PageObjManager');
const fs = require('fs');
const dataset = JSON.parse(JSON.stringify(require('../Utils/Userdata.json')));

test.use({ viewport: { height: 728, width: 1366 } })
test.beforeEach(async ({ browser }) => {
    const context = await browser.newContext();
    this.page = await context.newPage();
    this.po = new PageObjManager(this.page);

    //Opening Index-Page
    await this.po.GetWebApp();
});

for (const data of dataset) {
    test(`Registration with ${data.testName}`, async ({ }) => {

        //to click register link from index page
        await (await this.po.GetIndexPage()).validRegister();

        //to register
        await this.page.locator("[id*='firstName']").waitFor();
        const regi = await this.po.GetRegisterPage();
        const successMsg = await regi.GetRegister(data.firstName, data.lastName, data.address, data.city, data.state, data.zipcode, data.phone, data.ssn, data.username, data.password, data.repPassword);

        //wait method
        await this.page.locator("#rightPanel p").waitFor();   //below msg area to be shown-up either its success or error

        expect(successMsg).toEqual("Your account was created successfully. You are now logged in.");

        //on success
        if (successMsg === "Your account was created successfully. You are now logged in.") {

            //on registration success, that username and password will be saved for further tests
            Credentials = {
                "username": data.username,
                "password": data.password,
                "testname": data.testName
            }

            Credentials = JSON.parse(JSON.stringify(Credentials));
            fs.writeFile('./Credentials.json', JSON.stringify(Credentials, null, 2), err => {
                if (err) {
                    console.log(err);
                }
            }
            )

            Details = {
                "firstname": data.firstName,
                "lastname": data.lastName,
                "address": data.address,
                "city": data.city,
                "state": data.state,
                "zipcode": data.zipcode,
                "ssn": data.ssn,
                "testname": data.testName
            }

            Details = JSON.parse(JSON.stringify(Details));
            fs.writeFile('./Details.json', JSON.stringify(Details, null, 2), err => {
                if (err) {
                    console.log(err);
                }
            }
            )
        }

        //////////////////Validation of Home-Page/////////////


        const home = this.po.GetHomePage();

        //Validating New Account Page is opening
        const NewAccountTitle = await (await home).NewAccount();
        //expect.soft(NewAccountTitle).toEqual("Open New Account");
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
}