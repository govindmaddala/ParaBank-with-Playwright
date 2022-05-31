const base = require('@playwright/test');
exports.customtest = base.test.extend(
    {
        testdata: {
            user: "govind",
            pass: "pass"
        }
    }
);