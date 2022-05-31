class HomePage {
    constructor(page) {
        this.page = page;
        this.newAccount = page.locator("[href*='openaccount']");
        this.overview = page.locator("[href*='overview']");
        this.transFund = page.locator("[href*='transfer']");
        this.payBill = page.locator("[href*='billpay']");
        this.findTransc = page.locator("[href*='find']");
        this.updateProfile = page.locator("[href*='profile']");
        this.newLoan = page.locator("[href*='loan']");
        this.logOutBtn = page.locator("[href*='logout']");



        //for loan

        this.loanAmt = page.locator("#amount");
        this.downPay = page.locator("#downPayment");
        this.selectAccount = page.locator("#fromAccountId");
        this.LoanBtn = page.locator("[type='submit']");

        //error msg

        this.errorMsg = page.locator(".error");               //An internal error has occurred and has been logged.
        this.openAccountMsg = page.locator(".title")         //Open New Account
        this.overviewMsg = page.locator("h1.title");          //Accounts Overview
        this.transFundMsg = page.locator(".title");        //Transfer Funds
        this.payBillMsg = page.locator(".title");         //Bill Payment Service
        this.findTranscMsg = page.locator(".title");     //Find Transactions
        this.updateProfileMsg = page.locator(".title"); //Updata Profile
        this.newLoanMsg = page.locator(".title");      //Apply for a Loan

        //buttons
        this.newAccountBtn = page.locator("[value*='New Account']");
        this.accountMsg = page.locator("tfoot td"); //*Balance includes deposits that may be subject to holds
        this.TransferBtn = page.locator("[value='Transfer']");
        this.billPaymentBtn = page.locator("[value = 'Send Payment']");
        this.findTranscBtn = page.locator("[type='submit']"); //4 buttons
        this.updateProfileBtn = page.locator("[value='Update Profile']");
        this.loanBtn = page.locator("[value='Apply Now']");
    }

    async NewAccount() {
        await this.newAccount.click();
        return await this.newAccountBtn;
    }

    async AccountOverview() {
        await this.overview.click();
        return await this.overviewMsg.textContent();
    }

    async TransFund() {
        await this.transFund.click();
        return await this.TransferBtn;
    }

    async PayBill() {
        await this.payBill.click();
        return await this.billPaymentBtn;
    }

    async FindTranscaction() {
        await this.findTransc.click();
        return await this.findTranscBtn.first();
    }

    async UpdateProfileInfo() {
        await this.updateProfile.click();
        return await this.updateProfileBtn;
    }

    async NewLoan() {
        await this.newLoan.click();
        return await this.loanBtn;
    }

    async LogOut() {
        await this.logOutBtn.click();
    }

    async GetLogoutBtn() {
        return await this.logOutBtn;

    }

}
module.exports = { HomePage }