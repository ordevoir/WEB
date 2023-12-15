// в этом файле будет создан плагин modal, для создания модального окна

function noop() {}  // функция, которая ничего не делает

// функция, создающая и возвращающая html-элемент с классом model-footer
// если получаемый массив кнопок buttons не является пустым
function _createModalFooter(buttons = []) {
    if (buttons.length === 0) {
        return document.createElement('div')
    }
    const footerElmnt = document.createElement('div')
    footerElmnt.className = 'modal-footer'

    // теперь сгенерируем кнопки
    buttons.forEach(btn => {
        const btnElmnt = document.createElement('button')
        btnElmnt.textContent = btn.text
        btnElmnt.classList.add('btn')   // добавляем класс btn для bootstrap
        btnElmnt.classList.add(`btn-${btn.type || 'secondary'}`)
        // в этой записи доабваляется класс с использованием текста из 
        // btn.type или же secondary, если btn.type пуст или отсутствует
        btnElmnt.onclick = btn.handler || noop
        footerElmnt.appendChild(btnElmnt)
    })

    return footerElmnt
}

// _createModal принимет объект, содержащий поля для названия модального
// окна, содержимого body, ширины окна и тд. Создает html-элемент окна
// и возвращает объект этого элемента.
function _createModal(options) {
    const modalElmnt = document.createElement('div')
        // createElement создает элемент c тем тегом, что указан в аргументе
    modalElmnt.classList.add('imodal') // назначаем элементу класс imodal
        // insertAdjacentHTML() разбирает указанный текст как HTML и вставляет
        //  полученные узлы (nodes) в DOM дерево в указанную позицию:
    const DEFAULT_WIDTH = '600px'
    modalElmnt.insertAdjacentHTML('afterbegin', `

        <div class="modal-overlay" data-close="true">
            <div class="modal-window" style="width: ${options.width || DEFAULT_WIDTH}">
                <div class="modal-header">
                    <span class="modal-title">${options.title || 'Window'}</span>
                    ${options.closable ? `<span class="modal-close" data-close="true">&times;</span>` : ''}
                </div>
                <div class="modal-body" data-content>
                    ${options.content || ''}
                </div>


            </div>
        </div>

    `)
// data-атрибуты html-тэгов используются для того, чтобы задавать
// какие либо пользовательские значения, оставляя при этом валидность.
// data-атрибуты начинаются с приставки "data-", например, data-close
// значения этих атрибутов можно получить через target.dataset
        document.body.append(modalElmnt) // помещаем modal в DOM-дерево
        const footer = _createModalFooter(options.footerButtons)
// помещаем созданный html-элемент footer в конец блока классом .modal-window
        let mwList = document.querySelectorAll('.modal-window')
        mwList[mwList.length -1].append(footer) // последний элемент
// здесь используется именно querySelectorAll, так как при создании
// нескольких модальных окон, у каждого будет свой блок с классом .modal-window
    return modalElmnt
}

// далее создается метод у объекта для плагинов $ в файле base.js, который
// создает элемент модального окна (при помощи _createModal) и возвращает
// объект модального окна с методами open, close, destroy и слушателем 
$.modal = function(options) {
    const hidingTime = 500
    const modalElmnt = _createModal(options)
    let closing = false
    let destroyed = false

    modalObj = {
        open() {
            !closing && modalElmnt.classList.add('open')
// closing == false то идет вычисление второго операнда это нужно для того, 
// чтобы метод open нельзя было бы выполнить, пока идет анимация close
        },
        close() {
            closing = true
            modalElmnt.classList.remove('open')
            modalElmnt.classList.add('hide')
            // таймаут нужен для того, чтобы за время закрывания метод open
            // не был доступен
            setTimeout(() => {
                modalElmnt.classList.remove('hide')
                closing = false

                if (typeof options.onClose === 'function') {
                    options.onClose() }    // см. плагин confirm
// здесь если объект options содержит поле onClose, и это поле является
// функцией, то при вызове метода close() вызывать методoptions.onClose()

            }, hidingTime)
        },

// данная функция будет получать в качестве аргумента некоторый текст,
// возможно с html-разметкой, и помещать его внутрь блока modal-body
        setContent(html) {
            modalElmnt.querySelector('[data-content]').innerHTML = html
        }
    }

// данный обработчик будет проверять атрибут close у элементов страницы 
// (target), на которые происходит кликание, и закрвать модальное окно,
// в том случае, если атрибут close имеется, и его значение не fasly
    const listener = event => {
        if (event.target.dataset.close) {
            modalObj.close()
        }
    }
    modalElmnt.addEventListener('click', listener)

// Метод Object.assign() используется для копирования значений всех 
// собственных перечисляемых свойств из одного или более исходных объектов 
// в целевой объект. После копирования он возвращает целевой объект. Здесь
// сливается сам объект modalObj с новым объектом, который тут же создается
    return Object.assign(modalObj, {
        destroy() {
            modalElmnt.remove() // удаляется элемент modalElmnt

        // modalElmnt.parentNode.removeChild(modalElmnt)   // старый способ
// по сути здесь parentNode - это родительский узел элемента модального окна
// вызывается его метод removeChild, который может удалять дочерние элементы
// и в качестве аргумента передается сам элемент, который мы хотим удалить
            modalElmnt.removeEventListener('click', listener)
// здесь уничтожается соответствующий слушатель 
            destroyed = true
        }
    })
}
