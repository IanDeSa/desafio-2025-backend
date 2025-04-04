# Backend - Desafio 2025

Este projeto é uma aplicação backend desenvolvida para o Desafio 2025. Ele utiliza Node.js (versão 20) e Docker para facilitar o desenvolvimento e a execução.

## Como executar o projeto

1. **Configurar variáveis de ambiente**  
  Certifique-se de criar um arquivo `.env` na raiz do projeto com as configurações necessárias, como credenciais de banco de dados.

2. **Subir os serviços com Docker**  
  Execute o comando abaixo para iniciar os serviços necessários:  
  ```bash
  docker compose up -d
  ```

3. **Executar as migrations**  
  Após os serviços estarem ativos, rode o comando para aplicar as migrations no banco de dados:  
  ```bash
  npm run db:migration:run
  ```

4. **Acessar a documentação da API**  
  Após iniciar o projeto, você pode acessar a documentação da API gerada pelo Swagger no seguinte endereço:  
  ```
  http://localhost:3001/docs
  ```

Agora o backend estará pronto para uso.