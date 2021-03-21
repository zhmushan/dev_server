import { hello, goodbye, withPassion } from "./hello.ts";
import * as howdy from "./hello2.ts";
console.log(howdy.hello);
console.log(withPassion(hello));
console.log(withPassion(goodbye));
