const { By } = require('selenium-webdriver');
const BasePage = require('./BasePage');

class CheckoutStepOnePage extends BasePage {
  constructor(driver) {
    super(driver);
    this.campoFirstName = By.id('first-name');
    this.campoLastName = By.id('last-name');
    this.campoPostalCode = By.id('postal-code');
    this.botaoContinue = By.id('continue');
    this.mensagemErro = By.css('[data-test="error"]');
  }

  async preencherDadosEntrega({ FIRST_NAME, LAST_NAME, POSTAL_CODE }) {
    await this.type(this.campoFirstName, FIRST_NAME);
    await this.type(this.campoLastName, LAST_NAME);
    await this.type(this.campoPostalCode, POSTAL_CODE);
  }

  async continuar() {
    await this.click(this.botaoContinue);
  }
}
module.exports = CheckoutStepOnePage;