# UEBSchool - Особистий кабінет

## Налаштування Firebase

### 1. Створіть проект у Firebase Console

1. Перейдіть на [Firebase Console](https://console.firebase.google.com/)
2. Створіть новий проект або виберіть існуючий
3. Увімкніть **Authentication** → **Email/Password**
4. Увімкніть **Realtime Database**

### 2. Отримайте Firebase конфігурацію

1. У Firebase Console перейдіть до **Project Settings** (⚙️)
2. Прокрутіть до розділу **Your apps**
3. Виберіть **Web app** (</>)
4. Скопіюйте конфігураційні дані

### 3. Налаштуйте змінні середовища

Створіть файл `.env.local` у корені проекту та додайте свої Firebase credentials:

```bash
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_DATABASE_URL=https://your_project_id-default-rtdb.firebaseio.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### 4. Налаштуйте правила безпеки Realtime Database

У Firebase Console → Realtime Database → Rules додайте:

```json
{
  "rules": {
    "users": {
      "$uid": {
        ".read": "$uid === auth.uid",
        ".write": "$uid === auth.uid"
      }
    }
  }
}
```

## Структура проекту

### Нові файли:

- `src/lib/firebase.ts` - Firebase конфігурація
- `src/contexts/auth-context.tsx` - Context для авторизації
- `src/app/login/page.tsx` - Сторінка входу
- `src/app/register/page.tsx` - Сторінка реєстрації
- `src/app/cabinet/page.tsx` - Особистий кабінет

### Оновлені файли:

- `src/app/layout.tsx` - Додано AuthProvider
- `src/app/components/client/header.tsx` - Додано кнопки входу/кабінету

## Функціонал

### Авторизація:
- ✅ Реєстрація через email/пароль
- ✅ Вхід через email/пароль
- ✅ Відновлення пароля
- ✅ Вихід з акаунту

### Особистий кабінет:
- ✅ Перегляд профілю
- ✅ Редагування імені
- ✅ Відображення дати реєстрації
- ✅ Відображення останнього входу
- ✅ Швидкі посилання

### Firebase Realtime Database:
- ✅ Збереження профілю користувача
- ✅ Оновлення часу останнього входу
- ✅ Редагування профілю

## Використання

### Реєстрація:
```
/register - Форма реєстрації
```

### Вхід:
```
/login - Форма входу
```

### Особистий кабінет:
```
/cabinet - Доступний лише для авторизованих користувачів
```

## Запуск проекту

1. Встановіть залежності (якщо ще не встановлені):
```bash
npm install
```

2. Створіть `.env.local` з Firebase credentials

3. Запустіть dev сервер:
```bash
npm run dev
```

4. Відкрийте [http://localhost:3000](http://localhost:3000)

## Безпека

- Всі паролі шифруються Firebase Authentication
- Дані користувачів захищені правилами безпеки
- Доступ до кабінету лише для авторизованих користувачів
- Firebase credentials зберігаються в .env.local (не треба коммітити!)
