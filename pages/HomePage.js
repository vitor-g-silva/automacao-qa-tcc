const { By } = require('selenium-webdriver');
const BasePage = require('./BasePage');

class HomePage extends BasePage {
  constructor(driver) {
    super(driver); // chama o construtor da BasePage, que guarda o driver
    this.linkLogIn = By.id('customer_login_link');
  };

  async abrir() {
    await this.driver.get(require('../config/env').URL_BASE);
  };

  async clicarEmLogIn() {
    await this.click(this.linkLogIn);
  };
  async estaLogado() {
    return this.isDisplayed(this.linkLogOut);
  }
}

module.exports = HomePage;