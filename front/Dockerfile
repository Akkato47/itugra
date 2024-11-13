ARG BASE_API_URL
ARG BASE_WS_URL
ARG BASE_YANDEX_API_URL
ARG YANDEX_REDIRECT_URI
ARG YANDEX_CLIENT_ID
ARG YANDEX_CLIENT_SECRET

FROM node:20.11-alpine AS builder

WORKDIR /var/www

COPY package.json ./
RUN yarn install

COPY . .

RUN echo "BASE_API_URL=${BASE_API_URL}"
RUN echo "BASE_YANDEX_API_URL=${BASE_YANDEX_API_URL}"
RUN echo "YANDEX_REDIRECT_URI=${YANDEX_REDIRECT_URI}"
RUN echo "YANDEX_CLIENT_ID=${YANDEX_CLIENT_ID}"
RUN echo "YANDEX_CLIENT_SECRET=${YANDEX_CLIENT_SECRET}"

RUN echo "BASE_API_URL=https://api.igniz.ru/api" > .env.production && \
    echo "BASE_YANDEX_API_URL=${BASE_YANDEX_API_URL}" >> .env.production && \
    echo "YANDEX_REDIRECT_URI=${YANDEX_REDIRECT_URI}" >> .env.production && \
    echo "YANDEX_CLIENT_ID=${YANDEX_CLIENT_ID}" >> .env.production && \
    echo "YANDEX_CLIENT_SECRET=${YANDEX_CLIENT_SECRET}" >> .env.production

RUN cat .env.production

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
