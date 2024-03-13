# PostgreSQL

Предполагается, что установлен django и создан проект.

1. Устанавливается база данных.
1. Устанавливаются пакеты для доступа к базе:
    ```
    pip install psycopg2 django_postgres_extensions
    ```
1. Создается база данных (в консоли SQL Shell) с именем db_name:
    ```
    create database <db_name>;
    ```

    Некоторые комманды:

    - `\l` или `\list ` – просмотр баз данных, которые уже созданы;
    - `\connect <db_name>` – выбор базы данных db_name;
    - `\dt` – показать таблицы базы данных.

1. В файле **settings.py** прописывается:

    ```python
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.postgresql_psycopg2',
            'NAME': '<db_name>',
            'USER': 'postgres',
            'PASSWORD': 'micromatosis2012',
            # 'HOST': 'localhost',
            # 'PORT': '',
        }
    }
    ```

1. Создаются миграции проекта:
    ```
    python manage.py makemigrations
    ```
1. Выполняются миграции:
    ```
    python manage.py migrate
    ```
1. Создается суперпользователь:
    ```
    python manage.py createsuperuser
    ```


# MySQL

1. Скачать можно [здесь](https://dev.mysql.com/downloads/installer/). При установке можно оставить дефолтные настройки за исключением следующиих пунктов:
    - Type and Networking выбрать Config Type: Server Computer;
    - Установить пароль корневого пользователя Root Account Password (создавать новый User Account нет необходимости).

    >При возникновении трудностей можно воспользоваться [инструкцией](https://wiki.merionet.ru/servernye-resheniya/12/ustanovka-mysql-servera-na-windows-10/).

1. Создать БД. Для этого открываем MySQL Command Line Client, вводим пароль и выполняем комманду `create database <db_name>;`. Убедиться в том, что база была создана, можно коммандой `show databases;`.

1. Устанавливаются пакеты `pymysql` и `mysqlclient` для доступа к БД. При установке `mysqlclient` могут возникнуть капризы. Для Python 3.6, в частности, можно установить версию `mysqlclient==1.4.6`.

1. Для подключения проекта Django к базе данных с именем `db_name` в файле **settings.py** прописываем данные базы с указанием `root` пользователя в словаре DATABASES:
    ```
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.mysql',
            'NAME': 'db_name',
            'USER': 'root',
            'PASSWORD': '****',
            # 'HOST': 'localhost',
            # 'PORT': '',
        }
    }
    ```

1. Создаются миграции проекта:
    ```
    python manage.py makemigrations
    ```
1. Выполняются миграции:
    ```
    python manage.py migrate
    ```
1. Создается суперпользователь:
    ```
    python manage.py createsuperuser
    ```

## Комманды MySQL


`create database <db_name>;` – создание базы данных с именем `db_name`;

`show databases;` – просмотр баз данных, которые уже созданы;

`use <db_name>;` – выбор базы данных с именем `db_name`;

`show tables;` – показать таблицы базы данных;

`describe <table_name>;` – показать поля таблицы `table_name`.

[`ALTER TABLE`](https://andreyex.ru/bazy-dannyx/baza-dannyx-mysql/komanda-alter-table-v-mysql-kak-dobavit-udalit-i-izmenit-stolbtsy/) – добавление, удаление изменение столбцов;

`drop table <table_name>` – удаление таблицы `table_name`;

`set foreign_key_checks = 0` – для игнорирования связанности Foreign Key;

`SELECT User,Host FROM mysql.user;` – просмотр пользователей.

Создание пользователя с именем `someusername` и паролем `123`:
    
```
CREATE USER 'someusername'@'localhost' IDENTIFIED BY '123';
``` 

Предоставление пользователю `user_name` из `host` все права над базой `db_name`;

```
GRANT ALL PRIVILEGES ON <db_name> . * TO 'user_name'@'host';
```
Для предоставления также привелегии давать права другим пользователям (суперпользователь):

```
GRANT ALL PRIVILEGES ON <db_name> . * TO 'user_name'@'host' WITH GRANT OPTION;
``` 

После обновления прав пользователя необходимо обновить таблицу прав пользователей MySQL в памяти:
```
FLUSH PRIVILEGES; 
```

`SHOW GRANTS FOR 'user_name'@'host';` – просмотр привелегий

>подробнее об изменении прав [здесь](https://losst.ru/sozdanie-polzovatelya-mysql)...


