// let v0: [string, number] = ['Dambo', 1];
// v0.push('Dam');
// console.log(v0);


// type THasName = {
//     name: string;
// }
// // extends означает, что мы можем передать в функцию любой тип данных, который расширяет тип THasName, то есть любой объект, в котором будет свойство name
// function printName<T extends THasName>(param: T): void {
//     console.log(param, param.name); // { name: 'Sergey', age: '34', cat: 'vss' } Sergey
// }
// const userSergey = {name: 'Sergey', age: '34', cat: 'vss'};
// printName(userSergey);


// type TUser = {id: number, name: string, age: number}
// // type UserKeys = keyof TUser; // UserKeys теперь равно 'id' | 'name' | 'age'
// function getValue<T, K extends keyof T>(obj: T, key: K): T[K] {
//     console.log(obj[key]);
//     return obj[key];
// }
// const user: TUser = {id: 1, name: 'Sergey', age: 34};
// const userName = getValue(user, 'name'); // Sergey
// const userAge = getValue(user, 'age'); // 34


// 1. Создание универсальной функции для создания объектов с указанными свойствами
const dataArray: TPerson[] = [
    {name: 'Alice'},    
    {age: 32},
    {city: 'New York'},
    {country: 'USA'},
]

// Record позволяет описывать объект с описанными свойствами и типами их значений
type TPerson = Record<string, string | number> // Позволяет нам типизировать объект, состав которого заранее нам неизвестен

function createdObject(data: TPerson[]) { // принимает массив, у которого тип, как у TPerson, только это массив объектов из dataArray
    const person: TPerson = {}; // создаём пустую переменную, у которой тип такой, как у TPerson
    data.forEach(item => { // перебираем каждый элемент массива и добавляем его свойства и значения в объект person
        Object.assign(person, item) // метод assign у объектов позволяет соединить между собой несколько объектов
    })
    return person;
}

const result = createdObject(dataArray);
console.log('Задача №1');
console.log(result);


// 2. Создание функции для сравнения массивов
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const arr3 = [4, 5, 6];

function compareArray<T>(arr1: T[], arr2: T[]) {
    if (arr1.length!== arr2.length) {
        return false;
    }
    // Метод every позволяет для каждого элемента массива выполнять функцию в обработчике (стрелочная функция)
    return arr1.every((item, index) => item === arr2[index]) 
}

console.log('Задача №2');
console.log(compareArray(arr1, arr2)); // false
console.log(compareArray(arr2, arr3)); // false


// 3. Создание универсальной функции преобразования массива
const users = [
    {name: 'Alice', age: 32, city: 'USA'},
    {name: 'Bob', age: 28, city: 'Paris'}
]

function filterObject<T extends object, K extends keyof T>(usersArray: T[], keys: K[]) { // массив с пользователями и массив с названиями ключей, которые нужно будет оставить в объектах. T extends object значит, что это обязательно должен быть массив объектов
    let result: Partial<Pick<T, K>>[] = []; // переменная, в которую сохраняем массив. Утилитарный тип Pick: мы даём ему объект (T) и указывает те свойства (ключи К), которые нам нужны
    result = usersArray.map(item => { // метод map перебирает все элементы массива и для каждого элемента выполняет ф-ю callback, результат записывается в новый массив. Берём элемент item..
        const obj: Partial<Pick<T, K>> = {} // свойство Partial говорит, что объект будет содержать поля со свойствами Pick<T, K>, но в необязательном порядке
        keys.forEach(key => { // используем ключи, которые перебираем как массив и для каждого ключа  
            if (item[key]) { // берем свойство в элементе массива,
                obj[key] = item[key] // создаём в объекте новое свойство и присваиваем ему значение из нашего массива
            }
        })
        return obj
    }) 
    return result
}

console.log('Задача №3');
console.log(filterObject(users, ['name', 'city']));