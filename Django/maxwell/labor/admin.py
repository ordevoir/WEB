from django.contrib import admin
from .models import Task, Activity, Tag, Status

# Класс-редактор содержит набор атрибутов, которые задают параметры 
# представления модели на административном сайте:
class TaskAdmin(admin.ModelAdmin):
    # последовательность имен полей, которые должны выводиться в списке:
    list_display = ('title',)
    list_display_links = ('title',)
    search_fields = ('title', 'discribe')

admin.site.register(Task, TaskAdmin)
admin.site.register(Activity)
admin.site.register(Tag)
admin.site.register(Status)
# Мы вызвали метод register() у экземпляра класса AdminSite, 
# представляющего сам административный сайт и хранящегося в переменной 
# site модуля django.contrib.admin. Таким образом регистрируются модели