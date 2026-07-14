const { Builder } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const env = require('./env');

class DriverFactory {
  static async createDriver() {
    const options = new chrome.Options();

    const rodarHeadless = process.env.HEADLESS // para CI/CD, permite passar o valor via variável de ambiente, ex: HEADLESS=true npm test
      ? process.env.HEADLESS === 'true' 
      : env.HEADLESS === true; // valor padrão do env.js

    if (rodarHeadless) {
      options.addArguments('--headless=new');
      options.addArguments('--disable-gpu');          // recomendado em headless no Linux
      options.addArguments('--no-sandbox');            // obrigatório em containers/CI (sem isso, o Chrome recusa iniciar como root)
      options.addArguments('--disable-dev-shm-usage');
      options.addArguments('--window-size=1920,1080');
    }

    options.addArguments('--window-size=1920,1080');

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