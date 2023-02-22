import {DB} from "../data/DB";
import {GetInput} from "./get-input";

export class Action {
    static sayBye():void {
        GetInput.getConfirmation()
        console.log("Bye bye!");
        DB.save();
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