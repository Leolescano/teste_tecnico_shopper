# Serviço de Leitura de Consumo de Água e Gás

## Visão Geral

Este projeto é um serviço backend desenvolvido para gerenciar a leitura individualizada de consumo de água e gás. Utiliza inteligência artificial para obter medições através de fotos de medidores, oferecendo uma solução inovadora e eficiente para o registro de consumo.

### Funcionalidades Principais

- Upload de imagens de medidores
- Reconhecimento automático de valores usando a API do Google Gemini
- Confirmação e correção de leituras
- Listagem de medições por cliente

## Tecnologias Utilizadas

- Node.js
- TypeScript
- Express.js
- MongoDB (com Mongoose)
- Docker
- Google Gemini API para reconhecimento de imagens

## Pré-requisitos

- Node.js (versão 14 ou superior)
- Docker e Docker Compose (para execução em contêineres)
- Conta no Google Cloud com acesso à API do Gemini

## Instalação e Configuração

### Configuração do Ambiente

1. Clone o repositório:
   ```
   git clone https://github.com/seu-usuario/nome-do-repo.git
   cd nome-do-repo
   ```

2. Instale as dependências:
   ```
   npm install
   ```

3. Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:
   ```
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/shopper
   GEMINI_API_KEY=sua_chave_api_aqui
   ```
   Substitua `sua_chave_api_aqui` pela sua chave real da API do Google Gemini.

### Execução Local

1. Inicie o servidor de desenvolvimento:
   ```
   npm run dev
   ```

2. O servidor estará disponível em `http://localhost:3000`.

### Execução com Docker

1. Construa e inicie os contêineres:
   ```
   docker-compose up --build
   ```

2. O servidor estará disponível em `http://localhost:3000`.

## Uso da API

### Endpoints

1. **POST /upload**
   - Recebe uma imagem em base64 e retorna a medição reconhecida.
   - Corpo da requisição:
     ```json
     {
       "image": "base64_encoded_image",
       "customer_code": "CUST001",
       "measure_datetime": "2024-08-28T12:00:00Z",
       "measure_type": "WATER"
     }
     ```

2. **PATCH /confirm**
   - Confirma ou corrige o valor de uma medição.
   - Corpo da requisição:
     ```json
     {
       "measure_uuid": "uuid_da_medicao",
       "confirmed_value": 123
     }
     ```

3. **GET /{customer_code}/list**
   - Lista as medições de um cliente específico.
   - Query parameter opcional: `measure_type` (WATER ou GAS)

## Testes

Para executar os testes (se implementados):

```
npm test
```

## Contribuindo

Contribuições são bem-vindas! Por favor, leia as diretrizes de contribuição antes de submeter pull requests.

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE).

## Contato

Para qualquer dúvida ou sugestão, por favor, abra uma issue no GitHub ou entre em contato através do email: seu-email@exemplo.com.
