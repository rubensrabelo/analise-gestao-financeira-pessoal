# 🗺️ Roadmap — MVP: Análise de Gestão Financeira Pessoal

## 🎯 **Objetivo geral**

Construir um sistema simples que receba um arquivo CSV com dados financeiros e gere uma **dashboard com gráfico** mostrando os gastos por categoria.

---

## 🚀 **Fase 1 — Configuração inicial**

**Meta:** preparar o ambiente de desenvolvimento.
**Tarefas:**

1. Criar dois diretórios: `backend/` e `frontend/`.
2. Inicializar o **FastAPI** no backend.
3. Inicializar o **React + TypeScript** no frontend (com Vite ou Create React App).
4. Configurar CORS para permitir a comunicação entre backend e frontend.

---

## ⚙️ **Fase 2 — Backend básico (FastAPI)**

**Meta:** permitir o upload e processamento do CSV.
**Tarefas:**

1. Criar o endpoint `POST /upload`.
2. Permitir o envio de arquivos CSV via `multipart/form-data`.
3. Ler o CSV com `pandas`.
4. Agrupar os dados por categoria e somar os valores.
5. Retornar o resultado como JSON.

**Exemplo de saída:**

```json
[
  {"Categoria": "Alimentação", "Valor": 320.5},
  {"Categoria": "Transporte", "Valor": 120.0}
]
```

---

## 💻 **Fase 3 — Frontend básico (React + TypeScript)**

**Meta:** criar interface simples para enviar o arquivo e exibir o gráfico.
**Tarefas:**

1. Criar um campo de upload (input de arquivo).
2. Enviar o arquivo via `axios` ou `fetch` para o endpoint `/upload`.
3. Receber o JSON com os resultados.
4. Renderizar os dados em um **gráfico de pizza ou barras** usando `Recharts` ou `Chart.js`.

---

## 🧠 **Fase 4 — Testes e refinamento**

**Meta:** garantir que o MVP funcione bem.
**Tarefas:**

1. Testar o upload com diferentes CSVs.
2. Validar erros (ex.: arquivo sem colunas esperadas).
3. Melhorar mensagens de erro e feedback visual.
4. Ajustar layout básico da página.

---