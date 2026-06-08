# Minisitio

Sistema de guia comercial digital com backend Node.js/Express e frontend React.

---

## 🚀 Iniciar Localmente

### Pré-requisitos
- [Node.js v20+](https://nodejs.org)
- MySQL v8 rodando na porta **3307** (ou altere `DB_PORT` no `.env`)

### 1. Clonar e instalar dependências

```bash
git clone https://github.com/eduardotrindade/minisitio.git
cd minisitio

cd back
npm install

cd ../front
npm install
```

### 2. Configurar variáveis de ambiente

```bash
# Backend
cp back/.env.example back/.env
# Edite back/.env com as credenciais do seu banco e chaves de API
```

### 3. Iniciar os serviços

**Opção A — Script automático (Windows):**
```
Clique duplo em iniciar.bat
```

**Opção B — Manual:**
```bash
# Terminal 1 — Backend
cd back
node index.js

# Terminal 2 — Frontend (modo dev)
cd front
npm start
```

### 4. Acessar

| Serviço | URL |
|---------|-----|
| Frontend | http://localhost:3000 |
| Backend API | http://localhost:3032/api |

---

## 🏗️ Build de Produção

```bash
cd front
npm run build
```

O build será gerado em `front/build/`. O backend já serve esta pasta automaticamente.

---

## ⚙️ Variáveis de Ambiente

### `back/.env`

| Variável | Descrição | Padrão |
|----------|-----------|--------|
| `PORT` | Porta do servidor backend | `3032` |
| `NODE_ENV` | Ambiente (`development`/`production`) | `development` |
| `DB_HOST` | Host do MySQL | `127.0.0.1` |
| `DB_PORT` | Porta do MySQL | `3307` |
| `DB_USER` | Usuário MySQL | `root` |
| `DB_PASSWORD` | Senha MySQL | *(obrigatório)* |
| `DB_NAME` | Nome do banco | `minisitio_local` |
| `ALLOWED_ORIGINS` | Origens CORS permitidas (vírgula) | localhost |
| `JWT_SECRET` | Chave secreta JWT (64+ chars) | *(obrigatório)* |
| `MP_ACCESS_TOKEN_SANDBOX` | Token Mercado Pago (teste) | *(obrigatório)* |
| `MP_ACCESS_TOKEN_PROD` | Token Mercado Pago (produção) | *(obrigatório)* |

---

## 🐳 Docker

```bash
# Subir todos os serviços com Docker
docker-compose up --build

# Parar
docker-compose down
```

---

## 📁 Estrutura do Projeto

```
minisitio/
├── back/           # Backend Node.js/Express
│   ├── config/     # Configurações (DB, JWT, SMTP)
│   ├── controllers/# Lógica de negócios
│   ├── models/     # Modelos Sequelize
│   ├── routes/     # Rotas da API
│   ├── middlewares/# Autenticação, validação
│   └── index.js    # Ponto de entrada
│
├── front/          # Frontend React
│   ├── src/
│   │   ├── components/ # Componentes reutilizáveis
│   │   ├── views/      # Páginas principais
│   │   ├── admin/      # Painel administrativo
│   │   ├── routes/     # Roteamento React Router
│   │   └── config/     # Configuração de URLs
│   └── build/          # Build de produção (gerado)
│
├── .github/workflows/  # CI/CD GitHub Actions
├── docker-compose.yml  # Orquestração Docker
└── iniciar.bat         # Script de inicialização Windows
```

---

## 🔐 Segurança

Consulte o arquivo [SEGURANCA.md](SEGURANCA.md) para guia completo de segurança antes de publicar em produção.

**Antes de fazer deploy:**
- [ ] Configurar `.env` com valores reais
- [ ] Definir `ALLOWED_ORIGINS` com os domínios de produção
- [ ] Usar um `JWT_SECRET` forte (64+ caracteres aleatórios)
- [ ] Configurar SSL/HTTPS

---

## 🔄 CI/CD

O projeto usa GitHub Actions (`.github/workflows/ci.yml`):
- **Push para `master`**: executa build do frontend e verifica o backend

Para deploy automático, configure os seguintes Secrets no repositório GitHub:
- `REACT_APP_API_URL` — URL da API em produção
- `REACT_APP_DOMAIN` — Domínio do frontend em produção

---

## 📞 Suporte

Versão: `v2.1.29`
