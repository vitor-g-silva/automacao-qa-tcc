const { Builder } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const env = require('./env');

class DriverFactory {
  static async createDriver() {
    const options = new chrome.Options();

    if (process.env.CHROME_BINARY) {
      options.setChromeBinaryPath(process.env.CHROME_BINARY);
    }

    const rodarHeadless = process.env.HEADLESS
      ? process.env.HEADLESS === 'true'
      : env.HEADLESS === true;

    if (rodarHeadless) {
      options.addArguments(
        '--headless=new',
        '--no-sandbox',
        '--disable-dev-shm-usage',
        '--window-size=1920,1080'
      );
    } else {
      options.addArguments('--window-size=1920,1080');
    }

    const driver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(options)
      .build();

    if (!rodarHeadless) {
      await driver.manage().window().maximize();
    }

    return driver;
  }
}

module.exports = DriverFactory;