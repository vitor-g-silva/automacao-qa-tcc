module.exports = {
  testEnvironment: 'node',
  testTimeout: 120000, // 120s por teste, já que E2E é mais lento
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