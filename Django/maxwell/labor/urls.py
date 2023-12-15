from django.urls import path
from .views import * 

urlpatterns = [
    path('', index, name='index'),
    path('task/create/', TaskCreate.as_view(), name='task_create_url'),
    path('tags/', TagsList.as_view(), name='tags_list_url'),
    path('activities/', ActivitiesList.as_view(), name='activities_list_url'),
    path('tags/create/', TagCreate.as_view(), name='tag_create_url'),
    path('activities/create/', ActivityCreate.as_view(), name='activity_create_url'),
    # маршруты, содержащие URL-параметры, носят название параметризованных:
    path('task/<slug:slug>/', TaskDetail.as_view(), name='task_url'),
    path('task/<slug:slug>/edit/', TaskEdit.as_view(), name='task_edit_url'),
    path('task/<slug:slug>/delete/', TaskDelete.as_view(), name='task_delete_url'),
    path('tags/<slug:slug>/', TagDetail.as_view(), name='tag_detail_url'),
    path('tags/<slug:slug>/edit/', TagEdit.as_view(), name='tag_edit_url'),
    path('tags/<slug:slug>/delete/', TagDelete.as_view(), name='tag_delete_url'),
]

# указанные маршруты (paths) могут быть использованы в разных участках кода
# разных файлов, и вместо того, чтобы всюду вписывать url, создается для 
# каждого path свое имя (name), которое и будет вписываться вместо url.
# так, меня url, нам не придется искать менять его всюду, где мы его вписали,
# достаточно будет поменять его здесь, и он поменяется автоматически всюду,
# где вписано имя path.

# Пустая строка, переданная первым параметром в функцию path(), обозначает
# корень пути из маршрута предыдущего уровня вложенности (родительского).
# Т.е. index() будет выполняться при запросе localhost:8000/labor

# Созданному маршруту мы сопоставили контроллер-функцию (в первом маршруте
# это index) или контроллер-класс (например TaskDetail), но в этом случае
# вызывается метод as_view()

# <str:slug>/ - шаблонный интернет-адрес; slug - имя 
# параметра контроллера, которому бдет присвоено значение этого URL-параметра.