// объект, который будет передаваться в качестве аргумента в метод modal
let prm = {
    title: 'Modal Window',
    winClass: 'test',
    closable: true,
    content: `
        <p>Lorem ipsum dolor sit</p>
        <p>Lorem ipsum dolor sit</p>
    `,
    width: '500px',
// для создания кнопок футера будет поле, содержащее массив, каждый элемент
// которого соответствует одной кнопке. Элемент массива - объект, содержащий
// текст кнопки, его тип, и обработчик. Этот массив будет передаваться как
// аргумент в функцию _createModalFooter для создания кнопок в футере
    footerButtons: [
        {text: 'Ok', type: 'primary', handler() {
            console.log('Primary btn clicked')
            modal.close()
        }},
        {text: 'Cancel', type: 'danger', handler() {
            console.log('Cancel btn clicked')
            modal.close()
        }}
    ]
}

// создадим объект модального окна, используя метод modal() основного
// объекта для плагинов $. при этом создается html-элемент модального
// окна, который остается скрытм до вызова метода open()
let modal = $.modal(prm)

const btnOpen = document.querySelector('#btn-open')
btnOpen.addEventListener('click', () => {
    modal.open()    // модальное окно становится видимым
})

let monitors = [
    {id: 1, title: 'Acer Nitro VG270UPbmiipx', price: 26499, img: 'https://c.dns-shop.ru/thumb/st4/fit/320/250/f6e9f8a70ff895926a538e5c40d640c9/d01d545f304c0a83963124c6ee16fc1ca651d179ee942504b39212cc510a983e.jpg'},
    {id: 2, title: 'Samsung U28R550UQI', price: 22999, img: 'https://c.dns-shop.ru/thumb/st4/fit/320/250/23cbfc513f72a81d9ae4d49f7cd1baa4/374759e1ad9b9fdf023e4fff54cf3b749631e7cbb72f49cff34e9e58913286c0.jpg'},
    {id: 3, title: 'AOC Q27G2U/BK', price: 19899, img: 'https://c.dns-shop.ru/thumb/st4/fit/320/250/da3eadaae0b0a8932dfa4eacbab9248d/9cdda2f7c316d08e806dec7c37b1d31db7a6aa5ec06c4442c73833c2b9cd071f.jpg'},
    {id: 4, title: 'Philips 275E1S/01', price: 16999, img: 'https://c.dns-shop.ru/thumb/st1/fit/320/250/85119367cbeca0fbc5103d20f48b4d18/3aa000619a88b65e22c31811de93561ca0234d70fa6a97f2638ac2c48280f22d.jpg'}
]

// создаем функцию, которая получает объект, и возвращает на его основе html
const toHTML = monitorObj => `
    <div class="col">
    <div class="card" style="width: 18rem;">
        <img src="${monitorObj.img}" alt="${monitorObj.title}">
            <div class="card-body">
                <h5 class="card-title">${monitorObj.title}</h5>
                <a href="#" class="btn btn-primary" data-btn="price" data-id="${monitorObj.id}">Price</a>
                <a href="#" class="btn btn-danger" data-btn="delete" data-id="${monitorObj.id}">Delete</a>
            </div>
        </div>
    </div>`

function render(mntrs) {
// используя функцию toHTML получим массив строк соответствующих html-кодов
    let htmlCodes = monitors.map(toHTML)   // сокращенная запись
    // аналогично записи monitors.map(m => toHTML(m))
    document.querySelector('#monitors').innerHTML = htmlCodes
    // добавляем весь массив в элемент с id="monitors"
}

render(monitors)

// создадим модальное окно priceModal на основе плагина $.modal()
const priceModal = $.modal(
    {
        title: 'Price',
        winClass: 'price',
        closable: true,
        width: '400px',
        footerButtons: [
            {text: 'Ok', type: 'primary', handler() {priceModal.close()}},
        ]
    }
)

// слушатель для документа, который будет отслеживать, была ли нажата кнопка
// Price или Delete у какой либо карты на странице:
document.addEventListener('click', event => {
    event.preventDefault()
    const btnType = event.target.dataset.btn
    // в переменную btnType получаем значение data-атрибута btn, если такое
    // имеется у кликнутого элемента (он есть только у кнопок Price и Delete)
    const id = +event.target.dataset.id
    // в переменную id получаем значение data-атрибута id, это значение
    // является строковым, и для преобразования в число стаивтся этот "+"
    // далее в переменную monitor записывается элемент массива monitors,
    // чье поле id равно data-атрибуту id нажатой кнопки:
    const monitor = monitors.find( f => f.id === id)
    
    if (btnType === 'price') {                  // если data-атрибут 
        console.log(id, monitor)                // btn имеет значение price
        priceModal.setContent(`
        <p>Price of ${monitor.title}: <strong>${monitor.price}₽</strong></p>
        `)
        priceModal.open()   // модальное окно priceModal становится видимым

    } else if (btnType === 'delete') {          // если data-атрибут 
                                               // btn имеет значение delete
        $.confirm( {            // метод confirm возвращает обещание, внутри 
            title: 'Are you sure?',     // которого создается модальное окно
            content: `<p><strong>${monitor.title}</strong> will be deleted</p>`
        }).then( () => {    // метод then вызывается, когда вызван resolve()
            monitors = monitors.filter(f => f.id !== id)
            // нажатие Delete вызывает resolve() 
            render()    // обновляем содержимое элемента с id="monitors"
        }).catch( () => {   // метод catch вызывается, когда вызван reject()
            console.log('Cancel')   // нажатие Cancel вызывает reject() 
        })
    }
})