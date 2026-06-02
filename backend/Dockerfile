# Estágio 1: Build e Instalação Geral
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .

# Estágio 2: Ambiente de Produção Otimizado
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY package*.json ./
# Usando a flag moderna recomendada pelo NPM para ignorar devDependencies
RUN npm ci --omit=dev
COPY --from=builder /app/src ./src

EXPOSE 3000
CMD ["node", "src/server.js"]