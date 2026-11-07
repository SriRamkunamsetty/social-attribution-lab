FROM node:24-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production HOST=0.0.0.0 PORT=3000
COPY package.json ./
COPY src ./src
COPY public ./public
EXPOSE 3000
USER node
CMD ["node", "src/server.mjs"]
