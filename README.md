# RiftScope - Intelligent Analytics Platform & Multi-Container Infrastructure

🌐 RIFT-INDEX: 🇺🇸 [English Documentation](#-english-documentation) | 🇧🇷 [Documentação em Português](#-documentação-em-português)

---

## 🇺🇸 English Documentation

### 1. Project Overview
RiftScope is a production-grade, FullStack Monorepo platform designed to ingest, process, and evaluate high-throughput match data using the official Riot Games telemetry endpoints. Built using Node.js and React, the system processes raw historical structures to generate real-time gameplay metrics, behavioral patterns, and systemic heuristics. 

The core architecture functions as a technical demonstration of modern **DevOps paradigms, secure container virtualization, performance tuning, and scalable I/O optimization**.

### 2. Architecture & Systems Engineering
- **Optimized Multi-Stage Builds (Docker):** Application components are separated into isolated compilation and execution runtime containers. By utilizing the modern `--omit=dev` layer optimization, development bloat is restricted from the production runtime, yielding highly compressed, lightweight Alpine-based images with minimal vulnerability surfaces.
- **Reverse Proxy Routing Layer (Nginx):** The client application is compiled down to high-performance static distributions and served natively via Nginx. Nginx handles client-facing entry points, functioning as a Reverse Proxy that transparently pipes `/api` queries to the upstream Express container inside an isolated internal application network, effectively nullifying cross-origin resource sharing (CORS) constraints.
- **In-Memory Volatile Cache Architecture (Redis):** To manage strict API rate limits imposed by upstream telemetry endpoints and mitigate `429 Too Many Requests` conditions, an ephemeral Redis key-value store was integrated. Complex relational data payloads are intercepted and handled at memory level, accelerating query execution times by up to 95%.
- **Asynchronous Concurrent I/O Multiplexing (`Promise.all`):** To generate high-fidelity tactical profiles without triggering runtime process blocking, the backend concurrently schedules data aggregation routines for historical matches. This avoids common synchronous thread blocking and maintains deterministic response rates.
- **Ecosystem Line Ending Stabilization (`.gitattributes`):** Forced file-system normalization to standard `LF` line terminations is compiled into the source repository. This mitigates system-specific character differences when executing files authored on Windows 10 within native Linux/Unix environments.

### 3. Core Engine Specifications
- **Riot ID Domain Resolution:** Compliant with modern global alpha-numeric routing formats (`GameName#TagLine`).
- **Telemetry Calculation Engine:** Real-time algorithmic weighting for rolling match calculations, outcome distribution, and customized performance ratios.
- **Heuristic Gameplay Defect Analysis:** Custom data processing routines that evaluate game state sequences to identify persistent systemic mistakes (e.g., compounding death cascades, suboptimal item builds, low global map participation).
- **Context-Aware Adaptive Engine:** Dynamically weights recent tactical behaviors to output optimal equipment loadouts and strategic champion options.

### 4. Continuous Integration & Delivery Specifications
The automation infrastructure is controlled natively via **GitHub Actions** workflows (`.github/workflows/deploy.yml`):
- **Continuous Integration (CI):** Triggers automatically on `push` or `pull_request` interactions directed at the `main` branch. It initializes an isolated cloud runtime, dynamically mounts node dependency cache structures to save time, performs a clean immutable dependency instantiation (`npm ci`), and tests build compilation validity.
- **Continuous Delivery (CD Ready):** Post-validation hooks are structured for execution against downstream cloud computing distributions.

### 5. Repository Topology
```text
riftscope/
├── .github/workflows/
│   └── deploy.yml          # GitHub Actions CI/CD pipeline automation
├── backend/
│   ├── src/
│   │   ├── config/redis.js # Volatile cache layer infrastructure connection
│   │   └── server.js       # Core Express infrastructure & Analytical routines
│   ├── Dockerfile          # Production-grade multi-stage container manifest
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── App.jsx         # Telemetry rendering engine & Data card structures
│   │   └── App.css         # Minimalist analytics dashboard layout rules
│   └── Dockerfile          # Static distribution compilation & Nginx proxy config
├── .env.example            # Environment token placeholder template blueprint
├── .gitattributes          # Volatile line ending enforcement rules
└── docker-compose.yml      # Multi-container orchestration specification
6. Deployment & Execution Guide
Prerequisites
Docker Engine / Docker Desktop environment operational.

Step-by-Step Procedure
Clone the master repository branch:

Bash
   git clone [https://github.com/your-username/riftscope.git](https://github.com/your-username/riftscope.git)
   cd riftscope
Establish the environmental secrets layout:

Copy the distributed blueprint .env.example into a functional .env file in the project root.

Inject your active access token generated through the Riot Developer Portal:

Plaintext
     RIOT_API_KEY=RGAPI-YOUR-SECURE-TOKEN-STRING
     PORT=3000
     ```
3. Initialize the multi-container grid infrastructure using the compilation flag:
```bash
   docker compose up --build
The operational dashboard will run locally over standard HTTP network mappings at: http://localhost.

🇧🇷 Documentação em Português
1. Visão Geral do Projeto
O RiftScope é uma plataforma FullStack (Monorepo) de alta performance projetada para ingestão, processamento e avaliação de dados históricos utilizando os endpoints oficiais da Riot Games. Desenvolvido em Node.js e React, o sistema analisa dados brutos para gerar métricas de desempenho em tempo real, comportamentos recorrentes e heurísticas de gameplay.

A arquitetura do repositório funciona como uma demonstração técnica de engenharia, destacando práticas de DevOps, virtualização segura por containers, otimização de performance e cache corporativo.

2. Arquitetura e Decisões de Engenharia
Builds Otimizados Multi-Stage (Docker): Os componentes da aplicação são segregados em containers separados de compilação e execução. Através da otimização de camadas com a flag --omit=dev, dependências de desenvolvimento são completamente omitidas do ambiente produtivo, gerando imagens Alpine altamente compactas e com uma superfície de ataque reduzida.

Camada de Roteamento por Proxy Reverso (Nginx): A aplicação cliente é compilada em distribuições estáticas e servida nativamente via Nginx. O servidor gerencia os pontos de entrada, funcionando como um Proxy Reverso que redireciona de forma transparente chamadas para /api diretamente ao container do Express em uma rede isolada, eliminando restrições de CORS.

Cache Volátil em Memória (Redis): Para gerenciar limites de requisição (Rate Limits) e mitigar erros de HTTP 429 Too Many Requests, foi integrada uma camada de cache utilizando Redis. Payload complexos são interceptados e respondidos em milissegundos, poupando a infraestrutura de rede externa e acelerando o tempo de resposta em até 95%.

Processamento de I/O Concorrente e Assíncrono (Promise.all): Para estruturar perfis táticos avançados sem causar travamento de processos, o backend agenda rotinas simultâneas para buscar dados de múltiplas partidas. Isso evita o bloqueio sínvrono de threads e mantém as taxas de resposta determinísticas.

Estabilização de Fim de Linha (.gitattributes): Configuração de normalização para o padrão LF (Linux) implementada diretamente nas diretrizes do Git, garantindo que arquivos modificados em ambiente Windows 10 operem sem quebras de sintaxe dentro dos containers Linux/Unix de produção.

3. Especificações do Mecanismo de Análise
Resolução de Domínio por Riot ID: Compatibilidade total com formatos de busca globais e alfanuméricos (Nome#Tag).

Cálculo de Telemetria Avançado: Algoritmos para consolidação e exibição em tempo real de taxas de vitória ponderadas e índices de KDA baseados no histórico.

Detecção de Erros Críticos de Gameplay: Algoritmos heurísticos que avaliam o andamento das partidas para apontar falhas estruturais de gameplay (ex: excesso de abates concedidos, sequências de itens ineficientes e baixa participação nos objetivos do mapa).

Mecanismo de Sugestão de Builds e Campeões: Avalia os dados recentes do jogador para recomendar caminhos de itens e alternativas táticas de campeões ideais.

4. Automação de Integração e Entrega Contínua
A infraestrutura de automação é controlada através de workflows do GitHub Actions (.github/workflows/deploy.yml):

Integração Contínua (CI): Executado automaticamente a cada push ou pull_request enviado à branch main. Inicializa um ambiente isolado em nuvem, monta cache de dependências Node para otimizar o tempo de execução, instala pacotes de forma imutável com npm ci e valida a integridade da compilação do build.

Entrega Contínua (CD Ready): Hooks de pós-validação estruturados para integração direta com provedores de computação em nuvem.

5. Topologia do Repositório
Plaintext
riftscope/
├── .github/workflows/
│   └── deploy.yml          # Automação de pipeline CI/CD do GitHub Actions
├── backend/
│   ├── src/
│   │   ├── config/redis.js # Conexão com a infraestrutura de cache Redis
│   │   └── server.js       # Servidor Express e rotas de processamento analítico
│   ├── Dockerfile          # Manifesto multi-stage para container de produção
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── App.jsx         # Renderização de interface e processamento de dados
│   │   └── App.css         # Regras de estilo do painel analítico minimalista
│   └── Dockerfile          # Compilação estática e configuração de proxy do Nginx
├── .env.example            # Molde de variáveis de ambiente para credenciais
├── .gitattributes          # Regras de padronização de caracteres invisíveis (LF)
└── docker-compose.yml      # Especificação do orquestrador multi-container local
6. Guia de Execução Local
Pré-requisitos
Ambiente Docker Engine / Docker Desktop operacional.

Procedimento Passo a Passo
Clone a branch principal do repositório:

Bash
   git clone [https://github.com/seu-usuario/riftscope.git](https://github.com/seu-usuario/riftscope.git)
   cd riftscope
Configure as variáveis de ambiente:

Duplique o arquivo .env.example salvando-o como .env na raiz do projeto.

Insira o token ativo gerado na sua área de desenvolvedor do Riot Developer Portal:

Plaintext
     RIOT_API_KEY=RGAPI-SUA-STRING-DE-TOKEN-AQUI
     PORT=3000
     ```
3. Inicialize a rede de containers e monte o ecossistema com a flag de compilação:
```bash
   docker compose up --build
O painel de monitoramento e análise estará acessível localmente no navegador através do endereço padrão: http://localhost.