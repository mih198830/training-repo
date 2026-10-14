// Task 3 — Math in functions

//Write three functions that take numbers and return numbers: one adds two numbers, one multiplies two numbers, 
// and one finds their average. Name the addition function `addNumbers` and export it so another file can use it.

//Call all three with `10` and `4`. Print and check the results: `14`, `40`, and `7`. 
// Try one more pair of values of your choice. Commit this task before starting Task 4.
export function addNumbers(numberOne: number, numberTwo: number): number {
    return numberOne + numberTwo};

function multiplyTwoNumbers(numberOneToMultiply: number, numberTwoToMultiply: number): number{
    return numberOneToMultiply * numberTwoToMultiply};

function twoNumbersAverage(numberOnePartOfEverage: number, numberTwoPartOfEverage: number): number {
    return (numberOnePartOfEverage + numberTwoPartOfEverage)/2};

console.log(addNumbers(10, 4));
console.log(multiplyTwoNumbers(10, 4));
console.log(twoNumbersAverage(10, 4));

console.log(addNumbers(5, 3));
console.log(multiplyTwoNumbers(5, 3));
console.log(twoNumbersAverage(5, 3));
