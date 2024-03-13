# Models

Модель должна быть подклассом класса `Model` из модуля `django.db.models`. Отдельным полям модели присваиваются объекты классов, представляющих поля соответствующих типов и объявленных в том же модуле `django.db.models`. Параметры полей указываются в конструкторах классов полей в виде значений именнованных параметров:

```python
class Task(models.Model):
    title = models.CharField(max_length=150, verbose_name='Title', db_index=True)
    discribe = models.TextField(null=True, blank=True, verbose_name='Discribtion')
    created = models.DateTimeField(auto_now_add=True, db_index=True, verbose_name='Created')
```

Один такой класс соответствует одной таблице в БД, т.е. является моделью этой таблицы.

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
activity = models.ForeignKey(to='Activity', on_delete=models.SET_NULL, to_field='title', related_name='tasks')
```

тогда, поле `activity` может принимать значения только и множества записей таблицы `Activity`, т.е. любая запись таблицы `Task` может быть связанна с единственной записью таблицы `Activity`. Так как в данном случае имеем дело с отношением Many-to-One, то неограниченное количество записей таблицы `Task` может быть связано с единственной записью из таблицы `Activity`.

Первым аргументом конструктору класса `ForeignKey` передается класс первичной модели. Сделать это можно двумя способами:

- передать ссылку на класс, если класс внешней модели (`Activity`) объявлен перед данным классом (т.е. имя внешнего класса без кавычек);

- передать строку с именем класса если данная модель объявлена раньше внешней (т.е. имя внешнего класса в кавычках: `"Activity"`).

    # Полю внешнего ключа рекомендуется давать имя в соответствии с его моделью.
    # Например для класса User создается поле user. На уровне базы данных поле 
    # внешнего ключа при этом будет предатсвленно полем user_id.
    # В веб-форме такое поле будет представляться раскрывающимся списком, 
    # содержащим строковые представления записей первичной модели.

    # Вместо того, чтобы ссылаться на модель User напрямую, мы должны делать 
    # это, используя метод django.contrib.auth.get_user_model(). Этот метод 
    # возвращает действующую модель, указанную в настройках приложения или 
    # стандартную модель User, в случае, если не изменялась.

    # Параметр on_delete управляет удалениями записей данной модели, после 
    # удаления записи внешней модели, с которой они были связаны. Значение 
    # CASCADE - удаляет все связанные записи вторичной модели
    # SET_NULL - заносит в поле внешнего ключа всех связанных записей null
    # SET(<значение>) - заносит в поле внешнего ключа указанное значение,
    # можно вписать ссылку на функцию, возвращающую значение (см. Дронов с.53)

    # При этом во внешнем классе будет создано поле, предназначенное для доступа
    # к связанным записям данной модели. Название поля задается в параметре
    # related_name, (по умолчанию будет автоматически присвоено имя task_set)

    # ManyТoManyField позволяет связать произвольное количество записей одной
    # модели с произвольным количеством записей другой (обе модели здесь 
    # выступают как равноправные, и определить, какая из них первичная, а какая 
    # вторичная, не представляется возможным).(отсутствует параметр on_delete)

    # OneToOneField соединяет одну запись данной модели с одной записью внешней
    # модели. Такие связи служат для объединения моделей, одна из которых хранит 
    # данные, дополняющие данные из другой модели.
    # endregion