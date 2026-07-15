const { until } = require('selenium-webdriver');

class BasePage {
  constructor(driver) {
    this.driver = driver;
    this.timeout = 15000; // 15 segundos de espera máxima por elemento
  }

  async getText(locator) {
  const el = await this.waitForVisible(locator);
  return el.getText();
}

  async waitForVisible(locator) {
    const el = await this.driver.wait(until.elementLocated(locator), this.timeout);
    await this.driver.wait(until.elementIsVisible(el), this.timeout);
    return el;
  }

  async click(locator) {
      const el = await this.driver.wait(async () => {
    const elementos = await this.driver.findElements(locator);
    if (elementos.length === 0) return null;
    const visivel = await elementos[0].isDisplayed();
    const habilitado = await elementos[0].isEnabled();
    return (visivel && habilitado) ? elementos[0] : null;
  }, this.timeout, `Elemento não ficou clicável a tempo: ${locator}`);

    await this.driver.executeScript('arguments[0].scrollIntoView({block: "center"});', el);

  try {
    await el.click();
  } catch (erro) {
    // Fallback: clique via JavaScript, contorna problemas de sobreposição/coordenadas em headless
    await this.driver.executeScript('arguments[0].click();', el);
  }
  }

  async type(locator, texto) {
    const el = await this.waitForVisible(locator);
    await el.clear();
    await el.sendKeys(texto);
  };

    async isDisplayed(locator, timeoutCurto = 3000) {
    try {
      const el = await this.driver.wait(until.elementLocated(locator), timeoutCurto);
      return await el.isDisplayed();
    } catch (erro) {
      return false; // Elemento não encontrado a tempo = considera "não exibido"
    }
  };

  async waitForUrlContains(trecho) {
    await this.driver.wait(until.urlContains(trecho), this.timeout);
  }

  async getAllTexts(locator) {
  await this.waitForVisible(locator); // espera pelo menos o primeiro aparecer
  const elementos = await this.driver.findElements(locator);
  return Promise.all(elementos.map((el) => el.getText()));}

  async waitForTextToBe(locator, textoEsperado, timeout = this.timeout) {
  await this.driver.wait(async () => {
    const elementos = await this.driver.findElements(locator);
    if (elementos.length === 0) return false;
    const textoAtual = await elementos[0].getText();
    return textoAtual === textoEsperado;
  }, timeout, `Elemento não atingiu o texto esperado: "${textoEsperado}"`);
   }

}

  
module.exports = BasePage;