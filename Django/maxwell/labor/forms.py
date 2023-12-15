from django import forms
from .models import Task, Tag, Activity
from django.core.exceptions import ValidationError

# Класс формы, связанной с моделью, должен быть производным от класса
# ModelForm, объявленного в модуле django.forms. Такая форма «умеет» 
# генерировать html-теги, что создадут входящие в состав формы элементы 
# управления, проверять на корректность введенные данные и, наконец, 
# сохранять их в модели, с которой она связана.

class TagForm(forms.ModelForm):
    # title = forms.CharField(max_length=50)
    # title.widget.attrs.update({'class': 'form-control'})
    class Meta:
    # вложенный класс Meta содержит параметры формы (подробнее см. ниже)
        model = Tag             # класс модели, с которой связана форма
        fields = ['title']      # в форму будет включено только поле title
        widgets = {'title': forms.TextInput(attrs={'class': 'form-control'}), }
    # region
    # по умолчанию django сам определяет, какой html-widget использовать
    # для отоброжаемого поля, но мы можем переопределить это поведение,
    # в словаре widgets. В данном случае поле 'title' будет представлено
    # элементом TextInput, и элементу будет присвоен класс form-control,
    # по которому можно будет стилизовать элемент в css-файле. В общем
    # случае можно задавать не только класс, но и другие параметры, в том
    # числе и пользовательские data-параметры html-элемента
    # endregion

    # region
    # словарь cleaned_data содержит данные соответствующих полей, очищенные
    # и приведены к нужному типу (данные title в cleaned_data['title'] )
    # Если нам нужно выполнить более сложную валидацию, чем та, что 
    # предоставляется валидаторами, мы можем реализовать ее в классе формы,
    # в переопределенном методе с именем вида clean_<имя поля>. В этом
    # методе значение поля получается из словаря cleaned_data. Если значение 
    # не проходит валидацию, следует возбудить исключение ValidationError.
    # В данном случае мы будем проверять, нет ли уже записи в базе в которой
    # значение title совпадает с тем значением, которое ввел пользователь:
    # endregion
    def clean_title(self):
        newTitle = self.cleaned_data['title'].lower()   # в нижнем регистре
        if Tag.objects.filter(title__iexact=newTitle).count():
        # с title__iexact фильтрация не будет учитывать регистры букв
            raise ValidationError('Tag is already exist!') 
        return newTitle # функция возвращает введенное в поле значение

class ActivityForm(forms.ModelForm):
    class Meta:
        model = Activity
        fields = ['title', 'boolean']

    def clean_title(self):
        newTitle = self.cleaned_data['title'].lower()
        if Tag.objects.filter(title__iexact=newTitle).count():
            raise ValidationError('Activity is already exist!') 
        return newTitle

class TaskForm(forms.ModelForm):
    # объявим отдельно поле для minutes, чтобы ограничить доступные значения:
    hours = forms.IntegerField(min_value=0, max_value=23, required=False)
    minutes = forms.IntegerField(min_value=0, max_value=59, required=False)
    limitation = forms.BooleanField(required=False)

    class Meta:
        model = Task
        # последовательность из имен полей модели, которые должны присут-ать
        fields = [  'title', 
                    'discribe', 
                    'limitation', 
                    'years',
                    'mounths',
                    'days', 
                    'hours', 
                    'minutes', 
                    'tags', 
                    'activity',
                    'status',
                    'superTask']
        widgets = {
            'title': forms.TextInput(attrs={'class': 'form-control'}),
            'tags': forms.CheckboxSelectMultiple(attrs={'class': 'form-control'}),
            'limitation': forms.CheckboxInput(attrs={'class': 'form-control'}),
        }

# Атрибуты, задаваемые во вложенном классе Meta:

# fields задает последовательность имен полей модели, которые должны  
# быть включены в создаваемую форму. Чтобы указать все поля модели, 
# нужно присвоить этому параметру строку "_ all _".

# exclude задает последовательность имен полей модели, которые, 
# напротив, не должны включаться в форму.

# labels задает надписи для полей формы. Его значение должно
# представлять собой словарь, ключи элементов которого определяют 
# поля формы, а значения надписи для них.

# Проверка форм и полей формы:
# https://djbook.ru/rel1.9/ref/forms/validation.html