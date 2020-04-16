// declare function  globalLib(options: any): void;

// declare namespace globalLib {
//   export let version = '1.0.0';
//   export function doSomething(): void;
// }

declare function globalLib(options: globalLib.Options): void;

declare namespace globalLib {
  const version: string;
  function doSomething(): void;
  interface Options {
    [key: string]: any
  }
}