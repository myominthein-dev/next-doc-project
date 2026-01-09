FROM node:22-alpine

WORKDIR /app

RUN corepack enable

COPY pnpm-lock.yaml package.json ./

RUN pnpm install

COPY . .

EXPOSE 3000

CMD pnpm dev