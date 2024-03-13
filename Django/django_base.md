# Установка и создание проекта

```
pip install django 
```

>Для установки Django REST, необходимо также установить библиотеки `pillow`,  `djangorestframework`. Особенности работы с REST описаны в файле rest.

Создание нового проекта:

```
django-admin startproject <project_name>
```

**Проект** (*Project*) представляет собой верхний уровень контейнера для вашего веб-приложения. В проекте содержатся конфигурации приложений. Проект также включает общие компоненты, которые используются разными приложениями внутри него.

Для запуска веб-сервера, нужно выполнить комманду

```
python manage.py runserver
```
Сервер будет доступен по http://localhost:8000/


## Файлы конфигурации проекта

Внутри проекта с именем `project_name` содержится файл manage.py, директория с одноименным названием project_name (пакет конфигурации), в котором находятся файлы setting.py, urls.py и др., а также директории приложений проекта, если они уже созданы. 

**manage.py** – программный файл с кодом одноименной утилиты, с использовани­ем которой производятся различные действия над самим проектом. Впрочем, единственное, чем она занимается – вызывает утилиту **django-admin**, передавая ей все полученные комманды и конфигурируя ее для обработки
текущего проекта.

**settings.py** – модуль с настройками самого проекта. Включает описание конфигурации базы данных проекта, пути ключевых папок, важные параметры, связанные с безопасностью, и пр.

**urls.py** – модуль с маршрутами уровня проекта.

**wsgi.py** – модуль, связывающий проект с веб-сервером

# Приложения

**Приложение** (*Application*) в терминологии Django это отдельный фрагмент функциональности разрабатываемого сайта, более или менее независимый от других таких же фрагментов и входящий в состав проекта. Приложение может реализовывать работу целого сайта, его раздела или же какой-либо внутренней подсистемы сайта, используемой другими приложениями. 

## Создание нового приложения

Для создания нового приложения, необходимо выполнить следующую комманду с директории проекта:

```
python manage.py startapp <app_name>
```

Любое приложение представляется обычным пакетом Python (пакет приложения), в котором находятся модули с программным кодом (views.py, models.py и т.д.). Этот пакет находится в папке проекта там же, где располагается пакет конфигурации. Имя пакета приложения станет именем самого приложения.

## Регистрирование приложения

Для регистрации приложения с именем `app_name` в проекте, необходимо в файле setting.py в список `INSTALLED_APPS` вписать `'app_name.apps.App_nameConfig'`.

## Модули пакета приложения

### Views

В файле **views.py** – содержится код, запускаемый в ответ на поступление клиентского запроса (контроллеры). Именно в контроллерах выполняются все действия по подготовке данных для ответа, ровно как и обработка данных, поступивших от клиента. Контроллер может быть реализован как функция или класс.

### URLs

Маршрутизация (*routing*) в терминах Django это процесс выяснения, какой контроллер следует запустить при получении в составе клиентского запроса интернет-адреса определенного формата. Подсистема фреймворка, выполняющая маршрутизацию, носит название маршрутизатора (*router*).

При поступлении любого запроса от клиента Django разбирает его на составные части (этим занимается группа программных модулей, 
называемых посредниками), извлекает запрошенный клиентом интернет-адрес, удаляет из него все составные части, за исключением пути, который передает маршрутизатору. Последний последовательно сравнивает его с шаблонными адресами, записанными в списке маршрутов.Как только будет найдено совпадение, маршрутизатор выясняет, какой контроллер связан с совпавшим шаблонным адресом, и передает этому контроллеру управление.

Маршруты определяются в файлах `urls.py`. В первую очередь, маршруты обрабатываются маршрутизатором, определенным в конфигурационном пакете проекта. При необходимости, этот маршрутизатор передает запрос матршрутизатору, определенному в приложении.

### Models

Модель – это однозначное и исчерпывающее описание сущности, хранящейся в базе данных в виде класса Python. Класс модели описывает таблицу базы данных, в которой будет храниться набор сущностей, и содержит атрибуты класса, каждый из которых описывает одно из полей этой таблицы. Т.о. модель – это представление таблицы и ее полей средствами Python. Отдельный экземпляр класса модели представляет отдельную конкретную сущность, извлеченную из базы, т. е. отдельную запись соответствующей таблицы. Пользуясь объявленными в модели атрибутами класса, мы можем получать значения, хранящиеся в полях записи, равно как и записывать в них новые значения. Помимо этого, класс модели предоставляет инструменты для выборки сущностей из базы, их фильтрации и сортировки на основе заданных критериев. Полученный результат представляется в виде последовательности экземпляров класса модели. Модели объявляются на уровне приложения. Объявляющий их код записывается в модуль **models.py** пакета приложения. Изначально этот модуль пуст.

### Миграции

Миграция – это модуль Python, созданный самим Django на основе опредной модели и предназначенный для формирования в базе данных всех требуемых этой моделью структур: таблиц, полей, индексов, правил и связей.

Команда `makemigrations` утилиты **manage.py** запускает генерирование файлов миграций для всех моделей, объявленных в приложении, чье имя записано после самой команды, и не изменившихся с момента предыдущего генерирования миграций:

```
python manage.py makemigrations <app_name>
```

Сформированные таким образом модули с миграциями сохранябтся в пакете **migragions**, находящемся в директории приложения.

Миграция при выполнении порождает команды на языке SQL, которые будут отправлены СУБД и, собственно, выполнят все действия по созданию необходимых структур данных. Посмотреть на результирующий SQL-код миграции можно командой (XXXX – код миграции)

```
python manage.py sqlmigrate <app_name> XXXX 
```

Для выполнения всех миграций всех приложений, нужно выполнить

```
python manage.py migrate
```

> при разработке реальных сайтов настоятельно рекомендуется исключать ненужные стандартные приложения из списка зарегистрированных в проекте.



# Административный сайт

Административный веб-сайт предоставляет доступ ко всем моделям, объявленным во всех приложениях, составляющих проект. Мы можем просматривать, добавлять, править и удалять записи, выполнять их фильтрацию и сортировку. Помимо этого, административный сайт не пускает к данным сайта посторонних, используя для этого встроенную во фреймворк подсистему разграничения доступа. Эта подсистема реализована в стандартном приложении `django.contrib.auth`, а работу самогó административного сайта обеспечивает стандартное приложение `django.contrib.admin`. Оба этих приложения заносятся в список зарегистрированных в проекте изначально.

Стандартное приложение использует `django.contrib.auth` для хранения списков зарегистрированных пользователей, групп и прав особые модели. Для них в базе данных должны быть созданы таблицы. За создание этих таблиц отвечают особые миграции. Следовательно, чтобы встроенные в Django средства разграничения доступа работали, нужно хотя бы один раз выполнить миграции. Также, нужно создать зарегистрированного пользователя сайта с максимальными правами доступа (суперпользователя) коммадой `python manage.py createsuperuser`.

Зайти на админитративный сайт можно по адресу http://localhost:8000/admin/.

По-умолчанию на странице будут отображено только приложение AUTHENTICATION AND AUTHORIZATION c модулями Groups и Users. Для того, чтобы созданное в проекте приложение отобразилось в списке административного сайта, его нужно явно зарегистрировать там. Для этого нужно открыть модуль административный настроек **admin.py** в пакете приложения, импортировать из модуля models.py модель, которую мы хотим отображать на сайте, и передать ее в метод `register()` экземпляра класса `AdminSite`:

```python
from django.contrib import admin
from .models import Task
admin.site.register(Task)
```

Модуль `admin` из `django.contrib` предоставляет возможности для управления моделями посредством вем-интерфейса на админской странице. Имя `site` ссылается на объект класса `AdminSite` и представляетс собой экземпляр административного сайта, который управляет регистрацией моделей.


Экземпляр класса AdminSite, представляет сам административный сайт и хранин в переменной `site` модуля django.contrib.admin. Таким образом регистрируются модели


>Редактор модели позволяет изменить параметры представления модели на административном сайте. Редактор объявляется в модуле административных настроек admin.py пакета приложения. Подробнее в файле admin.py и Дронов – Django 3.0 с 52.
