export function formatStatus(name: string, active: boolean): string {
    return `${name}: ${active ? 'ACTIVE' : 'INACTIVE'}`;
}

export function waitForReady(ms: number): Promise<void> {
    return new Promise<void>((resolve) => {
        setTimeout(() => {console.log('display-ready', ms); resolve();}, ms);
    });
}


function makeCoffee(): Promise <string> {
return new Promise((resolve) => {
setTimeout(() => resolve('Coffee is ready'), 300);
});
}
async function serveCoffee(): Promise <void> {
const coffee = await makeCoffee();
console.log(coffee);
}

//1. Write and export waitForReady(ms: number): Promise <void> . 
//Use new Promise and setTimeout inside it. After ms milliseconds, print display-ready and resolve the Prom
//ise. This Promise does not return a value.
//2. Import waitForReady into src/functions.ts through your own alias. 
//In showUserStatus() , await waitForReady(200) after the fake
//status arrives but before show-status is printed.