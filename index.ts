import {
    split,
    flow,
    curryRight,
    nth,
    curry,
    has,
    every,
    partial,
} from 'lodash';

// const splitFlow = flow(
//     curryRight(split)(2)(':'),
//     curryRight(nth)(1),
//     (a) => { console.log({a}); return a; }
// );
// console.log(splitFlow('1:test2'))


const obj = {a : 1, b: 2}
const hasKeysOnObject = curry(has)(obj);
const keys = ['a', 'b']
console.log(every(keys, hasKeysOnObject))
