// 0 1 2 3
enum Direction {
  Up,
  Down,
  Left,
  Right,
}

// 1 2 3 4
enum Direction1 {
  Up = 1,
  Down,
  Left,
  Right,
}

// 0 1 4 5
enum Direction2 {
  Up,
  Down,
  Left = 4,
  Right,
}

// 1 2 4 5
enum Direction3 {
  Up = 1,
  Down,
  Left = 4,
  Right,
}

  // 字符串枚举
  enum Message {
    Success = '恭喜你，成功了',
    Fail = '抱歉了，失败了'
  }

  // 异构枚举
  enum Answer {
    N,
    Y = 'Yes'
  }

  // 枚举成员
  enum Char {
    // const member
    a,
    b = Char.a,
    c = 1 + 3,
    // computed member
    d = Math.random(),
    e = '123'.length,
    f = 4
  }

  // 常量枚举
  const enum Month {
    Jan,
    Feb,
    Mar,
    Apr,
    May
  }
  let month = [Month.Jan, Month.Feb, Month.Mar]

  // 枚举类型
  enum E { a, b }
  enum F { a = 0, b = 1 }
  enum G { a = 'apple', b = 'banana' }

  let e: E = 3
  let f: F = 3
//   console.log(e === f)

  let e1: E.a = 3
  let e2: E.b = 3
  let e3: E.a = 3
//   console.log(e1 === e2)
//   console.log(e1 === e3)

  let g1: G = G.a
  let g2: G.a = G.a