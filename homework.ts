// 1. Напишите обобщенную функцию findElement, которая принимает массив и искомый элемент. Функция должна вернуть индекс первого вхождения искомого элемента в массиве или -1, если элемент не найден. Используйте дженерики для обеспечения типобезопасности.

function findElement<N>(array: N[], target: N): number {
    const index = array.indexOf(target); // Используем метод indexOf для поиска первого вхождения элемента
    return index !== -1 ? index : -1; // Возвращаем индекс или -1, если элемент не найден
}

const numbers = [1, 2, 3, 4, 5];
const target = 3;
const index = findElement(numbers, target);
console.log(`Задача №1`);
console.log(`Индекс элемента ${target} в массиве: ${index}`);

// 2. Напишите обобщенную функцию mergeObjects, которая принимает два объекта и объединяет их в один. Если у объектов есть общие свойства, то значения этих свойств должны быть объединены (например, если оба объекта имеют свойство name, то в результирующем объекте оно должно содержать значение из обоих объектов). Обеспечьте типобезопасность при работе с объектами разных типов.

type TMergeObjects = Record<string, string | number | (string | number)[]>;
function mergeObjects(obj1: TMergeObjects, obj2: TMergeObjects) {
    const mergedData: TMergeObjects = { ...obj1 }; // Начинаем с копии первого объекта
    
    for (const key in obj2) {
        if (obj2.hasOwnProperty(key)) {
            // Проверяем, если ключ уже существует в mergedData
            if (mergedData.hasOwnProperty(key)) {
                // Если значение уже есть, объединяем значения в массив
                mergedData[key] = [mergedData[key]].flat().concat(obj2[key]);
            } else {
                // Добавляем новое свойство
                mergedData[key] = obj2[key];
            }
        }
    }

    return mergedData;
}

// type TMergeObjects = Record<string, string | number>;
// function mergeObjects<T extends TMergeObjects, U extends TMergeObjects>(obj1: T, obj2: U) {
//   const mergedData = { ...obj1, ...obj2 };
//   return mergedData;
// }

const person1 = { name: 'Alice', age: 30 };
const person2 = { age: 25, city: 'New York' };
const mergedPerson = mergeObjects(person1, person2);
console.log(`Задача №2`);
console.log(mergedPerson); // Результат: { name: 'Alice', age: 25, city: 'New York' } (закомментированный код), либо { name: 'Alice', age: [30, 25], city: 'New York' }
