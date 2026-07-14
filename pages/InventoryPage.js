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

  async adicionarProdutoAoCarrinho(nomeProduto, quantidadeEsperada) {
  await this.click(this.botaoAddToCart(nomeProduto));

  await this.driver.wait(
    async () => {
      const badges = await this.driver.findElements(this.cartBadge);

      if (badges.length === 0) {
        return false;
      }

      const quantidadeAtual = await badges[0].getText();
      return quantidadeAtual === String(quantidadeEsperada);
    },
    10000,
    `O carrinho não foi atualizado para ${quantidadeEsperada} produto(s)`
  );
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