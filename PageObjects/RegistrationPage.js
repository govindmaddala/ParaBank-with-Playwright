
class RegistrationPage {
    constructor(page) {
        this.page = page;
        this.firstName = page.locator("[id*='firstName']");
        this.lastName = page.locator("[id*='lastName']");
        this.address = page.locator("[id*='address.street']");
        this.city = page.locator("[id*='address.city']");
        this.state = page.locator("[id*='address.state']");
        this.zip = page.locator("[id*='address.zip']");
        this.phone = page.locator("[id*='phone']");
        this.ssn = page.locator("[id*='ssn']");
        this.username = page.locator("[id*='username']");
        this.password = page.locator("[id*='password']");
        this.repeatPassword = page.locator("[id*='repeat']");
        this.registerBtn = page.locator("[value='Register']");

        this.registerMsg = page.locator("#rightPanel p");  //Your account was created successfully. You are now logged in.
    }

    async GetRegister(fname, lname, street, city, state, zip, phn, ssn, username, password, repeat) {
        await this.firstName.type(fname);
        await this.lastName.type(lname);
        await this.address.type(street);
        await this.city.type(city);
        await this.state.type(state);
        await this.zip.type(zip);
        await this.phone.type(phn);
        await this.ssn.type(ssn);
        await this.username.type(username);
        await this.password.type(password);
        await this.repeatPassword.type(repeat);
        await this.page.waitForLoadState('networkidle');
        await this.registerBtn.click();
        return await this.registerMsg.textContent();
    }
}

module.exports = { RegistrationPage }