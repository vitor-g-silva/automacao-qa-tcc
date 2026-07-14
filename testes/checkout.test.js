const DriverFactory = require('../config/DriverFactory');
const env = require('../config/env');
const LoginPage = require('../pages/LoginPage');
const InventoryPage = require('../pages/InventoryPage');
const CartPage = require('../pages/CartPage');
const CheckoutStepOnePage = require('../pages/CheckoutStepOnePage');
const CheckoutStepTwoPage = require('../pages/CheckoutStepTwoPage');
const CheckoutCompletePage = require('../pages/CheckoutCompletePage');

describe('Regressão E2E - Fluxo de Checkout', () => {
  let driver;
  let loginPage;
  let inventoryPage;
  let cartPage;
  let checkoutStepOnePage;
  let checkoutStepTwoPage;
  let checkoutCompletePage;
});
  

  beforeAll(async () => {
    driver = await DriverFactory.createDriver();
    loginPage = new LoginPage(driver);
    inventoryPage = new InventoryPage(driver);
    cartPage = new CartPage(driver);
    checkoutStepOnePage = new CheckoutStepOnePage(driver);
    checkoutStepTwoPage = new CheckoutStepTwoPage(driver);
    checkoutCompletePage = new CheckoutCompletePage(driver);
  });

  test('Deve realizar login com sucesso', async () => {
  await loginPage.abrir();
  await loginPage.fazerLogin(env.USUARIO.USERNAME, env.USUARIO.SENHA); 
  await loginPage.waitForUrlContains('/inventory');
    const carregou = await inventoryPage.isCarregada(); // reforço visual
  expect(carregou).toBe(true);
});

  test('Deve adicionar 2 produtos ao carrinho', async () => {    
  await inventoryPage.adicionarProdutoAoCarrinho(env.PRODUTOS.ITEM_1.NOME);
  await inventoryPage.adicionarProdutoAoCarrinho(env.PRODUTOS.ITEM_2.NOME);

  const quantidadeNoCarrinho = await inventoryPage.getText(inventoryPage.cartBadge);
  expect(quantidadeNoCarrinho).toBe('2');
  await inventoryPage.irParaCarrinho();  
  });

  test('Deve preencher os dados de entrega no checkout', async () => { 
  const nomes = await cartPage.getNomesDosItens();
  const precos = await cartPage.getPrecosDosItens();

  const precosPorNome = {};
  nomes.forEach((nome, index) => {
    precosPorNome[nome] = precos[index];
  });

  expect(precosPorNome[env.PRODUTOS.ITEM_1.NOME]).toBe(env.PRODUTOS.ITEM_1.PRECO_UNITARIO);
  expect(precosPorNome[env.PRODUTOS.ITEM_2.NOME]).toBe(env.PRODUTOS.ITEM_2.PRECO_UNITARIO);

  await cartPage.irParaCheckout();
  await checkoutStepOnePage.preencherDadosEntrega(env.TELA_CHECKOUT_ENTREGA);
  await checkoutStepOnePage.continuar();

});
  
test('Deve exibir o valor total correto na finalização', async () => {
  const itemTotalEsperado = env.PRODUTOS.ITEM_1.PRECO_UNITARIO + env.PRODUTOS.ITEM_2.PRECO_UNITARIO;
  const itemTotalExibido = await checkoutStepTwoPage.getItemTotal();
  const taxExibido = await checkoutStepTwoPage.getTax();
  const totalExibido = await checkoutStepTwoPage.getTotal();

  console.log(`Item total esperado (soma do env.js): $${itemTotalEsperado.toFixed(2)}`);
  console.log(`Item total exibido na tela: $${itemTotalExibido.toFixed(2)}`);
  console.log(`Tax exibido na tela: $${taxExibido.toFixed(2)}`);
  console.log(`Total exibido na tela: $${totalExibido.toFixed(2)}`);

  expect(itemTotalExibido).toBeCloseTo(itemTotalEsperado, 2);
  expect(totalExibido).toBeCloseTo(itemTotalExibido + taxExibido, 2);

  await checkoutStepTwoPage.finalizarCompra();
  const mensagem = await checkoutCompletePage.getMensagemConfirmacao();
  expect(mensagem).toBe('Thank you for your order!');

    afterAll(async () => {
  await driver.quit(); // Fecha o navegador ao final de TODA a suíte
  });
  
});
