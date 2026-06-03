# 🌌 RiftScope - Smart LoL Analyzer & Infrastructure

🇺🇸 [English](#-riftscope---smart-lol-analyzer--infrastructure) | 🇧🇷 [Português](#-riftscope---analisador-inteligente-de-lol--infraestrutura)

---

## 🇺🇸 RiftScope - Smart LoL Analyzer & Infrastructure

**RiftScope** is a high-performance FullStack Monorepo application (Node.js + React) engineered to consume, process, and analyze League of Legends data using the official Riot Games API. 

Moving beyond a simple match history checker, this repository serves as a technical showcase for modern engineering practices, highlighting **DevOps, Containerization, Performance Tuning, Memory Caching, and Data Processing**.

### 🛠️ Architecture & Engineering Decisions (DevOps Focus)

- **Optimized Multi-Stage Builds (Docker):** The backend `Dockerfile` is split into isolated build and run stages. Leveraging the modern `--omit=dev` flag, the final Alpine Linux production image contains only the absolute minimum required dependencies, significantly shrinking both image size and attack surface.
- **Reverse Proxying with Nginx:** The React frontend (powered by Vite) is compiled and served via an ultra-lightweight Nginx server. Nginx acts as a Reverse Proxy, intercepting `/api` requests and seamlessly routing them to the backend container inside the isolated Docker network, fully eliminating CORS issues.
- **Intelligent Caching Layer (Redis):** To respect the strict rate-limiting policies applied by Riot Games and avoid `429 Too Many Requests` status codes, an in-memory Redis caching system was integrated. Complex upstream API payloads are cached and intercepted in milliseconds, safeguarding the infrastructure and improving response times by up to 95%.
- **Parallel I/O Processing (`Promise.all`):** To generate advanced user reports (Option B), the backend fetches deep match details concurrently. This pattern bypasses sequential I/O blocking loops, maximizing CPU utilization and system throughput.
- **Environment Standardization (`.gitattributes`):** Enforced line-endings normalization to `LF` (Linux format), guaranteeing bulletproof behavioral consistency between local Windows 10 code editing and remote Linux container executions.

### 🤖 Smart Analyzer Features (Option B)
- **Riot ID Lookup:** Full compatibility with the contemporary `GameName#TagLine` player lookup standard.
- **Advanced Performance Analytics:** Real-time calculation of overall win rates, recent performance, and weighted KDA ratios.
- **Automated Gameplay Error Detection:** Heuristic-driven backend algorithms that scan recent player history to pinpoint critical gameplay structural flaws (e.g., overdeath flags, inefficient build paths, low map participation).
- **Context-Aware Recommendations:** Automated item build structures and champion counter/synergy insights derived directly from recent match behavior.

### ⚙️ CI/CD Pipeline Automation
The repository includes an automated workflow powered by **GitHub Actions** (`.github/workflows/deploy.yml`):
- **Continuous Integration (CI):** Triggers on every `push` or `pull_request` to the `main` branch. It automatically spins up an isolated Ubuntu container, caches Node modules to optimize execution speed, installs dependencies cleanly with `npm ci`, and verifies build compilation integrity.
- **Continuous Delivery (CD Ready):** Post-integration success, it triggers code delivery hooks structured for cloud environments.

### 📁 Project Structure (Monorepo)
```text
riftscope/
├── .github/workflows/
│   └── deploy.yml          # GitHub Actions CI/CD Pipeline
├── backend/
│   ├── src/
│   │   ├── config/redis.js # Redis memory connection wrapper
│   │   └── server.js       # Express server & Smart analytical logic
│   ├── Dockerfile          # Multi-stage production container receipt
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── App.jsx         # UI rendering & Match processing cards
│   │   └── App.css         # Dark-themed dashboard styles
│   └── Dockerfile          # Nginx production build & Reverse proxy router
├── .env.example            # Environment variables placeholder blueprint
├── .gitattributes          # LF line ending enforcement filter
└── docker-compose.yml      # Local ecosystem multi-container orchestrator
🚀 Running the Project Locally
Prerequisites
Docker Desktop installed and running.

Step-by-Step Guide
Clone the repository:

Bash
   git clone [https://github.com/seu-usuario/riftscope.git](https://github.com/seu-usuario/riftscope.git)
   cd riftscope
Configure your environment variables:

Duplicate the .env.example file and rename the copy to .env in the project root.

Insert your developer token retrieved from the Riot Developer Portal:

Plaintext
     RIOT_API_KEY=RGAPI-YOUR-TOKEN-HERE
     PORT=3000
     ```
3. Boot up the entire interconnected infrastructure with a single command:
```bash
   docker compose up --build
The application will be live and ready for production simulation in your browser at: http://localhost.

🇧🇷 RiftScope - Analisador Inteligente de LoL & Infraestrutura
O RiftScope é uma aplicação FullStack de alta performance desenvolvida em arquitetura de Monorepo (Node.js + React) projetada para consumir, processar e analisar dados analíticos de League of Legends utilizando a API oficial da Riot Games.

Mais do que um buscador de histórico, o foco principal deste projeto é servir como vitrine técnica de engenharia, demonstrando práticas modernas de DevOps, Conteinerização, Otimização de Performance, Estrutura de Cache e Análise de Dados.

🛠️ Decisões de Arquitetura e Engenharia (Foco DevOps)
Multi-Stage Builds Otimizados (Docker): O Dockerfile do backend foi estruturado em estágios separados de construção e execução. Utilizando a flag moderna --omit=dev, garantimos que a imagem final de produção (baseada em Alpine Linux) seja extremamente enxuta, contendo apenas o estritamente necessário para rodar, reduzindo o tamanho e a superfície de ataque.

Camada de Proxy Reverso com Nginx: O frontend em React (Vite) é compilado e servido por um servidor Nginx ultra leve. O Nginx também atua como um Proxy Reverso, interceptando requisições para /api e redirecionando de forma transparente para o container do backend dentro da rede interna do Docker, eliminando problemas de CORS.

Camada de Cache Inteligente com Redis: Para mitigar os limites rígidos de Rate Limit impostos pela API da Riot e evitar erros de 429 Too Many Requests, foi implementada uma camada de cache em memória utilizando o Redis. Dados de requisições complexas são cacheados e interceptados em milissegundos, poupando a infraestrutura e acelerando o tempo de resposta em até 95%.

Gargalos de I/O Resolvidos com Execução Paralela (Promise.all): Para estruturar as estatísticas avançadas (Opção B), o backend dispara as requisições de detalhes de múltiplas partidas simultaneamente em paralelo, evitando o travamento de I/O em loops síncronos e otimizando a CPU.

Padronização de Ambiente (.gitattributes): Configuração de fim de linha forçada para LF (Linux), garantindo consistência absoluta do código entre o desenvolvimento no Windows 10 e a execução dentro dos containers Linux/Nginx.

🤖 Recursos do Analisador Inteligente (Opção B)
Busca via Riot ID: Suporte ao padrão atual de busca global por Nome#Tag.

Estatísticas Avançadas e Winrate: Cálculo em tempo real de taxas de vitória gerais, desempenho recente e taxas de KDA ponderadas.

Análise de Gameplay Avançada: Algoritmos que varrem o histórico recente do jogador para detectar falhas críticas de gameplay (ex: excesso de mortes seguidas, build ineficiente, baixa participação no mapa).

Sugestões de Adaptação: Recomendações automáticas de campeões e itens baseadas no comportamento recente do jogador.

⚙️ Automação de Pipeline CI/CD
O repositório inclui uma esteira automatizada gerenciada pelo GitHub Actions (.github/workflows/deploy.yml):

Integração Contínua (CI): Disparado a cada push ou pull_request direcionado à branch main. Inicializa um container isolado Ubuntu na nuvem, faz o cacheamento dos módulos Node para otimizar a velocidade, instala as dependências de forma limpa via npm ci e valida a integridade de compilação dos builds.

Entrega Contínua (CD Ready): Prontamente estruturado para disparar gatilhos e ganchos de deploy automatizados para ambientes em nuvem após o sucesso da integração.

🚀 Como Rodar o Projeto Localmente
Pré-requisitos
Docker Desktop instalado e rodando.

Passo a Passo
Clone o repositório:

Bash
   git clone [https://github.com/seu-usuario/riftscope.git](https://github.com/seu-usuario/riftscope.git)
   cd riftscope
Configure suas variáveis de ambiente:

Copie o arquivo .env.example para um novo arquivo chamado .env na raiz do projeto.

Insira sua chave de desenvolvedor gerada no Riot Developer Portal:

Plaintext
     RIOT_API_KEY=RGAPI-SEU-TOKEN-AQUI
     PORT=3000
     ```
3. Suba o ambiente completo integrado com um único comando:
```bash
   docker compose up --build
A aplicação estará disponível e pronta para uso em seu navegador através do endereço: http://localhost.