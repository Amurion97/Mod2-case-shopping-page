import {Action} from "./action";
import {UserDB} from "../model/manager/user-d-b";
import {StorageDB} from "../model/manager/storage-d-b";
import {Cart} from "../model/cart";
import {LoginPanel} from "../menu/login";

const readlineSync = require('readline-sync');

export class GetInput {
    static regExUsername = /^(?=[a-zA-Z0-9._]{8,20}$)(?!.*[_.]{2})([^_.].*[^_.])$/;
    static invalidUsernameMessage: string = "username must have 8-20 character, a-z A-Z 0-9 non-consecutive . and _ are allowed";
    static regExPassword = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])([a-zA-Z0-9!@#$%^&*]{8,20})$/;
    static invalidPasswordMessage: string = "password must have 8-20 character, a-z A-Z 0-9 special-character(!@#$%^&*) are allowed, must include one of each type";
    static defaultMPCQuestion = "What would you like to do?:";

    static wrongNameMenu: Array<string> = ["Re-type name", "Back to previous menu"];

    static getUsernameToChange(oldName: string, DB: UserDB, parentMenu: Function): string {
        let question = "Input username (8-20 character): ";
        let username = readlineSync.question(question).trim();
        let regExCheck = GetInput.regExUsername.test(username)
        // console.log(regExCheck)
        while (!regExCheck || username == oldName || DB.findIndexByUsername(username) > -1) {
            if (!regExCheck) {
                Action.showNotification(GetInput.invalidUsernameMessage);
            } else if (username == oldName) {
                Action.showNotification("New username must be different from the old one")
            } else {
                Action.showNotification("Existed name!");
            }
            let index = readlineSync.keyInSelect(GetInput.wrongNameMenu, GetInput.defaultMPCQuestion);
            switch (index) {
                case 0:
                    username = readlineSync.question(question).trim();
                    regExCheck = GetInput.regExUsername.test(username);
                    // username = GetInput.getUsernameToChange(oldName,DB,parentMenu);
                    break;
                case 1:
                    regExCheck = true;
                    parentMenu();
                    break;
                case -1:
                    Action.sayBye();
                    break;
            }
        }
        return username;
    }

    static getPasswordToChange(oldPassword: string, parentMenu: Function): string {
        let question = "Input password (8-20 character): ";
        let password = readlineSync.question(question);
        let regExCheck = GetInput.regExPassword.test(password)
        // console.log(regExCheck)
        while (!regExCheck || password == oldPassword) {
            let message = "What would you like to do?:";
            if (!regExCheck) {
                Action.showNotification(GetInput.invalidPasswordMessage);
            } else {
                Action.showNotification("New password must be different from the old one")
            }
            let index = readlineSync.keyInSelect(LoginPanel.wrongPasswordMenu, message);
            switch (index) {
                case 0:
                    password = readlineSync.question(question);
                    regExCheck = GetInput.regExPassword.test(password);
                    break;
                case 1:
                    parentMenu();
                    break;
                case -1:
                    Action.sayBye();
                    break;
            }
        }
        return password;
    }

    static getUserNameToLogin(DB: UserDB, parentMenu: Function): string {
        let username = readlineSync.question("Input username: ");
        while (DB.findIndexByUsername(username) === -1) {
            Action.showNotification("NAME NOT FOUND")
            let index = readlineSync.keyInSelect(GetInput.wrongNameMenu, `What would you like to do?:`);
            switch (index) {
                case 0:
                    username = readlineSync.question("Input username: ");
                    break;
                case 1:
                    parentMenu();
                    break;
                case -1:
                    Action.sayBye();
                    break;
            }
        }
        return username;
    }

    static receiveUserID(DB: UserDB, parentMenu: Function): number {
        let wrongMenu: Array<string> = ["Re-input", "Back to previous menu"];
        DB.showDBAsTable();
        let userID: number = +(readlineSync.question("Input user ID of choice: "));
        while (!DB.checkValidUserIDInput(userID)) {
            Action.showNotification("WRONG ID")
            let index = readlineSync.keyInSelect(wrongMenu, `What would you like to do?:`);
            switch (index) {
                case 0:
                    DB.showDBAsTable();
                    userID = +(readlineSync.question("Input user ID of choice: "));
                    break;
                case 1:
                    parentMenu();
                    break;
                case -1:
                    Action.sayBye();
                    break;
            }
        }
        return userID;
    }

    static getConfirmation(parentMenu: Function,message?: string, userID?: number): boolean {
        // let menu: Array<string> = ["YES", "NO"];
        let answer: string = "";
        do {
            answer = readlineSync.question(`Are you sure ${message} [Y/N]?:`).toUpperCase();
            switch (answer) {
                case "Y":
                    return true;
                case "N":
                    parentMenu(userID);
                    break;
            }
        } while (answer != "Y" && answer != "N")
        return false;
    }

    static getProductNameToEdit(DB: StorageDB, parentMenu: Function): string {
        let productName = readlineSync.question("Input product name: ");
        while (DB.findByProductName(productName) > -1) {
            let index = readlineSync.keyInSelect(GetInput.wrongNameMenu, `Existed name, what would you like to do?:`);
            switch (index) {
                case 0:
                    productName = readlineSync.question("Input product name: ");
                    break;
                case 1:
                    parentMenu();
                    break;
                case -1:
                    Action.sayBye();
                    break;
            }
        }
        return productName;
    }

    static getProductQuantityToCart(productID: number, DB: StorageDB, cart: Cart, parentMenu: Function): number {
        let wrongMenu: Array<string> = ["Re-type quantity", "Back to previous menu"];

        let quantityInStore: number = DB.getProductInfoByID(productID).quantity;
        let quantityInCart: number = (cart.findByProductID(productID) >= 0) ? cart.getProductInfoByID(productID).quantity : 0;
        if (quantityInCart > 0) {
            Action.showNotification(`ALREADY HAVE ${quantityInCart} IN CART`);
        }
        let quantity: number = GetInput.getNumber("quantity", parentMenu);

        let availableQuantity: number = quantityInStore - quantityInCart;
        let isProperQuantity: boolean = quantity > 0 && quantity <= availableQuantity;
        while (!isProperQuantity) {
            Action.showNotification(`WRONG QUANTITY, NOT BIGGER THAN ${availableQuantity}`);
            let index = readlineSync.keyInSelect(wrongMenu, `What would you like to do?:`);
            switch (index) {
                case 0:
                    quantity = GetInput.getNumber("quantity", parentMenu);
                    isProperQuantity = quantity > 0 && quantity <= availableQuantity;
                    break;
                case 1:
                    parentMenu();
                    break;
                case -1:
                    Action.sayBye();
                    break;
            }
        }
        return quantity;
    }

    static getNumber(label: string, parentMenu: Function): number {
        let wrongMenu: Array<string> = ["Re-input", "Back to previous menu"];
        let question = `Input ${label}: `;
        let number = +readlineSync.question(question);
        while (isNaN(number) || number === 0) {
            Action.showNotification("WRONG INPUT, MUST BE AN INTEGER > 0")
            let index = readlineSync.keyInSelect(wrongMenu, `What would you like to do?:`);
            switch (index) {
                case 0:
                    number = +readlineSync.question(question);
                    break;
                case 1:
                    parentMenu();
                    break;
                case -1:
                    Action.sayBye();
                    break;
            }
        }
        return number;
    }

    static receiveProductID(DB: StorageDB, parentMenu: Function): number {
        let wrongMenu: Array<string> = ["Re-input", "Back to previous menu"];
        DB.showDB();
        let productID: number = +(readlineSync.question("Input product ID of choice: "));
        while (!DB.checkValidProductID(productID)) {
            Action.showNotification("WRONG ID")
            let index = readlineSync.keyInSelect(wrongMenu, `What would you like to do?:`);
            switch (index) {
                case 0:
                    DB.showDB();
                    productID = +(readlineSync.question("Input product ID of choice: "));
                    break;
                case 1:
                    parentMenu();
                    break;
                case -1:
                    Action.sayBye();
                    break;
            }
        }
        return productID;
    }

    static getPasswordToLogin(): string {
        return readlineSync.question('May I have your password? ', {
            hideEchoBack: true // The typed text on screen is hidden by `*` (default).
        });
    }

}