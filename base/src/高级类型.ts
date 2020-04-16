interface DogInterface {
    run(): void
}

interface CatInterface {
    jump(): void
}

// 交叉类型：必须符合所有类型
const pet: DogInterface & CatInterface = {
    run() { },
    jump() { },
}


// 联合类型：只要符合所有类型中的一种即可
let strOrNum: string | number = 1
let strOrNum1: 'a' | 'b' | 1 | 2 = 'a'


class Dog implements DogInterface {
    public run() { }
    public eat() { }
}

class Cat implements CatInterface {
    public jump() { }
    public eat() { }
}

enum Gender {
    Boy,
    Girl,
}

function getPet(gender: Gender) {
    // 这里的 pet 被推断为 Cat | Dog
    const pet = gender === Gender.Boy ? new Dog() : new Cat()

    // 所以 pet 只能访问两个类的共有属性和方法
    return pet.eat()
}


// 通过联合类型创建类型保护

enum SharpType {
    Square = 'square',
    Rectangle = 'rectangle',
    Circle = 'circle',
}

interface Square {
    name: SharpType.Square
    sideLength: number
}

interface Rectangle {
    name: SharpType.Rectangle
    width: number
    height: number
}

interface Circle {
    name: SharpType.Circle
    radius: number
}

type Sharp = Square | Rectangle | Circle

function area(s: Sharp) {
    switch (s.name) {
        case SharpType.Square:
            return s.sideLength * s.sideLength
        case SharpType.Rectangle:
            return s.width * s.height
    }
}

// 此时分支语句中没有关于 Circle 的语句
// 因此下面这句会返回
console.log(area({ name: SharpType.Circle, radius: 10 })) // undefined

// 1) 通过注明函数的返回值类型
function area1(s: Sharp): number {
    switch (s.name) {
        case SharpType.Square:
            return s.sideLength * s.sideLength
        case SharpType.Rectangle:
            return s.width * s.height

        // 当该函数明确定义了返回值类型是 number
        // 不写下面的分支即报错
        case SharpType.Circle:
            return s.radius * s.radius * Math.PI
    }
}

// 2) 通过定义 nerver 类型的立即执行函数
function area2(s: Sharp) {
    switch (s.name) {
        case SharpType.Square:
            return s.sideLength ** 2
        case SharpType.Rectangle:
            return s.width * s.height
        case SharpType.Circle:
            return Math.PI * s.radius ** 2

        // never 代表没有终点的类型
        // 下面的分支中，如果 s 报错，说明程序走到了 default 语句，
        // 也就意味着上面没有覆盖所有的分支
        default:
            return ((e: never) => {
                throw new Error()
            })(s)
    }
}


/**
 * 索引类型
 */
// 引子
const o = {
    a: 1,
    b: 2,
    c: 3,
}
const getValueList = (o: { [index: string]: number }, keys: string[]) => {
    return keys.map(key => o[key])
}

getValueList(o, ['a', 'b']) // [1, 2]

// 但当访问一个对象不存在的属性时，TS 也不会报错
getValueList(o, ['a', 'e']) // [1, undefined]

// 索引类型的查询操作符 keyof T
// T 所有公共属性 key 的联合类型
interface Obj {
    a: string
    b: boolean
}

// type IIndexType = "a" | "b"
type IIndexType = keyof Obj

// 索引类型的访问操作符 T[K]
const someStr: Obj['a'] = ''

// 因此改造一番
const getValueList1 = <T, K extends keyof T>(o: T, keys: K[]): T[K][] => {
    return keys.map(key => o[key])
}

getValueList1(o, ['a', 'b']) // [1, 2]
// getValueList1(o, ['a', 'W']) // Type 'string' is not assignable to type '"a" | "b" | "c"'.


/**
 * 映射类型
 */
interface Obj {
    a: string;
    b: string;
}
// type Readonly<T> = {
//   readonly [P in keyof T]: T[P];
// }
type ReadonlyObj = Readonly<Obj>
// type Partial<T> = {
//   [P in keyof T]?: T[P];
// }
type PartialObj = Partial<Obj>
// type Pick<T, K extends keyof T> = {
//   [P in K]: T[P];
// }
type PickObj = Pick<Obj, 'a' | 'b'>
// // Construct a type with a set of properties K of type T
// type Record<K extends keyof any, T> = {
//   [P in K]: T;
// }
type RecordObj = Record<'x' | 'y', Obj>


/*
 * 条件类型 T extends U ? X : Y
 */

type TypeName<T> =
    T extends string ? 'string'
    : T extends number ? 'number'
    : T extends boolean ? 'boolean'
    : T extends undefined ? 'undefined'
    : T extends Function ? 'function'
    : 'object'

type T1 = TypeName<string>
const t1: T1 = 'string'

/*
 * 分布式条件类型 (A | B) extends U ? X : Y
 * 它相当于 A extends U ? X : Y | B extends U ? X : Y
 */

type T2 = TypeName<string | number>
const t2: T2 = 'number'

/*
 * Exclude<T, U> 排除 T 存在于 U 的类型的联合类型
 */

// 实现原理
// type Exclude<T, U> = T extends U ? never : T;

type T3 = Exclude<'a' | 'b' | 'c', 'a' | 'e'>
// type T3 = Exclude<'a', 'a' | 'e'> | Exclude<'b', 'a' | 'e'> | Exclude<'c', 'a' | 'e'>
// type T3 = never | 'b' | 'c'
// typee T3 = 'b' | 'c'
const t3: T3 = 'b'

/*
 * type Extract<T, U> 获取 T 和 U 公用类型的联合类型
 */

// 实现原理
// type Extract<T, U> = T extends U ? T : never;

type T4 = Extract<'a' | 'b' | 'c', 'a' | 'e'>
const t4: T4 = 'a'

/*
 * NonNullable<T> 排除类型 T 里的 null / undefined 的类型的联合类型
 */

// 实现原理
// type NonNullable<T> = T extends null | undefined ? never : T;

type T5 = NonNullable<string | number | null | undefined>
const t5: T5 = 'a'

/*
 * type Omit<T, K extends keyof any>
 */

// 实现原理
// type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;

interface XXXX {
    id: number
    name: string
    age: number
}

interface YYYY {
    id: number
    hobbies: string[]
}

type T6 = Omit<XXXX, keyof YYYY>
type T66 = Omit<XXXX, 'id' | 'name'>