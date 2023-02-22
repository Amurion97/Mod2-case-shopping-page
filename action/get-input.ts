import {Action} from "./action";
import {UserDB} from "../manager/user-d-b";
import {StorageDB} from "../manager/storage-d-b";
import {Cart} from "../model/cart";

const readlineSync = require('readline-sync');
export class GetInput {
    static wrongNameMenu: Array<string> = ["Re-type name", "Back to previous menu"];
    static getUserNameToEdit(DB: UserDB, parentMenu: Function): string {
        let username = readlineSync.question("Input username: ");
        while (DB.findByUsername(username) > -1) {
            let index = readlineSync.keyInSelect(GetInput.wrongNameMenu, `Existed name, what would you like to do?:`);
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
    static getUserNameToLogin(DB: UserDB, parentMenu: Function): string {
        let username = readlineSync.question("Input username: ");
        while (DB.findByUsername(username) === -1) {
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

    static receiveUserID(DB: UserDB, parentMenu: Function):number {
        let wrongMenu: Array<string> = ["Re-input", "Back to previous menu"];
        DB.showDB();
        let userID:number = +(readlineSync.question("Input user ID of choice: "));
        while (!DB.checkValidUserID(userID)) {
            Action.showNotification("WRONG ID")
            let  index = readlineSync.keyInSelect(wrongMenu, `What would you like to do?:`);
            switch (index) {
                case 0:
                    DB.showDB();
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

    static getConfirmation(parentMenu: Function, userID?: number): boolean {
        let menu: Array<string> = ["YES", "NO"];
        let answer:number = readlineSync.keyInSelect(menu, `Are you sure?:`);
        switch (answer) {
            case 0:
                return true;
            case 1:
                parentMenu(userID);
                break;
            case -1:
                Action.sayBye();
                break;
        }
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
    static getProductQuantityToCart(productID: number, DB: StorageDB, cart: Cart, parentMenu: Function): number{
        let wrongMenu: Array<string> = ["Re-type quantity", "Back to previous menu"];

        let quantityInStore: number = DB.getProductInfo(productID).quantity;
        let quantityInCart: number = (cart.findByProductID(productID) >= 0)? cart.getProductInfo(productID).quantity : 0;
        if (quantityInCart> 0) {
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
            Action.showNotification("WRONG INPUT")
            let  index = readlineSync.keyInSelect(wrongMenu, `What would you like to do?:`);
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

    static receiveProductID(DB: StorageDB, parentMenu: Function):number {
        let wrongMenu: Array<string> = ["Re-input", "Back to previous menu"];
        DB.showDB();
        let productID:number = +(readlineSync.question("Input product ID of choice: "));
        while (!DB.checkValidProductID(productID)) {
            Action.showNotification("WRONG ID")
            let  index = readlineSync.keyInSelect(wrongMenu, `What would you like to do?:`);
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

    static getPassword(): string {
        return readlineSync.question('May I have your password? ',{
            hideEchoBack: true // The typed text on screen is hidden by `*` (default).
        });
    }

}