# Catálogo de Jogos 🎮

Aplicação em ReactJS para cadastro e listagem de jogos de videogame, feita para a disciplina de Desenvolvimento Web (Engenharia de Software - UEPG).

O front-end consome uma API REST simulada com o [Mockoon](https://mockoon.com/). O ambiente da API fica salvo no próprio repositório (`mockoon/jogos-api.json`) e roda pela Mockoon CLI, então não precisa instalar nada além do Node.js.

## Autores

- Bida
- Giulia Victoria Vante

## Tecnologias

- React (criado com Vite)
- React Router DOM
- Axios
- Bootstrap
- Mockoon CLI (API mock)

## Como rodar

Precisa ter o [Node.js](https://nodejs.org/) instalado (versão 20.19 ou mais nova).

```bash
git clone https://github.com/bidavinicius/jogos-ui.git
cd jogos-ui
npm install
```

Depois, abrir **dois terminais** na pasta do projeto:

```bash
# terminal 1 - sobe a API na porta 3001
npm run mock
```

```bash
# terminal 2 - sobe o React
npm run dev
```

E acessar http://localhost:5173 no navegador.

> Os dados ficam salvos em memória enquanto a API está rodando. Quando o `npm run mock` é reiniciado, a lista volta para os 5 jogos iniciais.

## Descrição da API

URL base: `http://localhost:3001/api`

| Método | Endpoint | Descrição | Resposta |
|---|---|---|---|
| GET | `/jogos` | Lista todos os jogos | `200` + array de jogos |
| GET | `/jogos/:id` | Busca um jogo pelo id | `200` + jogo, ou `404` |
| POST | `/jogos` | Cadastra um novo jogo | `201` + jogo criado (com id) |
| PUT | `/jogos/:id` | Atualiza um jogo | `200` + jogo atualizado, ou `404` |
| DELETE | `/jogos/:id` | Exclui um jogo | `200`, ou `404` |

### Modelo do jogo

| Campo | Tipo | Exemplo |
|---|---|---|
| `id` | string | `"1"` (gerado pela API no cadastro) |
| `titulo` | string | `"Hollow Knight"` |
| `plataforma` | string | `"PC"` |
| `genero` | string | `"Metroidvania"` |
| `ano` | number | `2017` |

### Exemplos

**GET** `/jogos/4`

```json
{
  "id": "4",
  "titulo": "Hollow Knight",
  "plataforma": "PC",
  "genero": "Metroidvania",
  "ano": 2017
}
```

**POST** `/jogos`

Corpo enviado:

```json
{
  "titulo": "Celeste",
  "plataforma": "PC",
  "genero": "Plataforma",
  "ano": 2018
}
```

Resposta (`201`):

```json
{
  "titulo": "Celeste",
  "plataforma": "PC",
  "genero": "Plataforma",
  "ano": 2018,
  "id": "172e65c1-7f06-4233-ab4f-4e623772eb99"
}
```

**PUT** `/jogos/2`

```json
{
  "id": "2",
  "titulo": "God of War Ragnarök",
  "plataforma": "PlayStation 5",
  "genero": "Ação",
  "ano": 2022
}
```

## Estrutura do projeto

```
jogos-ui/
├── mockoon/
│   └── jogos-api.json        # ambiente da API (Mockoon)
├── src/
│   ├── components/
│   │   ├── ListJogo.jsx      # listagem
│   │   ├── AddJogo.jsx       # cadastro
│   │   └── UpdJogo.jsx       # edição e exclusão
│   ├── services/
│   │   └── JogoDataService.js  # chamadas para a API
│   ├── http-common.js        # configuração do axios
│   ├── App.jsx               # navbar e rotas
│   ├── App.css
│   └── main.jsx
└── package.json
```

