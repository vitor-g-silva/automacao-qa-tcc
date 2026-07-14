const { until } = require('selenium-webdriver');

class BasePage {
  constructor(driver) {
    this.driver = driver;
    this.timeout = 100000; // tempo máximo de espera para elementos (em milissegundos) 
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
    const el = await this.waitForVisible(locator);
    await el.click();
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
  }

module.exports = BasePage;