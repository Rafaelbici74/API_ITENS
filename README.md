# API_ITENS

API simples em Node.js com Express e MSSQL, organizada em estilo MVC.

## Sobre

Este projeto contém uma API REST básica para gerenciamento de itens. A estrutura do projeto está dentro da pasta `api-mvc` e usa Express para rotas e controllers, além de `mssql` para comunicação com banco de dados SQL Server.

## Estrutura do projeto

- `api-mvc/server.js` - Ponto de entrada da aplicação.
- `api-mvc/db.js` - Configuração de conexão com o banco de dados.
- `api-mvc/src/app.js` - Configuração do Express.
- `api-mvc/src/controllers/itensController.js` - Lógica de negócio para itens.
- `api-mvc/src/routes/itensRoutes.js` - Definição das rotas da API.

## Pré-requisitos

- Node.js
- npm
- SQL Server ou Azure SQL

## Instalação

1. Abra o terminal na pasta `api-mvc`:

```bash
cd api-mvc
```

2. Instale as dependências:

```bash
npm install
```

## Execução

Inicie a API com:

```bash
node server.js
```

A API será executada na porta configurada no `server.js`.

## Endpoints

A API usa o prefixo principal ` /itens` para rotas de itens. Os endpoints disponíveis são:

- `GET /itens`
  - Retorna todos os itens.
- `GET /itens/:id`
  - Retorna o item com o `id` informado.
- `POST /itens`
  - Cria um novo item.
  - Corpo esperado (JSON):
    - `nome`
    - `descricao`
    - `local_encontrado`
    - `data_encontro`
- `PUT /itens`
  - Atualiza um item existente.
  - Corpo esperado (JSON):
    - `id`
    - `nome`
    - `descricao`
    - `local_encontrado`
    - `data_encontro`
- `PUT /itens/:id/devolver`
  - Marca o item como devolvido, alterando o campo `status` para `Devolvido`.
- `DELETE /itens/:id`
  - Remove o item com o `id` informado.

> Observação: o arquivo `api-mvc/src/app.js` também registra o mesmo router em outros prefixos (`/itensId`, `/postItens`, `/putItens`, `/itensStatus`, `/deleteItem`), mas o prefixo principal e recomendado é `/itens`.

## Observações

- Verifique a conexão com o banco de dados em `api-mvc/db.js`.
- Caso queira alterar as rotas ou adicionar novos recursos, edite os arquivos em `src/controllers` e `src/routes`.

## Licença

Projeto de exemplo sem licença definida.
