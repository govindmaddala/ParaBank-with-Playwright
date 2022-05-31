// @ts-check
const { devices } = require('@playwright/test');

const config = {
  testDir: './tests',
  timeout: 50 * 1000,
  workers: 1,
  expect: {

    timeout: 5000
  },

  reporter: 'html',

  projects: [
    {
      name: 'chrome',
      use: {
        browserName: 'chromium',
        headless: false,
        screenshot: 'only-on-failure',
        trace: 'retain-on-failure'
      }
    },
    {
      name: 'firefox',
      use: {
        browserName: 'firefox',
        headless: false,
        screenshot: 'only-on-failure',
        trace: 'retain-on-failure'
      }
    },
    {
      name: 'safari',
      use: {
        browserName: 'webkit',
        headless: false,
        screenshot: 'only-on-failure',
        trace: 'retain-on-failure'
      }
    }
  ]


};

module.exports = config;
