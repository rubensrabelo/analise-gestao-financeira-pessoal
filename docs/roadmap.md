# 🚀 Roadmap — Análise de Gestão Financeira Pessoal

## 🎯 **Objetivo Geral**

Desenvolver um sistema simples que permita o envio de um arquivo CSV com dados financeiros e gere uma **dashboard interativa** com **gráficos** que exibam os gastos por categoria.

---

## 🧩 **Fase 1 — MVP: Desenvolvimento do Sistema**

**Meta:** Construir um MVP funcional que processe arquivos CSV e exiba visualmente os gastos por categoria.

### **Tarefas Realizadas**

#### 🔹 Configuração Inicial
- [x] Criar os diretórios principais: `backend/` e `frontend/`.
- [x] Inicializar o projeto **FastAPI** no backend.
- [x] Criar o projeto **React + TypeScript** no frontend (via Vite ou Create React App).
- [x] Configurar o **CORS** no backend para permitir comunicação com o frontend.

#### 🔹 Backend Básico (FastAPI)
- [x] Criar o endpoint `POST /upload`.
- [x] Permitir o envio de arquivos CSV via `multipart/form-data`.
- [x] Ler o arquivo CSV utilizando **pandas**.
- [x] Agrupar os dados por categoria e calcular o total de valores.
- [x] Retornar o resultado processado em formato **JSON**.

#### 🔹 Frontend Básico (React + TypeScript)
- [x] Implementar um campo de upload para o arquivo CSV.
- [x] Enviar o arquivo para o backend usando **axios** ou **fetch**.
- [x] Exibir o resultado retornado pelo backend.
- [x] Renderizar os dados em um **gráfico de pizza ou barras** utilizando **Recharts** ou **Chart.js**.

#### 🔹 Testes e Refinamento
- [x] Tratar erros de leitura e validar colunas obrigatórias.
- [x] Exibir mensagens de erro e sucesso de forma clara.
- [x] Ajustar o layout e realizar pequenos aprimoramentos visuais.

---

## ⚙️ **Fase 2 — Logs, Testes e Docker**

**Meta:** Aumentar a rastreabilidade, confiabilidade e portabilidade do sistema através de logs, testes automatizados e containerização.

### **Backend**
- [ ] Criar módulo `logger.py` com configuração de logs (arquivo e console).
- [ ] Adicionar logs nas operações principais: upload, leitura e processamento do CSV.
- [ ] Padronizar formato dos logs (`%(asctime)s - %(levelname)s - %(message)s`).
- [ ] Configurar níveis de log: `INFO`, `WARNING`, `ERROR`.
- [ ] Implementar testes unitários com **pytest**.
- [ ] Criar testes de integração com **httpx** para o endpoint `/upload`.
- [ ] Gerar relatório de cobertura com `pytest --cov`.
- [ ] Criar **Dockerfile** para o backend com FastAPI.
- [ ] Criar **docker-compose.yml** para orquestrar backend, frontend e dependências.
- [ ] Testar execução completa em ambiente containerizado.

### **Frontend**
- [ ] Criar utilitário `logger.ts` com funções `logInfo`, `logError`, `logWarn`.
- [ ] Adicionar logs no upload, resposta do backend e erros de rede.
- [ ] Configurar ambiente de testes com **Jest** e **React Testing Library**.
- [ ] Criar testes de renderização e integração (upload → gráfico).
- [ ] Criar **Dockerfile** para o frontend (React + TypeScript).
- [ ] Configurar comunicação com o backend via `docker-compose`.
- [ ] Documentar processo de build e execução com Docker.

---

## 🧰 **Fase 3 — Qualidade, Desempenho e Segurança**

**Meta:** Garantir a qualidade do código, estabilidade do sistema e segurança das dependências, integrando ferramentas de análise e monitoramento.

### **Ferramentas e Integrações**
- [ ] **SonarQube** → análise estática de código para detectar bugs, code smells e vulnerabilidades.
- [ ] **Cypress** → testes E2E (end-to-end) simulando interações reais no frontend.
- [ ] **JMeter** → testes de carga e estresse no backend (ex: endpoint `/upload`).
- [ ] **k6** → alternativa moderna ao JMeter para simulações em JavaScript.
- [ ] **Trivy** → escaneamento de vulnerabilidades em imagens Docker e dependências.
- [ ] Configurar execução dessas ferramentas no pipeline (CI/CD).
- [ ] Gerar relatórios automáticos de qualidade, performance e segurança.
- [ ] Definir métricas de aceitação (tempo de resposta, cobertura mínima, falhas críticas).

---

## 📈 **Resultados Esperados**

- 🧾 **Logs completos** para auditoria e diagnóstico.  
- 🧪 **Testes automatizados** garantindo estabilidade nas releases.  
- 🐳 **Ambiente containerizado** para fácil deploy e reprodutibilidade.  
- 🔍 **Análise contínua de qualidade** com SonarQube e testes E2E com Cypress.  
- ⚡ **Monitoramento de performance** via JMeter/k6 e segurança com Trivy.  
- 🚀 Base sólida e profissional para evolução futura (autenticação, persistência e insights financeiros).

---
