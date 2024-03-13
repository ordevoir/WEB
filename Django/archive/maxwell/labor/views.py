# в соответствии с шаблоном MVC файлы views содержат контроллеры, т.е. здесь 
# обрабатываются обеспечивает «связь» между пользователем и системой. 
# Контролирует и направляет данные от пользователя к системе и наоборот. 
# Использует модель и представление для реализации необходимого действия.

from django.shortcuts import render, get_object_or_404, redirect
from django.http import HttpResponse
from django.views.generic import View, edit
from django.urls import reverse
# не забываем импортировать модели и формы:
from .forms import *
from .models import Task, Activity, Tag

def index(request): # контроллер-функция
    # получим список записей отсортированные по убыванию даты их публикации:
    tasks = Task.objects.order_by('-created').filter(user=request.user) # записи таблицы Task
    activities = Activity.objects.all() # записи таблицы Activity

    # формируется контекст шаблона:
    context = {'tasks': tasks, 'activities': activities}
    # region context
    # Контекстом шаблона называется набор данных, которые должны быть 
    # доступны внутри шаблона в виде переменных и с которыми шаблонизатор 
    # объединит этот шаблон для получения выходного документа. Контекст 
    # шаблона должен представлять собой обычный словарь Python, ключи 
    # элементов которого станут переменными, доступными в шаблоне, а
    # значения элементов значениями этих переменных. В нашем случае 
    # контекст шаблона будет содержать переменные tasks и activities, в которых
    # хрaнятся списки записей моделей Task и Activity

    # выполняем обработку шаблона, в процессе которой шаблонизатор 
    # выполняет объединение его с данными из контекста (рендеринг)
    # return HttpResponse(template.render(context, request))
    # результат, возвращенный методом и представляющий собой строку 
    # с НТМL-кодом готовой веб-страницы, мы передаем конструктору класса
    # HttpResponse для формирования ответа.
    # запишем через функции-сокращения (shortcuts):
    # endregion
    return render(request, 'labor/index.html', context)
    # region
    # Любая контроллер-функция в качестве единственного обязательного параметра
    # принимает экземпляр класса HttpRequest, хранящий различные сведения о 
    # полученном запросе: запрашиваемый интернет-адрес, данные, полученные от 
    # посетителя, служебную информацию от самого веб-обозревателя и пр. 
    # По традиции этот параметр называется request. 
    # В данном случае мы его никак не используем.

    # В теле функции мы создаем экземпляр класса нttpResponse (он объявлен в 
    # модуле django.http), который будет представлять отправляемый клиенту ответ. 
    # Содержимое этого ответа собственно текстовое сообщение мы указываем 
    # единственным параметром конструктора этого класса. Готовый экземпляр 
    # класса мы возвращаем из функции в качестве результата.

    # Чтобы при наборе интернет-адреса http://localhost:8000/labor/ запускался 
    # только что написанный нами контроллер-функция index(), нам нужно связать
    # таковой с шаблонным адресом labor/. (см. в файле urls.py)

    # При создании экземпляра класса HttpResponse, представляющего отсылаемый 
    # клиенту ответ, мы в именованном параметре content_type конструктора 
    # указали тип отправляемых данных: обычный текст, набранный в кодировке 
    # UTF-8 (если мы этого не сделаем, веб-обозреватель посчитает текст 
    # НТМL-кодом и выведет его одной строкой, скорее всего, в нечитаемом виде).
    # endregion

class TagsList(View): # контороллер-класс; выводит список тегов
    def get(self, request):
        tags = Tag.objects.all().filter(user=request.user)
        return render(request, 'labor/tags.html', context={'tags': tags})

class ActivitiesList(View): # контороллер-класс; выводит список тегов
    def get(self, request):
        activities = Activity.objects.all()
        return render(request, 'labor/activities.html', context={'activities': activities})

# дальше идут контроллеры для обработки параметризованных запросов:
# -----------------------------------------------------------------

class ObjectCreateMix:  # миксин (базовый класс) для отображения подробностей
    modelForm = None    # будет ссылаться на класс TaskForm или TagForm
    template = None     # будет ссылаться на соответствующий шаблон

    def get(self, request):     # обработка GET запроса - отображение формы
        form = self.modelForm() # будет создан объект класса Task или Tag
        # отображение результата запроса. функция render из модуля
        # django.shortcuts принимает request, путь к соответствущему шаблону,
        # и контект - словарь с данными, которые будут использованы в шаблоне
        return render(request, self.template, context={'form': form})

    def post(self, request): # обработка POST запроса
        # создается экземпляр класса modelForm c заполненными данными:
        boundForm = self.modelForm(request.POST)    # (связанная форама)
        # request.POST - что-то вроде словаря, содержащий введенные данные
        # затем идет валидация данных, и если все норм, создается объект:
        if boundForm.is_valid():
            newObj = boundForm.save(commit=False) # создание объекта записи
            # когда вы получаете большую часть своих данных модели из формы, 
            # но вам нужно заполнить некоторые поля null=False неформальными
            # данными. Сохранение с помощью commit=False предоставляет вам 
            # объект модели (до сохранения в самой базе данных), затем вы 
            # можете добавить свои дополнительные данные и сохранить его:
            newObj.user = request.user  # значение текущего пользователя
            newObj.save()               # сохранение записи в базе данных
            return redirect(newObj)
        # redirect направляет по ссылке, которая генерируется в методе
        # get_absolute_url(), определенном в классе (модели) объекта newObj
        
# если данные оказались не валидными, то страница с формой перерисовывается
        return render(request, self.template, context={'form': boundForm})

class TagCreate(ObjectCreateMix, View):
    modelForm = TagForm # земетим, что это не объект, а ссылка на класс
    template = 'labor/tag_create.html'

class TaskCreate(ObjectCreateMix, View):
    modelForm = TaskForm
    template = 'labor/task_create.html'

class ObjectDetailMix: # миксин (базовый класс) для отображения подробностей: 
    model = None     # в дочерних классах эти переменные будут переопределены
    template = None  # в значения соответствующих моделей и шаблонов

    # метод get обрабатывает GET-запросы
    def get(self, request, slug):
        # вместо self.model.objects.get(slug__iexact=slug) можно использовать 
        # метод get_object_or_404, который выполнит то же самое, но будет 
        # вызывать исключение 404, если slug будет задано некоректное, если
        # slug будет найдет в базе данных, то переменной obj будет присвоен
        # объект соотвествующей запсиси таблицы (класса Task, Tag или Activity)
        obj = get_object_or_404(self.model, slug__iexact=slug)
        return render(request, self.template, 
        context={self.model.__name__.lower(): obj, 'object': obj, 'detail': True})
    # метод __name__ возвращает имя класса на который ссылается model - Task,
    # в случае модели Task, и Tag, в случае модели Tag (оно будет служить ключом)
    # строковый метод lower() делает полученное имя класса с маленькой буквы

# классы TaskDetail и TagDetail наследуют класс ObjectDetailMix и View:

class TaskDetail(ObjectDetailMix, View):
    model = Task    # ссылка на класс Task
    template = 'labor/task_detail.html' # путь к файлу шаблона формы

class TagDetail(ObjectDetailMix, View):
    model = Tag     # ссылка на класс Tag
    template = 'labor/tag_detail.html'  # путь к файлу шаблона формы

class ActivityDetail(ObjectDetailMix, View):
    model = Activity    # ссылка на класс Tag
    template = 'labor/activity_detail.html'  # путь к файлу шаблона формы




class ActivityCreate(ObjectCreateMix, View):
    modelForm = ActivityForm
    template = 'labor/activity_create.html'

class ObjEditMix:
    model = None
    modelForm = None
    template = None

    def get(self, request, slug):
        # получаем редактируемую запись по slug__iexact:
        obj = self.model.objects.get(slug__iexact=slug) # запись
        # вставляем свойства этого тега в форму:
        boundForm = self.modelForm(instance=obj) # форма
        return render(request, self.template, context={'form': boundForm, self.model.__name__.lower(): obj})
    
    def post(self, request, slug):
        obj = self.model.objects.get(slug__iexact=slug) # запись
        boundForm = self.modelForm(request.POST, instance=obj) # форма

        # if boundForm.is_valid():
        newObj = boundForm.save(commit=True)
        return redirect(newObj)
        return render(request, self.template, context={'form': boundForm, self.model.__name__.lower(): obj})

class TagEdit(ObjEditMix, View):
    print('edit tag')
    model = Tag
    modelForm = TagForm
    template = 'labor/tag_edit_form.html'

    # можно было бы использовать и класс CreateView, который предоставляет
    # другие возможности
class TaskEdit(ObjEditMix, edit.CreateView):
    print('edit task')
    model = Task
    modelForm = TaskForm
    template = 'labor/task_edit_form.html'

class ActivityEdit(ObjEditMix, edit.CreateView):
    model = Activity
    modelForm = ActivityForm
    template = 'labor/activity_edit_form.html'

class ObjDeleteMix:
    model = None
    template = None
    redirect_url = None

    def get(self, request, slug):
        obj = self.model.objects.get(slug__iexact=slug)
        return render(request, self.template, context={self.model.__name__.lower(): obj})

    def post(self, request, slug):
        obj = self.model.objects.get(slug__iexact=slug)
        obj.delete()
    # для перенаправления пользователя на страницу списка тегов (или задач):
        return redirect(reverse(self.redirect_url))
        
class TagDelete(ObjDeleteMix, View):
    model = Tag
    template = 'labor/tag_delete_form.html'
    redirect_url ='tags_list_url'

class TaskDelete(ObjDeleteMix, View):
    model = Task
    template = 'labor/task_delete_form.html'
    redirect_url ='index'

class ActivityDelete(ObjDeleteMix, View):
    model = Activity
    template = 'labor/activity_delete_form.html'
    redirect_url ='index'

# создаем REST API

# from rest_framework.response import Response
# from rest_framework.views import APIView

# class TaskView(APIView):
#     def get(self, request):
#         tasks = Task.objects.all()
#         return Response({"tasks": tasks})

