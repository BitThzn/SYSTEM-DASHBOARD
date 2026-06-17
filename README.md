#  SYSTEM://CyberDashboard

Um dashboard full stack para gerenciamento de projetos com interface inspirada em sistemas cyberpunk, permitindo criar, editar, excluir e monitorar projetos em tempo real através de logs do sistema.

## 📋 Funcionalidades

- ✅ Cadastro de projetos
- ✏️ Edição de projetos existentes
- 🗑️ Exclusão de projetos
- 🔄 Alteração de status (Ativo/Inativo)
- 📊 Dashboard com estatísticas gerais
- 📝 Sistema de logs em tempo real
- 🗃️ Persistência de dados com MySQL

---

## 🛠️ Tecnologias Utilizadas

### Frontend
- React 19
- Vite
- React Router DOM
- Axios
- CSS puro

### Backend
- Node.js
- Express.js
- MySQL2
- CORS

### Banco de Dados
- MySQL

---

## 📂 Estrutura do Projeto

```bash
CyberDashbord/
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── database/
│   │   └── routes/
│   ├── server.js
│   └── SystemGhost.sql
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── styles/
│   │   └── App.jsx
│   └── vite.config.js
│
└── package-lock.json
```

---

## 🚀 Instalação

### 1. Clone o repositório

```bash
git clone https://github.com/BitThzn/SYSTEM-DASHBOARD.git
cd cyberdashboard
```

---

### 2. Configurar o Banco de Dados

Importe o arquivo:

```bash
backend/SystemGhost.sql
```

Crie um banco MySQL e execute o script para gerar as tabelas.

---

### 3. Configurar o Backend

Entre na pasta:

```bash
cd backend
```

Instale as dependências:

```bash
npm install
```

Configure a conexão com o banco de dados em:

```javascript
src/database/connection.js
```

Exemplo:

```javascript
const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'SystemGhost'
});

module.exports = db;
```

Inicie o servidor:

```bash
npm run dev
```

O backend estará disponível em:

```bash
http://localhost:3001
```

---

### 4. Configurar o Frontend

Abra outro terminal:

```bash
cd frontend
```

Instale as dependências:

```bash
npm install
```

Execute o projeto:

```bash
npm run dev
```

O frontend estará disponível em:

```bash
http://localhost:5173
```

---

## 🔗 Endpoints da API

### Projetos

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/projects` | Lista todos os projetos |
| POST | `/projects` | Cria um projeto |
| PUT | `/projects/:id` | Atualiza um projeto |
| DELETE | `/projects/:id` | Remove um projeto |

### Logs

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/logs` | Retorna os últimos logs do sistema |

### Dashboard

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/dashboard` | Estatísticas gerais |

---

## 📊 Recursos do Dashboard

- Total de projetos cadastrados
- Quantidade de projetos ativos
- Quantidade de projetos inativos
- Últimos projetos criados
- Histórico de eventos do sistema

---

## 📝 Sistema de Logs

O sistema registra automaticamente eventos como:

- Criação de projetos
- Exclusão de projetos
- Alterações de status

Exemplo:

```text
PROJECT CREATED: API REST
PROJECT DELETED: Dashboard V1
PROJECT STATUS CHANGED: ACTIVE
```

---

## 🎨 Interface

A interface foi desenvolvida com inspiração no projeto SYSTEM://GHOST, oferecendo:

- Design moderno
- Componentização com React
- Atualização dinâmica dos dados
- Modais para criação e exclusão de projetos

---

<!-- ~Ghost, The Shadow~ -->
