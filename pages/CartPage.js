const { By } = require('selenium-webdriver');
const BasePage = require('./BasePage');

class CartPage extends BasePage {
  constructor(driver) {
    super(driver);
    this.itemNome = By.className('inventory_item_name');
    this.itemPreco = By.className('inventory_item_price');
    this.botaoCheckout = By.id('checkout');
  }

  async getNomesDosItens() {
    return this.getAllTexts(this.itemNome);
  }

  async getPrecosDosItens() {
    const textosCrus = await this.getAllTexts(this.itemPreco); // ex: ["$15.99", "$49.99"]
    return textosCrus.map((texto) => parseFloat(texto.replace('$', '')));
  }

  async irParaCheckout() {
    await this.click(this.botaoCheckout);
  }
}

module.exports = CartPage;