// Task 2 — Functions

// 1. Write a regular function that returns a test result as a string.
//  For test `TC-101` that passed, it must return `TC-101: PASS`. 
// For test `TC-102` that failed, it must return `TC-102: FAIL`.

function returnTestResultAsString(testCaseId: string, testResult: string): string {
    return `${testCaseId}: ${testResult}`;
}


 