ARG ENV_FILE


FROM node:20.11-alpine AS builder

WORKDIR /var/www

COPY package.json ./
RUN yarn install

COPY . .

COPY $ENV_FILE /tmp/ENV_FILE
RUN cat /tmp/ENV_FILE > .env.production

RUN yarn build

FROM node:20.11-alpine

WORKDIR /var/www

COPY --from=builder /var/www/node_modules ./node_modules
COPY --from=builder /var/www/dist ./dist
COPY --from=builder /var/www/yarn.lock .
COPY --from=builder /var/www/.env.production .

COPY package.json ./

EXPOSE 5173

CMD ["yarn", "serve"]
