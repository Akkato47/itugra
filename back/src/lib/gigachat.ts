import { GigaChat } from 'gigachat-node';

import config from '@/config';
import { CustomError } from '@/utils/custom_error';
import { HttpStatus } from '@/utils/enums/http-status';
import { logger } from '@/lib/loger';

/**
 * Создаёт настроенный клиент GigaChat.
 * Креды берутся из конфига (env GIGACHAT_CREDENTIALS), чтобы не хранить их в коде.
 */
export function createGigaChatClient(): GigaChat {
  const credentials = config.gigachat.credentials;

  if (!credentials) {
    throw new CustomError(
      HttpStatus.SERVICE_UNAVAILABLE,
      'GigaChat не настроен: задайте переменную окружения GIGACHAT_CREDENTIALS'
    );
  }

  // (clientSecretKey, isIgnoreTSL, isPersonal, autoRefreshToken)
  return new GigaChat(credentials, true, true, true);
}

/**
 * Достаёт первый валидный JSON-объект или массив из текстового ответа модели.
 *
 * LLM нередко добавляет markdown-обёртку (```json), пояснения до/после JSON
 * или лишний текст. Наивный JSON.parse падает с ошибкой вида
 * "Unexpected non-whitespace character after JSON at position N".
 *
 * Здесь мы находим первую открывающую скобку массива/объекта и сканируем строку
 * с учётом строковых литералов и экранирования до парной закрывающей скобки,
 * отбрасывая всё остальное.
 */
export function extractJson<T = unknown>(raw: string | undefined | null): T {
  if (!raw || typeof raw !== 'string') {
    throw new CustomError(
      HttpStatus.BAD_GATEWAY,
      'Пустой ответ модели'
    );
  }

  // Убираем markdown-ограждения ```json ... ```
  const text = raw
    .replace(/```[a-zA-Z]*\s*/g, '')
    .replace(/```/g, '')
    .trim();

  const start = text.search(/[[{]/);
  if (start === -1) {
    throw new CustomError(
      HttpStatus.BAD_GATEWAY,
      'В ответе модели не найден JSON'
    );
  }

  const open = text[start];
  const close = open === '[' ? ']' : '}';

  let depth = 0;
  let inString = false;
  let escaped = false;
  let end = -1;

  for (let i = start; i < text.length; i++) {
    const ch = text[i];

    if (inString) {
      if (escaped) {
        escaped = false;
      } else if (ch === '\\') {
        escaped = true;
      } else if (ch === '"') {
        inString = false;
      }
      continue;
    }

    if (ch === '"') {
      inString = true;
    } else if (ch === open) {
      depth++;
    } else if (ch === close) {
      depth--;
      if (depth === 0) {
        end = i;
        break;
      }
    }
  }

  if (end === -1) {
    throw new CustomError(
      HttpStatus.BAD_GATEWAY,
      'Не удалось извлечь корректный JSON из ответа модели'
    );
  }

  const json = text.slice(start, end + 1);

  try {
    return JSON.parse(json) as T;
  } catch {
    try {
      return JSON.parse(json.replace(/,(\s*[}\]])/g, '$1')) as T;
    } catch {
      logger.error(`Не удалось распарсить JSON из ответа модели: ${json}`);
      throw new CustomError(
        HttpStatus.BAD_GATEWAY,
        'Модель вернула некорректный JSON'
      );
    }
  }
}
