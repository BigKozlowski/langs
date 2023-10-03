import { Parser } from "../src/Parser";
import assert from "assert";
import testLiteral from "./literals-test";

const tests = [testLiteral];

const parser = new Parser();

// const exec = () => {
//     const program = `   
// // Number:
// 42;

// /**
//  * DOCS
//  */

// //String:
// "hello";
//   `;

//     const ast = parser.parse(program);

//     console.log(JSON.stringify(ast, null, 2));
// };

const test = (program: string, expected: unknown) => {
    const ast = parser.parse(program);
    assert.deepEqual(ast, expected);
};

tests.forEach(testRunner => testRunner(test));

console.log("All assertions passed");