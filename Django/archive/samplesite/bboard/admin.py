from django.contrib import admin
from .models import Bb
from .models import Rubric

# Класс-редактор содержит набор атрибутов, которые задают параметры 
# представления модели на административном сайте:
class BbAdmin(admin.ModelAdmin):
    # последовательность имен полей, которые должны выводиться в списке:
    list_display = ('title', 'content', 'price', 'published', 'rubric')
    # последовательность имен полей, которые должны быть преобразованы 
    # в гиперссылки, ведущие на страницу правки записи:
    list_display_links = ('title', 'content', 'price')
    # последовательность имен, по которым должна выполняться филтрация:
    search_fields = ('title', 'content')

admin.site.register(Bb, BbAdmin)
admin.site.register(Rubric)
# Мы вызвали метод register() у экземпляра класса AdminSite, 
# представляющего сам административный сайт и хранящегося в переменной 
# site модуля django.contrib.admin. Этому методу мы передали в качестве 
# параметра ссылку на класс нашей модели Bb.

