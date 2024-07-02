# Lista de Ideias React

Este projeto é uma aplicação React para cadastro e gerenciamento de ideias.

## Funcionalidades

- Cadastro de ideias com campos como nome, matrícula, título, descrição, classificação e status.
- Listagem de ideias cadastradas.
- Filtro de ideias por critérios como prioridade e status.

## Instalação

### Frontend

1. Clone o repositório:

   ```bash
   git clone https://github.com/wilkergaudencio/lista-de-ideias-react.git
   cd lista-de-ideias-react
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Inicie o servidor de desenvolvimento:

   ```bash
   npm start
   ```

### Backend

1. Navegue até o diretório `backend`:

   ```bash
   cd backend
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Inicie o servidor backend:

   ```bash
   node server.js
   ```

### Configuração do MongoDB

1. Certifique-se de que o MongoDB está instalado e em execução na sua máquina local. Caso não tenha o MongoDB instalado, você pode seguir [este guia de instalação](https://docs.mongodb.com/manual/installation/).

2. O backend está configurado para se conectar ao MongoDB localmente na URL `mongodb://localhost:27017/ideasDB`. Se desejar alterar a configuração do MongoDB, modifique a string de conexão no arquivo `server.js`.

## Estrutura do Projeto

- `src/`: Código fonte do frontend em React.
- `backend/`: Código fonte do servidor backend em Node.js.
- `public/`: Arquivos estáticos públicos.

## Tecnologias Utilizadas

- React
- Redux
- TypeScript
- Node.js
- Express
- MongoDB
- Axios

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests.

## Licença

Este projeto está licenciado sob a licença MIT. Consulte o arquivo LICENSE para mais informações.
