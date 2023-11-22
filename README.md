# Pizzaria API

Esta API oferece operações CRUD básicas para gerenciar clientes, sabores de pizza e pedidos.

## Pré-requisitos

Certifique-se de ter o Node.js e o MongoDB instalados em sua máquina antes de executar a aplicação.

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)

## Instalação

1. Clone o repositório:

  ```bash
  git clone https://github.com/LeeYooBin/Pizzaria-API.git
  ```

2. Instale as dependências:

  ```bash
  cd Pizzaria-API
  yarn install
  ```

3. Configure as variáveis de ambiente:

   Crie um arquivo `.env` na raiz do seu projeto e adicione as seguintes configurações:

   ```env
   DB_STRING=string-de-conexao-mongodb
   SECRET=chave-secreta-para-jwt
   ```

## Inicie a aplicação
  
  ```bash
  yarn start
  ```
  A aplicação estará disponível em http://localhost:8080.

### Rotas


1. Clientes

  ```markdown
  - **GET /customer/findAll** Lista todos os clientes cadastrados.
  - **GET /customer/find/:id** Recupera um cliente pelo ID.
  - **POST /customer/create** Cria um novo cliente.
  - **POST /customer/login** Realiza login para um cliente existente.
  - **PUT /customer/update/:id** Atualiza as informações de um cliente.
  - **DELETE /customer/delete/:id** Exclui um cliente.
  ```

2. Sabores

  ```markdown
  - **GET /flavor/findAll** Lista todos os sabores de pizza cadastrados.
  - **GET /flavor/find** Recupera um sabor de pizza pelo nome.
  - **POST /flavor/create** Cria um novo sabor de pizza.
  - **PUT /flavor/update/:id** Atualiza as informações de um sabor de pizza.
  - **DELETE /flavor/delete/:id** Exclui um sabor de pizza.
  ```

3. Pedidos

  ```markdown
  - **GET /order/find/:id** Recupera um pedido pelo ID.
  - **GET /order/findAll** Lista todos os pedidos cadastrados.
  - **POST /order/create** Cria um novo pedido.
  - **PATCH /order/updateStatus/:id** Atualiza o status de um pedido pelo ID.
  ```