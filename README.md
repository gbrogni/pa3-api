## Instalação

Você deve ter o NPM, Docker instalados na sua máquina e o NodeJs instalado pelo menos na versão 16.20.2, e a extensão Prisma no seu VsCode.

1 - Clone o repositório: 
  `git clone https://github.com/gbrogni/pa3-api.git`

2 - Delete os arquivos node_modules e package-lock.json.

3 - Rode os seguintes comandos: 
 - `npm cache clean --force`
 - `npm install`

4 - Com o docker rodando na sua máquina, no terminal do projeto na pasta raiz rode o seguinte comando: 
  - `docker-compose up -d`

5 - Crie um arquivo na raiz do projeto `.env` e cole o conteúdo do arquivo `.env.example` nesse novo arquivo.

6 - Localize o arquivo `seed.ts` na pasta prisma, execute esse arquivo para ter uma base de dados, indico ter a extensão `Code runner` para executar o arquivo.

7 - Execute o projeto com o comando `npm run start:dev`.