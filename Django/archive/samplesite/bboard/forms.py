from django.forms import ModelForm
from .models import Bb

# Класс формы, связанной с моделью
# --------------------------------
# Такая форма «умеет» генерировать теги, что создадут входящие в состав 
# формы элементы управления, проверять на корректность введенные данные и, 
# наконец, сохранять их в модели, с которой она связана.
class BbForm(ModelForm):
    class Meta:
    # класс Meta содержит параметры формы:
        model = Bb  # класс модели, с которой связана форма
    # последовательность из имен полей модели, которые должны присут-ать
        fields = ('title', 'content', 'price', 'rubric') #  в форме
