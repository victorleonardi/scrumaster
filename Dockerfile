FROM node:18-alpine

ARG DATABASE_URL=${DATABASE_URL}
ENV DATABASE_URL=${DATABASE_URL}

# Set working directory
WORKDIR /app

# Install only production dependencies
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

# Copy prebuilt output and required files
COPY . .

RUN npm run prisma:migrate:generate
RUN npm run prisma:migrate:dev

# Ensure Nuxt uses the correct host and port (CapRover expects 0.0.0.0:3000)
ENV NUXT_PORT=3000
ENV NUXT_HOST=0.0.0.0
ENV NODE_ENV=production

# Start Nuxt server (SSR)
CMD ["node", ".output/server/index.mjs"]