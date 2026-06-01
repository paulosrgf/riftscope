# Estágio 1: Build e Instalação
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .

# Estágio 2: Ambiente de Produção limpo
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY package*.json ./
RUN npm ci --only=production
COPY --from=builder /app/src ./src

EXPOSE 3000
CMD ["node", "src/server.js"]