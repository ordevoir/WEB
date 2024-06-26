# Подключение Vue 3 через CDN

Подключить библиотеку Vue 3 через CDN (Content Delivery Network), такой как unpkg.com можно прописав в файле *.html

```html
<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
```

В файле *.js необходимо создать экземпляр приложения функцией `createApp()`. Первым аргументом передается корневой компонент, если он определен в отдельном файле (см. Vue_CLI.md), либо определить его "на месте":

```js
const app = Vue.createApp({
    // Define your initial data here (optional)
})
```

Далее необходимо монтировать приложение в тег html:

```html
<div id="app">
    <h1>Hello, Vue!</h1>
</div>
```

В файле *.js:

```js
app.mount('#app')
```

Простейший пример: [simplest_vue_with_cdn.html](simplest_vue_with_cdn.html)


# Интерполяции

Внутри блоков можно производить интерполяции при помощи двойных фигурных скобок:

```html
<h3>Sum (10 + 60): {{ 10 + 60 }}</h3>
```

Интерполировать можно любые выражения, которые могут быть преобразованы в строки. Можно даже использовать тернарые выражения. В зависимости от значения переменной `isOk` будет интерполировано `'I am OK'` или `'I am not OK!!'`:

```html
<h3>If statement: {{ isOk ? 'I am OK' : 'I am not OK!!' }}</h3>
```


# Директивы

Директива – это специальный атрибут, который добавляет поведение к DOM-элементу. Директивы могут использоваться для изменения атрибутов, стилей, событий или других аспектов элемента.

Директивы Vue начинаются приставкой `v-`. Например, директива `v-model` используется для двухстороннего связывания данных между компонентом и DOM-элементом.

Vue предоставляет [встроенный набор директив](https://v3.ru.vuejs.org/ru/api/directives.html) (*[Built-in Directives](https://vuejs.org/api/built-in-directives.html)*). Но также есть возможность определить и [пользовательские директивы](https://ru.vuejs.org/v2/guide/custom-directive.html) ([*Custom Directives*](https://vuejs.org/guide/reusability/custom-directives)).

Рассмотрим синтаксис применения директивы к атрибуту тега:

```html
<img v-bind:src="'/path/to/images/' + fileName" />
```

К атрибуту тега слева прикрепляется директива через `:`. В кавычках `""` прописывается **выражение** (функция, инлайн-выражение, объект, массив). Сам атрибут также называют **аргументом** директивы.


## `v-model` (привязка к форме)

Директива `v-model` позволяет создать двустороннюю связь между значением формы и переменной. Работает с тегами `<input>, <select>, <textarea>`. Например, мы можем связать переменную `inputValue` с содержимым формы `<input>`:

```html
<input type="text" v-model.lazy="inputValue">
```

У директивы `v-model` есть следующие модификаторы:

- `.lazy` – позволяет изменять значения переменной не синхронно с вводом, а только после того, как мы выйдем из фокуса формы;
- `.trim` – удаление пробелов в начале и в конце строки;
- `.number` – если в форму будет корректно введено чсло, то в переменную вместо строки запишется число. 

## `v-bind` или `:` (управление атрибутами)

Директива `v-bind` используется для односторонней привязки данных к атрибутам DOM-элементов. Она позволяет динамически обновлять значения атрибутов на основе данных компонента. Сокращённая запись – `:` или `.` (при использовании модификатора `.prop`).

Предположим, определена переменная `url` и нужно привязать ее статически к атрибуту `href` тега `<a>`:

```html
<a v-bind:href="url">Click me!</a>
```

Допустимо также использовать инлайн-выражение с конкатенацией строк:

```html
<img :src="'/path/to/images/' + fileName" />
```

Можно привязывать несколько классов, указав массив переменных, в которых содержатся имена классов.

```html
<div :class="[classA, classB]"></div>
```

Классы можно назначать по условию. Пусть `isB` и `isC` – булевы переменные, а `classA`, `classB` и `classC` – переменные, содержащие имена классов. Можно привязать классы `classB` и `classC` по условию, что соответствующие булевые переменные истинны:

```html
<div :class="[classA, { classB: isB, classC: isC }]"></div>
```

Подробнее в документации ( [eng](https://vuejs.org/api/built-in-directives.html#v-bind) | [rus](https://v3.ru.vuejs.org/ru/api/directives.html#v-bind) ) .


## `v-on` или `@` (обработка событий)

Директива `v-on` позволяет навесить обработчик к событию элемента. Сокращенная запись – `@`. К примеру, привяжем обработчик `doThis` к событию клика на кнопку:

```html
<button v-on:click="doThis"></button>
```

Если директива `v-on` применяется к *обычному элементу*, то отслеживаться будут только [нативные события DOM](https://developer.mozilla.org/en-US/docs/Web/Events). Применительно к компонентам, директива `v-on` отслеживает пользовательские события, сгенерированные в нем.

Обработчику можно передавать параметры в виде инлайн-выражения:

```html
<button @click="increase(10, 'some text')">Increase by 10</button>
```

Однако при отслеживании нативных событий DOM обработчику последним аргументом будет передан объект события (`event`). Можно передать его явно:

```html
<button @click="increase(5, 'some text', $event)">Increase by 5</button>
```

Рассмотрим использование директивы `v-on` на компоненте для отслеживания пользовательских событий:

```html
<some-component @some-event="handleThis"></my-component>
```

Обработчик будет вызван в случае генерации события `some-event` в дочернем компоненте `some-component`.

Некоторые модификаторы:

- `.prevent` – вызывает `event.preventDefault()` (отмена стандартного поведения);

- `.stop` – вызывает `event.stopPropagation()` – предотвращает распространение события на родительский элемент. Событие будет обработано только в том элементе, в котором оно произошло;
- `.once` – вызывает обработчик события только один раз;
- `.left` – вызывает обработчик только по нажатию левой кнопки мыши;
- `.right` – вызывает обработчик только по нажатию правой кнопки мыши;
- `.middle` – вызывает обработчик только по нажатию средней кнопки мыши.

- `.{keyAlias}` – вызывает обработчик только при нажатии определённой клавиши (список этих модификаторов [здесь](https://v3.ru.vuejs.org/guide/events.html#key-aliases)). Пусть, к примеру, обработчик `submit` вызывается при отпускании клавиш **Esc** и **Enter**:
```html
    <input @keyup.enter.esc="submit" />
```

Подробнее в документации ( [eng](https://vuejs.org/api/built-in-directives.html#v-on) | [rus](https://v3.ru.vuejs.org/ru/api/directives.html#v-on) ) .


## `v-else-if` (условное управление DOM)

Условные директивы `v-if`, `v-else-if` и `v-else` позволяют управлять DOM, отрисовывая тот или иной элемент. Конструкция обязательно должна содержать директиву `v-if`. При изменении значения условия элементы будут уничтожены / созданы заново.

```html
<div v-if="value > 0.5">Now you see me</div>
<div v-else-if="value < 0.1">Now you don't</div>
<div v-else>Something else</div>
```

Для того, чтобы управлять отображением целого блока, содержащего несколько элементов, можно воспользоваться тегом `template` из HTML5:

```html
<template v-if="isOk">
    <h3>Title</h3>
    <span>Lorem ipsum dolor, sit amet consectetur...</span>
</template>
```

## `v-show` (условная отрисовка)

Отображает элемент по условию, выполняя переключение у элемента CSS-свойства `display` в зависимости от истинности указанного выражения. В отличие от `v-if` изменения DOM не происходит.

```html
<h1 v-show="ok">Привет!</h1>
```

## `v-for` и `key` (генерация элементов в цикле)

Директива `v-for` позволяет циклически добавлять элемент в DOM с различными параметрами. Предположим, есть список `items` объектов с полем `text`. Можно перебрать объекты используя специальный синтаксис alias in expression, чтобы объявить переменную для текущего элемента итерации:

```html
<div v-for="item in items">{{ item.text }}</div>
```

В результате будет сгенерировано несколько блоков `div`, внутри которых будет произведена соответствующая интерполяция.

Также можно объявить переменную для индекса (или ключа, при работе с объектом):

```html
<div v-for="(item, index) in items"></div>
<div v-for="(value, key) in obj"></div>
<div v-for="(value, key, index) in obj"></div>
```

В последнем варианте мы значения, ключи и индексы полей объекта.

Для того, чтобы перебрать в переменной числа от 1 до 4 можно прописать

```html
<div v-for="n in 4">{{ n }}</div>
```

По умолчанию `v-for` будет обновлять элементы «на месте», не перемещая их. Если необходимо переупорядочивать элементы при изменениях, то потребуется указывать специальный атрибут `key` (см. ниже):

```html
<div v-for="item in items" :key="item.id">{{ item.text }}</div>
```

В общем случае, директива `v-for` может работать со значениями, реализующими протокол [`Iterable`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols#the_iterable_protocol), включая нативные `Map` и `Set`.

Подробнее о том, как производить отрисовку списков, можно прочитать здесь ( [eng](https://v3.ru.vuejs.org/guide/list.html) | [rus](https://v3.ru.vuejs.org/ru/guide/list.html#%D0%BE%D1%82%D0%BE%D0%B1%D1%80%D0%B0%D0%B6%D0%B5%D0%BD%D0%B8%D0%B5-%D1%8D%D0%BB%D0%B5%D0%BC%D0%B5%D0%BD%D1%82%D0%BE%D0%B2-%D0%BC%D0%B0%D1%81%D1%81%D0%B8%D0%B2%D0%B0-%D1%87%D0%B5%D1%80%D0%B5%D0%B7-v-for) ).


# Специальные атрибуты

## `key`

**Узлы** Vue  (*VNodes*) – это объекты, которые представляют элементы DOM и другие элементы в приложении Vue. Они создаются Vue во время компиляции шаблона и используются для управления состоянием DOM и взаимодействия с пользователем.

Специальный атрибут `key` в первую очередь нужен в качестве подсказки для Vue и его алгоритма виртуального DOM для идентификации VNode при сравнениях обновлённого списка узлов со старым. Без ключей Vue использует алгоритм, который минимизирует перемещения элементов и по-максимуму будет стараться изменять/переиспользовать элементы одного типа. При использовании ключей элементы будут переупорядочиваться в соответствии с изменением порядка следования ключей, а элементы, чьи ключи уже отсутствуют, будут всегда удаляться/уничтожаться.

Потомки одного и того же общего родителя должны иметь *уникальные ключи*. Появление дубликатов ключей будет приводить к ошибкам при отрисовке.

Чаще всего атрибут `key` используется вместе с директивой `v-for`

```html
<ul>
  <li v-for="item in items" :key="item.id">...</li>
</ul>
```

>Также можно использовать его для принудительной замены элемента/компонента вместо переиспользования. Это может пригодиться, когда потребуется:
>
>- Корректно вызвать хуки жизненного цикла компонента
>- Вызвать анимации перехода
>
>Например:
>```html
><transition>
>  <span :key="text">{{ text }}</span>
></transition>
>```
>При изменениях значения text, элемент <span> будет всегда заменяться целиком, вместо обновления содержимого, а значит и анимация перехода будет запущена.


## `ref` (доступ к элементу DOM)

Атрибут `ref` используется для регистрации ссылки на элемент (или дочерний компонент). Она будет добавляться в объект `$refs` родительского компонента. При использовании на обычном DOM-элементе ссылка будет указывать на этот элемент; при использовании на дочернем компоненте ссылка будет указывать на экземпляр компонента.

```html
<p ref="p">hello</p>
<child-component ref="child"></child-component>
```

```js
this.$ref.p         // доступ к элементу
this.$ref.child     // доступ к экземпляру дочернего компонента
```

>Важное примечание о времени регистрации `ref`-ссылок: поскольку `ref`-ссылки создаются в результате функции отрисовки, нет возможности получить к ним доступ при начальной отрисовке (потому что их ещё не существует). Свойство `$refs` также нереактивно, поэтому не стоит использовать его в шаблонах для привязки данных.


# Управление классами и стилями

Для того, чтобы динамически изменять CSS-классы и inline-стили элементов в зависимости от состояния приложения можно использовать директиву `v-bind` для привзки переменной к атрибуту `class` или `style`. Vue предоставляет дополнительные возможности директивы `v-bind` для работы с `class` и `style`. Эти атрибуты кроме строковых значений могут принимать массивы или объекты.

Здесь привидены способы управления классами. Управление стилями можно посмотреть [здесь](https://ru.vuejs.org/v2/guide/class-and-style.html#%D0%A1%D0%B2%D1%8F%D0%B7%D1%8B%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5-inline-%D1%81%D1%82%D0%B8%D0%BB%D0%B5%D0%B9).

Для динамического добавления или удаления CSS-класса можно передать в директиву `v-bind:class` (или `:class`) объект, список или функцию.

## Использование объектов

Предположим, имеется CSS-класс `active` и переменная `isActive`. Тогда блоку `div` будет назначен класс `active` в том случае, если значение переменной `true`:

```html
<div v-bind:class="{ active: isActive }"></div>
```

В объекте можно определить несколько полей. Это позволит назначать элементу несколько классов. При этом ничего не мешает безусловно назначить класс элементу в атрибуте `class`:

```html
<div class="static"
     v-bind:class="{ active: isActive, 'text-danger': hasError }"
></div>
```

Вместо того, чтобы указывать объект непосредственно в шаблоне, можно было бы указать переменную, которая представляет собой `object`:

```html
<div v-bind:class="classObject"></div>
```


## Использование массивов

Пусть имеются две переменные `activeClass` и `errorClass`, которые содержат строки с именами классов `'active'` и `'text-danger'`:

```js
data: {
  activeClass: 'active',
  errorClass: 'text-danger'
}
```

Можно передать переменные в директиву `v-bind:class` в виде массива:

```html
<div v-bind:class="[activeClass, errorClass]"></div>
```

Используя тернарный оператор в массиве, можно переключать классы:

```html
<div v-bind:class="[isActive ? activeClass : '', errorClass]"></div>
```

В данном случае `errorClass` будет применён к элементу всегда, а `activeClass` – только в случае истинности `isActive`. Однако, более удобным вариантом для таких случаев является **смешанный синтаксис**.

```html
<div v-bind:class="[{ active: isActive }, errorClass]"></div>
```

Здесь объект используется для назначения класса `active` по условию. 

## Использование с компонентами

При использовании атрибута `class` на пользовательском компоненте, классы будут добавлены к его корневому(!) элементу. Собственные классы элемента при этом не будут потеряны.

