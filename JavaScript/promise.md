Статьи по теме [здесь](https://learn.javascript.ru/promise) и [здесь](https://habr.com/ru/articles/651037/#05). Запускать фрагменты кода можно [здесь](https://developer.mozilla.org/ru/play) или [здесь](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Promise). По последней ссылке доступен также и теоретический материал. 

Promise предоставляет удобный способ организации асинхронного кода.

`Promise` – это специальный объект, который выступает в качестве замены для результата, который еще не существует, т.е. представляет собой объект-обертку для значения, неизвестного на момент создания `Promise`. Он позволяет обрабатывать результаты асинхронных операций так, как если бы они были синхронными: вместо конечного результата асинхронного метода возвращается своего рода "обещание" получить результат в некоторый момент в будущем.

Объект `Promise` может быть создан с помощью оператора `new`:

```js
let p = new Promise(() => {})
console.log(p)   // Promise <pending>
```

Промис – это объект с состоянием (`state`), который может существовать в одном из трех состояний. Начальное состояние – **pending**. В дальнейшем промис может необратимо перейти в одно из двух состояний: **fulfilled** (выполнено успешно) или **rejected** (выполнено с ошибкой). Этот переход к установленному состоянию необратим; как только происходит переход к выполненному или отклоненному состоянию, состояние промиса уже не сможет измениться. Кроме того, не гарантируется, что промис когда-либо покинет состояние ожидания. Следовательно, хорошо структурированный код должен вести себя правильно, если промис успешно разрешается, если он отклоняется или никогда не выходит из состояния ожидания.

>Состояние промиса является частным и не может быть напрямую проверено в JavaScript.

Промис, который переходит в выполненное состояние (fulfilled), имеет закрытое внутреннее *значение*, а промис, который переходит в отклоненное состояние (rejected), имеет внутреннюю *причину*. И значение, и причина являются неизменной ссылкой на примитив или объект. Оба являются необязательными и по умолчанию будут иметь значение `undefined`. Асинхронный код, который планируется выполнить после того, как промис достигает определенного установленного состояния, всегда снабжается значением или причиной.

## Инициализация промиса

Состояние промиса является закрытым, и доступ к нему извне получить нельзя. Инициализировать промис, т.е. определитиь условия перехода промиса в то или иное состояние, а также определить асинхронное поведение промиса можно только внутри функции-исполнителя (executor). Функцию executor принято определять внутри `Promise` в виде стрелочной функции, которая получает в качестве аргументов две callback-функции, которые принято называть `resolve` и `reject`. Вызов первой функции изменит состояние на fulfilled, а вызов второй – на rejected.

```js
let p = new Promise((resolve, reject) => {
    setTimeout(() => {
        const value = Math.random() < 0.5
        if (value) resolve(value)
        else reject()
    }, 1000)
})
```

В этом коде промис `p` редуцируется в состояние fulfilled или rejected спустя секунду после создания. Состояние, в которое перейдет промис, будет определяться результатом выполнения выражения `Math.random() < 0.5`. В случае перехода в fulfielled, *значением* промиса будет `true` (значение переменной `value`), а в случае перехода в rejected, *причиной* будет `undefined`, так как в при вызове функции `reject()`, в нее не был передан какой либо аргумент.

## Методы экземпляра `Promise`

Методы, представленные в экземпляре промиса, служат для устранения разрыва между синхронным путем внешнего кода и асинхронным внутренним путем кода. Эти методы могут использоваться для доступа к данным, возвращаемым из асинхронной операции, обработки результатов успешного и неудачного выполнения промиса, последовательного вычисления промисов или добавления функций, которые выполняются только после того, как промис входит в состояние завершения.

### `then()`

Метод `Promise.prototype.then()` используется для подключения функции обработчика (`onResolved()`) к экземпляру промиса, который будет выполняться в случе успешного завершения. Обработчик передается в `then()` в качестве аргумента.

При вызове метода `onResolved()` в `then()` он может получить в качестве аргумента *значение*, которое образуется при переходе в fulfielled.

>в общем случае, в `then()` можно передать и второй аргумент – обработчик (`onRejected()`), который будет выполнен в случае перехода промиса в состояние rejected. Однако, удобнее передавать эту функцию в метод `catch()`.
Метод `then()` возвращает новый экземпляр промиса:

```js
let p1 = new Promise(() => {})
let p2 = p1.then()

console.log(p1) // Promise <pending>
console.log(p2) // Promise <pending>
console.log(p1 === p2) // false
```

В случае, когда промис редуцирует в состояние fulfilled, метод `then()` вернет промис в соответствии с функцией `onResolved()`:
-  Если функция `onResolved()` возвращает `Primise`, то метод `then()` вернет это промис. 
- Если же `onResolved()` без `return`, то будет возвращен промис со *значением* исходного промиса и состоянием fulfilled. 
- Если `onResolved()` возвращает некоторое значение (не промис), то `then()` возвратит промис с этим значеним и состоянием fulfilled.

В том случае, когда промис редуцирует в rejected, метод `then()` проигнорирует функцию `onResolved()` и будет действовать в соответствии с callback-функцией, переданной вторым аргументом, т.е. `onRejected()` по тому же принципу. Если эта функция не определена, то `then()` просто вернет промис со значением *причины* в состоянии rejected.

>Так как `then()` всегда возвращает промис, то у этого промиса тоже можно вызывать метод `then()`. Функция обработчик в этом методе будет выполнена в соответствии с возвращаемым промисом. В общем случае можно выстраивать неограниченную цепочку вызовов метода `then()`.

```js
let p = new Promise((resolve, reject) => {
    setTimeout(() => {
        const value = Math.random() < 0.5
        if (value) resolve(value)
        else reject()
    }, 1000)
})
.then((value) => {console.log(value)})
.then((value) => "another value")
.then((value) => {console.log(value)})

```

### `catch()`

Метод `catch()` используется для подключения функции обработчика (`onRejected()`) к экземпляру промиса, который будет выполнен в случае перехода промиса в состояние rejected. При этом в качестве аргумента эта функция `onRejected()` получит значение *причины* отклонения. В остальном она работает также, как и `then()`. Вызов `catch(onRejected)` эквивалентен вызову `then(null, onRejected)`.

Так как `then()` возвращает промис, и в случае отклонения, он возвращает промис с *причиной* отклонения, то метод `catch()` можно цеплять за `then()`.

```js
let p = new Promise((resolve, reject) => {
    setTimeout(() => {
        const value = Math.random() < 0.5
        if (value) resolve(value)
        else reject(value)
    }, 1000)
})
.then( (value) => {console.log("resolved", value)})
.catch((error) => {console.log("rejected", error)})
```

### `finally()`

Метод `finally()` можно использовать для подключения обработчик `onFinally()`, который будет выполнен при редукции состояния. Это полезно для избежания дублирования кода между обработчиками `onResolved()` и `onRejected()`. Важно отметить, что обработчик не имеет никакого способа определить, был ли промис разрешен или отклонен, поэтому этот метод предназначен только для вещей вроде очистки памяти.

Метод `finally()` возвращает по-умолчанию новый экземпляр промиса, с состоянием и значением родительского промиса (проход к родительскому промису). Однако, `finally()` может возвращать новый промис, если такой определен в `return`, либо генерировать исключения.