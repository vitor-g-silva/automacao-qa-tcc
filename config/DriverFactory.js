const { Builder } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const env = require('./env');
const options = new chrome.Options();

if (process.env.CHROME_BINARY) {
  options.setChromeBinaryPath(process.env.CHROME_BINARY);
}

class DriverFactory {
  static async createDriver() {
    const options = new chrome.Options();

    if (env.HEADLESS === true) { 
      options.addArguments('--headless=new');
    }
    options.addArguments('--window-size=1920,1080');

    const driver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(options)
      .build();

    await driver.manage().window().maximize();
    return driver;
  }
}

module.exports = DriverFactory;