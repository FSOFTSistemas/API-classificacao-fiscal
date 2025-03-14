This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).


# Projeto API-classificacao-fiscal

Converte uma planilha pre-definida em json e adiciona ao banco de dados.
API que retorna o produto com base no NCM ou GTIN tendo como parâmetro o CRT.

## Pré-requisitos

- Node.js instalado
- MySQL instalado e configurado

## Instalação

1. Clone o repositório:

    ```bash
    git clone https://github.com/FSOFTSistemas/API-classificacao-fiscal.git
    cd API-classificacao-fiscal
    ```

2. Instale as dependências do projeto:

    ```bash
    npm install
    ```

## Executando o Projeto

1. Inicie o servidor:

    ```bash
    npm run start
    ```

    O frontend será iniciado na porta 5500 e o backend na porta 5000.

## Banco de Dados

Este projeto utiliza MySQL como banco de dados. Certifique-se de que o MySQL esteja instalado e configurado corretamente.
Para configurar as credenciais do banco navegue até a pasta `config` e modifique o arquivo `config.json`

## Migrações

Para rodar as migrações do banco de dados, siga os passos abaixo:

1. Navegue até a pasta `backend`:

    ```bash
    cd backend
    ```

2. Execute as migrações:

    ```bash
    npm run migrate
    ```

3. (Opcional) Para desfazer as migrações, execute:

    ```bash
    npm run migrate-undo
    ```

## Endpoints da API

### Verificação do Backend

- **Rota:** `/`
- **Método:** `GET`
- **Descrição:** Retorna uma mensagem confirmando que o backend está funcionando.

### Produto

- **Rota:** `/api/produto/:codigo`
- **Método:** `GET`
- **Parâmetro:** `codigo` (Código do produto), `crt` (Parâmetro de query)
- **Exemplo:** `http://localhost:5000/api/produto/84831019?crt=03`
- **Descrição:** Retorna informações do produto com base no código fornecido.

### Upload de Arquivos

- **Rota:** `/upload`
- **Método:** `POST`
- **Descrição:** Endpoint para upload de arquivos no frontend.

