# Roadmap — MVP: Análise de Gestão Financeira Pessoal

## **Objetivo Geral**

Desenvolver um sistema simples que permita o envio de um arquivo CSV com dados financeiros e gere uma **dashboard interativa** com **gráficos** que exibam os gastos por categoria.

---

## **Fase 1 — Configuração Inicial**

**Meta:** preparar o ambiente de desenvolvimento.

**Tarefas:**

1. [x] Criar os diretórios principais: `backend/` e `frontend/`.
2. [x] Inicializar o projeto **FastAPI** no backend.
3. [x] Criar o projeto **React + TypeScript** no frontend (via Vite ou Create React App).
4. [x] Configurar o **CORS** no backend para permitir comunicação com o frontend.

---

## **Fase 2 — Backend Básico (FastAPI)**

**Meta:** implementar o processamento inicial do CSV.

**Tarefas:**

1. [x] Criar o endpoint `POST /upload`.
2. [x] Permitir o envio de arquivos CSV via `multipart/form-data`.
3. [x] Ler o arquivo CSV utilizando **pandas**.
4. [x] Agrupar os dados por categoria e calcular o total de valores.
5. [x] Retornar o resultado processado em formato **JSON**.

---

## **Fase 3 — Frontend Básico (React + TypeScript)**

**Meta:** criar uma interface simples para envio e visualização dos dados.

**Tarefas:**

1. [x] Implementar um campo de upload para o arquivo CSV.
2. [x] Enviar o arquivo para o backend usando **axios** ou **fetch**.
3. [x] Exibir o resultado retornado pelo backend.
4. [x] Renderizar os dados em um **gráfico de pizza ou barras** utilizando **Recharts** ou **Chart.js**.

---

## **Fase 4 — Testes e Refinamento**

**Meta:** validar o funcionamento do MVP e melhorar a experiência do usuário.

**Tarefas:**

1. [ ] Testar o upload com diferentes formatos de CSV.
2. [ ] Tratar erros de leitura e validar colunas obrigatórias.
3. [ ] Exibir mensagens de erro e sucesso de forma clara.
4. [ ] Ajustar o layout e realizar pequenos aprimoramentos visuais.

---