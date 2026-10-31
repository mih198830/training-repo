// ## Task 4 — Interface and classes (40–45 minutes)

//Create one file, `src/classes.ts`. Write the interface and all three classes in that file. 
// Put the code that creates and uses the objects below the classes. Use only fake names and IDs.

//1. At the top of `src/classes.ts`, import `addNumbers` from `./math.ts`.
//2. Create an interface called `BaseUserData`. It requires `name` as a `string` and `age` as a `number`.
//3. Create a class called `BaseUser` that implements `BaseUserData`. 
// Set its `name` and `age` properties in the constructor. Its
// `isAdult()` method returns `true` when the user is at least 18 years old. 
// Add an `ageInYears(years: number): number` method. It returns the user's age after that many years. 
// Use the imported `addNumbers` function inside this method.
//4. `UserPoland` extends `BaseUser`. Add one extra field, such as a fake Polish ID.
//5. `UserBahrain` extends `BaseUser`. Add one extra field, such as a fake Bahraini ID. 
// Override `isAdult()` so it returns `true` only when the user is at least 21 years old.
//6. Below the classes, create one user from each new class. Give both users the same age between 18 and 20. 
// Print their names, extra fields, and `isAdult()` results. Call `ageInYears(5)` for one user and print the result. 
// If that user is 19, the result must be 24.
//The interface only describes the required fields; it does not appear in the console output.
//  Both new classes inherit `name`, `age`, and `ageInYears()` from `BaseUser`.
//  `UserPoland` uses the base `isAdult()` method. `UserBahrain` replaces it with its own version. 
// When you run `src/classes.ts`, you will also see the Task 3 output from `src/math.ts` because the imported file runs too.
//  This is expected. Commit `src/classes.ts` and its results before the star task.

// ## ⭐ Optional task — Private and protected fields (30–45 extra minutes)

// Work with the same classes:

// 1. In `BaseUser`, add a `private` field called `note` and a `protected` field called `visitCount`. 
// Give `note` a short fake text and start `visitCount` at `0`.
//2. Add public `getNote()` and `updateNote()` methods to `BaseUser`. Use them to read and change `note`.
//3. Add a public `getVisitCount()` method to `BaseUser`. 
// In `UserBahrain`, add a public `addVisit()` method that increases `this.visitCount` by `1`.
/// 4. At the bottom of `src/classes.ts`, print both values before and after you change them through the methods. 
// Do not read or change `note` or `visitCount` directly from the code below the classes.
// If you do this task, commit it separately from Task 4.

import { addNumbers } from './math.ts';
import { showUserStatus } from'./functions.ts';

interface BaseUserData {
    name: string;
    age: number;
}

class BaseUser implements BaseUserData {
    name: string;
    age: number;
    private note: string = "Short fake text";
    protected visitCount: number = 0;
    getNote(): string {
        return this.note;
    }
    updateNote(newNote: string): string {
        return this.note = newNote;;
    }
    getVisitCount(): number {
        return this.visitCount;
    }

    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }

    async getStatusLabel(): Promise<string> {
        const statusLabel = await showUserStatus(this.name);
        return String(statusLabel);
    }

    isAdult(): boolean {
        return this.age >= 18;
    }

    ageInYears(years: number): number {
        return addNumbers(this.age, years);
    }
}

class UserPoland extends BaseUser {
    polishID: string;

    constructor(name: string, age: number, polishID: string) {
        super(name, age);
        this.polishID = polishID;
    }
}

class UserBahrain extends BaseUser {
    bahrainID: string;

    constructor(name: string, age: number, bahrainID: string) {
        super(name, age);
        this.bahrainID = bahrainID;
    }

    isAdult(): boolean {
        return this.age >= 21;
    }

    addVisit(): number {
        return ++this.visitCount;
    }
}

const polishUser = new UserPoland('Janusz Kowalski', 19, 'XYZ12434');
const bahrainUser = new UserBahrain('Ahmed Al Khalifa', 19, 'YSKDI3803');

console.log(polishUser.name, polishUser.polishID, polishUser.isAdult());
console.log(bahrainUser.name, bahrainUser.bahrainID, bahrainUser.isAdult(), bahrainUser.addVisit());
console.log(polishUser.ageInYears(5));
polishUser.getStatusLabel().then((statusLabel) => {
    console.log(statusLabel);
});

// --- ⭐ Optional Task Execution (Before & After) ---

console.log('Note before update:', polishUser.getNote());
polishUser.updateNote('Updated fake text for Poland');
console.log('Note after update:', polishUser.getNote());

console.log('Visits before addVisit:', bahrainUser.getVisitCount());
bahrainUser.addVisit();
bahrainUser.addVisit();
console.log('Visits after two addVisit calls:', bahrainUser.getVisitCount());
