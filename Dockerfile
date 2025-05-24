FROM node:18-alpine

# Set working directory
WORKDIR /app

# Install only production dependencies
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

# Copy prebuilt output and required files
COPY . .

# Ensure Nuxt uses the correct host and port (CapRover expects 0.0.0.0:3000)
ENV NUXT_PORT=3000
ENV NUXT_HOST=0.0.0.0
ENV NODE_ENV=production

# Start Nuxt server (SSR)
CMD ["node", ".output/server/index.mjs"]