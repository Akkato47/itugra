FROM node:20.11-alpine AS builder

WORKDIR /var/www

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

FROM node:20.11-alpine

WORKDIR /var/www

COPY --from=builder /var/www/node_modules ./node_modules
COPY --from=builder /var/www/dist ./dist

COPY package.json yarn.lock ./

ENV BASE_API_URL="${BASE_API_URL}"
ENV BASE_WS_URL="${BASE_WS_URL}"

EXPOSE 5173

CMD ["yarn", "preview", "--host", "0.0.0.0", "--port", "5173"]
