const { By } = require('selenium-webdriver');
const BasePage = require('./BasePage');
const env = require('../config/env');

class LoginPage extends BasePage {
  constructor(driver) {
    super(driver);
    this.campoUsername = By.id('user-name');
    this.campoSenha = By.id('password');
    this.botaoLogin = By.id('login-button');
    this.mensagemErro = By.css('[data-test="error"]');
  }

  async abrir() {
    await this.driver.get(env.URL_BASE); // A própria LoginPage que abre a URL base
  }

  async fazerLogin(username, senha) {
    await this.type(this.campoUsername, username);
    await this.type(this.campoSenha, senha);
    await this.click(this.botaoLogin);
  }

  async getMensagemErro() {
    return this.getText(this.mensagemErro);
  }
}

module.exports = LoginPage;