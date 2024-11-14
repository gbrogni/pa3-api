module.exports = {
    preset: 'ts-jest',
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',  // Mapeia '@' para a pasta 'src'
      },
    testEnvironment: 'node',
    transform: {
      '^.+\\.ts$': 'ts-jest',
    },
    moduleFileExtensions: ['js', 'ts'],
    rootDir: './',
    testRegex: '/.*\\.spec\\.ts$', // Só vai rodar os arquivos com sufixo `.spec.ts`
    coverageDirectory: './coverage',
    collectCoverageFrom: [
      'src/**/*.{js,ts}',
      '!src/**/*.module.ts',  // Ignorar arquivos de módulo
      '!src/main.ts',  // Ignorar o arquivo de entrada
    ],
  };
  