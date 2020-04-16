function log<T>(value: T): T {
    console.log(value)
    return value
}
log<string[]>(['a', 'b', 'c'])
log(['a'])

type Log0 = < T > (value: T) => T
let myLog: Log0 = log

interface Log1<T> {
    (value: T): T
}
let myLog1: Log1<number> = log
myLog1(1)

class Log<T> {
    run(value: T) {
        console.log(value)
        return value
    }
}
let log1 = new Log<number>()
log1.run(1)
let log2 = new Log()
log2.run({
    a: 1
})
log2.run({
    a: 2,
    b: 2
})
log2.run(2)

interface Length {
    length: number
}

function logAdvance<T extends Length>(value: T): T {
    console.log(value, value.length)
    return value
}
logAdvance([1])
logAdvance('123')
logAdvance({
    length: 3
})