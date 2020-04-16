abstract class Animal {
    eat() {
        console.log('eat')
    }
    abstract sleep(): void
}
// let animal = new Animal()

class Dog extends Animal {
    constructor(name: string) {
        super()
        this.name = name
        this.pri()
    }
    public name: string = 'dog'
    run() { }
    private pri() { }
    protected pro() { }
    readonly legs: number = 4
    static food: string = 'bones'
    sleep() {
        console.log('Dog sleep')
    }
}
let dog = new Dog('wangcai')
console.log(dog)
// dog.pri()
// dog.pro()
console.log(Dog.food)
dog.eat()

// Dog.food = 'shit'

class Husky extends Dog {
    constructor(name: string, public color: string) {
        super(name)
        this.color = color
        this.pro()
    }
}
console.log(Husky.food)
let husky = new Husky('kiki', 'black-white')
console.log(husky.color)

class Cat extends Animal {
    sleep() {
        console.log('Cat sleep')
    }
}
let cat = new Cat()

let animals: Animal[] = [dog, cat]
animals.forEach(i => i.sleep())

class Workflow {
    step1() {
        return this
    }
    step2() {
        return this
    }
}
new Workflow().step1().step2()

class MyFlow extends Workflow {
    next() {
        return this
    }
}
new MyFlow().next().step1().next().step2()