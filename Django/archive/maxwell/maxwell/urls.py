"""maxwell URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.contrib.auth.views import LoginView, LogoutView

urlpatterns = [ 
    path('accounts/login', LoginView.as_view(), name='login'),
    path('accounts/logout', LogoutView.as_view(), name='logout'),
    path('admin/', admin.site.urls),
    path('labor/', include('labor.urls')), # подключение url`ов из файла labor/urls.py
    # path('api/', include('rest_framework.urls')),
]

# элемент такого списка маршрут устанавливает связь между интернет-адресом 
# определенного формата (шаблонным интернет-адресом или шаблонным путем) и 
# контроллером. Вместо контроллера в маршруте может быть указан вложенный 
# список маршрутов, у нас это path('labor/', include('labor.urls'))

# шаблонный путь записывается в виде строки. Прямой слеш в его начале 
# не ставится, но обязательно ставится в конце.