import {Action} from "../../action/action";
import {LoginPanel} from "../login";
import {ShoppingMenu} from "./shopping-menu";
import {CUSTOMERS} from "../../data/user-password";
import {CartMenu} from "./cart-menu";
import {HISTORY} from "../../data/history";
import {CART_DB} from "../../data/user-cart";
import {Cart} from "../../model/cart";
import {GetInput} from "../../action/get-input";

const readlineSync = require('readline-sync');

export class UserMenu {
    static menu: Array<string> = ["Shopping", "My Cart", "My Purchase History", "Log out"];

    static menuNavigation(userID: number): void {
        Action.showMenuName("CUSTOMER MENU");
        if (!CUSTOMERS.checkValidUserIDInput(userID)) {
            Action.showNotification(`something wrong happen, current user ID is ${userID}`);
            LoginPanel.menuNavigation();
        }
        let userIndex: number = CUSTOMERS.findIndexByUserID(userID);
        let username: string = CUSTOMERS.getCustomerByIndex(userIndex).username;
        let index = readlineSync.keyInSelect(UserMenu.menu, `Hello ${username}, what would you like to do? `);
        // console.log(index);
        switch (index) {
            case 0:
                ShoppingMenu.menuNavigation(userID);
                break;
            case 1:
                CartMenu.menuNavigation(userID);
                break;
            case 2:
                UserMenu.showHistory(userID);
                break;
            case 3:
                LoginPanel.menuNavigation();
                break;
            case -1:
                if (GetInput.getConfirmation(UserMenu.menuNavigation, "you want to exit", userID)) {
                    Action.sayBye();
                }
                break;
        }
        switch (index) {
            case 0:
            case 1:
            case 2:
                Action.pause();
                UserMenu.menuNavigation(userID);
                break;
        }
    }

    static showHistory(userID: number): void {
        let index = HISTORY.findByUserID(userID);
        if (index < 0) {
            console.log("NO HISTORY");
        } else {
            HISTORY.getByIndex(index).showAsTable();
        }
    }

    static initCart(userID: number): void {
        let cartIndex = CART_DB.findIndexByUserID(userID)
        if (cartIndex < 0) {
            CART_DB.addCart(new Cart(userID));
        } else {
            CART_DB.getCartInfoByUserID(userID).updateCurrentSTORE();
        }
    }

}