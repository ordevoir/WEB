# BackEnd

>При установке Python и Django через [Putty](https://www.chiark.greenend.org.uk/~sgtatham/putty/latest.html) так и не удается создать рабочий проект. Работает при установке через административную панель. Автоматически установилось виртуальное окружение с python3.6. Попытки заменить на виртуальное окружение с python3.9 не обвенчались успехом.

После установки Django и базы данных MySQL на хостинге, нужно установить все прочие библиотеки. Внимательно заменить файлы. Хотя, актуальная версия каталога maxwell_rest должна будет подойти. Нужно будет подправить ссылки на проект и данные для БД. Не забываем создать суперпользователя.

[Как подключиться к серверу по SSH из Windows](https://beget.com/ru/kb/how-to/ssh/kak-podklyuchitsya-po-ssh-iz-windows)

[Общие сведения по установке приложений (виртуальное окружение Docker)](https://beget.com/ru/kb/how-to/web-apps/obshhie-svedeniya-po-ustanovke-prilozhenij-virtualnoe-okruzhenie-docker)

>При изменении файлов следует производить перезапись файла tmp/restart.txt, для того, чтобы изменения тут же вступали в силу.

# FrontEnd

Файлы, скомпилированные командой `npm run build` следует должным образом разместить на сервере!

Файл `index.html` следует разместить в шаблонах приложения `labor`:

```bash
./labor/templates/labor/index.html
```

Тогда при запросе по соответствующему `url` (например, `/labor/vue_index`) будет запускаться именно этот `index.html`, если задать нужный маршрут и обработчик запроса:

в `labor/urls.py`:

```python
`path('vue_index/', index_view, name='index')`
```

в `labor/views.py`

```python
from django.shortcuts import render
def vue_index(request):
    return render(request, 'labor/index.html')
```

Что касается статических файлов, то по умлочанию, в Django они ищутся в директории `static`. Поэтому статические файлы компиляции стоит разместить там, желательно, в отдельной папке.

```bash
    static/vue/css
    static/vue/img
    static/vue/js
    static/vue/favicon.ico
```

Для толго, чтобы `index.html` знал, что искать надо не просто в `static`, а в `static/vue`, стоит создать файл `vue.config.js` (содержимое см в папке `vue3`)
