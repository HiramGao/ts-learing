// declare function moduleLib(options: moduleLib.Options): void;

// declare namespace moduleLib {
//   export const version: string;
//   export function doSomething(): void;
//   interface Options {
//     [key: string]: any;
//   }
// }

declare function moduleLib(options: Options): void

interface Options {
  [key: string]: any
}

declare namespace moduleLib {
  const version: string
  function doSomething(): void
}

export = moduleLib