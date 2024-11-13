ARG BASE_API_URL="${BASE_API_URL}"\
    BASE_WS_URL="${BASE_WS_URL}" \
    BASE_YANDEX_API_URL="${BASE_YANDEX_API_URL}" \
    YANDEX_REDIRECT_URI="${YANDEX_REDIRECT_URI}" \
    YANDEX_CLIENT_ID="${YANDEX_CLIENT_ID}" \
    YANDEX_CLIENT_SECRET="${YANDEX_CLIENT_SECRET}"

FROM node:20.11-alpine AS builder

WORKDIR /var/www

COPY package.json ./

RUN yarn install

COPY . .

ENV BASE_API_URL="${BASE_API_URL}"\
    BASE_WS_URL="${BASE_WS_URL}" \
    BASE_YANDEX_API_URL="${BASE_YANDEX_API_URL}" \
    YANDEX_REDIRECT_URI="${YANDEX_REDIRECT_URI}" \
    YANDEX_CLIENT_ID="${YANDEX_CLIENT_ID}" \
    YANDEX_CLIENT_SECRET="${YANDEX_CLIENT_SECRET}"

RUN echo "BASE_API_URL=${BASE_API_URL}" > .env && \
    echo "BASE_WS_URL=${BASE_WS_URL}" >> .env && \
    echo "BASE_YANDEX_API_URL=${BASE_YANDEX_API_URL}" >> .env && \
    echo "YANDEX_REDIRECT_URI=${YANDEX_REDIRECT_URI}" >> .env && \
    echo "YANDEX_CLIENT_ID=${YANDEX_CLIENT_ID}" >> .env && \
    echo "YANDEX_CLIENT_SECRET=${YANDEX_CLIENT_SECRET}" >> .env

RUN yarn build

FROM node:20.11-alpine

WORKDIR /var/www

COPY --from=builder /var/www/node_modules ./node_modules
COPY --from=builder /var/www/dist ./dist
COPY --from=builder /var/www/yarn.lock .

COPY package.json ./


EXPOSE 5173

CMD ["yarn", "serve"]
