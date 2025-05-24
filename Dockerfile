FROM node:18-alpine

# ⭐ WORKDIR Correto! (deve corresponder ao contexto do deploy)
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install install --production

# Copia TODOS os arquivos necessários (incluindo .nuxt e .output)
COPY . .

# Comando para iniciar o Nuxt
CMD ["node", ".output/server/index.mjs"]