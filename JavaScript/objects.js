// https://learn.javascript.ru/object

let somObject = new Object()    // синтаксис "конструктор объекта"
let anotherObject = {}          // литеральный синтаксис 

let value = 'height'
let mass = 60

let person = {
    name: 'Wilhelm',
    mass,                       // создается поле mass со значением 60
    age: 26,
    budget: 20000,
    [value]: 175,                               // вычисляемое свойство
    'complex key': 'Complex Value',             // свойство из нескольких слов
    greet1: function() {console.log('Hello!')}, // два способа
    greet2() {console.log('Hi')}                // создания функции
}

person.budget = 23000       // изменение поля
person.isScientist = true   // добавление поля
delete person.budget        // удаление поля

// Для полей, имена которых состоят из нескольких слов, доступ к 
// значению «через точку» не работает, используется альтернативный
// способ доступа, через квадратные скобки:
console.log(person['complex key'])
// Квадратные скобки также позволяют обратиться к свойству, имя которого
// может быть результатом выражения. Например, имя свойства может 
// храниться в переменной:
let key = 'complex key'
console.log(person[key])
// Здесь переменная key может быть вычислена во время выполнения кода 
// или зависеть от пользовательского ввода.

console.log(person.height)      // доступ к вычисляемому свойству
console.log(person['height'])   // возможен и такой доступ
// также можно было вычисляемое свойство после создания объекта:
person[value] = 180 // т.к. поле уже существует, тут мы его только меняем
// мы можем использовать и более сложные выражения в квадратных скобках:
person[value + 'CM'] = 185
// квадратные скобки дают больше возможностей, чем запись через точку. 

// При обращении к свойству, которого нет, возвращается undefined.
// Также существует оператор in для проверки существования поля в объекте:
console.log('key' in person)

// для перебора всех свойств объекта используется цикл for..in:
for (let key in person) { 
    console.log(key),           // будут выведены имена ключей    
    console.log(person[key])    // будут выведены значения ключей
}
// свойства упорядочены особым образом: свойства с целочисленными ключами 
// сортируются по возрастанию, остальные располагаются в порядке создания

// примитивные типы: строки, числа, логические значения – присваиваются
// и копируются «по значению»:
let message = 'Hello!'  // в результате имеем две независымые переменные,
let phrase = message    // каждая из которых хранит строку "Hello!"
// переменная же объекта хранит не сам объект, а ссылку на него:
let user = { lastName: 'Fox' }  // в результате две переменные ссылаются
let admin = user                // на один и тот же объект
console.log('user === admin:     ', user === admin)
// два объекта равны только в том случае, если это один и тот же объект.

// объединение нескольких объектов в один. копируются все свойства из
// person и admin в существующий объект someObject
Object.assign(somObject, person, admin)     // если принимающий объект 
// someObject уже имеет свойство с таким именем, оно будет перезаписано
// мы также можем использовать Object.assign для простого клонирования:
let newPerson = Object.assign({}, person)
console.log('newPerson == person:', newPerson == person) // false
// Object.assign не делает глубокое клонирования объекта! т.е. если какое
// либо поле является объектом, то оно будет скопированно по ссылке
// Мы можем реализовать глубокое клонирование, используя рекурсию. 
// Или, чтобы не изобретать велосипед, использовать готовую реализацию
// из JavaScript-библиотеки lodash, метод _.cloneDeep(obj).




let salaries = {
    John: 100,
    Ann: 160,
    title: 'some title',
}

let multiplyNumeric = function(object) {
    for (key in object) {
        if (typeof object[key] == 'number') {
            object[key] *= 2
        }
    }
}

multiplyNumeric(salaries)
console.log(salaries);


// Атрибуты и дескрипторы свойств

// Помимо значения value, свойства объекта имеют три специальных атрибута.
// writable – если true, свойство можно изменить, иначе оно только для чтения.
// enumerable – если true, свойство перечисляется в циклах, в противном 
//   случае циклы его игнорируют.
// configurable – если true, свойство можно удалить, а эти атрибуты можно
//   изменять, иначе этого делать нельзя.

// Метод Object.getOwnPropertyDescriptor позволяет получить полную 
// информацию о свойстве. Возвращаемое значение – это объект - дескриптор
// свойства: он содержит значение свойства и все его атрибуты.

let descriptor = Object.getOwnPropertyDescriptor(salaries, 'John')
console.log(descriptor)

// Когда мы создаём свойство обычным способом, все они имеют значение true

// Чтобы изменить флаги, мы можем использовать метод Object.defineProperty.

Object.defineProperty(salaries, 'John', {
    value: 23,
    writable: false,
    enumerable: false,
    configurable: false,
})

console.log(Object.getOwnPropertyDescriptor(salaries, 'John'))

// с помощью defineProperty можно создавать новые свойства у объекта:

Object.defineProperty(salaries, 'Thom', {
    value: 26,
    writable: true
})

console.log(Object.getOwnPropertyDescriptor(salaries, 'Thom'))

Object.defineProperties(salaries, {
    Thom: { value: 33, writable: true }, // меняем существующее свойство
    Elena: { value: 23, configurable: true },   // новые
    Ophelia: { value: 15, enumerable: true }    // свойства
})

console.log(salaries)

// Клонирование объекта вместе с атрибутами его свойств:

let clone = Object.defineProperties({}, Object.getOwnPropertyDescriptors(salaries))

console.log(clone)


// Геттеры и сеттеры

// Есть два типа свойств объекта. Первый тип это свойства-данные (data 
// properties), с которыми имелось дело выше. Второй тип это свойства-
// аксессоры (accessor properties). По своей сути это функции, которые 
// используются для присвоения и получения значения, но во внешнем коде 
// они выглядят как обычные свойства объекта.

let musican = {
    name: 'Johhy',
    surname: 'Greenwood',

    get fullName() {
        return `${this.name} ${this.surname}`
    },
    set fullName(value) {
        [this.name, this.surname] = value.split(" ");
    }
}

console.log(musican.fullName)
musican.fullName = 'Thom Yorke'
console.log(musican.fullName)

console.log(Object.getOwnPropertyDescriptor(musican, 'fullName'))

// Друой пример. Мы хотим запретить устанавливать короткое имя для user,
// мы можем использовать сеттер name для проверки, а само значение 
// хранить в отдельном свойстве _name:

let administrator = {
    get name() {
      return this._name;
    },
  
    set name(value) {
      if (value.length < 4) {
        alert("Имя слишком короткое, должно быть более 4 символов");
        return;
      }
      this._name = value;
    }
  };


// Prototype

// В JavaScript объекты имеют специальное скрытое свойство [[Prototype]]
// (так оно названо в спецификации), которое либо равно null, либо 
// ссылается на другой объект. Этот объект называется «прототипом».
// Свойство [[Prototype]] является внутренним и скрытым, но есть много 
// способов задать его. Одним из них является использование __proto__ :

let animal = {  // этот объект будем назначать в качестве прототипа
    eats: true
}
let rabbit = {
    jumps: true,
    walk() {
        console.log('rabbit walk')
    }
}
                          
rabbit.__proto__ = animal // устанавливаем animal как прототип для rabbit

// Свойство __proto__ — исторически обусловленный геттер/сеттер 
// для [[Prototype]]. в современном языке его заменяют функции
// Object.getPrototypeOf / Object.setPrototypeOf

let longEar = {
    earLenght: 10,      // цепочка прототипов, где longEar получает
    __proto__: rabbit   // в качестве прототипов и rabbit и animal
}

// Объект может наследоваться только от одного объекта.

// Цикл for..in проходит не только по собственным, но и по унаследованным 
// свойствам объекта. Если унаследованные свойства нам не нужны, то мы 
// можем отфильтровать их при помощи встроенного метода 
// obj.hasOwnProperty(key): он возвращает true, если у obj есть 
// собственное, не унаследованное, свойство с именем key.

// Остальные методы получения ключей/значений (Object.keys, Object.values) 
// работают только с собственными свойствами объекта.


// Создание объекта с помощью функции-конструктора

// Свойство F.prototype (не путать с [[Prototype]]) устанавливает
// [[Prototype]] для новых объектов при вызове new F(). Значение 
// F.prototype должно быть либо объектом, либо null. Свойство "prototype" 
// является особым, только когда оно назначено функции-конструктору, 
// которая вызывается оператором new.

function Wolf(name) {   // создаем функцию-конструктор
    this.name = name;
}

Wolf.prototype = animal

// Установка Wolf.prototype = animal буквально говорит интерпретатору 
// следующее: "При создании объекта через new Rabbit() запиши ему 
// animal в [[Prototype]]".

let wolf = new Wolf('White Wolf')
console.log(wolf)


// Встроенные прототипы

// Все встроенные функции-конструкторы используют свойство prototype.
// obj = {} – это то же самое, что и obj = new Object(), где Object 
// – встроенная функция-конструктор для объектов с собственным свойством
// prototype, которое ссылается на огромный объект Object.prototype.

// Другие встроенные объекты, такие как Array, Date, Function и другие, 
// также хранят свои методы в прототипах.

// Числа, строки и булевые значения не являются объектами. Но если мы 
// попытаемся получить доступ к их свойствам, то тогда будет создан 
// временный объект-обёртка с использованием встроенных конструкторов 
// String, Number и Boolean, который предоставит методы и после этого 
// исчезнет. Эти объекты создаются невидимо для нас, и большая часть 
// движков оптимизирует этот процесс, но спецификация описывает это 
// именно таким образом. Методы этих объектов также находятся в прототипах,
// доступных как String.prototype, Number.prototype и Boolean.prototype.
// Значения null и undefined не имеют объектов-обёрток

// Встроенные прототипы можно изменять. Например, если добавить метод к 
// String.prototype, метод становится доступен для всех строк:

String.prototype.show = function() {
    console.log(this)
}

'Socrates'.show()


// Заимстрование у прототипов
// Если мы создаём объект, похожий, например, на массив (псевдомассив), 
// мы можем скопировать некоторые методы из Array в этот объект:

let obj = {
    0: "Hello",
    1: "world",
    2: "!",
    length: 3,
};
  
obj.join = Array.prototype.join;
  
console.log( obj.join(": ") ); // Hello,world!

// Это работает, потому что для внутреннего алгоритма встроенного метода 
// join важны только корректность индексов и свойство length, он не 
// проверяет, является ли объект на самом деле массивом. И многие 
// встроенные методы работают так же.

// Альтернативная возможность – мы можем унаследовать от массива, 
// установив obj.__proto__ как Array.prototype, таким образом все 
// методы Array станут автоматически доступны в obj. Но это будет
// невозможно, если obj уже наследует от другого объекта. 

// Функция Object.create - создает объект и записывает в прототип 
// переданный в параметре объект.

let obj1 = Object.create(null) // создается объект без прототипа
console.log('obj1', obj1)

let obj2 = Object.create(wolf) // создается объект с прототипом wolf
console.log('obj2', obj2)