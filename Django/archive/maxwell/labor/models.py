from django.db import models
from django.shortcuts import reverse
from django.contrib.auth.models import User
from django.utils.text import slugify
from time import time
from django.conf import settings
from django.contrib.auth import get_user_model

# region
# Сама модель должна быть подклассом класса Model из модуля django.db.models.
# Отдельным полям модели присваиватся экземпляры классов, представляющих
# поля разных типов и объявленных в том же модуле django.db.models. 
# Параметры полей указываются в конструкторах классов полей в виде значений
# именнованных параметров:
# endregion

class Task(models.Model):
    title = models.CharField(max_length=150, verbose_name='Title', db_index=True)
    slug = models.SlugField(max_length=30, unique=True, blank=True) # человекопонятный url
    # поля с флагом unique=True автоматически индексируются, можно не писать db_index=True
    discribe = models.TextField(null=True, blank=True, verbose_name='Discribtion')
    created = models.DateTimeField(auto_now_add=True, db_index=True, verbose_name='Created')
    # поле для режимов deadline и time to completion: 
    limitation = models.BooleanField(null=True, blank=True, verbose_name='limitation')
    
    years = models.PositiveIntegerField(blank=True, null=True, default=0, verbose_name='Years')
    mounths = models.PositiveIntegerField(blank=True, null=True, default=0, verbose_name='Mounths')
    days = models.PositiveIntegerField(blank=True, null=True, default=0, verbose_name='Days')
    hours = models.PositiveIntegerField(blank=True, null=True, default=0, verbose_name='Hours')
    minutes = models.PositiveIntegerField(blank=True, null=True, default=0, verbose_name='Minutes')

    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE, related_name='tasks')
    status = models.ForeignKey('Status', on_delete=models.CASCADE, blank=True, null=True, related_name='task')
    activity = models.ForeignKey('Activity', on_delete=models.CASCADE, blank=True, null=True, related_name='task')
    superTask = models.ForeignKey('self', on_delete=models.CASCADE, blank=True, null=True, related_name='subTask')

    # region
    # CharField - обычное строковое поле фиксированной длины max_lenght.
    # TextField - текстовое поле неограниченной длины, или memo-поле.
    # FloatField - поле для хранения вещественных чисел.
    # DataTimeField - поле для хранения отметки даты и времени.
    # SlugField - слаг, т.е. строка, однозначно идентифицирующая запись и 
    #   применяемая в качестве части интернет-адреса, в отличие от CharField
    #   имеет свои специальные валидаторы

    #   Присвоив параметру auto_now_add конструктора значение True, мы 
    #   предпишем Django при создании новой записи записывать в это поле 
    #   текущие дату и время. А параметр db_index при присваивании ему 
    #   значения True укажет создать для этого поля индекс (при выводе 
    #   объявлений мы будем сортировать их по убыванию даты публикации, и 
    #   индекс здесь пригодится).
    #   blank=True позволяет остаялять поле поле пустым; если при этом 
    #   null=True то при этому в базу будет записываться значение NULL
    #   (подробнее см. Дронов с.91)
    # endregion

# region
# Класс ForeignКey (связь многое-к-одному) представляет поле внешнего ключа, 
# в котором фактически будет храниться ключ одной записи из внешней модели.
# т.е. запись модели Task может быть связан с единст-ной записью модели User,
# в то время как одна запись модели User может быть связана со многими
# записями подели Task

# Первым параметром конструктору этого класса передается класс первичной 
# модели в виде:
# - ссылки на класс если класс внешней модели (User) объявлен перед данным 
#   классом (т.е. имя внешнего класса без кавычек);
# - строки с именем класса если данная модель объявлена раньше внешней
#   (т.е. имя внешнего класса в кавычках, см. ManyToManyField ниже)

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

# Именованный параметр on_delete управляет каскадными удалениями записей 
# вторичной модели после удаления записи первичной модели, с которой они были
# связаны. Значение РRОТЕСТ запрещает каскадные удаления (см. Дронов с.53)

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

    tags = models.ManyToManyField('Tag', blank=True, verbose_name='Tag', related_name='tasks')
    
    # метод __str__() отвечает за вывод информации об объекте, и если его
    def __str__(self):      # переопределить таким образом, то вместо 
        return self.title   # Object 1, будет выводиться значение title
    
    # url reversing - определяем метод get_absolute_url(), чтобы указать  
    # Django как вычислить URL для объекта. Метод должен вернуть строку,  
    # которая может быть использована как ссылка в HTTP запросе.
    def get_absolute_url(self):
        return reverse('task_url', kwargs={'slug': self.slug})
    # task_url - это имя маршрута в urls.py, в которой принимается параметр 
    # slug (это соответствует тому, что ожидается в url: task/<slug:slug>/)

    # генерирование ссылки на соответствующий контроллер:
    def get_delete_url(self):
        return reverse('task_delete_url', kwargs={'slug': self.slug})
        # первый аргумент - название соответствующего url
        # второй аргумент - словарь, содержащий значение параметра

    def get_edit_url(self): 
        return reverse('task_edit_url', kwargs={'slug': self.slug})

    def save(self, *args, **kwargs):
        if not self.id:
            self.slug = genSlug(self.title)
        if not self.hours:
            self.hours = 0
        if not self.minutes:
            self.minutes = 0
        super().save(*args, **kwargs)
        # region
        # переопределим метод save(), который производит сохранение значений
        # в базе данных для того, чтобы новое значение поля slug 
        # генерировалось только при создании новой(!) записи модели Task, и 
        # оставалось прежним при редактировании; при создании экземпляра Task
        # его полю id не присваивается никакого значения, это значение 
        # присваивается только при сохранении экземпляра в базе данных (т.е.
        # при вызове метода save);
        # *args, **kwargs - позиционные и именованные перменные с переменным
        # количеством элементов
        # endregion

    class Meta:
    # Параметры самой модели описываются различными атрибутами класса Meta
        # название модели:
        verbose_name_plural = 'Tasks'   # во множественном числе
        verbose_name = 'Task'           # в единственном числе
        
        ordering = ['-created']         # сортировка записей

# для того, чтобы созданная модель создалась в виде таблицы в базе данных,
# необходимо совешить миграции:
# python manage.py makemigrations   - создаются файлы миграции
# pythin manage.py migrate          - миграции применяются к базе данных

class Activity(models.Model):
    title = models.CharField(max_length=50, db_index=True, unique=True, verbose_name='Activity', default='')
    slug = models.SlugField(max_length=50, blank=True)
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE, related_name='activities')
    boolean = models.BooleanField(blank=True)
    
    def save(self, *args, **kwargs):
        self.slug = genSlug(self.title)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title
    
    class Meta:
        verbose_name_plural = 'Activities'
        verbose_name = 'Activity'

class Status(models.Model):
    title = models.CharField(max_length=50, db_index=True, unique=True, verbose_name='Status', default='')
    slug = models.SlugField(max_length=50, blank=True)
    
    def save(self, *args, **kwargs):
        self.slug = genSlug(self.title)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title
    
    class Meta:
        verbose_name_plural = 'Statuses'
        verbose_name = 'Status'


class Tag(models.Model):
    title = models.CharField(max_length=50, db_index=True, verbose_name="Tag", unique=True)
    slug = models.SlugField(max_length=61, blank=True)
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE, related_name='tags', blank=True)        
    def get_absolute_url(self): 
        return reverse('tag_detail_url', kwargs={'slug': self.slug})

    def get_delete_url(self):
        return reverse('tag_delete_url', kwargs={'slug': self.slug})

    def get_edit_url(self): 
        return reverse('tag_edit_url', kwargs={'slug': self.slug})

    def save(self, *args, **kwargs):
        self.slug = genSlug(self.title)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name_plural = 'Tags'
        verbose_name = 'Tag'
        ordering = ['title']

def genSlug(s): # генерация уникального слага
    newSlug = slugify(s, allow_unicode=True)
    return newSlug[:19] + '-' + str(int(time()))

# новую модель нужно зарегистрировать на административном сайте, добавив
# в модуль admin.py пакета приложений такие два выражения:
# form .models import Tag
# admin.site.register(Tag)

# По умолчанию вновь созданный проект Django настроен на использование базы
# данных в формате SQLite, хранящейся в файле db.sqliteЗ. Эта база данных 
# будет создана уже при первом запуске отладочного веб-сервера.

