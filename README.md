# Admin Panel RAG Bot

Веб-интерфейс административной панели для управления RAG-ботом.

## Стек технологий

- **React** 19.2.0
- **TypeScript** 5.9.3
- **Vite** 7.1.12
- **React Router DOM** 7.9.5

## Требования

- Node.js >= 18.0.0
- npm или yarn

## Установка

```bash
# Клонировать репозиторий
git clone https://github.com/Cerchant/admin-panel-RAG-bot.git
cd admin-panel-RAG-bot

# Установить зависимости
npm install
```

## Переменные окружения

Скопируйте файл `.env.example` в `.env` и заполните переменные:

```bash
cp .env.example .env
```

Список переменных:
- `VITE_API_BASE_URL` - URL бэкенд API
- `VITE_API_TOKEN` - Токен авторизации для API

## Команды

### Разработка

Запустить сервер разработки:

```bash
npm run dev
```

Приложение будет доступно по адресу: `http://localhost:3000`

### Сборка

Собрать проект для production:

```bash
npm run build
```

Результат сборки будет в папке `dist/`

### Предпросмотр

Предпросмотр production-сборки:

```bash
npm run preview
```

## Docker

### Требования

- Docker Engine 20.10+
- Docker Compose 2.0+ (опционально)
- Node.js 20+ встроен в образ

### Сборка и запуск с Docker

```bash
# Сборка образа
docker build -t admin-panel-rag-bot .

# Запуск контейнера
docker run -p 3000:80 --env-file .env admin-panel-rag-bot
```

### Использование Docker Compose

```bash
# Запуск
docker-compose up -d

# Остановка
docker-compose down

# Пересборка и запуск
docker-compose up -d --build
```

Приложение будет доступно по адресу: `http://localhost:3000`

## Структура проекта

```
├── src/
│   ├── components/      # React компоненты
│   ├── contexts/        # React Context (AuthContext)
│   ├── pages/          # Страницы приложения
│   ├── services/       # API сервисы
│   ├── utils/          # Утилиты (dateFormatter)
│   ├── App.tsx         # Главный компонент
│   └── main.tsx        # Точка входа
├── public/             # Статические файлы
├── dist/               # Production сборка
└── .env                # Переменные окружения (не в git)
```

## Функциональность

- **Логи** - просмотр логов пользователей, срабатываний конфиденциально, изменений менеджеров
- **Менеджеры** - управление менеджерами (локальное хранилище)
- **Пользователи Telegram** - управление ролями и ресторанами пользователей
- Пагинация и поиск по таблицам
- Авторизация через токен

## Устранение проблем

### TypeScript ошибки в IDE

Если IDE показывает ошибки импорта модулей, но проект успешно собирается:

**VS Code:**
- Нажмите `Cmd+Shift+P` → `TypeScript: Restart TS Server`

**WebStorm/IntelliJ:**
- `File` → `Invalidate Caches...` → `Invalidate and Restart`

### Проблемы с копированием в буфер обмена

Если на удаленном сервере не работает копирование ссылок, убедитесь что:
- Сайт работает через **HTTPS** (Clipboard API требует безопасного соединения)
- Если HTTPS недоступен, приложение использует fallback метод (execCommand)

Приложение автоматически определяет доступность Clipboard API и использует совместимый метод.

## Лицензия

ISC
