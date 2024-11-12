FROM node:20.11-alpine AS builder

WORKDIR /var/www

COPY package.json ./

RUN yarn install

COPY . .

RUN yarn build

FROM node:20.11-alpine

WORKDIR /var/www

COPY --from=builder /var/www/node_modules ./node_modules
COPY --from=builder /var/www/dist ./dist
COPY --from=builder /var/www ./yarn.lock

COPY package.json ./

EXPOSE 8000

CMD ["node", "/var/www/dist/main.js"]
