# Próximos Passos

## Backend
### Objetivo
Implementar sistema de logs, testes automatizados e containerização com Docker para aumentar a rastreabilidade, a confiabilidade e a portabilidade do backend.

### Meta
- [x] Criar módulo `logger.py` com configuração de logs (arquivo e console).
- [x] Padronizar formato dos logs (`%(asctime)s - %(levelname)s - %(message)s`).
- [x] Configurar níveis de log: `INFO`, `WARNING`, `ERROR`.
- [x] Adicionar logs nas operações principais: upload, leitura e processamento do CSV.
- [x] Garantir que os logs sejam gravados corretamente e úteis para depuração.

### Meta
- [x] Implementar testes unitários com **pytest** para funções de processamento.
- [x] Criar testes de integração com **httpx** para o endpoint `/upload`.
- [x] Gerar relatório de cobertura com `pytest --cov`.

- [ ] Criar **Dockerfile** para o backend com FastAPI.
- [ ] Criar **docker-compose.yml** para orquestrar backend, frontend e dependências.
- [ ] Testar build e execução do container localmente.
- [ ] Configurar variáveis de ambiente e volumes no `docker-compose`.

---

## Frontend
### Objetivo
Adicionar logs de eventos, implementar testes automatizados e preparar ambiente Docker para facilitar o deploy e execução integrada com o backend.

### Meta
- [x] Criar utilitário `logger.ts` com funções `logInfo`, `logError`, `logWarn`.
- [x] Adicionar logs no upload do CSV, resposta do backend e erros de rede.
- [x] Validar que logs aparecem no console de forma clara e útil.

### Meta - 05/11 a 07/11
- [ ] Configurar ambiente de testes com **Jest** e **React Testing Library**.
- [ ] Criar testes de renderização para o componente de upload.
- [ ] Criar testes de integração simulando envio de arquivo e exibição de gráfico.
- [ ] Verificar cobertura de testes e corrigir falhas detectadas.

- [ ] Criar **Dockerfile** para o frontend (React + TypeScript).
- [ ] Configurar o serviço do frontend no `docker-compose.yml` para comunicação com o backend.
- [ ] Testar ambiente completo via Docker Compose (`frontend + backend`).
- [ ] Documentar processo de build e execução com Docker no README.

---

## 🧰 Ferramentas de Qualidade e Desempenho
### Meta
Integrar ferramentas de análise de código, testes automatizados de interface, desempenho e segurança para garantir a qualidade do projeto.

- [ ] **SonarQube** → análise estática de código para detectar bugs, code smells e vulnerabilidades em backend e frontend.
- [ ] **Cypress** → testes E2E (end-to-end) simulando a interação real do usuário no frontend.
- [ ] **JMeter** → testes de carga e estresse no backend (ex: endpoint `/upload`).
- [ ] **k6** → testes de performance programáveis em JavaScript, alternativa moderna ao JMeter.
- [ ] **Trivy** → análise de vulnerabilidades em imagens Docker e dependências de backend/frontend.
- [ ] Configurar execução dessas ferramentas no pipeline (CI/CD).
- [ ] Gerar relatórios automáticos de qualidade, segurança e performance.
- [ ] Definir métricas de aceitação (tempo de resposta, cobertura mínima, falhas críticas, etc).

---
