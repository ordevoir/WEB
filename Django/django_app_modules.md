# Models

Модель должна быть подклассом класса `Model` из модуля `django.db.models`. Отдельным полям модели присваиваются объекты классов, представляющих поля соответствующих типов и объявленных в том же модуле `django.db.models`. Параметры полей указываются в конструкторах классов полей в виде значений именнованных параметров:

```python
class Task(models.Model):
    title = models.CharField(max_length=150, verbose_name='Title', db_index=True)
    discribe = models.TextField(null=True, blank=True, verbose_name='Discribtion')
    created = models.DateTimeField(auto_now_add=True, db_index=True, verbose_name='Created')
```

Один такой класс соответствует одной таблице в БД, т.е. является моделью этой таблицы.

Для того, чтобы по моделям были созданы таблицы, необходимо произвести миграции.

Модель необходимо зарегистрировать на админском сайте.

## Типы полей

Примеры полей ([model fields types](https://docs.djangoproject.com/en/5.0/ref/models/fields/#field-types); наверху страницы есть список типов полей):

- [`CharField`](https://docs.djangoproject.com/en/5.0/ref/models/fields/#charfield) – обычное строковое поле фиксированной длины `max_lenght`.
- [`TextField`](https://docs.djangoproject.com/en/5.0/ref/models/fields/#textfield) – текстовое поле неограниченной длины, или memo-поле.
- [`FloatField`](https://docs.djangoproject.com/en/5.0/ref/models/fields/#floatfield) – поле для хранения вещественных чисел.
- [`DateTimeField`](https://docs.djangoproject.com/en/5.0/ref/models/fields/#datetimefield) – поле для хранения отметки даты и времени. Присвоив параметру `auto_now_add` конструктора значение `True`, мы предпишем Django при создании новой записи записывать в это поле текущие дату и время. Также имеются поля [`DateField`](https://docs.djangoproject.com/en/5.0/ref/models/fields/#datefield) и [`TimeField`](https://docs.djangoproject.com/en/5.0/ref/models/fields/#timefield).
- [`SlugField`](https://docs.djangoproject.com/en/5.0/ref/models/fields/#slugfield) – слаг, т.е. строка, однозначно идентифицирующая запись и применяемая в качестве части интернет-адреса. В отличие от `CharField` имеет свои специальные валидаторы.
- [`PositiveIntegerField`](https://docs.djangoproject.com/en/5.0/ref/models/fields/#positiveintegerfield) – положительные целые числа (4 байта). Значения от 0 до 2147483647 безопасны во всех базах данных, поддерживаемых Django.
- [`BigIntegerField`](https://docs.djangoproject.com/en/5.0/ref/models/fields/#bigintegerfield) – целые числа (8 байт). Может хранить значения от -9223372036854775808 до 9223372036854775807.
- [`BooleanField`](https://docs.djangoproject.com/en/5.0/ref/models/fields/#booleanfield) – хранит значения `True` / `False`.


## Параметры конструкторов

Примеры параметров ([field options](https://docs.djangoproject.com/en/5.0/ref/models/fields/#field-options); наверху страницы есть список параметров):


- [db_index](https://docs.djangoproject.com/en/5.0/ref/models/fields/#db-index) – при присваивании ему значения `True` укажет создать для этого поля индекс.
- [blank](https://docs.djangoproject.com/en/5.0/ref/models/fields/#blank) – значение `True` позволяет остаялять поле пустым; если при этом [`null`](https://docs.djangoproject.com/en/5.0/ref/models/fields/#null) также задан как `True` то при этом в базу будет записываться значение `NULL` (подробнее см. Дронов с.91).
- [unique](https://docs.djangoproject.com/en/5.0/ref/models/fields/#unique) – если задано значение `True`, то поле должно быть уникальным по всей таблице. Поля с флагом `unique=True` автоматически индексируются, поэтому можно не задвать явно `db_index=True`.


## Поля отношений

Всего есть три поля отношений: `ForeignKey` (Many-to-One Field), `ManyToManyField` и `OneToOneField`. Эти классы позволяют установить соответствующие отношения между парами моделей (таблиц).

### [`ForeignKey`](https://docs.djangoproject.com/en/5.0/ref/models/fields/#foreignkey)

Класс `ForeignКey` представляет поле внешнего ключа, в котором фактически будет храниться ссылка на запись из другой (внешней) таблицы.

Предположим, что помимо объявленного выше класса модели `Task` имеется еще модель `Activity`. Тогда, определяя поле класса `Task` следующим образом:

```python
activity = models.ForeignKey('Activity', on_delete=models.SET_NULL, to_field='title', related_name='tasks')
```

тогда, поле `activity` может принимать значения только и множества записей таблицы `Activity`, т.е. любая запись таблицы `Task` может быть связанна с единственной записью таблицы `Activity`. Так как в данном случае имеем дело с отношением Many-to-One, то неограниченное количество записей таблицы `Task` может быть связано с единственной записью из таблицы `Activity`. Модель, в которой создается поле `ForeignKey` называется `вторичной`, а модель, которая служит внешним ключом – называют `первичной`. В отличие от отношений `ManyToManyField` и `OneToOneField`, отношение `ForeignKey` не является симметричным.

Первым аргументом (`to`) конструктору класса `ForeignKey` передается класс первичной модели. Сделать это можно двумя способами:

- передать ссылку на класс, если класс внешней модели (`Activity`) объявлен перед данным классом (т.е. имя внешнего класса без кавычек);

- передать строку с именем класса если данная модель объявлена раньше внешней (т.е. имя внешнего класса в кавычках: `"Activity"`).

Параметр [`on_delete`](https://docs.djangoproject.com/en/5.0/ref/models/fields/#django.db.models.ForeignKey.on_delete) управляет удалениями записей данной модели, после удаления записи внешней модели (`Activity`), с которой они были связаны:
- `CASCADE` – удаляет все связанные записи модели (`Task`).
- `SET_NULL` – заносит в поле внешнего ключа всех связанных записей `NULL`.
- `SET(<значение>)` – заносит в поле внешнего ключа указанное значение; можно вписать ссылку на функцию, возвращающую значение (подробнее, в см. Дронов с.53; другие значения приведены в описании параметра по ссылке).

При установки отношения `ForeignKey` во внешней модели также будет создано поле, предназначенное для доступа к связанным записям данной модели. Название этого поля задается в параметре [`related_name`](https://docs.djangoproject.com/en/5.0/ref/models/fields/#django.db.models.ForeignKey.related_name), (по умолчанию, в данном примере, будет автоматически присвоено имя `task_set`).

Параметр [`to_field`](https://docs.djangoproject.com/en/5.0/ref/models/fields/#django.db.models.ForeignKey.to_field) в поле `ForeignKey` используется для указания поля на связанном объекте (`Task), на которое будет ссылаться внешний ключ (`Activity`). Это поле должно быть уникальным (`unique=True`). 

Полю внешнего ключа рекомендуется давать имя в соответствии с той моделью, с которой устанавливается отношение. Например, для внешнего класса `User` можно создать поле с именем `user`. На уровне базы данных поле внешнего ключа при этом будет предатсвленно полем `user_id`. В веб-форме такое поле будет представляться раскрывающимся списком, содержащим строковые представления записей первичной модели.

Вместо того, чтобы ссылаться на модель `User` напрямую, мы должны делать это, используя метод `django.contrib.auth.get_user_model()`:

```python
from django.contrib.auth import get_user_model

user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE, related_name='tasks')
```
    
Метод `get_user_model()` возвращает действующую модель, указанную в настройках приложения или стандартную модель `User`, в случае, если не изменялась.

### [`ManyТoManyField`](https://docs.djangoproject.com/en/5.0/ref/models/fields/#manytomanyfield)

Поле `ManyТoManyField` позволяет связать произвольное количество записей одной модели с произвольным количеством записей другой модели (обе модели здесь выступают как равноправные, и определить, какая из них первичная, а какая вторичная, не представляется возможным). Т.е. тношение является симметричным. В конструкторе класса `ManyТoManyField` отсутствует параметр `on_delete`.

### [`OneToOneField`](https://docs.djangoproject.com/en/5.0/ref/models/fields/#onetoonefield) 

Поле `OneToOneField` соединяет одну запись данной модели с одной записью внешней модели. Такие связи служат для объединения моделей, одна из которых хранит данные, дополняющие данные из другой модели.

## [Методы моделей](https://docs.djangoproject.com/en/5.0/ref/models/instances/)

Переопределяя метод [`save()`](https://docs.djangoproject.com/en/5.0/ref/models/instances/#saving-objects), можно изменить стандартное поведение сохранения записи. Важно при этом не забывать вызывать метод суперкласса. Можно даже отменять сохранение по условию:

```python
def save(self, *args, **kwargs):
    indicator # вычисляем значение в теле функции
    ...
    if indicator:
        super().save(*args, **kwargs)
```

Метод [`delete()`](https://docs.djangoproject.com/en/5.0/ref/models/instances/#deleting-objects) позволяет также кастомизировать удаление объекта.

>В Django 4.2 добавлены асинхронные версии этих метово `asave()` и `adelete()`.

Для отладки может быть полезным переопределение метода `__str__()`:

```python
def __str__(self):
    return self.title
```

## `Meta` – параметры модели

Параметры самой модели описываются различными атрибутами класса `Meta`, вложенного в класс модели и не являющегося производным ни от какого класса. Вот список этих атрибутов: 
- `verbose_name` – название сущности, хранящейся в модели, которое будет выводиться на экран. Если не указано, используется имя класса модели;
- `verbose_name_piurai` – название набора сущностей, хранящихся в модели, которая будет выводиться на экран. Если не указано, используется имя класса модели во множественном числе;
- `ordering` – параметры сортировки записей модели по умолчанию. Задаются в виде последовательности имен полей, по которым должна выполняться сортировка, представленных строками. Если перед именем поля поставить символ `-`, то порядок сортировки будет обратным. 

```python
class Meta:
    verbose_name = 'Task'           # в единственном числе
    verbose_name_plural = 'Tasks'   # во множественном числе
    ordering = ['-created']          # сортировка записей
```

>Подробнее Дронов с 102

