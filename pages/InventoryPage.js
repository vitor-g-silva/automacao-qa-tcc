const { By, until } = require('selenium-webdriver');
const BasePage = require('./BasePage');

class InventoryPage extends BasePage {
  constructor(driver) {
    super(driver);
    this.inventoryContainer = By.id('inventory_container');
    this.cartIcon = By.className('shopping_cart_link');
    this.cartBadge = By.className('shopping_cart_badge');
  }

  // Converte "Sauce Labs Bolt T-Shirt" -> "add-to-cart-sauce-labs-bolt-t-shirt"
  botaoAddToCart(nomeProduto) {
    const slug = nomeProduto
      .toLowerCase()
      .replace(/\s+/g, '-')       // espaços viram hífen
      .replace(/[^a-z0-9-]/g, ''); // remove pontuação (ex: parênteses, pontos)
    return By.id(`add-to-cart-${slug}`);
  }

  async isCarregada() {
    return this.isDisplayed(this.inventoryContainer);
  }

  async adicionarProdutoAoCarrinho(nomeProduto) {
    await this.click(this.botaoAddToCart(nomeProduto));
  }

  async irParaCarrinho() {
  await this.click(this.cartIcon);

  await this.driver.wait(
    until.urlContains('/cart.html'),
    10000
  );
}
}

module.exports = InventoryPage;