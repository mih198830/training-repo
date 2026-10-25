//Task 1 — Values 

// 1. Create a `const` with the module name as a `string` and a `let` with the number of finished tasks. Change the `let` value from `0` to `1`.
const module03 = "module-03";
let numberOfFinishedTasks = 0;
numberOfFinishedTasks = 1;

// 2. Create one `boolean`, one `null`, and one `undefined` value. Add a short comment about the difference between `null`
//  and `undefined` in your example.
let boolExample = true;
let nullExample = null; // `null` represents absence of any object value.
let undefinedExample; // `undefined` means a variable has been declared but has not yet been assigned a value.

//3. Change the text `'12'` into a number. Do the same with `'unknown'`, then check if the result is `NaN`. 
// `NaN` is a number value. It is not a TypeScript type.
let textToNumber = Number("12"); // Converts string '12' to number 12
let textToUnknown = Number("unknown"); // Converts string 'unknown' to NaN
let isNaNValue = Number.isNaN(textToUnknown); // Checks if textToUnknown is NaN, which it is

// 4. Print the results of `'5' + 2` and `Boolean('false')`.
let numericalValue = ('5' + 2);
let booleanConversion = Boolean("false");

// 5 Print your values and check what you see. For the example values above, 
//you must see `1`, `12`, `true` for the `NaN` check, `52`,
// and `true` for the Boolean conversion. 
console.log(numberOfFinishedTasks);
console.log(textToNumber);
console.log(isNaNValue);
console.log(numericalValue);
console.log(booleanConversion);