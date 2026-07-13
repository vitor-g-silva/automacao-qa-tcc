const { By } = require('selenium-webdriver');
const BasePage = require('./BasePage');

class CheckoutCompletePage extends BasePage {
  constructor(driver) {
    super(driver);
    this.tituloConfirmacao = By.className('complete-header');
  }

  async getMensagemConfirmacao() {
    return this.getText(this.tituloConfirmacao);
  }
}

module.exports = CheckoutCompletePage;