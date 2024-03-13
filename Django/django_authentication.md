# django-rest-auth

[Инструкция](https://django-rest-auth.readthedocs.io/en/latest/installation.html) по установке django-rest-auth.

Вместо утаревшего `django-rest-auth` устанавливаем `dj-rest-auth`:

```
pip install dj-rest-auth django-allauth django-cors-headers
```

Добавляются приложения в settings.py:

```python
INSTALLED_APPS = [
    ...
    'rest_framework.authtoken',
    'dj_rest_auth',
    'django.contrib.sites',
    'allauth',
    'allauth.account',
    'allauth.socialaccount',
    'dj_rest_auth.registration',
]

SITE_ID = 1
```

Добалвяются маршруты в urls.py:

```python
urlpatterns = [
    ...
    path('rest-auth/', include('dj_rest_auth.urls')),
    path('rest-auth/registration', include('dj_rest_auth.registration.urls')),
]
```
Выполняются миграции:

```
python manage.py migrate
```

Для того, что бы авторизоваться из frontend и получить ключ, нужно отправить POST запрос по маршруту `rest-auth/login`, с телом

```json
{
    username: '<username>',
    password: '<password>'
}
```

Для регистрации же нужно отправлять POST запрос по маршруту `rest-auth/registration` с телом запроса:

```json
{
    username: '<username>',
    еmail: '<почтовый адресс>'
    password1: '<password>'
    password1: '<password>'
}
```
В ответ будет получен ключ, который может быть сохранен, скажем, в `localStorage`.


Авторизацию и регистрацию можно делать и на backend:

- http://localhost:8000/rest-auth/login 
- http://localhost:8000/rest-auth/registration 

При этом, регистрацию можно проводить без заполнения поля email но если регистрация происходит на frontend, то отправка email  обязательна. Django попытается отправить письмо на указанный адресс для подтверждения. Без специальной настройки системы рассылки, это приведет к проблемам, и для того, чтобы этого избежат можно указать в settings.py параметр

```python
EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'
```

Gри таких настройках письмо фактически не будет отправлено, а просто будет выведено в терминале, но на этапе разработки этого достаточно 

>Подробнее об отправке электронных писем: Дронов - Глава 25

# Использование ключа на FrontEnd

На стороне фронтенда после регистрации или авторизации следует сохранить полученный ключ при помощи `localStorage` или `sessionStorage`:

```js
localStorage.setItem('key', data.key)
```
По этому ключу будет происходить идентификация пользователя при запросах. Для этого в Header запросов нужно будет вносить ключ следующим образом: если `requestXHR` – объект запроса, вставить ключ после вызова метода `open()` и до вызова `send()`:

```js
tagsListXHR.setRequestHeader("Authorization", "Token " + localStorage.getItem('key'))
```

Для того, чтобы BackEnd мог идентифицировать пользователя по  отправляемому в Headere токену, нужно вписать в settings.py:

```python
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework.authentication.TokenAuthentication',
    )
}
```

После этого, в views.py имя пользователя можно будет получать через `request.user`:

```python
user = request.user
```
