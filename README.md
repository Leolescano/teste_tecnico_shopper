# Serviço de Leitura de Imagens - Teste Técnico Shopper.com.br

## Visão Geral

Este projeto é um serviço backend desenvolvido como parte do teste técnico para a Shopper.com.br. Ele implementa um sistema de leitura de imagens utilizando inteligência artificial (Google Gemini API) para extrair informações de imagens enviadas.

## Funcionalidades Implementadas

1. **Upload e Análise de Imagens (POST /upload)**
   - Recebe uma imagem em base64
   - Utiliza a API do Google Gemini para reconhecer e extrair informações da imagem
   - Verifica duplicidade de leituras no mês
   - Retorna um link para a imagem, um UUID e o valor reconhecido

2. **Confirmação de Leituras (PATCH /confirm)**
   - Permite confirmar ou corrigir o valor extraído de uma imagem
   - Valida a existência da leitura e se já foi confirmada anteriormente

3. **Listagem de Leituras (GET /<customer_code>/list)**
   - Lista todas as leituras de um cliente específico
   - Opção de filtrar por tipo de leitura (WATER ou GAS)

## Tecnologias Utilizadas

- Node.js com TypeScript
- Express.js para o servidor web
- MongoDB com Mongoose para persistência de dados
- Docker para containerização
- Google Gemini API para análise de imagens
- UUID para geração de identificadores únicos

## Configuração e Execução

### Pré-requisitos

- Node.js (v14 ou superior)
- Docker e Docker Compose
- Chave de API do Google Gemini

### Configuração

1. Clone o repositório:
   ```
   git clone [URL_DO_REPOSITÓRIO]
   cd [NOME_DO_DIRETÓRIO]
   ```

2. Crie um arquivo `.env` na raiz do projeto:
   ```
   PORT=3000
   MONGODB_URI=mongodb://mongo:27017/shopper
   GEMINI_API_KEY=sua_chave_api_aqui
   ```

### Execução

#### Com Docker:

1. Construa e inicie os contêineres:
   ```
   docker-compose up --build
   ```

2. O serviço estará disponível em `http://localhost:3000`.

#### Localmente:

1. Instale as dependências:
   ```
   npm install
   ```

2. Inicie o servidor:
   ```
   npm run dev
   ```

## Estrutura do Projeto

- `src/controllers/`: Lógica de controle para cada endpoint
- `src/models/`: Definição do modelo Mongoose para as leituras
- `src/routes/`: Definição das rotas da API
- `src/services/`: Serviço de integração com a API do Google Gemini
- `src/config/`: Configurações do banco de dados

## Endpoints da API

1. **POST /upload**
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
   - Corpo da requisição:
     ```json
     {
       "measure_uuid": "uuid_da_leitura",
       "confirmed_value": 123
     }
     ```

3. **GET /<customer_code>/list**
   - Query parameter opcional: `measure_type` (WATER ou GAS)

## Considerações de Desenvolvimento

- Implementamos validações de dados em todos os endpoints
- Utilizamos o serviço Picsum Photos para gerar URLs de imagens para demonstração
- A integração com o Google Gemini foi implementada para análise de imagens
- O projeto segue práticas de código limpo e estrutura modular

## Próximos Passos

- Implementar testes unitários e de integração
- Melhorar o tratamento de erros e logging
- Implementar autenticação e autorização
- Otimizar as consultas ao banco de dados para melhor performance

## Conclusão

Este projeto demonstra a capacidade de criar um serviço backend robusto para leitura e análise de imagens, integrando diversas tecnologias e seguindo boas práticas de desenvolvimento. Ele atende aos requisitos especificados no teste técnico da Shopper.com.br, oferecendo uma solução escalável e manutenível para o processamento de imagens e gestão de informações extraídas.


