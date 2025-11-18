# Налаштування Firebase Storage CORS

## Проблема:
Firebase Storage блокує запити через CORS політику.

## Рішення:

### Спосіб 1: Через Firebase Console (рекомендовано)

1. **Відкрийте Firebase Console**: https://console.firebase.google.com/
2. Перейдіть до вашого проекту **uebs-be9ca**
3. Відкрийте **Storage** → **Rules**
4. Замініть правила на:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

5. Натисніть **Publish**

### Спосіб 2: Через Google Cloud Console (якщо Спосіб 1 не допоміг)

1. Встановіть Google Cloud SDK: https://cloud.google.com/sdk/docs/install

2. Авторизуйтесь:
```bash
gcloud auth login
```

3. Встановіть проект:
```bash
gcloud config set project uebs-be9ca
```

4. Застосуйте CORS конфігурацію:
```bash
gsutil cors set cors.json gs://uebs-be9ca.appspot.com
```

### Спосіб 3: Альтернативне рішення

Якщо обидва способи не працюють, можна використовувати Firebase Admin SDK на backend, але це вимагає створення API endpoints.

## Перевірка:

Після налаштування перезавантажте сторінку та спробуйте завантажити фото знову.

## Примітка:

Файл `cors.json` вже створено в корені проекту і готовий до використання у Способі 2.
