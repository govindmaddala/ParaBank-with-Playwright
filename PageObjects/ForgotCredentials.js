class ForgotCredentials {
    constructor(page) {
        this.page = page;
        this.firstName = page.locator("#firstName");
        this.lastName = page.locator("#lastName");
        this.address = page.locator("[id*='street']");
        this.city = page.locator("[id*='city']");
        this.state = page.locator("[id*='state']");
        this.zipcode = page.locator("[id*='zip']");
        this.ssn = page.locator("[id*='ssn']");
        this.submitBtn = page.locator("[value*='Find My Login']");

        this.successMsg = page.locator("#rightPanel p:nth-child(2)");
        //Your login information was located successfully. You are now logged in. //

        //logout btn
        this.logoutBtn = page.locator("[href*='logout']");
    }

    async FindCredentials(fname, lname, address, city, state, zip, ssn) {
        await this.firstName.type(fname);
        await this.lastName.type(lname);
        await this.address.type(address);
        await this.city.type(city);
        await this.state.type(state);
        await this.zipcode.type(zip);
        await this.ssn.type(ssn);
        await this.submitBtn.click();
    }
}

module.exports = { ForgotCredentials }