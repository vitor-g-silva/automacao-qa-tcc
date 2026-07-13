const { By } = require('selenium-webdriver');
const BasePage = require('./BasePage');

class CheckoutStepTwoPage extends BasePage {
  constructor(driver) {
    super(driver);
    this.itemTotalLabel = By.className('summary_subtotal_label');
    this.taxLabel = By.className('summary_tax_label');
    this.totalLabel = By.className('summary_total_label');
    this.botaoFinish = By.id('finish');
  }

  // Extrai o número de um texto tipo "Item total: $65.98" -> 65.98
  async extrairValor(locator) {
    const texto = await this.getText(locator);
    const match = texto.match(/\$([\d.]+)/); // pega o número depois do "$"
    return parseFloat(match[1]);
  }

  async getItemTotal() {
    return this.extrairValor(this.itemTotalLabel);
  }

  async getTax() {
    return this.extrairValor(this.taxLabel);
  }

  async getTotal() {
    return this.extrairValor(this.totalLabel);
  }

  async finalizarCompra() {
  await this.click(this.botaoFinish);
}
}

module.exports = CheckoutStepTwoPage;