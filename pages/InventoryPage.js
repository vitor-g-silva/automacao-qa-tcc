const { By } = require('selenium-webdriver');
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

  async adicionarProdutoAoCarrinho(nomeProduto, quantidadeEsperada, tentativas = 3) {
  const locator = this.botaoAddToCart(nomeProduto);

  for (let tentativa = 1; tentativa <= tentativas; tentativa++) {
    await this.click(locator);
    try {
      await this.waitForTextToBe(this.cartBadge, String(quantidadeEsperada), 4000);
      return; // sucesso, sai da função
    } catch (erro) {
      if (tentativa === tentativas) throw erro; // última tentativa: propaga o erro de verdade
      console.log(`Tentativa ${tentativa} de adicionar "${nomeProduto}" não refletiu no carrinho, tentando novamente...`);
    }
  }
  }
  
  async irParaCarrinho() {
    await this.click(this.cartIcon);
    await this.waitForUrlContains('cart.html');
  }
}

module.exports = InventoryPage;