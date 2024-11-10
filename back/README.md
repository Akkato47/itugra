# Digital hackaton

## 📋 Содержание

- [О проекте](#-о-проекте)
- [Чек лист](#-чек-лист)
- [Технологии](#-технологии)
- [Установка](#-установка)
- [Настройка окружения](#-настройка-окружения)
- [Запуск приложения](#️-запуск-приложения)
- [Команды](#-команды)
- [Лицензия](#-лицензия)
---

## 🚀 О проекте

Express Drizzle Redis Starter предоставляет основу для быстрого разворачивания backend-приложений. Проект содержит уже настроенную интеграцию с Redis и PostgreSQL, а также готовую к использованию структуру REST API.

## ✔ Чек-лист

Реализованные возможности в проекте

- [x] Express.
- [x] PostgreSQL.
- [x] Drizzle ORM.
- [x] Настроены базовые миграции базы данных.
- [x] Redis.
- [x] Dockerfile и Docker compose.
- [x] Mail sender.
- [x] S3 uploads.
- [x] Подключена OAuth2.0 авторизация через Яндекс.

## 🛠 Технологии

Проект построен на основе следующих технологий и библиотек:

- **[Node.js](https://nodejs.org/)** – среда выполнения JavaScript на сервере
- **[Express](https://expressjs.com/)** – минималистичный и гибкий веб-фреймворк для Node.js
- **[Drizzle ORM](https://orm.drizzle.team/)** – ORM для PostgreSQL
- **[Redis](https://redis.io/)** – высокопроизводительный кэш и брокер сообщений
- **[Docker](https://www.docker.com/)** – контейнеризация и управление зависимостями

## 📦 Установка

1. Клонируйте репозиторий:

   ```bash
   git clone https://github.com/Akkato47/express-drizzle-redis-starter.git
   cd express-drizzle-redis-starter
   ```

2. Убедитесь, что на вашем компьютере установлены **Docker** и **Docker Compose**. Этот проект использует Docker для контейнеризации сервисов.

## 🔧 Настройка окружения

Создайте файл `.env` в корневой папке проекта и заполните его, используя пример ниже или `.env.example`:

```env
PORT=8000
NODE_ENV=dev
CLIENT_BASE_URL=http://localhost:5173

DATABASE_HOST=127.0.0.1
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=your_database_password
DATABASE_NAME=starter
DATABASE_URL=postgresql://your_database_user:your_database_password@127.0.0.1:5432/starter

JWT_ACCESS_SECRET=your_jwt_access_secret
JWT_REFRESH_SECRET=your_jwt_refresh_secret
JWT_PASSWORD_RESET_SECRET=your_jwt_password_reset_secret

REDIS_PORT=6379
REDIS_PASSWORD=your_redis_password
REDIS_HOST=localhost

BUCKET_KEY=your_bucket_key
BUCKET_SECRET=your_bucket_secret
BUCKET_ENDPOINT=https://your_bucket_endpoint
BUCKET_NAME=your_bucket_name

MAIL_HOST=smtp.yourmailservice.com
MAIL_USER=your_email@example.com
MAIL_PASSWORD=your_email_password
MAIL_FROM=your_email@example.com
MAIL_PORT=465

YANDEX_CLIENT_ID=your_yandex_client_id
YANDEX_CLIENT_SECRET=your_yandex_client_secret
```

## ▶️ Запуск приложения

Запустить проект можно с помощью Docker Compose:

```bash
docker-compose up -d --build
```

После успешного запуска проект будет доступен по адресу: `http://localhost:8000/api`.

## 📜 Команды

- **`docker-compose up`**: запускает проект в Docker.
- **`docker-compose down`**: останавливает и удаляет контейнеры.
- **`yarn dev`**: локальный запуск проекта для разработки (без Docker).
- **`yarn migrate`**: запуск миграций базы данных.
- **`yarn generate`**: генерация необходимых файлов на основе схемы Drizzle.

## ⚖️ Лицензия

Этот проект лицензирован под [MIT License](LICENSE).

---
