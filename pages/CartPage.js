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

  async irParaCheckout(tentativas = 5) {
  for (let tentativa = 1; tentativa <= tentativas; tentativa++) {
    await this.click(this.botaoCheckout);
    try {
      await this.waitForUrlContains('checkout-step-one.html');
      return;
    } catch (erro) {
      if (tentativa === tentativas) throw erro;
      console.log(`Tentativa ${tentativa} de ir ao checkout não navegou, tentando novamente...`);
    }
  }
}
}

module.exports = CartPage;