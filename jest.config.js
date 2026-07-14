module.exports = {
  testEnvironment: 'node',
  testTimeout: 60000, // 60s por teste, já que E2E é mais lento
  reporters: [
    'default', // mantém o output colorido no terminal
    [
      'jest-html-reporter',
      {
        pageTitle: 'Relatório de Regressão E2E - Checkout',
        outputPath: './reports/test-report.html',
        includeConsoleLog: true 
      }
    ]
  ]
};