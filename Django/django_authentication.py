# https://django-rest-auth.readthedocs.io/en/latest/installation.html

# устанавливается пакет
# вместо утаревшего django-rest-auth устанавливаем dj-rest-auth

pip install dj-rest-auth django-allauth django-cors-headers

# добавляются приложения в settings.py

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

# добалвяются маршруты в urls.py

urlpatterns = [
    ...
    path('rest-auth/', include('dj_rest_auth.urls')),
    path('rest-auth/registration', include('dj_rest_auth.registration.urls')),
]

# выполняются миграции

python manage.py migrate

# для того, что бы авторизоваться из frontend и получить ключ, 
# нужно отправить POST запрос по маршруту rest-auth/login, с телом

{
    username: '<username>',
    password: '<password>'
}

# для регистрации же нужно отправлять POST запрос по маршруту
# rest-auth/registration с телом запроса, в ответ будет получен ключ

{
    username: '<username>',
    еmail: '<почтовый адресс>'
    password1: '<password>'
    password1: '<password>'
}

# авторизацию и регистрацию можно делать и на backend:
http://localhost:8000/rest-auth/login 
http://localhost:8000/rest-auth/registration 
# при это регистрацию можно проводить без заполнения поля email
# но если регистрация происходит на frontend, то отправка email 
# обязательна. При этом django попытается отправить письмо на
# указанный адресс для подтверждения. Без специальной настройки
# системы рассылки, это приведет к проблемам, и для того, чтобы
# этого избежат можно указать в settings.py параметр

EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'

# при этом письмо фактически не будет отправлено, а просто будет
# выведено в консоли, но на этапе разработки этого достаточно

# подробнее об отправке электронных писем: Дронов - Глава 25

# на стороне фронтенда после регистрации или авторизации
# следует сохранить полученный ключ при помощи localStorage
# или sessionStorage:

localStorage.setItem('key', data.key)

# По этому ключу будет происходить идентификация пользователя 
# при запросах. Для этого в Header запросов нужно будет вносить 
# ключ следующим образом: если requestXHR - объект запроса, 
# записать после вызова метода open() и до вызова send()

tagsListXHR.setRequestHeader("Authorization", "Token " + localStorage.getItem('key'))

# для того, чтобы backend мог идентифицировать пользователя по
# отправляемому в Headere токену, нужно вписать в settings.py

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework.authentication.TokenAuthentication',
    )
}

# после этого в представлениях (views.py) имя пользователя можно
# будет получать через request.user

user = request.user