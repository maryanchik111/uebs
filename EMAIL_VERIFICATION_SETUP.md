# Налаштування верифікації Email в Firebase

## Що вже реалізовано

✅ **В коді:**
- Автоматична відправка листа верифікації при реєстрації (`register` функція)
- Кнопка "Відправити лист верифікації знову" на сторінці входу
- Перевірка статусу верифікації (`user.emailVerified`)
- Функція `sendVerificationEmail()` в auth-context

## Налаштування в Firebase Console

### 1. Увійдіть в Firebase Console
- Перейдіть на https://console.firebase.google.com/
- Виберіть проект **uebs-be9ca**

### 2. Налаштуйте Email Templates
1. В лівому меню: **Authentication** → **Templates**
2. Виберіть тип шаблону: **Email address verification**
3. Налаштуйте шаблон:
   - **From name**: UEBSchool або ваше ім'я
   - **Subject**: Підтвердження електронної пошти для UEBSchool
   - **Body**: Можете змінити текст листа (підтримується HTML)

### 3. Налаштуйте Authorized Domains
1. В **Authentication** → **Settings** → **Authorized domains**
2. Переконайтеся що додані:
   - `localhost` (для розробки)
   - Ваш production домен (коли деплоїте)

### 4. (Опціонально) Власний SMTP сервер
За замовчуванням Firebase використовує власний SMTP. Якщо хочете використовувати власний:

1. Перейдіть в **Project Settings** → **Cloud Messaging**
2. Додайте SendGrid, Mailgun або інший SMTP сервер
3. Налаштуйте API ключі

## Як працює верифікація

### При реєстрації:
```typescript
// В src/contexts/auth-context.tsx
await sendEmailVerification(user);
```

### На сторінці логіну:
```typescript
// Кнопка "Відправити лист знову"
const handleSendVerificationEmail = async () => {
  await sendVerificationEmail();
  setVerificationEmailSent(true);
}
```

### Перевірка статусу:
```typescript
if (user.emailVerified) {
  // Пошта підтверджена
} else {
  // Показуємо попередження
}
```

## Тестування

1. **Створіть новий акаунт** на `/register`
2. **Перевірте пошту** - має прийти лист від Firebase
3. **Натисніть на посилання** в листі
4. **Оновіть сторінку** - попередження має зникнути

## Troubleshooting

### Листи не приходять?
1. Перевірте папку Spam
2. Перевірте чи правильно налаштовані Authorized domains
3. Перевірте чи увімкнено Email/Password в Authentication Methods

### Помилка "auth/too-many-requests"?
- Firebase обмежує кількість листів на день
- Зачекайте або використайте інший email для тестів

### Лист приходить англійською?
- Змініть шаблон в Firebase Console → Templates
- Можна додати HTML розмітку для кращого вигляду

## Приклад custom шаблону листа

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; background: #f5f5f5; padding: 20px; }
    .container { background: white; padding: 30px; border-radius: 10px; max-width: 600px; margin: 0 auto; }
    .button { background: linear-gradient(to right, #3b82f6, #8b5cf6); color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; display: inline-block; margin: 20px 0; }
  </style>
</head>
<body>
  <div class="container">
    <h1>Вітаємо в UEBSchool! 🎓</h1>
    <p>Дякуємо за реєстрацію. Для завершення реєстрації, будь ласка, підтвердіть вашу електронну адресу:</p>
    <a href="%LINK%" class="button">Підтвердити Email</a>
    <p>Якщо ви не реєструвались на UEBSchool, просто проігноруйте цей лист.</p>
    <p>З повагою,<br>Команда UEBSchool</p>
  </div>
</body>
</html>
```

## Додаткові можливості

### Автоматичне оновлення статусу
Додайте в auth-context.tsx:

```typescript
useEffect(() => {
  const interval = setInterval(async () => {
    if (user && !user.emailVerified) {
      await user.reload();
      if (user.emailVerified) {
        // Оновити UI
      }
    }
  }, 5000); // Перевіряти кожні 5 секунд

  return () => clearInterval(interval);
}, [user]);
```

### Redirect після верифікації
В Firebase Console можна налаштувати URL для редіректу після підтвердження пошти.

## Посилання

- [Firebase Email Verification Docs](https://firebase.google.com/docs/auth/web/manage-users#send_a_user_a_verification_email)
- [Email Templates](https://firebase.google.com/docs/auth/custom-email-handler)
- [Action Code Settings](https://firebase.google.com/docs/reference/js/auth.actioncodesettings)
