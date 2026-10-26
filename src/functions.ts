

// Task 2 — Functions

// 1. Write a regular function that returns a test result as a string.
// For test `TC-101` that passed, it must return `TC-101: PASS`.
// For test `TC-102` that failed, it must return `TC-102: FAIL`.

import { loadFakeStatus } from '@test-data/fakeServer';
import { formatStatus } from '@helpers/helperExample';  

function returnTestResultAsString(testCaseId: string, testResult: string): string {
    return `${testCaseId}: ${testResult}`
}

// 2. Write an arrow function that says if a test may run.
// It must return `false` when the test is turned off or has already run three or more times.
// In other cases it must return `true`.

const decisionIfTestMayrun = (isTestTurnedOn: boolean, numberOfRuns: number): 
boolean => {return isTestTurnedOn && numberOfRuns < 3}

//3. Call both functions with enough different values 
// to show all these results. Print what each function returns.

console.log(returnTestResultAsString("TC-101", "PASS")); // TC-101: PASS
console.log(returnTestResultAsString("TC-102", "FAIL")); // TC-102: FAIL

console.log(decisionIfTestMayrun(true, 2)); // true
console.log(decisionIfTestMayrun(false, 1)); // false
console.log(decisionIfTestMayrun(true, 3)); // false    
console.log(decisionIfTestMayrun(false, 4)); // false

export async function showUserStatus(name: string): Promise <string> {
const status = await loadFakeStatus(name); // TODO: wait for the result
console.log('show-status');
return `${status.name}: ${status.active ? 'ACTIVE' : 'INACTIVE'}`;
}
 
async function runModule04Example(): Promise <void> {
console.log(await showUserStatus('Alex'));
}
runModule04Example();