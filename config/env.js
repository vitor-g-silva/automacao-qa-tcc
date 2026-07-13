module.exports = {
    URL_BASE: 'https://www.saucedemo.com/', //  Plataforma ficticia que simula um e-commerce de teste
    HEADLESS: false, // Define se o navegador será executado em modo headless (sem interface gráfica) ou não
    USUARIO: {
        USERNAME: 'standard_user',
        SENHA: 'secret_sauce',
    }, // Objeto USUARIO contém as credenciais de login para o ambiente de teste;

    PRODUTOS: {
        ITEM_1: {
        NOME: 'Sauce Labs Bolt T-Shirt',
        PRECO_UNITARIO: 15.99
  },
        ITEM_2: {
        NOME: 'Sauce Labs Fleece Jacket',
        PRECO_UNITARIO: 49.99
  }
    }, // Objeto PRODUTOS contém informações sobre os produtos disponíveis para compra no ambiente de teste;

     TELA_CHECKOUT_ENTREGA: {
                FIRST_NAME: 'Vitor',
                LAST_NAME: 'Testes',
                POSTAL_CODE: '12345' 
    }  // Objeto TELA_CHECKOUT_ENTREGA contém informações de entrega para o checkout no ambiente de teste;
}