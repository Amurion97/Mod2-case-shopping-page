export class Action {
    static sayBye():void {
        console.log("Bye bye!");
        process.exit();
    }

    static pause(): void {
        const readlineSync = require('readline-sync');
        readlineSync.question("Press Enter to continue...");
    }

    static showMenuName(name: string): void {
        console.log()
        console.log("=".repeat(5),name,"=".repeat(5))
    }

    static showNotification(notification: string): void {
        console.log("!".repeat(5),notification,"!".repeat(5))
    }
}