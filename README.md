# atomacao-qa-tcc
Suíte de testes automatizados E2E (ponta a ponta) para regressão do fluxo de Checkout de um e-commerce, desenvolvida como projeto de TCC. Utilizando Selenium WebDriver + Jest, seguindo o padrão de projeto Page Object Model (POM), com execução integrada a uma esteira de CI/CD via GitHub Actions.

🎯 Objetivo

Automatizar a validação do fluxo completo de compra em um e-commerce de teste (SauceDemo), cobrindo:

- Autenticação de usuário
- Seleção e adição de produtos ao carrinho
- Validação de preços individuais no carrinho
- Preenchimento dos dados de entrega no checkout
- Validação do valor total (item total, imposto e total final)
- Finalização da compra e confirmação de sucesso

🛠️ Tecnologias utilizadas

- [Selenium WebDriver](https://www.selenium.dev/) — automação de navegador
- [Jest](https://jestjs.io/) — framework de testes e execução
- [jest-html-reporter](https://www.npmjs.com/package/jest-html-reporter) — geração de relatório HTML
- [GitHub Actions](https://github.com/features/actions) — esteira de CI/CD

🌐 Ambiente sob teste

Os testes são executados na plataforma https://www.saucedemo.com, ambiente público de demonstração da Sauce Labs, criado especificamente para prática de automação de testes.

📌 Decisões técnicas relevantes

- Esperas explícitas (WebDriverWait) em vez de pausas fixas, evitando testes lentos e/ou instáveis
- Retry cirúrgico em ações historicamente sensíveis a variações de rede (adicionar ao carrinho, avançar para o checkout), sem reexecutar o fluxo inteiro em caso de falha pontual
- Massa de dados centralizada (env.js), desacoplada da lógica de teste
- Validação por nome, não por posição, ao comparar produtos entre a tela e os dados esperados — resiliente a mudanças de ordenação